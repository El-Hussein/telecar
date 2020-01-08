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
import * as Progress from 'react-native-progress';

class Splash extends React.Component{
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
                <Image source={IMAGES.bg1} style={styles.bg}/>
                <Image source={IMAGES.logo} style={styles.logo} />
                <Text style={styles.text}> 95% </Text>
                <Progress.Bar progress={0.3} width={200} color={COLORS.main}/>


            </View>
        )
    }
}

export default Splash;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
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
        height:height,
        position:'absolute',
        zIndex:-1,
        top:height*-0.08
    },
    text:{
        fontSize:width*0.04,
        color:COLORS.main,
    }
})