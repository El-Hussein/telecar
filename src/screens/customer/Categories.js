import React from 'react';

import {
    StyleSheet,
    View,
    Text,
    FlatList,
    Image,
    ScrollView,
    TouchableOpacity,
    I18nManager
} from 'react-native';
import localization from '../../localization/localization';
import Header from '../../Components/HeaderNew';
import Footer from '../../Components/FooterNew';
import Galary from '../../Components/GalaryNew';
import Spinner from "react-native-spinkit";

import { IMAGES, height, width, COLORS, baseUrl } from '../../config';
import Icon from "react-native-vector-icons/FontAwesome5";

import {
    getMyOrdersCount,
    GetBESTOFFERS,
} from "../../Redux/actions/Customer";
import { ToggleFav } from "../../Redux/types/Customer";
import { connect } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";

IconBGW = ({name, size, color})=>{
    return(
        <View style={{backgroundColor:'white', width:width*0.07, height:width*0.07, borderRadius:width*0.035, justifyContent:'center', alignItems:'center'}}>
            <Image source={name} style={{width:size, height:size, resizeMode:'contain'}} />
        </View>
    )
}



class Home extends React.Component{

    state = {
        sliderImages:[
            IMAGES.slider1,
            IMAGES.slider2,
            IMAGES.slider3,
        ],
        items:[
            {image:IMAGES.slider1, id:"5454asd4as5d5", salary:300, offer:30, views:100, details:'بعض البيانات توضع هنا كوصف خفيف للمنتج وايضا يتم حذف الكلام الزيادة', name:'الطلبات المستلمة'},
            {image:IMAGES.slider2, id:"5454asd4as5d9", salary:300, offer:30, views:100, details:'بعض البيانات توضع هنا كوصف خفيف للمنتج وايضا يتم حذف الكلام الزيادة', name:'المنتجات المضافة'},
            {image:IMAGES.slider3, id:"5454asd4as5d7", salary:300, offer:30, views:100, details:'بعض البيانات توضع هنا كوصف خفيف للمنتج وايضا يتم حذف الكلام الزيادة', name:'الرسائل المتلمة'},
            {image:IMAGES.slider2, id:"5454asd4as5d1", salary:300, offer:30, views:100, details:'بعض البيانات توضع هنا كوصف خفيف للمنتج وايضا يتم حذف الكلام الزيادة', name:'الاشعارات المتسلمة'},
            {image:IMAGES.slider1, id:"5454asd4as5d2", salary:300, offer:30, views:100, details:'بعض البيانات توضع هنا كوصف خفيف للمنتج وايضا يتم حذف الكلام الزيادة', name:'الرسائل المتلمة'},
            {image:IMAGES.slider3, id:"5454asd4as5d4", salary:300, offer:30, views:100, details:'بعض البيانات توضع هنا كوصف خفيف للمنتج وايضا يتم حذف الكلام الزيادة', name:'الاشعارات المتسلمة'},
        ],
        itemsCat:[
            {image:IMAGES.addedProducts, number:100, text:'المنتجات المضافة'},
            {image:IMAGES.revievedMesseges, number:90, text:'الرسائل المتلمة'},
            {image:IMAGES.recievedNotifications, number:150, text:'الاشعارات المتسلمة'},
        ],
        BestOffers: {
            loading: true,
            data: []
        },
        rtl:I18nManager.isRTL != (localization.getLanguage()=='ar'),
    }

    componentDidMount() {
        GetBESTOFFERS().then(res => {
            console.log("hiii ........................................................")
            console.log(res)
          this.setState({ BestOffers: { loading: false, data: [...res] } });
        });
    }

    _renderItemCat=({item})=>{
        // console.log(item.image.img_url)
        return(
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Category', { item })} style={styles.itemCat}>
                {/* <Image source={item.image} style={styles.imageCat}/> */}
                <Image source={{uri:item.image?item.image.img_url:''}} style={styles.imageCat}/>
                <Text style={[styles.textCat, {fontSize:width*0.03, fontWeight:'normal'}]}> {item.name} </Text>
            </TouchableOpacity>
        )
    }

   


    render(){
        console.log("HEEEEEEEEEEEEEEEEEEEEEEY CAAAAAAATS")
        console.log(this.props.cats);
        return(
            <View style={styles.container}>
                {/* <Image style={{width:width, height:height*2, resizeMode:'stretch', position:'absolute', zIndex:-5}} source={IMAGES.bg}/>  */}
                <ScrollView contentContainerStyle={{justifyContent:'center', alignItems:'center'}}>
                    <Header title={localization.home}/>
                    <Galary images={this.state.sliderImages} style={{position:'relative', top:height*-0.04, zIndex:5, elevation:5}}/>
                    <FlatList
                        renderItem={this._renderItemCat.bind(this)}
                        numColumns={3}
                        // data={this.state.itemsCat}
                        data={[...this.props.cats]}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={()=><Text style={{fontSize:width*0.05, color:COLORS.gray, margin:width*0.02}}> {localization.noAvailableData} </Text>}
                        contentContainerStyle={{ justifyContent:'center', alignItems:'center',}}
                        style={{marginBottom:width*0.05, width:width, borderBottomColor:COLORS.white, borderBottomWidth:width*0.002}}
                        />

                </ScrollView>
                <Footer />
            </View>
        )
    }
}

export default connect(
  state => {
    return {
      counts: state.Customer.counts,
      user: state.auth.user,
      type: state.Config.userType,
      favs: state.FAV.fav,
      cats: state.Config.categories
    };
  },
//   dispatch => {
//     return { 
//         getCounts: () => getMyOrdersCount(dispatch),
//         toggleFav: item => dispatch({ type: ToggleFav, payload: item })
//     };
//   }
)(Home);
 
const styles = StyleSheet.create({
    container:{
        flex:1,
        // justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'rgba(240,240,240,0.8)'
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
        fontSize:width*0.05,
        color:COLORS.secondary,
        fontWeight:'bold',
        height:width*0.07,
        textAlign:'center',
        textAlignVertical:'center',
    },
    imageCat:{
        width:width*0.28,
        height:width*0.18,
        borderTopLeftRadius:width*0.03,
        borderTopRightRadius:width*0.03,
        resizeMode:'cover',
    },
    itemCat:{
        justifyContent:'space-between',
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