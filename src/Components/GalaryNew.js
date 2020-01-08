import React from 'react';

import {
    StyleSheet,
    View,
    Text,
    Image,
    StatusBar,
    TextInput
} from 'react-native';
import localization from '../localization/localization';
import { width, height, COLORS, IMAGES } from '../config';
import Icon from "react-native-vector-icons/FontAwesome5";
import Swiper from 'react-native-swiper';

const MyText = (text, style)=>{
    return(
        <Text style={[style, styles.text]}> </Text>
    )
}

const Slider = props => ( <View style={[{alignItems:'center', width:width, justifyContent:'center'}]}>
        <Image style={{height:height*0.25, width:width*0.94, borderRadius:width*0.02}} source={props.uri} resizeMode="stretch"/>
    </View>
)

class Galary extends React.Component{
    render(){
        let notificationCount = 4;
        return(
            <View style={[{height:height*0.25, width:width}, this.props.style]}>
                <Swiper
                // showsButtons={true}
                showsPagination={false}
                // buttonWrapperStyle={{top:hp('-4.5%')}}
                // nextButton={<Image style={{width:wp('5%'), height:wp('5%'), resizeMode:'contain'}} source={require('../../src/Image/Artboard13/next.png')} />}
                // prevButton={<Image style={{width:wp('5%'), height:wp('5%'), resizeMode:'contain'}} source={require('../../src/Image/Artboard13/prev.png')} />}
                autoplay={true}
                // style={{width:width*0.94}}
                > 
                {
                    this.props.images.map((item, i) => <Slider 
                        uri={item}
                        key={i}
                    />)
                }
                </Swiper>
            </View>
        )
    }
}

export default Galary;

const styles = StyleSheet.create({
    header:{
        height:height*0.18,
        justifyContent:'flex-start',
        alignItems:'center',
        width:width,
        backgroundColor:COLORS.main,
        paddingHorizontal:width*0.03,
    },
    headerTop:{ 
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        height: height*0.07,
        width:width*0.94,
        // backgroundColor:'red'
    },
    headerBottom:{
        flexDirection:'row',
        width:width*0.94,
        justifyContent:'space-between',
        alignItems:'center',
        height: height*0.05,
        borderBottomWidth:width*0.0015,
        borderColor:COLORS.white,
    },
    text:{
        color:COLORS.white,
        fontSize:width*0.035,    
    },
    icon:{
        width:width*0.05,
        height:width*0.05,
        resizeMode:'contain',
        backgroundColor:'red',
    },
    notificationCount:{
        backgroundColor: COLORS.notifyColor,
        width:width*0.05,
        height:width*0.05,
        borderRadius:width*0.03,
        color: COLORS.white,
        fontSize:width*0.027,
        textAlign:'center',
        textAlignVertical:'center',
        padding:0,
        position:'absolute', 
        top:width*-0.03,
        right: width*0.04
    },
    textInput:{
        color:COLORS.white,
        fontSize:width*0.04,
    },
})