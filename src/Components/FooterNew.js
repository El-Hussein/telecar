import React from 'react';

import {
    StyleSheet,
    View,
    Text,
    Image,
    StatusBar,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
    I18nManager
} from 'react-native';
import localization from '../localization/localization';
import { width, height, COLORS, IMAGES } from '../config';
import Icon from "react-native-vector-icons/FontAwesome5";
import { withNavigation } from 'react-navigation';
import { connect } from "react-redux";
import Store from "../Redux/index";

class Footer extends React.Component{
    state = {
        LoginType:'',
        rtl:I18nManager.isRTL != (localization.getLanguage()=='ar'),
    }

    async componentWillMount(){
        this.setState({
            LoginType: await AsyncStorage.getItem('userType'),
        })
    }
    
    render(){
        return(
            <View>
                <View style={styles.footer}>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate(this.state.LoginType!='Merchant'?'Home':'Merchant')} style={styles.footerItem}>
                        <Image source={IMAGES.favourit} style={styles.footerItemIcon}/>
                        <Text style={styles.footerItemText}> {localization.home} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('Offers')} style={styles.footerItem}>
                        <Image source={IMAGES.favourit} style={styles.footerItemIcon}/>
                        <Text style={styles.footerItemText}> {localization.offers} </Text>
                    </TouchableOpacity>
                    <View style={styles.footerItem}>
                    
                    </View>
                    <TouchableOpacity onPress={()=>{
                        if(this.props.user)
                            this.props.navigation.navigate('Chats')
                        else{
                            this.props.navigation.navigate('Auth')
                            const AlertMessage = Store.getState().Config.alert;
                            AlertMessage("error","خطـأ", localization.shouldLoginFirst);
                        }
                    }} style={styles.footerItem}>
                        <Image source={IMAGES.favourit} style={styles.footerItemIcon}/>
                        <Text style={styles.footerItemText}> {localization.myMessages} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{
                        if(this.props.user)
                            this.props.navigation.navigate('Profile')
                        else{
                            this.props.navigation.navigate('Auth')
                            const AlertMessage = Store.getState().Config.alert;
                            AlertMessage("error", localization.shouldLoginFirst);
                        }
                    }} style={styles.footerItem}>
                        <Image source={IMAGES.favourit} style={styles.footerItemIcon}/>
                        <Text style={styles.footerItemText}> {localization.myAccount} </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.search}>
                    <Icon onPress={()=>this.props.navigation.navigate('Search')} name="search" size={width*0.05} color={COLORS.white}/>
                </View>
            </View>
        )
    }
}

const mapStateToPros = state => {
    return {
      user: state.auth.user
    };
};

export default connect(mapStateToPros)(withNavigation(Footer));

// export default Footer;
// export default withNavigation(Footer);
const rtl = I18nManager.isRTL != (localization.getLanguage()=='ar');
const styles = StyleSheet.create({
    footer:{
        flexDirection:rtl?'row-reverse':'row',
        justifyContent:'space-around',
        alignItems:'center',  
        height:height*0.08,
        width:width,
        borderTopColor:COLORS.gray,
        borderTopWidth:width*0.002,
      //   backgroundColor:'red',
    },
    footerItem:{
        width:width*0.19,
        justifyContent:'center',
        alignItems:'center',
    },
    footerItemIcon:{
        width:width*0.06,
        height:width*0.06,
        resizeMode:'contain',
    },
    footerItemText:{
        fontSize:width*0.03,
        color:COLORS.black,
    },
    search:{
        position:'absolute',
        backgroundColor:COLORS.main,
        width:width*0.12,
        height:width*0.12,
        borderRadius:width*0.06,
        justifyContent:'center',
        alignItems:'center',
        bottom:height*0.05,
        right:width*0.45,
        elevation:3
    }
})