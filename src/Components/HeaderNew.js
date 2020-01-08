import React from 'react';

import {
    StyleSheet,
    View,
    Text,
    Image,
    StatusBar,
    TouchableOpacity,
    I18nManager,
    TextInput
} from 'react-native';
import localization from '../localization/localization';
import { width, height, COLORS, IMAGES } from '../config';
import Icon from "react-native-vector-icons/FontAwesome5";
import { withNavigation } from 'react-navigation';


const MyText = (text, style)=>{
    return(
        <Text style={[style, styles.text]}> </Text>
    )
}

class Header extends React.Component{
    constructor(props){
        super(props);
        this.state={
            text:props.navigation.getParam('searchText')?props.navigation.getParam('searchText'):'',
            rtl:I18nManager.isRTL != (localization.getLanguage()=='ar'),
        }
    }

    componentWillReceiveProps(){
        this.setState({
            text:this.props.navigation.getParam('searchText')?this.props.navigation.getParam('searchText'):this.state.text,
        })
    }

    render(){
        let notificationCount = 4;
        return(
            <View style={styles.header}>
                <StatusBar backgroundColor={COLORS.main}/>   
                <View style={[styles.headerTop, {flexDirection:this.state.rtl?'row-reverse':'row'}]}>
                    <Icon name="bars" onPress={()=>this.props.navigation.toggleDrawer()} size={width*0.05} color={COLORS.white}/>
                    <View>
                        <Icon name="bell" onPress={()=>this.props.navigation.navigate('Notifications')} size={width*0.05} color={COLORS.white}/>
                        {notificationCount?<Text style={[styles.notificationCount, this.state.rtl==true?{left:width*0.04}:null]}>{notificationCount}</Text>:null}
                    </View> 
                </View>
                {this.props.userType!='Merchant' && 
                <TouchableOpacity disabled={!this.props.search} onPress={()=>this.props.navigation.navigate('Search')} style={[styles.headerBottom, {flexDirection:this.state.rtl?'row-reverse':'row'}]}>
                    <TextInput 
                        placeholder={localization.searchText}
                        placeholderTextColor={COLORS.white}
                        style={styles.textInput}
                        onChangeText={this.props.searchOnChangeText}
                        value={this.props.searchText?this.props.searchText:''}
                        onFocus={!this.props.search?()=>this.props.navigation.navigate('Search'):null}
                        // onEndEditing={this.props.searchOnPress}
                        // onSubmitEditing={this.props.searchOnPress}
                    />       
                    <Icon name="search" onPress={!this.props.search?()=>this.props.navigation.navigate('Search'):this.props.searchOnPress} size={width*0.05} color={COLORS.white}/>
                </TouchableOpacity>
                }
            </View>
        )
    }
}
const rtl = I18nManager.isRTL != (localization.getLanguage()=='ar');
// export default Header;
export default withNavigation(Header);

const styles = StyleSheet.create({
    header:{
        height:height*0.18,
        justifyContent:'flex-start',
        alignItems:'center',
        width:width,
        backgroundColor:COLORS.main,
        paddingHorizontal:width*0.03,
        position:'relative',
        zIndex:0
    },
    headerTop:{ 
        flexDirection:!rtl?'row-reverse':'row',
        justifyContent:'space-between',
        alignItems:'center',
        height: height*0.07,
        width:width*0.94,
        // backgroundColor:'red'
    },
    headerBottom:{
        flexDirection:!rtl?'row-reverse':'row',
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
        width:width*0.87,
        padding:0,
        // textAlign:'right'
        // backgroundColor:'red'
    },
})