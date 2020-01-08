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
import { connect } from "react-redux";
import Spinner from "react-native-spinkit";
import { ToggleFav } from "../../Redux/types/Customer";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import axios from 'axios';
import {
    SearchProducts, SearchProdcts
} from "../../Redux/actions/Search";
IconBGW = ({name, size, color})=>{
    return(
        <View style={{backgroundColor:'white', width:width*0.07, height:width*0.07, borderRadius:width*0.035, justifyContent:'center', alignItems:'center'}}>
            <Image source={name} style={{width:size, height:size, resizeMode:'contain'}} />
        </View>
    )
}

class Category extends React.Component{

    constructor(){
        super();
        // this.Search = this.Search.bind(this)
    }

    state = {
        searchText: '',
        loading: false,
        search: {
            data: []
        },
        rtl:I18nManager.isRTL != (localization.getLanguage()=='ar'),
    }

    _toggleFav(item){
        this.props.toggleFav(item);
    }

    onLoadMore(){
        console.log("----------------------------------------------------------------------")
        console.log("End reached and will load more")
        console.log("----------------------------------------------------------------------")
        if(!this.props.searchProducts.isEnd)
            this.props.Search(this.state.searchText, this.props.searchProducts.page);
    }




    _Search = async () => {
        if(!this.state.searchText)return;
        this.props.Search(this.state.searchText, 1);
    };

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

    render(){
        console.log("dataaaaaaaaaaaaaaaaaaaaaaaaa")
        console.log(this.state.search.data)
        console.log("dataaaaaaaaaaaaaaaaaaaaaaaaa")
        return(
            <View style={styles.container}>
                <FlatList
                ListHeaderComponent={
                    <Header search searchOnPress={async()=>{
                        console.log('hi search')
                        this._Search(this.state.searchText);
                        console.log('hi search end')
                    }} 
                    title={localization.home}
                    searchOnChangeText={async(searchText)=>{
                        this.setState({searchText})
                        // if(searchText.length<3)return;
                        console.log('hi search')
                        this._Search(this.state.searchText);
                        console.log('hi search end')
                    }}
                    searchText={this.state.searchText}
                    />
                }
                renderItem={this._renderItem}
                numColumns={2}
                data={this.props.searchProducts.data}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={()=><Text style={{fontSize:width*0.05, color:COLORS.gray, margin:width*0.02}}> {localization.noAvailableData} </Text>}

                onEndReached={()=>this.onLoadMore()}
                onEndReachedThreshold={1.0}
                onRefresh={()=>{
                    this.props.Search(this.state.searchText, 1)
                }}
                refreshing={this.props.searchProducts.loading}
                contentContainerStyle={{justifyContent:'center', alignItems:'center'}}
                />

                {(this.props.searchProducts.loadMoreLoading)  &&
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
            </View>
        )
    }
}

export default connect(
    state => {
      return {
        counts: state.Customer.counts,
        user: state.auth.user,
        favs: state.FAV.fav,
        type: state.Config.userType,
        searchProducts: state.search.searchProducts,
      };
    },
    dispatch => {
      return {
        toggleFav: item => dispatch({ type: ToggleFav, payload: item }),
        Search: (searchText, page)=>SearchProdcts(searchText, page, dispatch),
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