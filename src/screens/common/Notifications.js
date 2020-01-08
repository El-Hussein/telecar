import React from 'react';

import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Platform,
    I18nManager,
    FlatList
} from 'react-native';
import { IMAGES, height, width, COLORS, moderateScale, baseUrl } from '../../config';
import localization from '../../localization/localization';
import  Icon from 'react-native-vector-icons/FontAwesome5';
import Header from '../../Components/HeaderNew';
import Footer from '../../Components/FooterNew';
import { GetNotifications } from "../../Redux/actions/Customer";
import Axios from "axios";
import Moment from "moment";  
import "moment/locale/ar-sa";
import Spinner from "react-native-spinkit";

class Chats extends React.Component{

    constructor(){
        super();
        this.state={
            chats:[
                {id:1,name:'New Offer on washing cars reaches 50%', image:IMAGES.slider1, time:'from 2 mins', lastMessage:"this is test message and i need it to be very very long to truncate it and show points in the end of the size"},
                {id:2,name:'New Offer on washing cars reaches 50%', image:IMAGES.slider3, time:'from 2 mins', lastMessage:"this is test message and i need it to be very very long to truncate it and show points in the end of the size"},
                {id:3,name:'New Offer on washing cars reaches 50%', image:IMAGES.slider3, time:'from 2 mins', lastMessage:"this is test message and i need it to be very very long to truncate it and show points in the end of the size"},
                {id:4,name:'New Offer on washing cars reaches 50%', image:IMAGES.slider3, time:'from 2 mins', lastMessage:"this is test message and i need it to be very very long to truncate it and show points in the end of the size"},
                {id:5,name:'New Offer on washing cars reaches 50%', image:IMAGES.slider3, time:'from 2 mins', lastMessage:"this is test message and i need it to be very very long to truncate it and show points in the end of the size"},
                {id:6,name:'New Offer on washing cars reaches 50%', image:IMAGES.slider3, time:'from 2 mins', lastMessage:"this is test message and i need it to be very very long to truncate it and show points in the end of the size"},
                {id:7,name:'New Offer on washing cars reaches 50%', image:IMAGES.slider3, time:'from 2 mins', lastMessage:"this is test message and i need it to be very very long to truncate it and show points in the end of the size"},
                {id:8,name:'New Offer on washing cars reaches 50%', image:IMAGES.slider3, time:'from 2 mins', lastMessage:"this is test message and i need it to be very very long to truncate it and show points in the end of the size"},
                {id:9,name:'New Offer on washing cars reaches 50%', image:IMAGES.slider3, time:'from 2 mins', lastMessage:"this is test message and i need it to be very very long to truncate it and show points in the end of the size"},
                {id:10,name:'New Offer on washing cars reaches 50%', image:IMAGES.slider3, time:'from 2 mins', lastMessage:"this is test message and i need it to be very very long to truncate it and show points in the end of the size"},
                {id:11,name:'New Offer on washing cars reaches 50%', image:IMAGES.slider3, time:'from 2 mins', lastMessage:"this is test message and i need it to be very very long to truncate it and show points in the end of the size"},
                {id:12,name:'New Offer on washing cars reaches 50%', image:IMAGES.slider3, time:'from 2 mins', lastMessage:"this is test message and i need it to be very very long to truncate it and show points in the end of the size"},
                {id:13,name:'New Offer on washing cars reaches 50%', image:IMAGES.slider3, time:'from 2 mins', lastMessage:"this is test message and i need it to be very very long to truncate it and show points in the end of the size"},
                {id:14,name:'New Offer on washing cars reaches 50%', image:IMAGES.slider3, time:'from 2 mins', lastMessage:"this is test message and i need it to be very very long to truncate it and show points in the end of the size"},
            ],
            rtl:I18nManager.isRTL != (localization.getLanguage()=='ar'),
            Notifications: [],
            loading: true
        }
    }

    async _read(id){
        console.log("NOTIFICATION ID >>>>>>>>>>")
        console.log(baseUrl + 'api/users/notifications/read/' + id)
        await Axios.get(
            baseUrl + 'api/users/notifications/read/' + id,
        ).then((res)=>{
            this.setState({loading:true})
            console.log("=======DONE SENT?=============================");
            console.log(res);
            console.log("====================================");
            GetNotifications().then(res => {
                this.setState({ Notifications: res, loading: false });
            }); 
        }).catch((err)=>{
            console.log("=======not SENT!!=============================");
            console.log(err);
            console.log("====================================");
        });
    }

    _renderChat=({item})=>{
        return(
            <TouchableOpacity onPress={()=>{
                if(item.message=="NewOffer"){
                    this.props.navigation.navigate('Product', {item:item.product[0]})
                }else{
                    this.props.navigation.navigate("Chats")
                }
            }} style={styles.chatItem}>
                {/* <Image source={item.image} style={styles.avatar}/> */}
                <View style={styles.texts}>
                    <Text style={styles.name}> {item.message} </Text> 
                    <Text style={styles.time}> {Moment(Number(item.timestamp)).format('YYYY-MM-DD HH:mm A')} </Text>
                    <Text style={styles.lastMessage} numberOfLines={3}> {item.subtitle} </Text> 
                </View>
                <TouchableOpacity onPress={()=>this._read(item.id)} style={{backgroundColor:COLORS.main, width:width*0.04, justifyContent:'center', alignItems:'center', height:width*0.04, borderRadius:width*0.02, margin:width*0.02}}>
                    <Text style={{color:COLORS.white, fontSize:width*0.03}}>X</Text>
                </TouchableOpacity>
                {/* <Icon style={{margin:width*0.02}} name="trash-alt" size={width*0.05} color={COLORS.main}/> */}
            </TouchableOpacity>
        )
    }

    componentDidMount() {
        GetNotifications().then(res => {
          this.setState({ Notifications: res, loading: false });
        }); 
    }

    render(){
        console.log("NOTIFICATIONS FROM BACK END ARE")
        console.log(this.state.Notifications)
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
                ) :<FlatList
                    data={this.state.Notifications}
                    renderItem={this._renderChat} 
                    keyExtractor={(index, item)=>item.id + index.toString()}
                    ItemSeparatorComponent={()=><View style={{width:width, height:height*0.001, backgroundColor:COLORS.gray,}}/>}
                    ListEmptyComponent={()=><Text style={{fontSize:width*0.05, color:COLORS.gray, margin:width*0.02}}> {localization.noAvailableData} </Text>}
                /> }             
                <Footer />
            </View>
        )
    }

}

export default Chats;
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
        // width:width*0.88,
        height:height*0.13,
        marginTop:width*0.02,
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
        // backgroundColor:'red',
        height:height*0.1,
        flexDirection:rtl?'row':'row-reverse',
        justifyContent:'space-between',
        paddingHorizontal:width*0.02,
        alignItems:'flex-start',
    },
    avatar:{
        width:width*0.3,
        height:width*0.25,
        borderRadius:width*0.02,
        // resizeMode:'contain',
        marginVertical:height*0.01,
        marginHorizontal:height*0.01
    },
    name:{
        fontSize:width*0.045,
        color:COLORS.main,
        // textAlign:'center',
        // textAlign:'right',
        textAlignVertical:'center',
        height:height*0.03
    },
    time:{
        fontSize:width*0.032,
        color:COLORS.gray,
        height:height*0.02,
        // width:width*0.85,
        textAlign:'left',
        textAlignVertical:'center',
        // backgroundColor:'red'
    },
    lastMessage:{
        fontSize:width*0.035,
        color:COLORS.gray,
        // textAlign:'center',
        textAlignVertical:'center',
        height:height*0.085,
        lineHeight:height*0.024
    },
})
