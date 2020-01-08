import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    I18nManager,
    Image,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import { width, COLORS, height, IMAGES, baseUrl } from '../config';
import Icon from "react-native-vector-icons/FontAwesome5";
import localization from '../localization/localization';
import { connect } from "react-redux";
import { logout } from '../Redux/actions/AuthActions';
import RNRestart from 'react-native-restart';

class ContentDrawer extends React.Component{
    
    state = {
        LoginType:'',
        count:0,
    }

    async componentWillMount(){
        this.setState({
            LoginType: await AsyncStorage.getItem('userType'),
        })
    }

    async _changeLang(lang){
        AsyncStorage.setItem("@lang", lang).then(()=>{
            console.log("language changed to : " + lang=="en"?"ENGLISH":"ARABIC");
            RNRestart.Restart();
        }).catch((err)=>{
            console.log("ERROR change Language: " + err);
        })
    }

    render(){
        // console.log(this.props.user);
        let count = 0;
        return(
            <View style={styles.container}>
                {this.props.user?
                <View style={{marginTop:height*0.05, justifyContent:'center', alignItems:'center', width:"100%", marginBottom:height*0.05}}>
                    <Icon name="bars" style={{position:'absolute', right:width*0.02, top:0}} onPress={()=>this.props.navigation.toggleDrawer()} size={width*0.06} color={COLORS.white}/>
                    <Image source={this.props.user.avatar?{uri:baseUrl + this.props.user.avatar}:IMAGES.avatar} style={styles.avatar}/>
                    <Text style={styles.text}> {this.props.user.name} </Text>
                </View>
                :
                <View style={{paddingVertical:height*0.03, backgroundColor:"rgb(220,220,220)", justifyContent:'center', alignItems:'center', width:"100%"}}>
                    <Image source={IMAGES.logo} style={{width:"100%", height:width*0.35, resizeMode:'contain'}}/>
                    {/* <TouchableOpacity onPress={()=>this.props.navigation.navigate('Auth')} style={{backgroundColor:COLORS.secondary, borderRadius:width*0.02, padding:width*0.02}}>
                        <Text style={{fontSize:width*0.04, color:COLORS.white}}> {localization.login} </Text>
                    </TouchableOpacity> */}
                </View>
                }
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Favourite')} style={{flexDirection:"row", paddingHorizontal:width*0.02, height:height*0.055, backgroundColor:'rgba(80,80,80,0.3)', alignItems:'center', width:"100%", justifyContent:'space-between'}}>
                    <Icon name="home" size={width*0.06} color={COLORS.secondary}/>
                    <Text style={[styles.text, {width:"88%"}]}> {localization.favourite} </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Aboutus')} style={{flexDirection:"row", paddingHorizontal:width*0.02, height:height*0.055, backgroundColor:'none', alignItems:'center', width:"100%", justifyContent:'space-between'}}>
                    <Icon name="comment-dots" size={width*0.06} color={COLORS.secondary}/>
                    <Text style={[styles.text, {width:"88%"}]}> {localization.aboutUs} </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('TermsAndConditions')} style={{flexDirection:"row", paddingHorizontal:width*0.02, height:height*0.055, backgroundColor:'rgba(80,80,80,0.3)', alignItems:'center', width:"100%", justifyContent:'space-between'}}>
                    <Icon name="clipboard-list" size={width*0.06} color={COLORS.secondary}/>
                    <Text style={[styles.text, {width:"88%"}]}> {localization.termsConditions} </Text>
                </TouchableOpacity>
                {this.props.user&&<TouchableOpacity onPress={()=>this.props.navigation.navigate('Profile')} style={{flexDirection:"row", paddingHorizontal:width*0.02, height:height*0.055, backgroundColor:'none', alignItems:'center', width:"100%", justifyContent:'space-between'}}>
                    <Icon name="user" size={width*0.06} color={COLORS.secondary}/>
                    <Text style={[styles.text, {width:"88%"}]}> {localization.profile} </Text>
                </TouchableOpacity>}
                {!this.props.user&&<TouchableOpacity onPress={()=>this.props.navigation.navigate('Auth')} style={{flexDirection:"row", paddingHorizontal:width*0.02, height:height*0.055, backgroundColor:this.props.user?'rgba(80,80,80,0.3)':'none', alignItems:'center', width:"100%", justifyContent:'space-between'}}>
                    <Icon name="sign-in-alt" size={width*0.06} color={COLORS.secondary}/>
                    <Text style={[styles.text, {width:"88%"}]}> {localization.signIn} </Text>
                </TouchableOpacity>}

                <TouchableOpacity onPress={()=>this._changeLang(localization.getLanguage()=='ar'?'en':'ar')} style={{flexDirection:"row", paddingHorizontal:width*0.02, height:height*0.055, backgroundColor:this.props.user?'none':'rgba(80,80,80,0.3)', alignItems:'center', width:"100%", justifyContent:'space-between'}}>
                    {localization.getLanguage()=='ar'?
                        <Image source={IMAGES.UKflage} style={{width:width*0.06, height:width*0.06, resizeMode:'contain'}}/>
                        :
                        <Image source={IMAGES.Aflage} style={{width:width*0.06, height:width*0.06, resizeMode:'contain'}}/>
                    }
                    <Text style={[styles.text, {width:"88%"}]}> {localization.getLanguage()=='ar'?"English":"العربية"} </Text>
                </TouchableOpacity> 

                {this.props.user&&<TouchableOpacity onPress={()=>{this.props.logout(); this.props.navigation.navigate('Home')}} style={{flexDirection:"row", paddingHorizontal:width*0.02, height:height*0.055, backgroundColor:!this.props.user?'rgba(80,80,80,0.3)':'none', alignItems:'center', width:"100%", justifyContent:'space-between'}}>
                    <Icon name="sign-out-alt" size={width*0.06} color={COLORS.secondary}/>
                    <Text style={[styles.text, {width:"88%"}]}> {localization.logout} </Text>
                </TouchableOpacity>}

            </View>
        )
    }
}

const mapStateToPros = state => {
    return {
      user: state.auth.user
    };
};
function mapDispatchToProps(dispatch) {
    return {
        logout: ()=>logout(dispatch)
    }
}
export default connect(mapStateToPros, mapDispatchToProps)(ContentDrawer);
  

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        height:height,
        backgroundColor:COLORS.main
    },
    text:{
        color:COLORS.white,
        fontSize:width*0.05,
        textAlign:"left",
        textAlignVertical:'center'
    },
    avatar:{
        width:width*0.22,
        height:width*0.22,
        borderRadius:width*0.11,
        borderColor:COLORS.secondary,
        borderWidth:width*0.006
    }
})
