import React from 'react';

import {
    StyleSheet,
    View,
    Text,
    FlatList,
    Image,
    ScrollView,
    I18nManager,
    TouchableOpacity
} from 'react-native';
import localization from '../../localization/localization';
import Header from '../../Components/HeaderNew';
import Footer from '../../Components/FooterNew';
import Galary from '../../Components/GalaryNew';
import { IMAGES, height, width, COLORS, moderateScale, baseUrl } from '../../config';
import Icon from "react-native-vector-icons/FontAwesome5";
import {
    GetProductsByCatId
} from "../../Redux/actions/Customer";
import { connect } from "react-redux";
import Spinner from "react-native-spinkit";
IconBGW = ({name, size, color})=>{
    return(
        <View style={{backgroundColor:'white', width:width*0.07, height:width*0.07, borderRadius:width*0.035, justifyContent:'center', alignItems:'center'}}>
            <Image source={name} style={{width:size, height:size, resizeMode:'contain'}} />
        </View>
    )
}
import {
    getMyOrdersByStatus,
    getMyProducts,
    deletProduct
  } from "../../Redux/actions/provider";
class Category extends React.Component{

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
        // Category: this.props.navigation.state.params.item,
        loading: true,
        data: [],
        rtl:I18nManager.isRTL != (localization.getLanguage()=='ar'),
    }

    _renderItemCat=({item})=>{
        return(
            <View style={styles.itemCat}>
                <Image source={item.image} style={styles.imageCat}/>
                <Text style={[styles.textCat, {fontSize:width*0.03, fontWeight:'normal'}]}> {item.text} </Text>
            </View>
        )
    }

    componentDidMount() {
        this.FetchProducts();
    }
    FetchProducts = async () => {
        getMyProducts().then(data => {
            console.log("data productsssssssssssssssss")
            console.log(data)
            console.log("data productsssssssssssssssss")
          this.setState({
            data,
            loading: false
          });
        });
      };

    _renderItem=({item})=>{
        return(
            <TouchableOpacity onPress={() => this.props.navigation.navigate("Product", { item: item })}  style={styles.item}>
                <Image source={{uri:item.image?item.image.img_url:''}} style={styles.image}/>
                <View style={{height:width*0.3, width:width*0.45, alignItems:'flex-end', justifyContent:'space-around'}}>
                    <View style={{width:width*0.45, flexDirection:this.state.rtl?'row-reverse':'row', justifyContent:'space-between'}}>
                        <TouchableOpacity 
                        // disabled={this.state.deleteLoading === item._id}
                        onPress={()=>{
                            deletProduct(item.id).then(res => {
                                if (res) {
                                  this.setState({
                                    loading: true
                                  });
                                  this.FetchProducts();
                                }
                              });
                        }}>
                            <IconBGW name={IMAGES.trash} size={width*0.05} color={COLORS.main}/>
                        </TouchableOpacity>
                        
                        <View style={{flexDirection:this.state.rtl?'row-reverse':'row', justifyContent:'center', alignItems:'center'}}>
                            <Text style={[ this.state.rtl? localization.getLanguage()=='en'? {borderTopLeftRadius:width*0.03, borderBottomLeftRadius:width*0.03, }:{borderTopRightRadius:width*0.03, borderBottomRightRadius:width*0.03}: !I18nManager.isRTL?{borderTopLeftRadius:width*0.03, borderBottomLeftRadius:width*0.03, }:{borderTopRightRadius:width*0.03, borderBottomRightRadius:width*0.03}, {color:COLORS.main, width:width*0.12, textAlign:'center', textAlignVertical:'center', fontSize:width*0.025, backgroundColor:COLORS.white, paddingHorizontal:width*0.01, position:'relative', right:width*-0.01, height:height*0.025}]}>{item.price}درهم</Text>
                            <IconBGW name={IMAGES.dollar} size={width*0.05} color={COLORS.main}/>
                        </View>
                    </View>
                    <View style={{flexDirection:this.state.rtl?'row-reverse':'row', justifyContent:'center', alignItems:'center'}}>
                        <Text style={[ this.state.rtl? localization.getLanguage()=='en'? {borderTopLeftRadius:width*0.03, borderBottomLeftRadius:width*0.03, }:{borderTopRightRadius:width*0.03, borderBottomRightRadius:width*0.03}: !I18nManager.isRTL?{borderTopLeftRadius:width*0.03, borderBottomLeftRadius:width*0.03, }:{borderTopRightRadius:width*0.03, borderBottomRightRadius:width*0.03}, {color:COLORS.main, width:width*0.12, textAlign:'center', textAlignVertical:'center', fontSize:width*0.025, backgroundColor:COLORS.white, paddingHorizontal:width*0.01, position:'relative', right:width*-0.01, height:height*0.025}]}> {item.discount} </Text>
                        <IconBGW name={IMAGES.percentage} size={width*0.05} color={COLORS.main}/>
                    </View>
                    <View style={{flexDirection:this.state.rtl?'row-reverse':'row', justifyContent:'center', alignItems:'center'}}>
                        <Text style={[ this.state.rtl? localization.getLanguage()=='en'? {borderTopLeftRadius:width*0.03, borderBottomLeftRadius:width*0.03, }:{borderTopRightRadius:width*0.03, borderBottomRightRadius:width*0.03}: !I18nManager.isRTL?{borderTopLeftRadius:width*0.03, borderBottomLeftRadius:width*0.03, }:{borderTopRightRadius:width*0.03, borderBottomRightRadius:width*0.03}, {color:COLORS.main, width:width*0.12, textAlign:'center', textAlignVertical:'center', fontSize:width*0.025, backgroundColor:COLORS.white, paddingHorizontal:width*0.01, position:'relative', right:width*-0.01, height:height*0.025}]}> {item.num_views} </Text>
                        <IconBGW name={IMAGES.eye} size={width*0.05} color={COLORS.main}/>
                    </View>
                </View>
                <View style={{height:width*0.13}}>
                    <Text style={styles.text}> {item.name} </Text>
                    <Text style={[styles.text, {fontSize:width*0.025, color:COLORS.gray, fontWeight:'normal'}]}> {item.details.length>33?item.details.substr(0,33)+'..':item.details} </Text>
                </View>
            </TouchableOpacity>
        )
    }

    render(){
        console.log(this.state.data);
        return(
            <View style={styles.container}>
                {/* <Image style={{width:width, height:height*2, resizeMode:'stretch', position:'absolute', zIndex:-5}} source={IMAGES.bg}/>  */}
                <ScrollView contentContainerStyle={{justifyContent:'center', alignItems:'center'}}>
                    <Header title={localization.home}/>
                    {/* <Galary images={this.state.sliderImages} style={{position:'relative', top:height*-0.04, zIndex:5, elevation:5}}/> */}

                    {/* <View style={{flexDirection:this.state.rtl?'row-reverse':'row', justifyContent:'center', alignItems:'center', width:width*0.9}}>
                        <Image source={{uri:this.state.Category.image}} style={{width:width*0.09, height:height*0.09, resizeMode:'contain'}}/>
                        <Text style={styles.textCat}> {this.state.Category.name} </Text>
                    </View> */}

                    <FlatList
                        renderItem={this._renderItem}
                        numColumns={2}
                        // data={this.state.items}
                        keyExtractor={(item, index) => `item--${item.id}`}
                        data={this.state.data}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={()=><Text style={{fontSize:width*0.05, color:COLORS.gray, margin:width*0.02}}> {localization.noAvailableData} </Text>}
                        />
                    {this.state.loading && (
                        <Spinner
                        style={{
                            marginVertical: moderateScale(20),
                            justifyContent: "center",
                            alignSelf: "center",
                            alignItems: "center",
                            marginTop: moderateScale(20)
                        }}
                        isVisible={true}
                        type="Circle"
                        color={COLORS.main}
                        />
                    )}
                </ScrollView>
                {/* <Footer /> */}
                {/* </ScrollView> */}
            </View>
        )
    }
}

export default connect(
    state => {
      return {
        counts: state.Customer.counts,
        user: state.auth.user,
        type: state.Config.userType
      };
    }
  )(Category);

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