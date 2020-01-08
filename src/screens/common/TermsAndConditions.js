import React from 'react';

import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    I18nManager
} from 'react-native';
import Header from '../../Components/HeaderNew';
import { IMAGES, width, height, COLORS } from '../../config';
import { CheckBox } from 'react-native-elements';
import localization from '../../localization/localization';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Footer from '../../Components/FooterNew';

class TermsAndConditions extends React.Component{
    constructor(){
        super();
        this.state={
            whoAreUS:false,
            OurVision:false,
            OurGoals:false,
            rtl:I18nManager.isRTL != (localization.getLanguage()=='ar'),
        }
    }
    render(){
        return(
            <View style={styles.container}>
                <Image source={IMAGES.bg} style={styles.bg}/>
                <Header />

                <ScrollView contentContainerStyle={{alignItems:'center'}}>
                    <Image source={IMAGES.logo} style={styles.logo} />
                    
                    <View style={{flexDirection:I18nManager.isRTL&&this.state.rtl?'row':'row-reverse'}}>
                        <View>
                            <View style={styles.paymentView}>
                                    <Text style={[styles.text, styles.lineBottom]}> {localization.termsConditions} </Text>
                                    <Text style={[styles.text, {color:COLORS.textGray, fontSize:width*0.04}]}> 
                                        if you select Cash On Deliver , you can pay for your package when our Delivery Associates bring it to your step or when you pick it up at one of our pickup Stations
                                        1) We only accept Egyptian Pound
                                        2)Because our Delivery Agents do not handle petty cash , we would appreciate that you have the exact amount for payment
                                        3)Payment must be made before unsealing an electronic item such as a phone or laptop. Once the seal is broken the item can only be returned or rejected if it is damaged
                                        ,defective or has missing parts. if you change your mind, an unsealed item con no longer be returned
                                    </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <Footer />
            </View>
        )
    }
}

export default TermsAndConditions;
const rtl = I18nManager.isRTL != (localization.getLanguage()=='ar');
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
    },
    lineBottom:{
        borderBottomColor:COLORS.gray,
        borderBottomWidth:width*0.0015
    },
    logo:{
        width:width*0.5,
        height:height*0.3,
        resizeMode:'contain',
        marginVertical:height*0.03,
    },
    bg:{
        resizeMode:'stretch',
        width:width,
        height:height*2,
        position:'absolute',
        zIndex:-1,
        top:height*-0.08
    },
    lineDoted:{
        borderWidth:1,
        borderColor:COLORS.gray,
        borderStyle:'dotted',
        borderRadius:1   
    },
    paymentView:{
        backgroundColor:COLORS.white,
        marginBottom:width*0.05
        // marginHorizontal:width*0.1,
        // marginVertical:width*0.02,
        // padding:width*0.02,
    },
    text:{
        color :COLORS.main,
        fontSize: width*0.055,
        // fontWeight:'bold',
        width:width*0.93,
        padding:width*0.02,
        // textAlign:'left',
    },
})