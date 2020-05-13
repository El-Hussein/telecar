import React from 'react';

import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Platform,
    I18nManager,
    FlatList,
    TextInput,
    AsyncStorage,
    Linking,
    PermissionsAndroid,
} from 'react-native';
import { IMAGES, height, width, COLORS, baseUrl, moderateScale, verticalScale } from '../../config';
import localization from '../../localization/localization';
import  Icon from 'react-native-vector-icons/FontAwesome5';
import Header from '../../Components/HeaderNew';
import Footer from '../../Components/FooterNew';
import { connect } from "react-redux";
import {
  getMyOrdersByStatus,
  getOrderOffers
} from "../../Redux/actions/Customer";
import Moment from "moment";  
import "moment/locale/ar-sa";
import Spinner from "react-native-spinkit";
import { FetchAllChat } from "../../Redux/actions/Chat";
import firebaseJs from "firebase";
import Store from "../../Redux";
import Axios from "axios";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { RFValue } from "react-native-responsive-fontsize";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const openMapsApp = (lat, lng, label) => {
    console.log("open map location!?!?")
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${lat},${lng}`;
    const url = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`
    });


    return Linking.canOpenURL(url).then(supported => {
        if (supported) {
          Linking.openURL(url);
          return true;
        } else {
          const AlertMessage = Store.getState().Config.alert;
          AlertMessage("error", "خطـأ", localization.someThingWentWrong);
    
          console.log("Don't know how to open URI: " + url);
          return false;
        }
    }); 
}

class Chat extends React.Component{

    constructor(props){
        super();
        this.state={
            messeges:[
                {id:'1',from:'hussein salah', to:'Ghada Ahmed', messege:'السلام عليكم', date:'13:36'},
                {id:'2',from:'hussein salah', to:'Ghada Ahmed', messege:'كيف حالك؟', date:'13:36'},
                {id:'3',from:'Ghada Ahmed', to:'hussein salah', messege:'وعليكم السلام ورحمة الله وبركتة انا بخير وانت؟', date:'13:36'},
                {id:'4',from:'hussein salah', to:'Ghada Ahmed', messege:'بخير', date:'13:36'},
                {id:'5',from:'hussein salah', to:'Ghada Ahmed', messege:'كنت محتاج بس اعرف ايه اخر اخبار العروض عندكو؟', date:'13:36'},
                {id:'6',from:'hussein salah', to:'Ghada Ahmed', messege:'عروض السيارت', date:'13:36'},
                {id:'7',from:'Ghada Ahmed', to:'hussein salah', messege:'ان شاء الله قريب في عروض جديدة نازلة', date:'13:36'},
                {id:'8',from:'Ghada Ahmed', to:'hussein salah', messege:'اول اما نعلن عنها وننزلها هبلغ حضرتك يا فندم', date:'13:36'},
                {id:'9',from:'hussein salah', to:'Ghada Ahmed', messege:'طيب تمام جدا, شكرا لحضرتك.', date:'13:36'},
                {id:'10',from:'Ghada Ahmed', to:'hussein salah', messege:'العفو.', date:'13:36'},
            ],
            accountOwner:props.name,
            messages: [],
            loading: false,
            index: 0,
            message: "",
            disabled: false,
            rtl:I18nManager.isRTL != (localization.getLanguage()=='ar'),
            modal:false,
            lat:30.78825,
            long:31.78825,
        }
    }
     
     async requestLocationPermission() {
         try {
             const granted = await PermissionsAndroid.request(
             PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
             {
               'title': 'Location Permission',
               'message': 'MyMapApp needs access to your location'
             }
             )
     
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                this._getCurrentLocation()
                console.log("Location permission granted")
            } else {
                console.log("Location permission denied")
            }
        } catch (err) {
        console.warn(err)
        }
     }
     
     _getCurrentLocation = () =>{
         console.log('entered')
         navigator.geolocation.getCurrentPosition(
            (position) => {
                    console.log('entered position')
                    console.log(position)
                    this.setState({
                        lat:position.coords.latitude,
                        long:position.coords.longitude,
                    })
                },
                (error) => {
                    console.log('entered error')
                    console.log(error)
                    if(error.code == 2){
                        console.log(error.message)
                        const AlertMessage = Store.getState().Config.alert;
                        AlertMessage(
                            "warn",
                            "Warn",
                            "Turn on GPS to access your location"
                        );
                    }
                //  this.setState({ error: error.message })},
                },
                { 
                    // enableHighAccuracy: true, 
                    timeout: 200000, 
                    maximumAge: 1000 
                },
         );
    }

    // async getMyLocation() {
    //     await navigator.geolocation.getCurrentPosition(
    //       position => {
    //         loc = { longitude: position.coords.longitude, latitude: position.coords.latitude };
    //         console.log("Current location is: ")
    //         console.log(position)
    //         this.setState({
    //             lat:position.coords.latitude,
    //             long:position.coords.longitude,
    //         })
    //         console.log("Current location is: ")
    //       },
    //       error => {
    //         //   alert(JSON.stringify(error));
    //       },
    //       {
    //         enableHighAccuracy: true,
    //         timeout: 20000,
    //         maximumAge: 1000
    //       }
    //     );
    // };
    
    async componentDidMount() {
        this.database = firebaseJs.database().ref("chat");
        if(Platform.OS === 'android'){
            this.requestLocationPermission()
        }else{
        this._getCurrentLocation()
        }
        // this.setState({
        //     LoginType: await AsyncStorage.getItem('userType'),
        // })
        await this.get_messages_onload();
        await this.get_new_messages();

    }

    getUnique = (arr, comp) => {
        const unique = arr
        .map(e => e[comp])
    
        // store the keys of the unique objects
        .map((e, i, final) => final.indexOf(e) === i && i)
    
        // eliminate the dead keys & store unique objects
        .filter(e => arr[e])
        .map(e => arr[e]);
    
        return unique;
    };

    get_messages_onload = async () => {
        this.setState({ loading: true });
        //let S = Date.now();
        let messages = [];
        let userType =
        this.props && this.props.type_user === "Customer" ? "userId" : "merchantId";
    
        await this.database.once("value", snapshot =>
        snapshot.forEach(message => {
            messages.push({ id: message.key, ...message.val() });
        })
        );
        let result = [];
        let temp = messages
        .filter(
            t =>
            t.productId &&
            t.productId === this.props.navigation.state.params.productId
        )
        .sort(function(a, b) {
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.timestamp) - new Date(a.timestamp);
        });
        if (temp.length > 0) {
        temp.map(t => {
            let f = t[Object.keys(t)[Object.keys(t).length - 1]];
            let ob = {
            avatar: "https://randomuser.me/api/portraits/men/75.jpg",
            alt: t.from,
            title: t.from,
            subtitle: t.message,
            date: t.timestamp,
            unread: 0
            };
            // console.log("====================================");
            // console.log();
            // console.log("====================================");
            result.push(ob);
        });
        }
    
        await this.setState(
        {
            messages: result.reverse().splice(0, result.length-1),
            // messages: result,
            loading: false
        },
        // () => {
        //     // console.log("====================================MESSSSSSSSEGGEEES");
        //     // console.log(this.state.messages);
        //     // console.log("====================================");
        // }
        );
        //let E = Date.now();
        // alert(E - S);
    };
    
    timeConverter(UNIX_timestamp){
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
        // var time = hour + ':' + min ;
        // return time;
        return Moment(UNIX_timestamp).format('DD hh:mm A');
    }
    
    get_new_messages = async () => {
        this.database.limitToLast(1).on("child_added", snapshot =>
        this.setState(prev => ({
            messages: [
            ...prev.messages,
            {
                id: snapshot.key,
                ...{
                avatar: "https://randomuser.me/api/portraits/men/75.jpg",
                alt: snapshot.val().from,
                title: snapshot.val().from,
                subtitle: snapshot.val().message,
                date: snapshot.val().timestamp,
                unread: 0
                }
            },
            ]
        }))
        );
        console.log("NEW ONE ADDED");
    };

    send_message = async (location = false) => {
        this.setState({ disabled: true });
        if(!this.state.message&&!location)
            return null;
        console.log("LOOOOOOOOOOOOOOOOOOOOOOL")
        let userType =
        this.props && this.props.type_user === "Customer" ? "userId" : "merchantId";
        let merchantId =
        userType === "merchantId"
            ? this.props.id
            : this.props.navigation.state.params.id;
        let userId =
        userType === "userId"
            ? this.props.id
            : this.props.navigation.state.params.id;

        // let userFrom = this.props.id;
        // let userTo = this.props.navigation.state.params.id;
        let message = location? JSON.stringify({marker:this.state.marker?this.state.marker:{latitude:this.state.lat, longitude:this.state.long}}) :this.state.message;
        this.setState({ message: "" });
        time = new Date().getTime();
        console.log("TIMEEEE: " + time)
        let data = {
        message,
        type: "text",
        timestamp: time,
        from: this.props.name,
        to: this.props.navigation.state.params.name,
        merchantId,
        userId,
        productId: this.props.navigation.state.params.productId
        };
    
        console.log("====================================");
        console.log(data);
        console.log("====================================");
        this.database.push(data);
        this.setState({ disabled: false });
        const token = this.props.token;
        console.log(token, this.props.type_user)
        if (this.props && this.props.type_user === "Customer") {
        try{
            console.log("CUSTOMER LOOL")
            await Axios.post(
                baseUrl + "api/users/notifiy/merchant",
                {
                message: data.message,
                product_id: data.productId,
                merchant_id: data.merchantId,
                // from: data.from,
                // to: data.to,
                user_id: data.userId
                },
                {
                headers: { Authorization: 'Bearer ' + token }
                }
            ).then((res)=>{

                console.log("=======DONE SENT?=============================");
                // console.log(product_id, merchant_id, user_id)
                console.log(res);
                console.log("====================================");
            }).catch((err)=>{
                console.log("=======not SENT!!=============================");
                console.log(err);
                console.log("====================================");
            });
        }catch(err){
            console.log("=======not SENT!!=============================");
            console.log(err);
            console.log("====================================");
        }
        } else {
        try{
            console.log("MERCHANT LOOL")
            await Axios.post(
                baseUrl + "api/merchants/notifiy/user",
                {
                message: data.message,
                product_id: data.productId,
                merchantId: data.merchantId,
                // from: data.from,
                // to: data.to,
                user_id: data.userId
                },
                {
                headers: { Authorization: 'Bearer ' + token }
                }
            ).then((res)=>{

                console.log("=======DONE SENT?=============================");
                // console.log(product_id, merchant_id, user_id)
                console.log(res);
                console.log("====================================");
            }).catch((err)=>{
                console.log("=======not SENT!!=============================");
                console.log(err);
                console.log("====================================");
            });
        }catch(err){
            console.log("=======not SENT!!=============================");
            console.log(err);
            console.log("====================================");
        }
        }
    };


    _renderMessegeItem=({item})=>{
        let marker = '';
        try{
            marker = JSON.parse(item.subtitle);
        }catch(err){
            marker = "notvalid";
        }
        // console.log("marker")
        // console.log(marker)
        return(
            <View style={styles.messegeItemContainer}>
                <View style={item.title!=this.state.accountOwner?styles.myMessegeContainer:styles.otherMessegeContainer}> 
                    {item.title!=this.state.accountOwner && <Image source={item.avatar?{uri:item.avatar}:IMAGES.avatar} style={styles.avatar}/>}
                    {/* <Text style={item.from==this.state.accountOwner?styles.myMessege:styles.otherMessege}>{item.messege} </Text>     */}
                {marker!="notvalid"?
                (
                    <TouchableOpacity onPress={()=>openMapsApp(marker.marker.latitude, marker.marker.longitude, item.alt)} >
                        <MapView
                            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                            style={{
                                height:height*0.2,
                                backgroundColor: COLORS.BackGround,
                                // marginBottom: verticalScale(20),
                                // marginHorizontal:width*0.03,
                                margin:width*0.03,
                                width:width*0.55,
                                borderRadius:width*0.03
                            }}
                            region={{
                                latitude: marker.marker.latitude ? marker.marker.latitude : 0.0,
                                longitude: marker.marker.longitude ? marker.marker.longitude : 0.0,
                                latitudeDelta: 0.015,
                                longitudeDelta: 0.0121
                            }}
                            scrollEnabled={false}
                        >
                            {marker.marker.latitude && marker.marker.longitude && (
                            <Marker
                                coordinate={marker.marker}
                            >
                                <View style={{ justifyContent: "center", alignItems: "center" }} >
                                    <Text style={{ color: COLORS.white, backgroundColor:COLORS.main, borderRadius:width*0.02, paddingHorizontal:width*0.02, fontSize: RFValue(14) }}>
                                        {item.alt}
                                    </Text>
                                    <FontAwesome
                                        name="map-marker"
                                        color={COLORS.main}
                                        size={RFValue(50)}
                                    />
                                </View>
                            </Marker>
                            )}
                        </MapView>
                    </TouchableOpacity>
                )
                :
                (
                    <Text style={item.title==this.state.accountOwner?styles.myMessege:styles.otherMessege}>{item.subtitle} </Text>    
                )}
                    <Text style={styles.date}> {this.timeConverter(item.date)} </Text>
                </View>
            </View>
        )
    }

    render(){
        console.log("this.state.messages loooooooool")
        console.log(this.state.messages)
        console.log("this.state.messages loooooooool")
        // console.log("MODAAAL DATA")
        // console.log(this.state.modal);
        // console.log("MODAAAL DATA")
        Modal = ()=>{
            return(
                <View style={{height:height, justifyContent:'center', alignItems:'center', width:width, right:width*-0.5, top:-height, position:'absolute', zIndex:5, backgroundColor:'rgba(50,50,50,0.5)'}}>
                    <View onPress={()=>console.log("won't close :P")} style={{height:height*0.35, borderRadius:width*0.02,  zIndex:8, elevation:8, width:width*0.9, backgroundColor:COLORS.white}}>
                        <MapView
                            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                            style={{
                                height:height*0.3,
                                backgroundColor: COLORS.BackGround,
                                // marginBottom: verticalScale(20),
                                // marginHorizontal:width*0.03
                                width:width*0.9
                            }}
                            region={{
                                latitude: this.state.marker ? this.state.marker.latitude : (this.state.lat ? this.state.lat : 0.0),
                                longitude: this.state.marker ? this.state.marker.longitude : (this.state.long ? this.state.long : 0.0),
                                latitudeDelta: 0.015,
                                longitudeDelta: 0.0121
                            }}
                            onPress={(e) => this.setState({ marker: e.nativeEvent.coordinate })}
                            // scrollEnabled={false}
                        >
                            {this.state.marker ? (
                            <Marker
                                coordinate={this.state.marker}
                            >
                                <View
                                style={{ justifyContent: "center", alignItems: "center" }}
                                >
                                <Text style={{ color: COLORS.white, backgroundColor:COLORS.main, borderRadius:width*0.02, paddingHorizontal:width*0.02, fontSize: RFValue(14) }}>
                                    {localization.Location}
                                </Text>
                                <FontAwesome
                                    name="map-marker"
                                    color={COLORS.main}
                                    size={RFValue(50)}
                                />
                                </View>
                            </Marker>
                            ):
                            this.state.lat && this.state.long && (
                                <Marker
                                    coordinate={{
                                    latitude: this.state.lat,
                                    longitude: this.state.long
                                    }}
                                >
                                    <View
                                    style={{ justifyContent: "center", alignItems: "center" }}
                                    >
                                    <Text style={{ color: COLORS.white, backgroundColor:COLORS.main, borderRadius:width*0.02, paddingHorizontal:width*0.02, fontSize: RFValue(14) }}>
                                        {localization.Location}
                                    </Text>
                                    <FontAwesome
                                        name="map-marker"
                                        color={COLORS.main}
                                        size={RFValue(50)}
                                    />
                                    </View>
                                </Marker>
                            )}
                        </MapView>
                        <View style={{flexDirection:this.state.isRTL?'row':'row-reverse'}}>
                            <TouchableOpacity onPress={()=>{
                                this.setState({
                                    modal:false,
                                });
                                this.send_message(true)
                            }} style={{height:height*0.04, margin:height*0.005, alignSelf:'flex-end', width:width*0.16, justifyContent:'center', alignItems:'center', backgroundColor:COLORS.main, borderRadius:width*0.02}}>
                                <Text style={{color:COLORS.white}}> 
                                    {localization.pickLocation}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{
                                this.setState({
                                    modal:false,
                                });
                                // this.send_message(true)
                            }} style={{height:height*0.04, margin:height*0.005, alignSelf:'flex-end', width:width*0.16, justifyContent:'center', alignItems:'center', backgroundColor:COLORS.main, borderRadius:width*0.02}}>
                                <Text style={{color:COLORS.white}}> 
                                    {localization.cancle}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )
        }
        console.log(this.state.accountOwner);
        return(
            <View style={styles.container}>
                <Image source={IMAGES.bg} style={styles.bg}/>
                <Header/>
                {this.state.loading ? (
                    <Spinner
                    style={{
                        marginVertical: moderateScale(20),
                        justifyContent: "center",
                        alignSelf: "center",
                        alignItems: "center"
                    }}
                    isVisible={true}
                    type="Circle"
                    color={"#57B235"}
                    />
                ) :
                <FlatList
                    data={this.state.messages}
                    renderItem={this._renderMessegeItem}
                    keyExtractor={(item, index)=>item.id + index.toString()}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={()=><Text style={{fontSize:width*0.05, color:COLORS.gray, margin:width*0.02}}> {localization.noAvailableData} </Text>}
                /> 
                }    
                <View style={styles.messegeContainer}>
                    <TextInput 
                        placeholder={localization.typeMessege}
                        style={styles.messegeInput}
                        multiline={true}
                        onChangeText={(message)=>this.setState({message})}
                        value={this.state.message}
                    />
                    
                    <TouchableOpacity onPress={()=>this.send_message()} style={styles.send}>
                        <Image source={IMAGES.send} style={{width:width*0.07, height:width*0.07, resizeMode:'contain'}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.setState({modal:true})} style={[styles.send, {marginHorizontal:width*0.02}]}>
                        {/* <Image source={IMAGES.send} style={{width:width*0.07, height:width*0.07, resizeMode:'contain'}}/> */}
                        <Icon name="map-marker-alt" size={width*0.07} color={COLORS.main}/>
                    </TouchableOpacity>
                </View>         
                <Footer />
                {this.state.modal?<View><Modal/></View>:null}
            </View>
        )
    }

}

const MapStateToProps = state => {
    return {
    myRooms: state.Chat.Rooms,
    ...state.auth.user,
    // LoginType: state.Config.userType
    };
};
const MapDispatchToProps = dispatch => {
    return {
    fetchAllMessages: page => FetchAllChat(page, dispatch)
    };
};
export default connect(MapStateToProps, MapDispatchToProps)(Chat);


wp = (w)=>{
    return parseFloat(w)/100*width
}

hp = (h)=>{
    return parseFloat(h)/100*height
}
const rtl = I18nManager.isRTL != (localization.getLanguage()=='ar');
const styles = StyleSheet.create({
    container:{
        // justifyContent:'space-between',
        alignItems:'center',
        // height:height*0.97,
        flex:1,
    },
    bg:{
        position:'absolute',
        height:height*1.5,
        width:width,
        resizeMode:'stretch',
    },
    avatar:{
        width:width*0.13,
        height:width*0.13,
        borderRadius:width*0.065,
        // resizeMode:'contain',
        marginVertical:height*0.03,
        marginHorizontal:height*0.01
    },
    
    textInput:{
        width:wp('60%'),
        color:'black',
        textAlign:'center',
        textAlignVertical:'center',
        fontSize:20,
        borderTopLeftRadius:30,
        borderBottomLeftRadius:30,
    },
    messegeContainer:{
        flexDirection:I18nManager.isRTL&&rtl?'row':'row-reverse',
        justifyContent:'space-between',
        alignItems:'flex-end',
        width:width,
        marginBottom:width*0.07,
        paddingRight:width*0.02,
        borderTopColor:COLORS.gray,
        borderTopWidth:width*0.002
    },
    messegeInput:{
        width:width*0.76,
        paddingHorizontal:width*0.03,
        fontSize:width*0.035,
        color:COLORS.textBlack,
        textAlignVertical:'center',
        // backgroundColor:COLORS.background,
        minHeight: height*0.05,
        maxHeight: height*0.12,
        borderRadius:width*0.02,
        // borderTopLeftRadius:width*0.02,
        // borderBottomLeftRadius:width*0.02,
        paddingVertical:0,
    },
    send:{
        color:COLORS.text,
        backgroundColor:COLORS.white,
        height:height*0.055,
        justifyContent:'center',
        alignItems:'center',
        textAlignVertical:'center',
        textAlign:'center',
        width:height*0.055,
        borderRadius:height*0.0275,
        // width:width*0.14,
        elevation:4,
        marginTop:width*0.02
        // borderTopRightRadius:width*0.02,
        // borderBottomRightRadius:width*0.02
    },
    messegeItemContainer:{
        width:width*0.94,
        marginVertical:width*0.03,
    },
    myMessegeContainer:{
        minHeight:height*0.05,
        alignSelf:'flex-start',
        backgroundColor:COLORS.main,
        paddingHorizontal:width*0.02,
        borderRadius:width*0.07,
        minWidth:width*0.1,
        maxWidth:width*0.75,
        paddingVertical:width*0.01,
        paddingLeft:width*0.1,
        justifyContent:'center',
        alignItems:'center',
        marginLeft:width*0.1,
    },
    otherMessegeContainer:{
        minHeight:height*0.05,
        alignSelf:'flex-end',
        backgroundColor:COLORS.main,
        borderRadius:width*0.07,
        paddingHorizontal:width*0.02,
        minWidth:width*0.1,
        maxWidth:width*0.75,
        paddingVertical:width*0.01,
        paddingLeft:width*0.1,
        justifyContent:'center',
        alignItems:'center',
    },
    myMessege:{
        color: COLORS.white,
        textAlignVertical:'center',
        fontSize:width*0.04,
        paddingHorizontal:width*0.03,
    },
    otherMessege:{
        color: COLORS.white,
        textAlignVertical:'center',
        fontSize:width*0.04,
        paddingHorizontal:width*0.03,
    },
    date:{
        position:'absolute', 
        bottom:width*0.01, 
        left:width*0.02, 
        fontSize:width*0.03, 
        color:COLORS.white
    },
    avatar:{
        width:width*0.1,
        height:width*0.1,
        borderRadius:width*0.05,
        position:'absolute',
        left:width*-0.12,
        top:0
    },
})
