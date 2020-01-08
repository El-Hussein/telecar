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
                    
                    <View style={{flexDirection:'row'}}>
                        <View style={styles.lineDoted}>
                        
                        </View>

                        <View>
                            <View style={styles.paymentView}>
                                <Icon name="suitcase" size={width*0.08} color={COLORS.main} style={{position:'absolute', right:width*0.02, top:height*0.01}}/>
                                <View style={styles.radioView}>
                                    <CheckBox
                                    title=' '
                                    checkedIcon='dot-circle-o'
                                    uncheckedIcon='circle-o'
                                    checkedColor={COLORS.main}
                                    checked={this.state.whoAreUS}
                                    uncheckedColor='orange'
                                    onPress={()=>this.setState({whoAreUS:!this.state.whoAreUS})}
                                    containerStyle={{backgroundColor:COLORS.text, flexDirection:!I18nManager.isRTL&&this.state.rtl?'row-reverse':'row', borderWidth:0, padding:0, margin:width*0.02}}
                                    />
                                </View>
                                <View style={styles.textRadioView}>
                                    <Text style={styles.text}> {localization.whoAreUS} </Text>
                                    {this.state.whoAreUS?
                                        <Text style={[styles.text, {color:COLORS.textGray, marginVertical:width*0.01, fontSize:width*0.04}]}> 
                                            if you select Cash On Deliver , you can pay for your package when our Delivery Associates bring it to your step or when you pick it up at one of our pickup Stations
                                            1) We only accept Egyptian Pound
                                            2)Because our Delivery Agents do not handle petty cash , we would appreciate that you have the exact amount for payment
                                            3)Payment must be made before unsealing an electronic item such as a phone or laptop. Once the seal is broken the item can only be returned or rejected if it is damaged
                                            ,defective or has missing parts. if you change your mind, an unsealed item con no longer be returned
                                        </Text>
                                    :null}
                                </View>
                            </View>

                            
                            <View style={styles.paymentView}>
                                <Icon name="chart-line" size={width*0.08} color={COLORS.main} style={{position:'absolute', right:width*0.02, top:height*0.01}}/>
                                <View style={styles.radioView}>
                                    <CheckBox
                                    title=' '
                                    checkedIcon='dot-circle-o'
                                    uncheckedIcon='circle-o'
                                    checkedColor={COLORS.main}
                                    checked={this.state.OurVision}
                                    uncheckedColor='orange'
                                    onPress={()=>this.setState({OurVision:!this.state.OurVision})}
                                    containerStyle={{backgroundColor:COLORS.text, flexDirection:!I18nManager.isRTL&&this.state.rtl?'row-reverse':'row', borderWidth:0, padding:0, margin:width*0.02}}
                                    />
                                </View>
                                <View style={styles.textRadioView}>
                                    <Text style={styles.text}>  {localization.ourVision} </Text>
                                    {this.state.OurVision?
                                        <Text style={[styles.text, {color:COLORS.textGray, marginVertical:width*0.01, fontSize:width*0.04}]}> 
                                            if you select Cash On Deliver , you can pay for your package when our Delivery Associates bring it to your step or when you pick it up at one of our pickup Stations
                                            1) We only accept Egyptian Pound
                                            2)Because our Delivery Agents do not handle petty cash , we would appreciate that you have the exact amount for payment
                                            3)Payment must be made before unsealing an electronic item such as a phone or laptop. Once the seal is broken the item can only be returned or rejected if it is damaged
                                            ,defective or has missing parts. if you change your mind, an unsealed item con no longer be returned
                                        </Text>
                                    :null}
                                </View>
                            </View>

                            <View style={styles.paymentView}>
                                <Icon name="suitcase" size={width*0.08} color={COLORS.main} style={{position:'absolute', right:width*0.02, top:height*0.01}}/>
                                <View style={styles.radioView}>
                                    <CheckBox
                                    title=' '
                                    checkedIcon='dot-circle-o'
                                    uncheckedIcon='circle-o'
                                    checkedColor={COLORS.main}
                                    checked={this.state.OurGoals}
                                    uncheckedColor='orange'
                                    onPress={()=>this.setState({OurGoals:!this.state.OurGoals})}
                                    containerStyle={{backgroundColor:COLORS.text, flexDirection:!I18nManager.isRTL&&this.state.rtl?'row-reverse':'row', borderWidth:0, padding:0, margin:width*0.02}}
                                    />
                                </View>
                                <View style={styles.textRadioView}>
                                    <Text style={styles.text}> {localization.ourGoals} </Text>
                                    {this.state.OurGoals?
                                        <Text style={[styles.text, {color:COLORS.textGray, marginVertical:width*0.01, fontSize:width*0.04}]}> 
                                            if you select Cash On Deliver , you can pay for your package when our Delivery Associates bring it to your step or when you pick it up at one of our pickup Stations
                                            1) We only accept Egyptian Pound
                                            2)Because our Delivery Agents do not handle petty cash , we would appreciate that you have the exact amount for payment
                                            3)Payment must be made before unsealing an electronic item such as a phone or laptop. Once the seal is broken the item can only be returned or rejected if it is damaged
                                            ,defective or has missing parts. if you change your mind, an unsealed item con no longer be returned
                                        </Text>
                                    :null}
                                </View>
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
        flexDirection:I18nManager.isRTL&&rtl?'row':'row-reverse',
        backgroundColor:'rgba(250,250,250,0.7)',
        // marginHorizontal:width*0.1,
        marginVertical:width*0.02,
        // padding:width*0.02,
    },
    radioView:{
        width:width*0.14,
    },
    textRadioView:{
        width:width*0.8,
        
    },
    text:{
        color :COLORS.main,
        fontSize: width*0.055,
        // fontWeight:'bold',
        width:width*0.8,
        padding:width*0.02,
        textAlign:I18nManager.isRTL&&rtl?'left':'right',
    },
})


