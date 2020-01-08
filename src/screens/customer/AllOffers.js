import React from 'react';

import {
    StyleSheet,
    View,
    Text,
    FlatList,
    Image,
    ScrollView,
    I18nManager,
} from 'react-native';
import localization from '../../localization/localization';
import Header from '../../Components/HeaderNew';
import Footer from '../../Components/FooterNew';
import Galary from '../../Components/GalaryNew';
import { IMAGES, height, width, COLORS } from '../../config';
import Icon from "react-native-vector-icons/FontAwesome5";
import { connect } from "react-redux";
import { ToggleFav, Reset_BEST_OFFERS } from "../../Redux/types/Customer";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
    getMyOrdersCount,
    GetBESTOFFERS,
} from "../../Redux/actions/Customer";
import Spinner from "react-native-spinkit";

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
            {image:IMAGES.slider1, price:300, descount:30, nor:100, details:'بعض البيانات توضع هنا كوصف خفيف للمنتج وايضا يتم حذف الكلام الزيادة', name:'الطلبات المستلمة'},
            {image:IMAGES.slider2, price:300, descount:30, nor:100, details:'بعض البيانات توضع هنا كوصف خفيف للمنتج وايضا يتم حذف الكلام الزيادة', name:'المنتجات المضافة'},
            {image:IMAGES.slider3, price:300, descount:30, nor:100, details:'بعض البيانات توضع هنا كوصف خفيف للمنتج وايضا يتم حذف الكلام الزيادة', name:'الرسائل المتلمة'},
            {image:IMAGES.slider2, price:300, descount:30, nor:100, details:'بعض البيانات توضع هنا كوصف خفيف للمنتج وايضا يتم حذف الكلام الزيادة', name:'الاشعارات المتسلمة'},
            {image:IMAGES.slider1, price:300, descount:30, nor:100, details:'بعض البيانات توضع هنا كوصف خفيف للمنتج وايضا يتم حذف الكلام الزيادة', name:'الرسائل المتلمة'},
            {image:IMAGES.slider3, price:300, descount:30, nor:100, details:'بعض البيانات توضع هنا كوصف خفيف للمنتج وايضا يتم حذف الكلام الزيادة', name:'الاشعارات المتسلمة'},
        ],
        itemsCat:[
            {image:IMAGES.addedProducts, number:100, text:'المنتجات المضافة'},
            {image:IMAGES.revievedMesseges, number:90, text:'الرسائل المتلمة'},
            {image:IMAGES.recievedNotifications, number:150, text:'الاشعارات المتسلمة'},
        ],
        // BestOffers: {
        //     loading: true,
        //     data: []
        // },
        filterData:null,
        rtl:I18nManager.isRTL != (localization.getLanguage()=='ar'),
    }

    _toggleFav(item){
        
        this.props.toggleFav(item);
        // console.log("what happened????")
        // console.log(this.props.favs)
        // console.log("what happened????")

    }

    _renderItem=({item})=>{
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

    componentDidMount() {
        // this.props.GetBestOffers(this.props.bestOffers.page)
        // .then(res => {
        //     console.log("hiii ........................................................")
        //     console.log(res)
        //   this.setState({ BestOffers: { loading: false, data: [...res] }, alldata:res });
        // });
    }

    onLoadMore(){
        console.log("----------------------------------------------------------------------")
        console.log("End reached and will load more")
        console.log("----------------------------------------------------------------------")
        if(!this.props.bestOffers.isEnd)
            this.props.GetBestOffers(this.props.bestOffers.page);
    }

    render(){
        let categories = [{id:0, name:localization.allcategories},...this.props.cats];
        return(
            <View style={styles.container}>
                {/* <Image style={{width:width, height:height*2, resizeMode:'stretch', position:'absolute', zIndex:-5}} source={IMAGES.bg}/>  */}
                <Header title={localization.home}/>
                <View style={{justifyContent:'space-between', paddingHorizontal:width*0.03, flexDirection:'row', backgroundColor:'rgba(220,220,220,0.3)', width:width, height:height*0.05, alignItems:'center'}}>
                    {/* <Image source={IMAGES.filter} style={{width:width*0.09, height:width*0.1, resizeMode:'contain',}}/> */}
                    <View style={{width:width*0.94, justifyContent:'center', alignItems:'center', height:height*0.05, flexDirection:'row',marginTop:width*0.02}}>
                        <Menu onSelect={(data)=>{
                            this.setState({
                                department:data.name,
                                filterData: this.props.bestOffers.data.filter((product)=>product.category_id == data.id),
                            })
                            console.log('selected department is : ' + data);
                        }} style={{width:width*0.94, borderWidth:width*0.002, height:width*0.07, marginBottom:width*0.02, justifyContent:'center', borderColor:COLORS.main}}>
                            <MenuTrigger  text={this.state.department?this.state.department:localization.searchAllCategories} customStyles={{triggerText:{color:COLORS.main, paddingHorizontal:width*0.02, textAlign:'left'}}}/>
                            <MenuOptions customStyles={{optionText:{color:COLORS.main},optionsContainer:{width:width*0.94, margin:width*0.03, marginTop:height*0.036, backgroundColor:'rgba(238,238,238,1)'}}}>
                                {categories.map((item)=>{
                                    // console.log("data from menu : " + JSON.stringify(item));
                                    return (
                                        <MenuOption value={item} customStyles={{width:width*0.94}} text={item.name} />
                                )})}
                            </MenuOptions>
                        </Menu>
                        <Image source={IMAGES.downArrow} style={{width:width*0.06, height:width*0.06, resizeMode:'contain', position:'absolute', right:width*0.02, top:width*0.01}}/>
                    </View>
                </View>
                {/* <ScrollView contentContainerStyle={{justifyContent:'center', alignItems:'center'}}> */}
                <FlatList
                    renderItem={this._renderItem}
                    numColumns={2}
                    onEndReached={()=>this.onLoadMore()}
                    onEndReachedThreshold={1.0}
                    onRefresh={()=>{
                        this.props.GetBestOffers(1);
                        this.setState({
                            filterData:null,
                            department:null,
                        })
                    }}
                    refreshing={this.props.bestOffers.loading}
                    data={this.state.filterData?this.state.filterData:this.props.bestOffers.data}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={()=><Text style={{fontSize:width*0.05, color:COLORS.gray, margin:width*0.02}}> {localization.noAvailableData} </Text>}
                    />
                    
                    {(this.props.bestOffers.loadMoreLoading || this.props.bestOffers.loading)  &&
                        (
                            <Spinner
                                style={{
                                    justifyContent: "center",
                                    alignSelf: "center",
                                    alignItems: "center",
                                }}
                                isVisible={true}
                                type="Circle"
                                color={COLORS.main}
                            />
                        )
                    }
                    <Footer />
                {/* </ScrollView> */}
                {/* </ScrollView> */}
            </View>
        )
    }
}

export default connect(
    state => {
      return {
        favs: state.FAV.fav,
        cats: state.Config.categories,
        bestOffers: state.product.bestOffers,
      };
    },
    dispatch => {
      return {
        toggleFav: item => dispatch({ type: ToggleFav, payload: item }),
        resetBestOffers: () => dispatch({ type: Reset_BEST_OFFERS }),
        GetBestOffers: (page)=>GetBESTOFFERS(page, dispatch),
      };
    }
)(Home);

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'space-between',
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