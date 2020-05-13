import React from 'react';

import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    Image,
    KeyboardAvoidingView,
    Platform,
    I18nManager,
    TouchableOpacity,
    PermissionsAndroid
} from 'react-native';
import localization from '../../localization/localization';
import Header from '../../Components/HeaderNew';
import Footer from '../../Components/FooterNew';
import CustomInput from '../../Components/CustomInput';
import { IMAGES, height, width, COLORS } from '../../config';
import {validateEmail, validateFirstName, validateLastName, validatePassword, validatePasswordAndConfirm, validatePasswordConfirm, validatePhone} from '../../config/Validation';
import Icon from "react-native-vector-icons/FontAwesome5";
import ImagePicker from 'react-native-image-picker';
import { connect } from "react-redux";
import { AddOrder } from "../../Redux/actions/Customer";
import Spinner from "react-native-spinkit";
import Store from "../../Redux/index";

class AddProduct extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        loading: false,
        pic: null,
        selectedDepartment:'',
        city:'',
        ProductTitle:'',
        ProductDetsils:'',
        ProductPrice:'',
        descount:'',
        facebookAccount:'',
        phoneNumber:'',
        whatsApp:'',
        latitude: 37.78825,
        longitude: -122.4324,
        rtl:I18nManager.isRTL != (localization.getLanguage()=='ar'),
        };
    }

    _getCurrentLocation = async () =>{
        console.log('entered')
        let loc = {
            latitude: 37.78825,
            longitude: -122.4324
          };
        navigator.geolocation.getCurrentPosition(
           (position) => {
               console.log('entered position')
               console.log(position)
               loc = { longitude: position.longitude, latitude: position.latitude };
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
        return loc;
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

    componentWillMount(){
        if(Platform.OS === 'android'){
            this.requestLocationPermission().then(loc => {
                this.setState({
                    ...loc
                })
            });
         }else{
            this._getCurrentLocation().then(loc => {
                this.setState({
                    ...loc
                })
            });
         }
    }

    reset(){
        this.setState({
            loading: true,
            pic: null,
            picError: null,
            selectedDepartment:'',
            selectedDepartmentError:'',
            city:'',
            cityError:'',
            ProductTitle:'',
            ProductTitleError:'',
            ProductDetsils:'',
            ProductDetsilsError:'',
            ProductPrice:'',
            ProductPriceError:'',
            descount:'',
            descountError:'',
            facebookAccount:'',
            facebookAccountError:'',
            phoneNumber:'',
            phoneNumberError:'',
            whatsApp:'',
            whatsAppError:'',
            latitude: 37.78825,
            latitudeError: 37.78825,
            longitude: -122.4324,
            longitudeError: -122.4324,
        })
    }

    _selectImage(){
        //     if(this._validate())return;
        ImagePicker.showImagePicker({}, response => {
            console.log("Image Response = ", response);
            // resizebase64(base64, maxWidth, maxHeight);
            if (response.didCancel) {
              // console.log("User cancelled image picker");
            } else if (response.error) {
              // console.log("ImagePicker Error: ", response.error);
            } else if (response.customButton) {
              // console.log(
              //   "User tapped custom button: ",
              //   response.customButton
              // );
            } else {
              // const source = { uri: response.uri };
              const source = {
                uri: "data:image/jpeg;base64," + response.data
              };
              this.setState({
                pic: {
                    uri: "data:image/jpeg;base64," + response.data,
                    uri: response.uri,
                    type: response.type,
                    name: response.fileName
                }
              })
              console.log(response.fileName)
              this.setState({
                  imageName:response.fileName
              })
            }
        });
    }
    
    _AddProduct(){
        this.setState({loading:true});
        if(!this._validate())return;
        let formData = new FormData();
        formData.append("category_id", this.state.selectedDepartment.id);
        formData.append("city", this.state.city.id);
        formData.append("name", this.state.ProductTitle);
        formData.append("details", this.state.ProductDetsils);
        formData.append("product_image", this.state.pic);
        formData.append("price", this.state.ProductPrice);
        formData.append("discount", this.state.descount);
        formData.append("call_phone", this.state.phoneNumber);
        formData.append("whats_number", this.state.whatsApp);
        formData.append("lat", this.props.user.lat);
        formData.append("lan", this.props.user.lan);
        formData.append("user_id", this.props.user.id);

        AddOrder(formData, () => {
            this.reset();
            this.setState({loading:false});
            this.props.navigation.navigate("Products");
        }).catch(error => {
            const AlertMessage = Store.getState().Config.alert;
            this.setState({loading:false});
            AlertMessage("error", "خطـأ", JSON.stringify(error));
        });
        this.setState({loading:false});
    }

    _validate(){
        this.setState({
            picError:this.state.pic?'':localization.thisFieldIsRequired,
            selectedDepartmentError:this.state.selectedDepartment?'':localization.thisFieldIsRequired,
            cityError:this.state.city?'':localization.thisFieldIsRequired,
            ProductTitleError:this.state.ProductTitle?'':localization.thisFieldIsRequired,
            ProductDetsilsError:this.state.ProductDetsils?'':localization.thisFieldIsRequired,
            ProductPriceError:this.state.ProductPrice?'':localization.thisFieldIsRequired,
            descountError:this.state.descount?'':localization.thisFieldIsRequired,
            phoneNumberError:this.state.phoneNumber?'':localization.thisFieldIsRequired,
            whatsAppError:this.state.whatsApp?'':localization.thisFieldIsRequired,
            latitudeError:this.state.latitude?'':localization.thisFieldIsRequired,
            longitudeError:this.state.longitude?'':localization.thisFieldIsRequired,
            
        })
        return this.state.pic && this.state.selectedDepartment && this.state.city && this.state.ProductTitle && this.state.ProductDetsils && this.state.ProductPrice && this.state.descount && this.state.phoneNumber && this.state.whatsApp && this.state.latitude && this.state.longitude;
    }
    
    render(){
        // console.log(this.props.categories)
        return(
            <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : null}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
            style={{backgroundColor:COLORS.white}}
            >
            <View>
                <Header title={localization.home}/>
                <ScrollView contentContainerStyle={{alignItems:'center', marginTop:height*0.05}}>
                <View style={styles.container}>
            
                    {/* <Image source={IMAGES.loginBG} style={styles.loginBG}/> */}
                    <CustomInput 
                        placeholder={localization.selectDepartment}
                        error={this.state.selectDepartmentError}
                        reference={ref => this.selectDepartmentRef = ref}
                        iconName="user"
                        inputType="menu"
                        data={this.props.categories}
                        onSelect={(data)=>{
                            this.setState({
                                selectedDepartment:data
                            })
                            console.log('selected department is : ' + data);
                        }}
                        value={this.state.selectedDepartment?this.state.selectedDepartment.name:null}
                        />
                    <CustomInput 
                        placeholder={localization.SelectCity}
                        error={this.state.SelectCityError}
                        reference={ref => this.SelectCityRef = ref}
                        iconName="user"
                        inputType="menu"
                        data={this.props.cities}
                        onSelect={(data)=>{
                            this.setState({
                                city:data
                            })
                            console.log('selected city is : ' + data);
                        }}
                        value={this.state.city?this.state.city.name:null}
                        />
            
                    <CustomInput 
                        placeholder={localization.ProductTitle}
                        error={this.state.ProductTitleError}
                        onChangeText={(ProductTitle)=>this.setState({ProductTitle})}
                        reference={ref => this.ProductTitleRef = ref}
                        onSubmitEditing={()=>this.ProductDetsilsRef.focus()}
                        value={this.state.ProductTitle}
                        returnKeyType="next"
                        iconName="barcode"
                        />
                    <CustomInput 
                        placeholder={localization.ProductDetsils}
                        error={this.state.ProductDetsilsError}
                        onChangeText={(ProductDetsils)=>this.setState({ProductDetsils})}
                        reference={ref => this.ProductDetsilsRef = ref}
                        // onSubmitEditing={()=>this.lastNameRef.focus()}
                        value={this.state.ProductDetsils}
                        returnKeyType="next"
                        iconName="barcode"
                        multiline
                        />
                    <CustomInput 
                        placeholder={localization.AddPhoto}
                        error={this.state.AddPhotoError}
                        reference={ref => this.AddPhotoRef = ref}
                        iconName="user"
                        inputType="image"
                        onPress={this._selectImage.bind(this)}
                        imageName={this.state.imageName}
                        value={this.state.pic}
                        />
            
                    <CustomInput 
                        placeholder={localization.ProductPrice}
                        error={this.state.ProductPriceError}
                        onChangeText={(ProductPrice)=>this.setState({ProductPrice})}
                        reference={ref => this.ProductPriceRef = ref}
                        onSubmitEditing={()=>this.descountRef.focus()}
                        returnKeyType="next"
                        iconName="user"
                        value={this.state.ProductPrice}
                        keyboardType="numeric"
                        />
                    <CustomInput 
                        placeholder={localization.descount}
                        error={this.state.descountError}
                        onChangeText={(descount)=>this.setState({descount})}
                        reference={ref => this.descountRef = ref}
                        onSubmitEditing={()=>this.phoneNumberRef.focus()}
                        returnKeyType="next"
                        value={this.state.descount}
                        iconName="user"
                        keyboardType="numeric"
                        />

                    <CustomInput 
                        placeholder={localization.phoneNumber}
                        error={this.state.phoneNumberError}
                        onChangeText={(phoneNumber)=>this.setState({phoneNumber})}
                        reference={ref => this.phoneNumberRef = ref}
                        onSubmitEditing={()=>this.whatsAppRef.focus()}
                        returnKeyType="next"
                        value={this.state.phoneNumber}
                        iconName="phone"
                        keyboardType="numeric"
                        />
                    <CustomInput 
                        placeholder={localization.whatsApp}
                        error={this.state.whatsAppError}
                        onChangeText={(whatsApp)=>this.setState({whatsApp})}
                        reference={ref => this.whatsAppRef = ref}
                        // onSubmitEditing={()=>this.lastNameRef.focus()}
                        returnKeyType="go"
                        keyboardType="numeric"
                        value={this.state.whatsApp}
                        iconName="whatsapp"
                        />
                    
                    {this.state.loading ? (
                        <TouchableOpacity disabled style={styles.loginButton}>
                            <Spinner
                                style={{
                                justifyContent: "center",
                                alignSelf: "center",
                                alignItems: "center"
                                }}
                                isVisible={this.state.loading}
                                type="Circle"
                                color={"white"}
                            />
                        </TouchableOpacity>
                    ) :
                    <TouchableOpacity onPress={()=>{this._AddProduct();}} style={styles.loginButton}>
                        <Image source={IMAGES.loginArrow} style={styles.loginArrow}/>
                        <Text style={styles.buttonText}> {localization.AddProduct} </Text>
                    </TouchableOpacity>
                    }
                    {/* <View style={{justifyContent:'space-between', width:width*0.75, marginVertical:height*0.01, flexDirection:I18nManager.isRTL?'row':'row-reverse'}}>
                        <CheckBox size={width*0.05} textStyle={styles.text} uncheckedColor={COLORS.textBlack} checkedColor={COLORS.textBlack} onPress={()=>this.setState({rememberMe:!this.state.rememberMe})} containerStyle={styles.default} checked={this.state.rememberMe} title={localization.rememberMe}/>
                        <Text onPress={()=>this.props.navigation.navigate('ForgetPassword')} style={styles.text}> {localization.forgetPassword} </Text>
                    </View> */}
            
                    {/* <View style={{flexDirection:I18nManager.isRTL?'row':'row-reverse', marginTop:width*0.05}}>
                        <Text style={styles.text}> {localization.createNewAccount} </Text>
                        <Text onPress={()=>this.props.navigation.navigate('Register')} style={[styles.text, {color:COLORS.secondery, textDecorationLine:'underline'}]}>{localization.createOne}</Text>
                    </View> */}
                </View>
                </ScrollView>
                {/* <Footer /> */}
            </View>
            </KeyboardAvoidingView>
        )
    }
}
export default connect(state => {
    return {
      cities: state.Config.cities,
      categories: state.Config.categories,
      strips: state.Config.strips,
      services: state.Config.services,
      servicesTypes: state.Config.servicesTypes,
      user: state.auth.user
    };
})(AddProduct);
const rtl = I18nManager.isRTL != (localization.getLanguage()=='ar');
const styles = StyleSheet.create({
    container: {
        height:height*1.5,
        paddingBottom:width*0.2
    },
    logoText:{
        // color: COLORS.textBlack,
        color:"rgba(80,80,80,1)",
        marginVertical: width*0.1,
        fontSize: width*0.08,
        fontWeight:'bold',
        width: width*0.8,
        textAlign:'center',
        textAlignVertical:'center',
        marginTop:height*0.1,
    },
    loginArrow:{
        width:width*0.12,
        height:width*0.08,
        resizeMode:'contain',
        // backgroundColor:'red',
        transform:[{ rotate:!I18nManager.isRTL&&!rtl?'0deg':'180deg'}],
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
    text:{
        color:COLORS.textBlack,
        fontWeight:'bold',
        textAlign:'center',
        textAlignVertical:'center'
    },
    loginBG:{
        position:'absolute',
        height:height,
        width:width,
        resizeMode:'stretch', 
        opacity:0.6

    }
})
