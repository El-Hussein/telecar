import React from 'react';

import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    I18nManager,
    AsyncStorage
} from 'react-native';
import CustomInput from '../../Components/CustomInput';
import { IMAGES, height, width, COLORS } from '../../config';
import {validateEmail, validateFirstName, validateLastName, validatePassword, validatePasswordAndConfirm, validatePasswordConfirm, validatePhone} from '../../config/Validation';
import localization from '../../localization/localization';
import { CheckBox } from 'react-native-elements';
import  Icon from 'react-native-vector-icons/FontAwesome5';
import Spinner from "react-native-spinkit";

import { connect } from "react-redux";
import { LoginClient } from "../../Redux/actions/AuthActions";
import { LOGIN_FAILED } from "../../Redux/types";

class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        loading: false,
        email:'',
        emailForgetPassword:'',
        password:'',
        read:false,
        emailError: '',
        emailForgetPasswordError: '',
        passwordError: '',
        rememberMe:false,
        userType:'Customer',
        modal:false,
        rtl:I18nManager.isRTL != (localization.getLanguage()=='ar'),
        };
    }

    _validate(){
        this.setState({
            emailError:this.state.email?'':localization.thisFieldIsRequired,
            passwordError:this.state.password?'':localization.thisFieldIsRequired,
        })
        return this.state.email && this.state.password
    }
    
    submitLogin(){
        if(!this._validate())return;
        AsyncStorage.setItem('userType',this.state.userType) .then(()=>{
            console.log('inserted CUSTOMER');
        }).catch((err)=>{
            console.log('errrorrrrrr : errorrrrr :  ' + err);
        })
        console.log("working?")
        this.setState({
            loading: false,
            email:'',
            emailForgetPassword:'',
            password:'',
            read:false,
            emailError: '',
            emailForgetPasswordError: '',
            passwordError: '',
            rememberMe:false,
            modal:false
        })
        this.props.Login({
            email:this.state.email,
            password:this.state.password,
            type: this.state.userType,
            navigation: this.props.navigation
        })
        // this.props.navigation.navigate('Home')
    }

    
    render(){
        Modal = ()=>{
            return(
                <View style={{height:height, justifyContent:'center', alignItems:'center', width:width, position:'absolute', zIndex:5, backgroundColor:'rgba(50,50,50,0.5)'}}>
                    <View onPress={()=>console.log("won't close :P")} style={{height:height*0.25, zIndex:8, elevation:8, width:width*0.9, backgroundColor:COLORS.white, padding:width*0.02, justifyContent:'space-around'}}>
                        <View style={{flexDirection:I18nManager.isRTL&&this.state.rtl?'row':'row-reverse', zIndex:8, marginBottom:width*0.08, justifyContent:'space-between', width:width*0.86, borderBottomColor:COLORS.gray, borderBottomWidth:width*0.001}}>
                            <Text style={styles.text}> {localization.forgetPassword} </Text>
                            <TouchableOpacity onPress={()=>this.setState({modal:false})} style={{backgroundColor:COLORS.main, width:width*0.05, justifyContent:'center', alignItems:'center', height:width*0.05, borderRadius:width*0.03}}>
                                <Text style={{color:COLORS.white, fontSize:width*0.035}}>X</Text>
                            </TouchableOpacity>
                        </View>
                        <CustomInput 
                        placeholder={localization.email}
                        error={this.state.emailError}
                        onChangeText={(emailForgetPassword)=>this.setState({emailForgetPassword})}
                        reference={ref => this.emailForgetPasswordRef = ref}
                        value={this.state.emailForgetPassword}
                        returnKeyType="go"
                        iconName="envelope"
                        />

                        <TouchableOpacity onPress={()=>{this.submitLogin();}} style={styles.loginButton}>
                            <Image source={IMAGES.loginArrow} style={styles.loginArrow}/>
                            <Text style={styles.buttonText}> {localization.signIn} </Text>
                        </TouchableOpacity>

                    </View>
                </View>
            )
        }
        return(
            <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : null}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
            style={{backgroundColor:COLORS.white}}
            >
            <View style={{height:height*0.97}}>
                {this.state.modal?<Modal/>:null}
                <Image source={IMAGES.bg1} style={styles.bg}/>
                <ScrollView contentContainerStyle={[styles.container, {height:height*0.93}]}>
                <Image source={IMAGES.logo} style={styles.logo} />

                <View style={styles.form}> 
                    <CustomInput 
                        placeholder={localization.email}
                        error={this.state.emailError}
                        onChangeText={(email)=>this.setState({email})}
                        reference={ref => this.emailRef = ref}
                        onSubmitEditing={()=>this.passwordRef.focus()}
                        returnKeyType="next"
                        value={this.state.email}
                        iconName="envelope"
                        />
                    
                    <CustomInput 
                        placeholder={localization.password}
                        error={this.state.passwordError}
                        onChangeText={(password)=>this.setState({password})}
                        reference={ref => this.passwordRef = ref}
                        returnKeyType="go"
                        returnKeyValue="go"
                        iconName="lock"
                        password
                        value={this.state.password}
                        text={this.state.read}
                        read={()=>{this.setState({read:!this.state.read})}}
                        lastItem
                        /> 

                    <View style={{flexDirection:I18nManager.isRTL&&this.state.rtl?'row-reverse':'row', justifyContent:'space-between', alignItems:'center', marginBottom:width*0.07}}>
                        <CheckBox size={width*0.05} textStyle={styles.text} uncheckedColor={COLORS.textBlack} checkedColor={COLORS.textBlack} onPress={()=>this.setState({rememberMe:!this.state.rememberMe})} containerStyle={styles.default} checked={this.state.rememberMe} title={localization.rememberMe}/>
                        <Text onPress={()=>this.setState({modal:true})} style={styles.text}> {localization.forgetPassword} </Text>  
                    </View>

                    {this.props.loading ? (
                        <TouchableOpacity onPress={()=>{this.submitLogin();}} style={styles.loginButton}>
                            <Spinner
                                style={{
                                justifyContent: "center",
                                alignSelf: "center",
                                alignItems: "center"
                                }}
                                isVisible={this.props.loading}
                                type="Circle"
                                color={"white"}
                            />
                        </TouchableOpacity>
                    ) :
                    (
                        <TouchableOpacity onPress={()=>{this.submitLogin();}} style={styles.loginButton}>
                            <Image source={IMAGES.loginArrow} style={styles.loginArrow}/>
                            <Text style={styles.buttonText}> {localization.signIn} </Text>
                        </TouchableOpacity>
                    )}

                    <View style={{flexDirection:this.state.rtl?'row-reverse':'row', justifyContent:'center', marginTop:width*0.05}}>
                        <Text style={styles.text}> {localization.createNewAccount} </Text>
                        <Text onPress={()=>this.props.navigation.navigate('Register')} style={styles.text}>{localization.createOne}</Text>
                    </View>
                </View>
                </ScrollView>
                <View style={styles.footer}>
                    <TouchableOpacity onPress={()=>{
                        this.setState({userType:'Customer'})
                    }} style={[this.state.rtl? (localization.getLanguage()=='ar')?styles.footerButtonC:styles.footerButtonV :I18nManager.isRTL?styles.footerButtonC:styles.footerButtonV, this.state.userType=="Customer"?styles.active:null]}>
                        <Text style={styles.footerText}> {localization.customer} </Text>
                        <Image source={IMAGES.customer} style={styles.imageIcon}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>{
                        this.setState({userType:'Merchant'})
                    }} style={[this.state.rtl? (localization.getLanguage()=='ar')?styles.footerButtonV:styles.footerButtonC :I18nManager.isRTL?styles.footerButtonV:styles.footerButtonC, this.state.userType=="Merchant"?styles.active:null]}>
                        <Text style={styles.footerText}> {localization.vendor} </Text>
                        <Image source={IMAGES.vendor} style={styles.imageIcon}/>
                    </TouchableOpacity>
                </View>
            </View>
            </KeyboardAvoidingView>
        )
    }
}

export default connect(
  state => {
    return {
      type: state.Config.userType,
      loading: state.auth.loginLoading
    };
  },
  dispatch => {
    return {
      reset: () => dispatch({ type: LOGIN_FAILED }),
      Login: payload => LoginClient({ ...payload, dispatch })
    };
  }
)(Login);
const rtl = I18nManager.isRTL != (localization.getLanguage()=='ar');

const styles = StyleSheet.create({
    imageIcon:{
        width:width*0.08,
        height:width*0.08,
        resizeMode:'contain',
    },
    footer:{
        flexDirection:rtl?'row':'row-reverse',
        width:width,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:COLORS.main,
        height:height*0.07,
        zIndex:5
    },
    footerButtonC:{
        borderTopRightRadius:width*0.05,
        flexDirection:rtl?'row':'row-reverse',
        justifyContent:'center',
        alignItems:'center',
        width:width*0.5,
        height:height*0.07
    },
    footerButtonV:{
        borderTopLeftRadius:width*0.05,
        flexDirection:rtl?'row':'row-reverse',
        justifyContent:'center',
        alignItems:'center',
        width:width*0.5,
        height:height*0.07
    },
    active:{
        backgroundColor:COLORS.secondary
    },
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    logo:{
        width:width*0.5,
        height:height*0.25,
        resizeMode:'contain',
        marginVertical:height*0.03,
    },
    bg:{
        resizeMode:'contain',
        width:width,
        height:height*1.9,
        position:'absolute',
        zIndex:-1,
        top:height*-0.08
    },
    text:{
        fontSize:width*0.04,
        color:COLORS.main,
    },
    footerText:{
        fontSize:width*0.05,
        color:COLORS.white,
    },
    loginArrow:{
        width:width*0.12,
        height:width*0.08,
        resizeMode:'contain',
        // backgroundColor:'red',
        transform:[{ rotate:I18nManager.isRTL&&rtl?'180deg':'0deg'}],
    },
    loginButton:{
        flexDirection:!I18nManager.isRTL&&rtl?'row':'row-reverse',
        width:width*0.8,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:width*0.02,
        backgroundColor:COLORS.cyan,
        height:height*0.05,
        marginHorizontal:width*0.03,
        elevation: 3
    },
    buttonText:{
        fontSize:width*0.05, 
        color:COLORS.text, 
        // fontWeight:'bold',
        width:width*0.68,
        textAlignVertical:'center',
        textAlign:'center',
        color:COLORS.white,
        borderLeftWidth:width*0.002,
        borderLeftColor:COLORS.white,
        height:height*0.06
    },
    default:{
        padding:0,
        margin:0,
        borderWidth:0,
        borderColor:COLORS.text,
        backgroundColor:"transparent",
    },
})