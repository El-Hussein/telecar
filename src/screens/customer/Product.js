import React from 'react';

import {
    StyleSheet,
    View,
    Text,
    FlatList,
    Image,
    ScrollView,
    I18nManager,
    TouchableOpacity,
    Linking,
    Platform,
    TouchableWithoutFeedback
} from 'react-native';
import localization from '../../localization/localization';
import Header from '../../Components/HeaderNew';
import Footer from '../../Components/FooterNew';
import Galary from '../../Components/GalaryNew';
import { IMAGES, height, width, COLORS, verticalScale } from '../../config';
import Icon from "react-native-vector-icons/FontAwesome5";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { RFValue } from "react-native-responsive-fontsize";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Store from "../../Redux/index";
import { connect } from "react-redux";
import { ToggleFav } from "../../Redux/types/Customer";


IconBGW = ({name, size, color})=>{
    return(
        <View style={{backgroundColor:'white', width:width*0.07, height:width*0.07, borderRadius:width*0.035, justifyContent:'center', alignItems:'center'}}>
            <Image source={name} style={{width:size, height:size, resizeMode:'contain'}} />
        </View>
    )
}

const openMapsApp = (lat, lng, label) => {
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

const openWhatsApp = url => {
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
};

export const callNumber = phone => {
    console.log('callNumber ----> ', phone);
    let phoneNumber = phone;
    if (Platform.OS !== 'android') {
        phoneNumber = `telprompt:${phone}`;
    }else  {
        phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
    .then(supported => {
        if (!supported) {
            console.log('Phone number is not available');
        } else {
            return Linking.openURL(phoneNumber);
        }
    })
    .catch(err => console.log(err));
};

class Home extends React.Component{

    state = {
        sliderImages:[
            IMAGES.slider1,
            IMAGES.slider2,
            IMAGES.slider3,
        ],
        items:[
            {image:IMAGES.slider1, price:300, descount:30, nor:100, descriptoin:'بعض البيانات توضع هنا كوصف خفيف للمنتج وايضا يتم حذف الكلام الزيادة', name:'الطلبات المستلمة'},
            {image:IMAGES.slider2, price:300, descount:30, nor:100, descriptoin:'بعض البيانات توضع هنا كوصف خفيف للمنتج وايضا يتم حذف الكلام الزيادة', name:'المنتجات المضافة'},
            {image:IMAGES.slider3, price:300, descount:30, nor:100, descriptoin:'بعض البيانات توضع هنا كوصف خفيف للمنتج وايضا يتم حذف الكلام الزيادة', name:'الرسائل المتلمة'},
            {image:IMAGES.slider2, price:300, descount:30, nor:100, descriptoin:'بعض البيانات توضع هنا كوصف خفيف للمنتج وايضا يتم حذف الكلام الزيادة', name:'الاشعارات المتسلمة'},
            {image:IMAGES.slider1, price:300, descount:30, nor:100, descriptoin:'بعض البيانات توضع هنا كوصف خفيف للمنتج وايضا يتم حذف الكلام الزيادة', name:'الرسائل المتلمة'},
            {image:IMAGES.slider3, price:300, descount:30, nor:100, descriptoin:'بعض البيانات توضع هنا كوصف خفيف للمنتج وايضا يتم حذف الكلام الزيادة', name:'الاشعارات المتسلمة'},
        ],
        itemsCat:[
            {image:IMAGES.addedProducts, number:100, text:'المنتجات المضافة'},
            {image:IMAGES.revievedMesseges, number:90, text:'الرسائل المتلمة'},
            {image:IMAGES.recievedNotifications, number:150, text:'الاشعارات المتسلمة'},
        ],
        product:this.props.navigation.state.params.item,
        rtl:I18nManager.isRTL != (localization.getLanguage()=='ar'),
    }

    _toggleFav(item){
        
        this.props.toggleFav(item);
        // console.log("what happened????")
        // console.log(this.props.favs)
        // console.log("what happened????")

    }

    render(){
        user_id = this.state.product.user_id;
        let lat = 37.78825;
        let long = -122.4324;
        if (user_id) {
            lat = this.state.product.lat ? parseFloat(this.state.product.lat) : lat;
            long = this.state.product.lan ? parseFloat(this.state.product.lan) : long;
        }
        console.log(this.state.product, lat, long)
        return(
            <View style={styles.container}>
                <Image style={{width:width, height:height*1.5, resizeMode:'stretch', position:'absolute', zIndex:-5}} source={IMAGES.bg}/> 
                <ScrollView contentContainerStyle={{width:width}}>
                <Header title={localization.home}/>
                <Galary images={this.state.sliderImages} style={{position:'relative', top:height*-0.04, zIndex:5, elevation:5}}/>
                <View style={{width:width*0.96, backgroundColor:'rgba(255,255,255,0.6)', marginHorizontal:width*0.02}}>
                    <Text style={{color:COLORS.main, paddingHorizontal:width*0.02, textAlign:'left', fontSize:width*0.04, fontWeight:'bold'}}> {this.state.product.name} </Text>
                    <Text style={{color:COLORS.gray, paddingHorizontal:width*0.02, width:width*0.96, textAlign:'left', fontSize:width*0.03, fontWeight:'bold'}}> {this.state.product.created_at} </Text>
                    <View style={{width:'100%', height:height*0.0007, backgroundColor:COLORS.gray}}/>
                    <Text style={{color:COLORS.gray, paddingHorizontal:width*0.02, width:width*0.96, textAlign:'left', minHeight:height*0.1, paddingVertical:width*0.02, fontSize:width*0.035, fontWeight:'bold'}}> {this.state.product.details} </Text>
                </View>

                <View style={{borderWidth:width*0.001, flexDirection:!this.state.rtl?'row':'row-reverse', height:height*0.06, marginHorizontal:width*0.02, marginVertical:width*0.05, borderColor:COLORS.gray}}>
                    <TouchableOpacity onPress={()=>openWhatsApp(`whatsapp://send?phone=${this.state.product.whats_number}&text=${this.state.product.name}`)} style={{width:width*0.245, justifyContent:'center', alignItems:'center', borderLeftWidth:width*0.001, borderLeftColor:COLORS.gray}}>
                        <Image source={IMAGES.whatsup} style={{width:width*0.1, height:width*0.1, resizeMode:'contain'}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>callNumber(this.state.product.user.phone)} style={{width:width*0.245, justifyContent:'center', alignItems:'center', borderLeftWidth:width*0.001, borderLeftColor:COLORS.gray}}>
                        <Image source={IMAGES.phone} style={{width:width*0.1, height:width*0.1, resizeMode:'contain'}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{
                        if(this.props.user)
                            this.props.navigation.navigate('Chat', { productId: this.state.product.id, name:this.state.product.user.name, id:this.state.product.user.id })
                        else{
                            const AlertMessage = Store.getState().Config.alert;
                            AlertMessage("error", "خطـأ", "يجب تسجيل الدخول اولا");
                        }
                    
                    }} style={{width:width*0.245, justifyContent:'center', alignItems:'center', borderLeftWidth:width*0.001, borderLeftColor:COLORS.gray}}>
                        
                        <Image source={IMAGES.messege} style={{width:width*0.1, height:width*0.1, resizeMode:'contain'}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this._toggleFav(this.state.product)} style={{width:width*0.245, justifyContent:'center', alignItems:'center', borderLeftWidth:width*0.001, borderLeftColor:COLORS.gray}}>
                        <FontAwesome name="heart" size={width*0.1} color={
                            this.props.favs.map(i => i.id).indexOf(this.state.product.id) > -1
                            ? 'red'
                            : COLORS.main
                        }/>
                        {/* <Image source={IMAGES.heart} style={{width:width*0.1, height:width*0.1, resizeMode:'contain'}}/> */}
                    </TouchableOpacity>
                </View>

                <TouchableWithoutFeedback
                    onPress={()=>openMapsApp(lat, long, this.state.product.name)}
                    style={{
                        width: "100%",
                        height: height * 0.3,
                        marginBottom:width*0.12
                    }}
                    >
                    {/* <Text
                        style={styles.locationText}
                        adjustsFontSizeToFit
                        allowFontScaling
                    >
                        {localization.location}
                    </Text> */}
                    <MapView
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={{
                            height:height*0.3,
                            backgroundColor: COLORS.BackGround,
                            marginBottom: verticalScale(20),
                            marginHorizontal:width*0.03
                        }}
                        region={{
                            latitude: lat ? lat : 0.0,
                            longitude: long ? long : 0.0,
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121
                        }}
                        scrollEnabled={false}
                    >
                        {lat && long && (
                        <Marker
                            coordinate={{
                            latitude: lat,
                            longitude: long
                            }}
                        >
                            <View
                            style={{ justifyContent: "center", alignItems: "center" }}
                            >
                            <Text style={{ color: COLORS.white, backgroundColor:COLORS.main, borderRadius:width*0.02, paddingHorizontal:width*0.02, fontSize: RFValue(14) }}>
                                {this.state.product.name}
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
                </TouchableWithoutFeedback>
                <Footer />
                </ScrollView>
            </View>
        )
    }
}

export default connect(
    state => {
      return {
        favs: state.FAV.fav,
        user: state.auth.user
      };
    },
    dispatch => {
      return {
        toggleFav: item => dispatch({ type: ToggleFav, payload: item })
      };
    }
)(Home);

const styles = StyleSheet.create({
    container:{
        flex:1,
        // justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:COLORS.white
    },
    text:{
        fontSize:width*0.035,
        color:COLORS.main,
        fontWeight:'bold',
        width:width*0.46,
    },
    image:{
        width:width*0.46,
        height:width*0.3,
        // resizeMode:'stretch',
        position:'absolute',
        top:width*0,
        right:width*0,
        // top:width*-0.21,
        // right:width*-0.23,
        borderTopLeftRadius:width*0.03,
        borderTopRightRadius:width*0.03,
    },
    item:{
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:COLORS.white,
        elevation:2,
        marginVertical:width*0.02,
        marginHorizontal:width*0.007,
        width:width*0.465,
        height:width*0.43,
        borderRadius:width*0.03
    },
    textCat:{
        fontSize:width*0.04,
        color:COLORS.secondary,
        fontWeight:'bold',
    },
    imageCat:{
        width:width*0.15,
        height:width*0.15,
        resizeMode:'contain'
    },
    itemCat:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:COLORS.white,
        elevation:3,
        marginVertical:width*0.02,
        marginHorizontal:width*0.02,
        width:width*0.28,
        height:width*0.25,
        borderRadius:width*0.03
    },
    addProductIcon:{
        width:width*0.07,
        height:width*0.07,
        resizeMode:'contain',
    },
    addProduct:{
        width:width*0.12,
        height:width*0.12,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:width*0.06,
        backgroundColor:COLORS.white,
        position:'absolute',
        top:height*0.36,
        elevation:5,
    },
    iconProduct:{
        padding:width*0.01,
        borderRadius:width*0.04,
        backgroundColor:COLORS.white,

    }
})