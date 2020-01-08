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
        console.log("HEEEEEEEEEEEEEEEEEEEEEEY should force rtl")
        // console.log(this.props.cats);
        console.log(this.state.rtl);
        this.props.GetBestOffers(this.props.bestOffers.page)
        // GetBESTOFFERS().then(res => {
        //     // console.log("hiii ........................................................")
        //     // console.log(res)
        //   this.setState({ BestOffers: { loading: false, data: [...res] } });
        // });
    }

    _renderItemCat=({item})=>{
        // console.log(item.image.img_url)
        return(
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Category', { item })} style={styles.itemCat}>
                {/* <Image source={item.image} style={styles.imageCat}/> */}
                <Image source={{uri:item.image.img_url}} style={styles.imageCat}/>
                <Text style={[styles.textCat, {fontSize:width*0.03, fontWeight:'normal'}]}> {item.name} </Text>
            </TouchableOpacity>
        )
    }

    _toggleFav(item){
        
        this.props.toggleFav(item);
        // console.log("what happened????")
        // console.log(this.props.favs)
        // console.log("what happened????")

    }

    _renderItem=({item})=>{
        // console.log('***************FAVOURITES****************')
        // console.log(this.props.favs)
        // console.log('***************FAVOURITES****************')
        
        // console.log('***************ITEM****************')
        // console.log(item)
        // console.log('***************ITEM****************')
        
        // console.log('***************ITEM INDEX****************')
        // console.log(this.props.favs.map(i => i.id).indexOf(item.id))
        // console.log('***************ITEM INDEX****************')

        return(
            <TouchableOpacity onPress={() => this.props.navigation.navigate("Product", { item: item })}  style={styles.item}>
                <Image source={{uri:item.image.img_url}} style={styles.image}/>
                <View style={{height:width*0.3, width:width*0.45, alignItems:this.state.rtl?'flex-start':'flex-end', justifyContent:'space-around'}}>
                    <View style={{width:width*0.45, flexDirection:this.state.rtl?'row-reverse':'row', justifyContent:'space-between'}}>
                        <TouchableOpacity onPress={()=>this._toggleFav(item)}>
                            <View style={{backgroundColor:'white', width:width*0.07, height:width*0.07, borderRadius:width*0.035, justifyContent:'center', alignItems:'center'}}>
                                <FontAwesome name="heart" size={width*0.05} color={
                                    this.props.favs.map(i => i.id).indexOf(item.id) > -1
                                    ? 'red'
                                    : COLORS.main
                                }/>
                            </View>
                        </TouchableOpacity>
                        <View style={{flexDirection:this.state.rtl?'row-reverse':'row', justifyContent:'center', alignItems:'center'}}>
                            <Text style={[ this.state.rtl? localization.getLanguage()=='en'? {borderTopLeftRadius:width*0.03, borderBottomLeftRadius:width*0.03, }:{borderTopRightRadius:width*0.03, borderBottomRightRadius:width*0.03}: !I18nManager.isRTL?{borderTopLeftRadius:width*0.03, borderBottomLeftRadius:width*0.03, }:{borderTopRightRadius:width*0.03, borderBottomRightRadius:width*0.03}, {color:COLORS.main, width:width*0.12, textAlign:'center', textAlignVertical:'center', fontSize:width*0.025, backgroundColor:COLORS.white, paddingHorizontal:width*0.01, position:'relative', right:width*-0.01, height:height*0.025}]}>{item.price}درهم</Text>
                            <IconBGW name={IMAGES.dollar} size={width*0.05} color={COLORS.main}/>
                        </View>
                    </View>
                    <View style={{flexDirection:this.state.rtl?'row-reverse':'row', justifyContent:'center', alignItems:'center'}}>
                        <Text style={[ this.state.rtl? localization.getLanguage()=='en'? {borderTopLeftRadius:width*0.03, borderBottomLeftRadius:width*0.03, }:{borderTopRightRadius:width*0.03, borderBottomRightRadius:width*0.03}: !I18nManager.isRTL?{borderTopLeftRadius:width*0.03, borderBottomLeftRadius:width*0.03, }:{borderTopRightRadius:width*0.03, borderBottomRightRadius:width*0.03}, {color:COLORS.main, width:width*0.12, textAlign:'center', textAlignVertical:'center', fontSize:width*0.025, backgroundColor:COLORS.white, paddingHorizontal:width*0.01, position:'relative', right:width*-0.01, height:height*0.025}]}> {item.discount}% </Text>
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

    onLoadMore(){
        this.props.GetBestOffers(this.props.bestOffers.page);
    }

    render(){
        console.log("HEEEEEEEEEEEEEEEEEEEEEEY should force rtl")
        // // console.log(this.props.cats);
        console.log(this.state.rtl);

        return(
            <View style={styles.container}>
                {/* <Image style={{width:width, height:height*2, resizeMode:'stretch', position:'absolute', zIndex:-5}} source={IMAGES.bg}/>  */}
                <ScrollView contentContainerStyle={{justifyContent:'center', alignItems:'center'}}>
                    <Header title={localization.home}/>
                    <Galary images={this.state.sliderImages} style={{position:'relative', top:height*-0.04, zIndex:5, elevation:5}}/>
                    <View style={{flexDirection:this.state.rtl?'row-reverse':'row', justifyContent:'space-between', alignItems:'center', width:width*0.92}}>
                        <Text style={{fontSize:width*0.05, color:COLORS.secondary}}> {localization.categories} </Text>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Categories')}>
                            <Text style={{fontSize:width*0.035, color:COLORS.main}}> {localization.more} </Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        renderItem={this._renderItemCat.bind(this)}
                        numColumns={3}
                        // data={this.state.itemsCat}
                        data={[...this.props.cats.slice(0,6)]}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={()=><Text style={{fontSize:width*0.05, color:COLORS.gray, margin:width*0.02}}> {localization.noAvailableData} </Text>}
                        contentContainerStyle={{ justifyContent:'center', alignItems:'center',}}
                        style={{height:height*0.35, marginBottom:width*0.05, width:width, borderBottomColor:COLORS.white, borderBottomWidth:width*0.002}}
                        />

                    <View style={{flexDirection:this.state.rtl?'row-reverse':'row', justifyContent:'flex-start', alignItems:'center', width:width*0.9}}>
                        <Image source={IMAGES.bestOffers} style={{width:width*0.09, height:height*0.09, resizeMode:'contain'}}/>
                        <Text style={styles.textCat}> {localization.lastOffers} </Text>
                    </View>

                    {this.props.bestOffers.loading ? (
                        <Spinner
                        style={{
                            marginVertical: width*0.02,
                            justifyContent: "center",
                            alignSelf: "center",
                            alignItems: "center"
                        }}
                        isVisible={true}
                        type="Circle"
                        color={COLORS.main}
                    />):(
                        <FlatList
                        renderItem={this._renderItem}
                        numColumns={2}
                        // data={this.state.items}
                        onEndReached={()=>this.onLoadMore}
                        data={ this.props.bestOffers.data }
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={()=><Text style={{fontSize:width*0.05, color:COLORS.gray, margin:width*0.02}}> {localization.noAvailableData} </Text>}
                        />
                    )}
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
      cats: state.Config.categories,
      bestOffers: state.product.bestOffers,
    };
  },
  dispatch => {
    return { 
        getCounts: () => getMyOrdersCount(dispatch),
        toggleFav: item => dispatch({ type: ToggleFav, payload: item }),
        resetBestOffers: () => dispatch({ type: Reset_BEST_OFFERS }),
        GetBestOffers: (page)=>GetBESTOFFERS(page, dispatch),
    };
  }
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