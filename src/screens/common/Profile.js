import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    I18nManager,
    ScrollView,
    TouchableOpacity,
    Modal
} from 'react-native';
import { COLORS, IMAGES, height, width, verticalScale } from '../../config';
import { RFValue } from "react-native-responsive-fontsize";

import Header from '../../Components/HeaderNew';
import localization from '../../localization/localization';
import Icon from "react-native-vector-icons/FontAwesome5";
import Footer from '../../Components/FooterNew';
import { connect } from "react-redux";
import CustomInput from '../../Components/CustomInput';
import { UpdateProfile } from "../../Redux/actions/AuthActions";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Spinner from "react-native-spinkit";
import ImagePicker from 'react-native-image-picker';
class Profile extends React.Component{
    state={
        userName:this.props.user.name,
        email:this.props.user.email,
        phoneNumber:this.props.user.phone,
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
        emailError: '',
        passwordError: '',
        modalEmailVisible:false,
        modalPasswordVisible:false,
        modalPhoneVisible:false,
        modalUsernameVisible:false,
        modalMapVisible:false,
        response:false,
        avatar:'',
    }
    _validate(){
        this.setState({
            userNameError:this.state.userName?'':localization.thisFieldIsRequired,
            emailError:this.state.email?'':localization.thisFieldIsRequired,
            // passwordError:this.state.password?'':localization.thisFieldIsRequired,
            // repasswordError:this.state.repassword?'':localization.thisFieldIsRequired,
            phoneNumberError:this.state.phoneNumber?'':localization.thisFieldIsRequired,
        })
        console.log(this.state);
        return this.state.email && this.state.userName && this.state.phoneNumber
    }

    componentDidMount(){
        this.getMyLocation();
    }

    async getMyLocation() {
        await navigator.geolocation.getCurrentPosition(
          position => {
            loc = { longitude: position.coords.longitude, latitude: position.coords.latitude };
            // console.log("Current location is: ")
            // console.log(position)
            this.setState({
                lat:position.coords.latitude,
                long:position.coords.longitude,
            })
            // console.log("Current location is: ")
          },
          error => {
            //   alert(JSON.stringify(error));
          },
          {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 1000
          }
        );
    };
    
    submitLogin(){
        console.log("SUMITTED???????????????")
        console.log(JSON.stringify(this._validate()))
        if(!this._validate())return;
        
        console.log("TOKEN FROM REDER")
        console.log(this.props.user.token)
        console.log("TOKEN FROM REDER")
        this.props.updateUSER({
            form: {
              name: this.state.userName,
              email: this.state.email,
              phone: this.state.phoneNumber,
              password: this.state.password,
              password_confirmation: this.state.repassword,
              type_user: this.state.userType,
              lat:this.state.marker?this.state.marker.latitude:this.state.lat,
              lan:this.state.marker?this.state.marker.longitude:this.state.long,
              avatar: this.state.avatar,
            },
            token: this.props.user.token,
            navigation: this.props.navigation,
        }).then(res=>{
            console.log("UPDATE PROFILE RESPONSE FROM RENDER IS: " + res);
            if(res){
                this.setState({
                    modalUsernameVisible:false,
                    modalEmailVisible:false,
                    modalPhoneVisible:false,
                    modalPasswordVisible:false,
                    modalMapVisible:false,
                    avatar:'',
                })
            }
        });
    }

    selectPhotoTapped() {
        const options = {
        quality: 1.0,
        maxWidth: 500,
        maxHeight: 500,
        storageOptions: {
            skipBackup: true,
        },
        };
        console.log('image opened.')
    
        ImagePicker.showImagePicker(options, response => {
        console.log('Response = ', response);
    
        if (response.didCancel) {
            console.log('User cancelled photo picker');
        } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
        } else {
            let source = {uri: response.uri};
    
            this.setState({avatar: source.uri});
            this.submitLogin();
        }
        });
    }
    render(){
        return(
            <View style={styles.container}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalUsernameVisible}
                    style={{height:height*0.5, width:width*0.9}}
                    contentContainerStyle={{height:height*0.5, width:width*0.9}}
                    >
                    <View style={{height:height*0.3, justifyContent:'center', alignItems:'center', borderRadius:width*0.02, padding:width*0.02, width:width*0.94, backgroundColor:'white', marginVertical:height*0.25, marginHorizontal:width*0.03}}>
                        <View style={{flexDirection:I18nManager.isRTL&&this.state.rtl?'row':'row-reverse', position:'absolute', right:width*0.01, top:width*0.01, zIndex:8, marginBottom:width*0.08, justifyContent:'space-between', width:width*0.86}}>
                            <TouchableOpacity onPress={() => this.setState({modalUsernameVisible:false})} style={{backgroundColor:COLORS.main, width:width*0.05, justifyContent:'center', alignItems:'center', height:width*0.05, borderRadius:width*0.03}}>
                                <Text style={{color:COLORS.white, fontSize:width*0.035}}>X</Text>
                            </TouchableOpacity>
                        </View>
                        {/* <View style={{marginTop:width*0.02}}> */}
                        <CustomInput 
                        placeholder={localization.userName}
                        error={this.state.userNameError ? this.state.userNameError: this.props.error.name?this.props.error.name[0]:''}
                        onChangeText={(userName)=>this.setState({userName})}
                        // reference={ref => this.userNameRef = ref}
                        // onSubmitEditing={()=>this.emailRef.focus()}
                        returnKeyType="next"
                        iconName="user"
                        value={this.state.userName}
                        />
                        {/* </View> */}
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
                            <Text style={styles.buttonText}> {localization.update} </Text>
                        </TouchableOpacity>
                        }
                    </View>
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalEmailVisible}
                    style={{height:height*0.5, width:width*0.9}}
                    contentContainerStyle={{height:height*0.5, width:width*0.9}}
                    >
                    <View style={{height:height*0.3, justifyContent:'center', alignItems:'center', borderRadius:width*0.02, padding:width*0.02, width:width*0.94, backgroundColor:'white', marginVertical:height*0.25, marginHorizontal:width*0.03}}>
                        <View style={{flexDirection:I18nManager.isRTL&&this.state.rtl?'row':'row-reverse', position:'absolute', right:width*0.01, top:width*0.01, zIndex:8, marginBottom:width*0.08, justifyContent:'space-between', width:width*0.86}}>
                            <TouchableOpacity onPress={() => this.setState({modalEmailVisible:false})} style={{backgroundColor:COLORS.main, width:width*0.05, justifyContent:'center', alignItems:'center', height:width*0.05, borderRadius:width*0.03}}>
                                <Text style={{color:COLORS.white, fontSize:width*0.035}}>X</Text>
                            </TouchableOpacity>
                        </View>
                        {/* <View style={{marginTop:width*0.02}}> */}
                        <CustomInput 
                        placeholder={localization.email}
                        error={this.state.emailError ? this.state.emailError: this.props.error.email?this.props.error.email[0]:''}
                        onChangeText={(email)=>this.setState({email})}
                        // reference={ref => this.emailRef = ref}
                        // onSubmitEditing={()=>this.phoneNumberRef.focus()}
                        returnKeyType="next"
                        iconName="envelope"
                        value={this.state.email}
                        />
                        {/* </View> */}
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
                            <Text style={styles.buttonText}> {localization.update} </Text>
                        </TouchableOpacity>
                        }
                    </View>
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalPhoneVisible}
                    style={{height:height*0.5, width:width*0.9}}
                    contentContainerStyle={{height:height*0.5, width:width*0.9}}
                    >
                    <View style={{height:height*0.3, justifyContent:'center', alignItems:'center', borderRadius:width*0.02, padding:width*0.02, width:width*0.94, backgroundColor:'white', marginVertical:height*0.25, marginHorizontal:width*0.03}}>
                        <View style={{flexDirection:I18nManager.isRTL&&this.state.rtl?'row':'row-reverse', position:'absolute', right:width*0.01, top:width*0.01, zIndex:8, marginBottom:width*0.08, justifyContent:'space-between', width:width*0.86}}>
                            <TouchableOpacity onPress={() => this.setState({modalPhoneVisible:false})} style={{backgroundColor:COLORS.main, width:width*0.05, justifyContent:'center', alignItems:'center', height:width*0.05, borderRadius:width*0.03}}>
                                <Text style={{color:COLORS.white, fontSize:width*0.035}}>X</Text>
                            </TouchableOpacity>
                        </View>
                        {/* <View style={{marginTop:width*0.02}}> */}
                        <CustomInput 
                        placeholder={localization.phoneNumber}
                        error={this.state.phoneNumberError ? this.state.phoneNumberError: this.props.error.phone?this.props.error.phone[0]:''}
                        onChangeText={(phoneNumber)=>this.setState({phoneNumber})}
                        // reference={ref => this.phoneNumberRef = ref}
                        // onSubmitEditing={()=>this.passwordRef.focus()}
                        returnKeyType="next"
                        iconName="mobile-alt"
                        keyboardType="numeric"
                        value={this.state.phoneNumber}
                        />
                        {/* </View> */}
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
                            <Text style={styles.buttonText}> {localization.update} </Text>
                        </TouchableOpacity>
                        }
                    </View>
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalPasswordVisible}
                    style={{height:height*0.5, width:width*0.9}}
                    contentContainerStyle={{height:height*0.5, width:width*0.9}}
                    >
                    <View style={{height:height*0.3, justifyContent:'center', alignItems:'center', borderRadius:width*0.02, padding:width*0.02, width:width*0.94, backgroundColor:'white', marginVertical:height*0.25, marginHorizontal:width*0.03}}>
                        <View style={{flexDirection:I18nManager.isRTL&&this.state.rtl?'row':'row-reverse', position:'absolute', right:width*0.01, top:width*0.01, zIndex:8, marginBottom:width*0.08, justifyContent:'space-between', width:width*0.86}}>
                            <TouchableOpacity onPress={() => this.setState({modalPasswordVisible:false})} style={{backgroundColor:COLORS.main, width:width*0.05, justifyContent:'center', alignItems:'center', height:width*0.05, borderRadius:width*0.03}}>
                                <Text style={{color:COLORS.white, fontSize:width*0.035}}>X</Text>
                            </TouchableOpacity>
                        </View>
                        {/* <View style={{marginTop:width*0.02}}> */}
                        <CustomInput 
                            placeholder={localization.password}
                            error={this.state.passwordError ? this.state.passwordError: this.props.error.password?this.props.error.password[0]:''}
                            onChangeText={(password)=>this.setState({password})}
                            // reference={ref => this.passwordRef = ref}
                            // onSubmitEditing={()=>this.repasswordRef.focus()}
                            returnKeyType="next"
                            iconName="lock"
                            password
                            value={this.state.password}
                            text={this.state.read}
                            read={()=>{this.setState({read:!this.state.read})}}
                            /> 

                        <CustomInput 
                            placeholder={localization.reTypePassword}
                            error={this.state.repasswordError ? this.state.passwordError: this.props.error.password_confirmation?this.props.error.password_confirmation[0]:''}
                            onChangeText={(repassword)=>this.setState({repassword})}
                            // reference={ref => this.repasswordRef = ref}
                            returnKeyType="go"
                            returnKeyValue="go"
                            iconName="lock"
                            password
                            value={this.state.repassword}
                            text={this.state.readConfirm}
                            read={()=>{this.setState({readConfirm:!this.state.readConfirm})}}
                            lastItem
                            /> 
                        {/* </View> */}
                        {this.props.loading ? (
                        <TouchableOpacity onPress={()=>{
                                if(this.state.password!=this.state.repassword){
                                    this.setState({
                                        passwordError:localization.passwordmismatch
                                    });
                                }else{
                                    this.submitLogin();
                                }
                            }} style={styles.loginButton}>
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
                            <Text style={styles.buttonText}> {localization.update} </Text>
                        </TouchableOpacity>
                        }
                    </View>
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalMapVisible}
                    style={{height:height*0.5, width:width*0.9}}
                    contentContainerStyle={{height:height*0.5, width:width*0.9}}
                    >
                    <View style={{height:height*0.3, justifyContent:'center', alignItems:'center', borderRadius:width*0.02, padding:width*0.02, width:width*0.94, backgroundColor:'white', marginVertical:height*0.25, marginHorizontal:width*0.03}}>
                        <View style={{flexDirection:I18nManager.isRTL&&this.state.rtl?'row':'row-reverse', position:'absolute', right:width*0.01, top:width*0.01, zIndex:8, marginBottom:width*0.08, justifyContent:'space-between', width:width*0.86}}>
                            <TouchableOpacity onPress={() => this.setState({modalMapVisible:false})} style={{backgroundColor:COLORS.main, width:width*0.05, justifyContent:'center', alignItems:'center', height:width*0.05, borderRadius:width*0.03}}>
                                <Text style={{color:COLORS.white, fontSize:width*0.035}}>X</Text>
                            </TouchableOpacity>
                        </View>
                        {/* <View style={{marginTop:width*0.02}}> */}
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
                        {/* </View> */}
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
                            <Text style={styles.buttonText}> {localization.update} </Text>
                        </TouchableOpacity>
                        }
                    </View>
                </Modal>

                <Image source={IMAGES.bg} style={{height:height*1.22, position:'absolute', width:width}}/>
                <Header title={localization.profile}/>
                {this.props.user&&<ScrollView contentContainerStyle={{alignItems:'center'}}> 
                    <Image source={this.props.user.image_url?{uri:this.props.user.image_url}:IMAGES.road} style={{height:height*0.22, width:width}}/>
                    <TouchableOpacity onPress={() => {this.selectPhotoTapped()}} style={{position:'absolute', top:height*0.235, zIndex:10, right:width*0.57, borderRadius:width*0.01, backgroundColor:COLORS.white, padding:width*0.005}}>
                        <Image source={IMAGES.edit2} style={{height:width*0.05, width:width*0.05}}/>
                    </TouchableOpacity>
                    <Image source={this.props.user.image_url?{uri:this.props.user.image_url}:IMAGES.road} style={{backgroundColor:'black', position:'absolute', top:height*0.14, borderColor:COLORS.white, borderWidth:width*0.005, height:width*0.2, width:width*0.2}}/>
                    <View style={{borderRadius:width*.01, marginTop:height*0.07, borderColor:COLORS.gray, width:"98%", paddingVertical:width*0.05, borderWidth:width*0.002}}>
                        <Text style={{position:'absolute', fontSize:width*0.035, color:COLORS.main, top:width*-0.035, paddingHorizontal:width*0.02, textAlign:'center', backgroundColor:'rgb(240,240,240)', left:width*0.05}}> {localization.personaldata} </Text>
                        <View style={{flexDirection:I18nManager.isRTL&&this.state.rtl?'row':'row-reverse', alignItems:'center', justifyContent:'space-between', marginVertical:width*0.025, paddingHorizontal:width*0.01}}>
                            <View style={{backgroundColor:COLORS.main, width:width*0.08, justifyContent:'center', alignItems:'center', height:width*0.08, borderRadius:width*0.05}}>
                                <Icon color={COLORS.secondary} size={width*0.05} name="user"/>
                            </View>
                            <Text style={{color:COLORS.main, textAlign:I18nManager.isRTL&&this.state.rtl?'left':'right', width:width*0.78, fontSize:width*0.04}}> {this.props.user.name} </Text>
                            <TouchableOpacity onPress={()=>this.setState({
                                modalUsernameVisible:true,
                            })}>
                                <Image source={IMAGES.edit2} style={{height:width*0.05, width:width*0.05}}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection:I18nManager.isRTL&&this.state.rtl?'row':'row-reverse', alignItems:'center', justifyContent:'space-between', marginVertical:width*0.025, paddingHorizontal:width*0.01}}>
                            <View style={{backgroundColor:COLORS.main, width:width*0.08, justifyContent:'center', alignItems:'center', height:width*0.08, borderRadius:width*0.05}}>
                                <Icon color={COLORS.secondary} size={width*0.05} name="phone"/>
                            </View>
                            <Text style={{color:COLORS.main, textAlign:I18nManager.isRTL&&this.state.rtl?'left':'right', width:width*0.78, fontSize:width*0.04}}> {this.props.user.phone} </Text>
                            <TouchableOpacity onPress={()=>this.setState({
                                modalPhoneVisible:true,
                            })}>
                                <Image source={IMAGES.edit2} style={{height:width*0.05, width:width*0.05}}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection:I18nManager.isRTL&&this.state.rtl?'row':'row-reverse', alignItems:'center', justifyContent:'space-between', marginVertical:width*0.025, paddingHorizontal:width*0.01}}>
                            <View style={{backgroundColor:COLORS.main, width:width*0.08, justifyContent:'center', alignItems:'center', height:width*0.08, borderRadius:width*0.05}}>
                                <Icon color={COLORS.secondary} size={width*0.05} name="envelope"/>
                            </View>
                            <Text style={{color:COLORS.main, textAlign:I18nManager.isRTL&&this.state.rtl?'left':'right', width:width*0.78, fontSize:width*0.04}}> {this.props.user.email} </Text>
                            <TouchableOpacity onPress={()=>this.setState({
                                modalEmailVisible:true,
                            })}>
                                <Image source={IMAGES.edit2} style={{height:width*0.05, width:width*0.05}}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection:I18nManager.isRTL&&this.state.rtl?'row':'row-reverse', alignItems:'center', justifyContent:'space-between', marginVertical:width*0.025, paddingHorizontal:width*0.01}}>
                            <View style={{backgroundColor:COLORS.main, width:width*0.08, justifyContent:'center', alignItems:'center', height:width*0.08, borderRadius:width*0.05}}>
                                <Icon color={COLORS.secondary} size={width*0.05} name="lock"/>
                            </View>
                            <Text style={{color:COLORS.main, textAlign:I18nManager.isRTL&&this.state.rtl?'left':'right', width:width*0.78, fontSize:width*0.04}}> {localization.changePassword} </Text>
                            <TouchableOpacity onPress={()=>this.setState({
                                modalPasswordVisible:true,
                            })}>
                                <Image source={IMAGES.edit2} style={{height:width*0.05, width:width*0.05}}/>
                            </TouchableOpacity>
                        </View>
                        {this.props.userType=="Merchant"&&
                        (
                        <View style={{flexDirection:I18nManager.isRTL&&this.state.rtl?'row':'row-reverse', alignItems:'center', justifyContent:'space-between', marginVertical:width*0.025, paddingHorizontal:width*0.01}}>
                            <View style={{backgroundColor:COLORS.main, width:width*0.08, justifyContent:'center', alignItems:'center', height:width*0.08, borderRadius:width*0.05}}>
                                <Icon color={COLORS.secondary} size={width*0.05} name="user"/>
                            </View>
                            <Text style={{color:COLORS.main, textAlign:I18nManager.isRTL&&this.state.rtl?'left':'right', width:width*0.78, fontSize:width*0.04}}> {localization.changePassword} </Text>
                            <TouchableOpacity onPress={()=>this.setState({
                                modalPasswordVisible:true,
                            })}>
                                <Image source={IMAGES.edit2} style={{height:width*0.05, width:width*0.05}}/>
                            </TouchableOpacity>
                        </View>
                        )}
                    </View>
                </ScrollView>}
                {/* <Footer/> */}
            </View>
        )
    }
}

export default connect(
    state => {
      return {
        type: state.Config.userType,
        loading: state.auth.UpdateProfileLoading,
        user: state.auth.user,
        error: state.auth.errorUpdate,
      };
    },
    dispatch => {
      return {
        reset: () => dispatch({ type: LOGIN_FAILED }),
        updateUSER: payload => UpdateProfile({ ...payload, dispatch }),
      };
    }
)(Profile);
const rtl = I18nManager.isRTL != (localization.getLanguage()=='ar');

const styles = StyleSheet.create({
    container:{
        // justifyContent:'center',
        alignItems:'center',
        backgroundColor:COLORS.white,
        flex:1
    },
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
        height:height*0.07,
        zIndex:5
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
        transform:[{ rotate:!(I18nManager.isRTL&&rtl)?'180deg':'0deg'}],
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