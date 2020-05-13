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
    AsyncStorage
} from 'react-native';
import { IMAGES, height, width, COLORS, moderateScale } from '../../config';
import localization from '../../localization/localization';
import  Icon from 'react-native-vector-icons/FontAwesome5';
import Header from '../../Components/HeaderNew';
import Footer from '../../Components/FooterNew';
import Moment from "moment";  
import "moment/locale/ar-sa";
import firebaseJs from "firebase";
import { FetchAllChat } from "../../Redux/actions/Chat";
import Spinner from "react-native-spinkit";
import { connect } from "react-redux";
import store from "../../Redux";
import {
    getMyOrdersByStatus,
    getOrderOffers
  } from "../../Redux/actions/Customer";
class Chats extends React.Component{

    constructor(){
        super();
        this.state={
            chats:[
                {id:1,name:'hussein salah hamed', image:IMAGES.avatar, time:2, lastMessage:"this is test message and i need it to be very very long to truncate it and show points in the end of the size"},
                {id:2,name:'hussein salah hamed', image:IMAGES.avatar, time:2, lastMessage:"this is test message and i need it to be very very long to truncate it and show points in the end of the size"},
                {id:3,name:'hussein salah hamed', image:IMAGES.avatar, time:2, lastMessage:"this is test message and i need it to be very very long to truncate it and show points in the end of the size"},
                {id:4,name:'hussein salah hamed', image:IMAGES.avatar, time:2, lastMessage:"this is test message and i need it to be very very long to truncate it and show points in the end of the size"},
                {id:5,name:'hussein salah hamed', image:IMAGES.avatar, time:2, lastMessage:"this is test message and i need it to be very very long to truncate it and show points in the end of the size"},
                {id:6,name:'hussein salah hamed', image:IMAGES.avatar, time:2, lastMessage:"this is test message and i need it to be very very long to truncate it and show points in the end of the size"},
                {id:7,name:'hussein salah hamed', image:IMAGES.avatar, time:2, lastMessage:"this is test message and i need it to be very very long to truncate it and show points in the end of the size"},
                {id:8,name:'hussein salah hamed', image:IMAGES.avatar, time:2, lastMessage:"this is test message and i need it to be very very long to truncate it and show points in the end of the size"},
                {id:9,name:'hussein salah hamed', image:IMAGES.avatar, time:2, lastMessage:"this is test message and i need it to be very very long to truncate it and show points in the end of the size"},
                {id:10,name:'hussein salah hamed', image:IMAGES.avatar, time:2, lastMessage:"this is test message and i need it to be very very long to truncate it and show points in the end of the size"},
                {id:11,name:'hussein salah hamed', image:IMAGES.avatar, time:2, lastMessage:"this is test message and i need it to be very very long to truncate it and show points in the end of the size"},
                {id:12,name:'hussein salah hamed', image:IMAGES.avatar, time:2, lastMessage:"this is test message and i need it to be very very long to truncate it and show points in the end of the size"},
                {id:13,name:'hussein salah hamed', image:IMAGES.avatar, time:2, lastMessage:"this is test message and i need it to be very very long to truncate it and show points in the end of the size"},
                {id:14,name:'hussein salah hamed', image:IMAGES.avatar, time:2, lastMessage:"this is test message and i need it to be very very long to truncate it and show points in the end of the size"},
            ],
            messages: [],
            loading: true,
            index: 0
        }
    }

    timeConverter(UNIX_timestamp){
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        // var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
        var time = hour + ':' + min ;
        return Moment(UNIX_timestamp).format('DD hh:mm A');
    }

    _renderChat=({item})=>{
        console.log(item + "           " + this.props.name)
        let marker = '';
        try{
            marker = JSON.parse(item.subtitle);
        }catch(err){
            marker = "notvalid";
        }
        return(
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('OneChat', { productId: item.productId, name:item.alt, id:this.props.type_user === "Customer" ? item.merchantId : item.userId, })} style={styles.chatItem}>
                <Image source={item.avatar?{uri:item.avatar}:IMAGES.avatar} style={styles.avatar}/>
                <View style={styles.texts}>
                    {/* <Text style={styles.name}> {item.alt == this.props.name? "Me":item.alt} </Text>  */}
                    <Text style={styles.name}> {item.title == this.props.name? item.alt:item.title} </Text> 
                    <Text style={styles.time}> {this.timeConverter(item.date)} </Text>
                    <Text style={styles.lastMessage}> {marker=="notvalid"?item.subtitle.length>45?item.subtitle.substr(0, 45) + '..' : item.subtitle:localization.Location} </Text> 
                </View>
                <Icon style={{margin:width*0.02}} name="trash-alt" size={width*0.05} color={COLORS.main}/>
            </TouchableOpacity>
        )
    }

    async componentDidMount() {
        this.database = firebaseJs.database().ref("chat");
        this.setState({
            LoginType: await AsyncStorage.getItem('userType'),
        })
        await this.get_messages_onload();
    }


    get_messages_onload = async () => {
        this.setState({ loading: true });
        //let S = Date.now();
        let messages = [];
        let result = [];
        let filterType = this.state.LoginType === "Customer" ? "userId" : "merchantId";

        await this.database.once("value", snapshot =>
            snapshot.forEach(message => {
                // if(message.id)
                messages.push({ id: message.key, ...message.val() });
            })
        );
        console.log(messages);
        messages = messages
        .filter(t => t[filterType] === this.props.id)
        .sort(function(a, b) {
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.timestamp) - new Date(a.timestamp);
        })
        let newMessages = [];
        messages.map((m)=>{
            if(newMessages.findIndex(mm=>mm.productId == m.productId && ((mm.userId == m.userId && mm.merchantId == m.merchantId) || (mm.userId == m.merchantId && mm.merchantId == m.userId))) == -1){
                console.log('found match', m)
                newMessages.push(m)
            }
        })
        // .filter(function(a) {
        //     console.log(a, this, this[a[filterType]] , (this[a[filterType]]))
        //     return !this[a[filterType]] && (this[a[filterType]] = true);
        // }, Object.create(null));

        newMessages.length > 0 &&
        newMessages.map(t => {
            let f = t[Object.keys(t)[Object.keys(t).length - 1]];
            let ob = {
            avatar: "https://randomuser.me/api/portraits/men/75.jpg",
            alt: t.from,
            title: t.to,
            subtitle: t.message,
            date: t.timestamp,
            unread: 0,
            merchantId: t.merchantId,
            userId: t.userId,
            productId: t.productId
            };
            console.log("===============OB?ECT=====================");
            console.log(ob);
            console.log("====================================");
            result.push(ob);
        });
    
        this.setState({ messages: result, loading: false });
        console.log("==============messages======================");
        console.log(this.state.messages);
        console.log("====================================");
    };
    
    loadMore = () => {
        if (!this.props.myRooms.isEnd) {
        this.props.fetchAllMessages(this.props.myRooms.page);
        }
    };

    render(){
        console.log(this.state.LoginType);
        console.log(this.state.messages);
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
                    renderItem={this._renderChat}
                    keyExtractor={(index, item)=>item.id + index.toString()}
                    ItemSeparatorComponent={()=><View style={{width:width, height:height*0.001, backgroundColor:COLORS.gray,}}/>}
                    ListEmptyComponent={()=><Text style={{fontSize:width*0.05, color:COLORS.gray, margin:width*0.02}}> {localization.noAvailableData} </Text>}
                />
                }
                {this.state.LoginType=='Customer'&&<Footer />}
            </View>
        )
    }

}


const MapStateToProps = state => {
    return {
        myRooms: state.Chat.Rooms,
        ...state.auth.user,
        LoginType: state.Config.userType
    };
};
const MapDispatchToProps = dispatch => {
    return {
    fetchAllMessages: page => FetchAllChat(page, dispatch)
    };
};
export default connect(MapStateToProps, MapDispatchToProps)(Chats);
const rtl = I18nManager.isRTL != (localization.getLanguage()=='ar');
const styles = StyleSheet.create({
    container:{
        // justifyContent:'space-between',
        alignItems:'center',
        height:height*0.97,
        width:width,
    },
    texts:{
        justifyContent:'center',
        // alignItems:'center',
        width:width*0.74,
        height:height*0.05,
        marginVertical:width*0.07,
        // backgroundColor:'red',
    },
    bg:{
        position:'absolute',
        height:height*1.5,
        width:width,
        resizeMode:'stretch',
    },
    chatItem:{
        backgroundColor:'rgba(200,200,200,0.2)',
        width:width,
        height:height*0.12,
        flexDirection:I18nManager.isRTL&&rtl?'row':'row-reverse',
        justifyContent:'center',
        alignItems:'flex-start',
    },
    avatar:{
        width:width*0.13,
        height:width*0.13,
        borderRadius:width*0.065,
        // resizeMode:'contain',
        marginVertical:height*0.03,
        marginHorizontal:height*0.01
    },
    name:{
        fontSize:width*0.045,
        color:COLORS.main,
        textAlign:I18nManager.isRTL&&rtl?"left":"right",
        textAlignVertical:'center',
        height:height*0.035
    },
    time:{
        fontSize:width*0.035,
        color:COLORS.gray,
        textAlign:I18nManager.isRTL&&rtl?"left":"right",
        textAlignVertical:'center',
        height:height*0.027
    },
    lastMessage:{
        fontSize:width*0.035,
        color:COLORS.gray,
        textAlign:I18nManager.isRTL&&rtl?"left":"right",
        textAlignVertical:'center',
        height:height*0.027
    },
})
