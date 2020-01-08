import React from 'react';

import {
    StyleSheet,
    View,
    Text,
    FlatList,
    Image,
    I18nManager
} from 'react-native';
import localization from '../../localization/localization';
import Header from '../../Components/HeaderNew';
import Footer from '../../Components/FooterNew';
import Galary from '../../Components/GalaryNew';
import { IMAGES, height, width, COLORS, baseUrl } from '../../config';
import Icon from "react-native-vector-icons/FontAwesome5";
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import { connect } from "react-redux";

class Home extends React.Component{

    state = {
        sliderImages:[
            IMAGES.slider1,
            IMAGES.slider2,
            IMAGES.slider3,
        ],
        items:[
            {image:IMAGES.revievedOrders, navScreen:'AddProduct', number:null, text:localization.AddProduct},
            {image:IMAGES.revievedMesseges, navScreen:'Chat', number:null, text:localization.revievedMesseges},
            {image:IMAGES.addedProducts, navScreen:'Products', number:0, text:localization.myProducts},
            {image:IMAGES.recievedNotifications, navScreen:'Notifications', number:0, text:localization.recievedNotifications},
        ],
        rtl:I18nManager.isRTL != (localization.getLanguage()=='ar'),
        notifications:0,
        products:0,
    }

    _renderItem=({item})=>{
        return(
            <TouchableOpacity onPress={()=>this.props.navigation.navigate(item.navScreen)} style={styles.item}>
                <Image source={item.image} style={styles.image}/>
                <Text style={styles.text}> {item.number} </Text>
                <Text style={[styles.text, {fontSize:width*0.03, fontWeight:'normal'}]}> {item.text} </Text>
            </TouchableOpacity>
        )
    }

    async getNotificationsCount(){
        return await axios
        .get(baseUrl + "api/merchants/notifications/counts/get", {
          headers: { Authorization: 'Bearer ' + this.props.user.token }
        })
        .then(res => {  
            console.log("**************Notifications COUNT**************")
            console.log(res.data.data.count)
            console.log("**************Notifications COUNT**************")
            return res.data.data.count;
        })
        .catch(err => {
            console.log("**************Notifications COUNT ERROR**************")
            console.log(err)
            console.log("**************Notifications COUNT ERROR**************")
          return 0;
        });
    }


    async getProdctsCount(){
        return await axios
        .get(baseUrl + "api/merchants/products/counts/get", {
            headers: { Authorization: 'Bearer ' + this.props.user.token }
        })
        .then(res => {
            console.log("**************PRODUCTS COUNT**************")
            console.log(res.data.data.count)
            console.log("**************PRODUCTS COUNT**************")
            return res.data.data.count;
        })
        .catch(err => {
            console.log("**************PRODUCTS COUNT ERROR**************")
            console.log(err)
            console.log("**************PRODUCTS COUNT ERROR**************")
            return 0;
        });
    }
    
    async componentDidMount(){
        console.log("*************START FETCHING COUNTS*************")
        this.setState({
            items:[
                {image:IMAGES.revievedOrders, navScreen:'AddProduct', number:null, text:localization.AddProduct},
                {image:IMAGES.revievedMesseges, navScreen:'Chat', number:null, text:localization.revievedMesseges},
                {image:IMAGES.addedProducts, navScreen:'Products', number:await this.getProdctsCount(), text:localization.myProducts},
                {image:IMAGES.recievedNotifications, navScreen:'Notifications', number:await this.getNotificationsCount(), text:localization.recievedNotifications},
            ]
        })
    }

    render(){
        return(
            <View style={styles.container}>
                <Image style={{width:width, height:height*1.3, resizeMode:'stretch', position:'absolute', zIndex:-5}} source={IMAGES.bg}/> 
                <Header userType="Merchant" title={localization.home}/>
                {/* <Galary images={this.state.sliderImages} style={{position:'relative', top:height*-0.04}}/> */}
                {/* <ScrollView> */}
                {/* <TouchableOpacity onPress={()=>this.props.navigation.navigate('AddProduct')} style={styles.addProduct}>
                    <Image source={IMAGES.addProduct} style={styles.addProductIcon}/>
                </TouchableOpacity> */}
                <FlatList
                    renderItem={this._renderItem}
                    numColumns={2}
                    data={this.state.items}
                    // extraData={this.state.items}
                    keyExtractor={(index)=>index.toString()}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    style={{marginTop:height*0.15}}
                    ListEmptyComponent={()=><Text style={{fontSize:width*0.05, color:COLORS.gray, margin:width*0.02}}> {localization.noAvailableData} </Text>}
                    />
                {/* <Footer /> */}
                {/* </ScrollView> */}
            </View>
        )
    }
}

export default connect(
    state => {
      return {
        user: state.auth.user,
      };
    }
  )(Home);
const styles = StyleSheet.create({
    container:{
        flex:1,
        // justifyContent:'space-between',
        backgroundColor:COLORS.white,
        alignItems:'center',
    },
    text:{
        fontSize:width*0.04,
        color:COLORS.main,
        fontWeight:'bold',
    },
    image:{
        width:width*0.2,
        height:width*0.2,
        resizeMode:'contain'
    },
    item:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:COLORS.white,
        elevation:3,
        marginVertical:width*0.02,
        marginHorizontal:width*0.007,
        width:width*0.465,
        height:width*0.35,
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
})