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
    AsyncStorage,
    PermissionsAndroid
} from 'react-native';
import CustomInput from '../../Components/CustomInput';
import { IMAGES, height, width, COLORS, verticalScale } from '../../config';
import {validateEmail, validateFirstName, validateLastName, validatePassword, validatePasswordAndConfirm, validatePasswordConfirm, validatePhone} from '../../config/Validation';
import localization from '../../localization/localization';
import { CheckBox } from 'react-native-elements';
import { connect } from "react-redux";
import { RegistClient } from "../../Redux/actions/AuthActions";
import Spinner from "react-native-spinkit";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { RFValue } from "react-native-responsive-fontsize";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Store from "../../Redux";


class Register extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        loading: false,
        userName:'',
        email:'',
        phoneNumber:'',
        password:'',
        repassword:'',
        read:false,
        emailError: '',
        passwordError: '',
        rememberMe:false,
        userType:'Customer',
        rtl:I18nManager.isRTL != (localization.getLanguage()=='ar'),
        loc:'',
        lat:30.78825,
        long:31.78825,
        };
    }

    _validate(){
        this.setState({
            userNameError:this.state.userName?'':localization.thisFieldIsRequired,
            emailError:this.state.email?'':localization.thisFieldIsRequired,
            passwordError:this.state.password?'':localization.thisFieldIsRequired,
            repasswordError:this.state.repassword?'':localization.thisFieldIsRequired,
            phoneNumberError:this.state.phoneNumber?'':localization.thisFieldIsRequired,
        })
        return this.state.email && this.state.password && this.state.userName && this.state.repassword && this.state.phoneNumber
    }

    componentDidMount(){
        if(Platform.OS === 'android'){
           this.requestLocationPermission()
        }else{
           this._getCurrentLocation()
        }
     }
     
     async requestLocationPermission() {
         try {
             const granted = await PermissionsAndroid.request(
             PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
             {
               'title': 'Location Permission',
               'message': 'MyMapApp needs access to your location'
             }
             )
     
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                this._getCurrentLocation()
                console.log("Location permission granted")
            } else {
                console.log("Location permission denied")
            }
        } catch (err) {
        console.warn(err)
        }
     }
     
     _getCurrentLocation = () =>{
         console.log('entered')
         navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log('entered position')
                console.log(position)
                    this.setState({
                        lat:position.coords.latitude,
                        long:position.coords.longitude,
                    })
                },
                (error) => {
                    console.log('entered error')
                    console.log(error)
                    if(error.code == 2){
                        console.log(error.message)
                        const AlertMessage = Store.getState().Config.alert;
                        AlertMessage(
                            "warn",
                            "Warn",
                            "Turn on GPS to access your location"
                        );
                    }
                //  this.setState({ error: error.message })},
                },
                { 
                    // enableHighAccuracy: true, 
                    timeout: 200000, 
                    maximumAge: 1000 
                },
         );
    }

    // componentDidMount(){
    //     this.getMyLocation();
    // }

    // getMyLocation() {
    //     navigator.geolocation.getCurrentPosition(
    //         position => {
    //             console.log('position')
    //         loc = { longitude: position.coords.longitude, latitude: position.coords.latitude };
    //         // console.log("Current location is: ")
    //         console.log(position)
    //         this.setState({
    //             lat:position.coords.latitude,
    //             long:position.coords.longitude,
    //         })
    //         // console.log("Current location is: ")
    //       },
    //       error => {
    //           console.log(error);
    //       },
    //       {
    //         enableHighAccuracy: true,
    //         timeout: 20000,
    //         maximumAge: 1000
    //       }
    //     );
    // };
    
    submitLogin(){
        // console.warn("error")
        if(!this._validate())return;
        AsyncStorage.setItem('userType',this.state.userType) .then(()=>{
            console.log('inserted CUSTOMER');
        }).catch((err)=>{
            console.log('errrorrrrrr : errorrrrr :  ' + err);
        })
        console.warn("working?")
        
        this.props.Register({
            form: {
              name: this.state.userName,
              email: this.state.email,
              phone: this.state.phoneNumber,
              password: this.state.password,
              password_confirmation: this.state.repassword,
              type_user: this.state.userType,
              lat:this.state.marker?this.state.marker.latitude:this.state.lat,
              lan:this.state.marker?this.state.marker.longitude:this.state.long,
            },
            navigation: this.props.navigation,
        });
    }
    

    render(){
        console.log("ERRORRRRRRRRRRRRR")
        console.log(this.props.error)
        console.log("ERRORRRRRRRRRRRRR")
        return(
            <KeyboardAvoidingView  
            behavior={Platform.OS === "ios" ? "padding" : null}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
            style={styles.container}
            >
            <View>
            <ScrollView style={{height:height}} contentContainerStyle={[styles.container]}>
                <Image source={IMAGES.bg1} style={styles.bg}/>
                {/* <View> */}
                <Image source={IMAGES.logo} style={styles.logo} />

                <View style={{marginBottom:height*0.08}}> 
                    <CustomInput 
                        placeholder={localization.userName}
                        error={this.state.userNameError ? this.state.userNameError: this.props.error.name?this.props.error.name[0]:''}
                        onChangeText={(userName)=>this.setState({userName})}
                        reference={ref => this.userNameRef = ref}
                        onSubmitEditing={()=>this.emailRef.focus()}
                        returnKeyType="next"
                        iconName="user"
                        value={this.state.userName}
                        />

                    <CustomInput 
                        placeholder={localization.email}
                        error={this.state.emailError ? this.state.emailError: this.props.error.email?this.props.error.email[0]:''}
                        onChangeText={(email)=>this.setState({email})}
                        reference={ref => this.emailRef = ref}
                        onSubmitEditing={()=>this.phoneNumberRef.focus()}
                        returnKeyType="next"
                        iconName="envelope"
                        value={this.state.email}
                        />
                    
                    <CustomInput 
                        placeholder={localization.phoneNumber}
                        error={this.state.phoneNumberError ? this.state.phoneNumberError: this.props.error.phone?this.props.error.phone[0]:''}
                        onChangeText={(phoneNumber)=>this.setState({phoneNumber})}
                        reference={ref => this.phoneNumberRef = ref}
                        onSubmitEditing={()=>this.passwordRef.focus()}
                        returnKeyType="next"
                        iconName="mobile-alt"
                        keyboardType="numeric"
                        value={this.state.phoneNumber}
                        />
                    
                    <CustomInput 
                        placeholder={localization.password}
                        error={this.state.passwordError ? this.state.passwordError: this.props.error.password?this.props.error.password[0]:''}
                        onChangeText={(password)=>this.setState({password})}
                        reference={ref => this.passwordRef = ref}
                        onSubmitEditing={()=>this.repasswordRef.focus()}
                        returnKeyType="next"
                        iconName="lock"
                        password
                        value={this.state.password}
                        text={this.state.read}
                        read={()=>{this.setState({read:!this.state.read})}}
                        /> 

                    <CustomInput 
                        placeholder={localization.password}
                        error={this.state.repasswordError ? this.state.passwordError: this.props.error.password_confirmation?this.props.error.password_confirmation[0]:''}
                        onChangeText={(repassword)=>this.setState({repassword})}
                        reference={ref => this.repasswordRef = ref}
                        returnKeyType="go"
                        returnKeyValue="go"
                        iconName="lock"
                        password
                        value={this.state.repassword}
                        text={this.state.readConfirm}
                        read={()=>{this.setState({readConfirm:!this.state.readConfirm})}}
                        lastItem
                        /> 

                    
                    {/* {this.state.lat||this.state.marker? */}
                    {this.state.userType=="Merchant"&&
                    (
                    <View>
                    <Text style={{color:COLORS.main, fontSize:width*0.045, margin:width*0.02}}>
                        {localization.pickLocation}
                    </Text>
                    <MapView
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={{
                            height:height*0.3,
                            backgroundColor: COLORS.BackGround,
                            marginBottom: verticalScale(20),
                            marginHorizontal:width*0.03
                        }}
                        region={{
                            latitude: this.state.marker ? this.state.marker.latitude : (this.state.lat ? this.state.lat : 0.0),
                            longitude: this.state.marker ? this.state.marker.longitude : (this.state.long ? this.state.long : 0.0),
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121
                        }}
                        onPress={(e) => this.setState({ marker: e.nativeEvent.coordinate })}
                        // scrollEnabled={false}
                    >
                        {this.state.marker ? (
                        <Marker
                            coordinate={this.state.marker}
                        >
                            <View
                            style={{ justifyContent: "center", alignItems: "center" }}
                            >
                            <Text style={{ color: COLORS.white, backgroundColor:COLORS.main, borderRadius:width*0.02, paddingHorizontal:width*0.02, fontSize: RFValue(14) }}>
                                {localization.Location}
                            </Text>
                            <FontAwesome
                                name="map-marker"
                                color={COLORS.main}
                                size={RFValue(50)}
                            />
                            </View>
                        </Marker>
                        ):
                        this.state.lat && this.state.long && (
                            <Marker
                                coordinate={{
                                latitude: this.state.lat,
                                longitude: this.state.long
                                }}
                            >
                                <View
                                style={{ justifyContent: "center", alignItems: "center" }}
                                >
                                <Text style={{ color: COLORS.white, backgroundColor:COLORS.main, borderRadius:width*0.02, paddingHorizontal:width*0.02, fontSize: RFValue(14) }}>
                                    {localization.Location}
                                </Text>
                                <FontAwesome
                                    name="map-marker"
                                    color={COLORS.main}
                                    size={RFValue(50)}
                                />
                                </View>
                            </Marker>
                        )}
                    </MapView>
                    </View>
                    )}
                    {/* :
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
                    } */}

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
                    <TouchableOpacity onPress={()=>{this.submitLogin();}} style={styles.loginButton}>
                        <Image source={IMAGES.loginArrow} style={styles.loginArrow}/>
                        <Text style={styles.buttonText}> {localization.register} </Text>
                    </TouchableOpacity>
                    }

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
            {/* </View> */}
            </View>
            </KeyboardAvoidingView>
        )
    }
} 

export default connect(
    state => {
      return {
        type: state.Config.userType,
        loading: state.auth.registerLoading,
        user: state.auth.user,
        error: state.auth.errorRegister,
      };
    },
    dispatch => {
      return {
        reset: () => dispatch({ type: LOGIN_FAILED }),
        Register: payload => RegistClient({ ...payload, dispatch }),
      };
    }
)(Register);

const rtl = I18nManager.isRTL != (localization.getLanguage()=='ar');
const styles = StyleSheet.create({
    imageIcon:{
        width:width*0.08,
        height:width*0.08,
        resizeMode:'contain',
    },
    footer:{
        flexDirection:I18nManager.isRTL&&rtl?'row':'row-reverse',
        width:width,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:COLORS.main,
        height:height*0.07
    },
    footerButtonC:{
        borderTopRightRadius:width*0.05,
        flexDirection:I18nManager.isRTL&&rtl?'row':'row-reverse',
        justifyContent:'center',
        alignItems:'center',
        width:width*0.5,
        height:height*0.07
    },
    footerButtonV:{
        borderTopLeftRadius:width*0.05,
        flexDirection:I18nManager.isRTL&&rtl?'row':'row-reverse',
        justifyContent:'center',
        alignItems:'center',
        width:width*0.5,
        height:height*0.07
    },
    active:{
        backgroundColor:COLORS.secondary
    },
    container:{
        // flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:COLORS.white
    },
    logo:{
        width:width*0.4,
        height:height*0.25,
        resizeMode:'contain',
        marginVertical:height*0.03,
    },
    bg:{
        resizeMode:'cover',
        width:width*1.2,
        height:height*1.9,
        position:'absolute',
        zIndex:-1,
        top:height*-0.08,
        
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