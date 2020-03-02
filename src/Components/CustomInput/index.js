import React from 'react'

import {
    Image,
    StyleSheet,
    View,
    Text,
    I18nManager,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { IMAGES, height, width, COLORS } from '../../config';
import Icon from "react-native-vector-icons/FontAwesome5";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import localization from '../../localization/localization';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';

export default class CustomInput extends React.Component {
    constructor(){
        super();
        this.state = {
            error:true,
        }
    }

    
    render(){
        if(this.props.inputType=='image'){
            return (
                <View style={{minHeight:height*0.1}}>
                    {/* {this.state.focused?<Text style={styles.inputHeader}> {this.props.placeholder} </Text>:null} */}
                    <TouchableOpacity
                    onPress={this.props.onPress}
                    style={styles.textInputCotainer}>
                        <View>
                            <EvilIcons name="image" size={width*0.1} color={COLORS.main} />                
                        </View>
                        <Text style={[styles.textInput, {fontSize:width*0.04, textAlign:I18nManager.isRTL?'left':'right'}]}> {this.props.imageName&&this.props.pic==null?this.props.imageName.length>30?this.props.imageName.substr(0,30) + '...':this.props.imageName:localization.AddPhoto} </Text>
                    </TouchableOpacity>
                    {this.props.error?<Text style={styles.inputError}> {this.props.error} </Text>:null}
                </View>

            )
        }else if(this.props.inputType=='menu'){
            return (
                <View style={{minHeight:height*0.1}}>
                    {/* {this.state.focused?<Text style={styles.inputHeader}> {this.props.placeholder} </Text>:null} */}
                    {/* <TouchableOpacity
                    onPress={this.props.onPress}
                    style={styles.textInputCotainer}> */}
                        {/* <Menu style={{width:width*0.88, borderWidth:width*0.002, height:width*0.07, marginBottom:width*0.02, justifyContent:'center', borderColor:COLORS.main}}> */}
                        <Menu onSelect={this.props.onSelect} style={styles.textInputCotainer}>
                            <MenuTrigger  text={this.props.value?this.props.value:this.props.placeholder} customStyles={{triggerOuterWrapper:{width:width*0.88}, triggerWrapper:{marginHorizontal:width*0.06},triggerText:{color:COLORS.main, paddingHorizontal:width*0.04,fontSize:width*0.04}}}/>
                            <MenuOptions customStyles={{optionText:{color:COLORS.main},optionsContainer:{alignItems:I18nManager.isRTL?'flex-start':'flex-end', marginTop:width*0.09, marginHorizontal:width*0.06, backgroundColor:COLORS.white}}}>
                                {this.props.data.map((item)=>{
                                // console.log("data from menu : " + JSON.stringify(item));
                                return (
                                    <MenuOption key={item.id} value={item} customStyles={{optionText:{width:width*0.46, borderBottomColor:COLORS.gray, borderBottomWidth:width*0.002, textAlign:I18nManager.isRTL?'left':'right', paddingHorizontal:width*0.05, color:COLORS.main}}} text={item.name} />
                                )})}
                                {/* <MenuOption customStyles={{optionText:{width:width*0.46, borderBottomColor:COLORS.gray, borderBottomWidth:width*0.002, textAlign:I18nManager.isRTL?'left':'right', paddingHorizontal:width*0.05, color:COLORS.main}}} text='delete'/>
                                <MenuOption customStyles={{optionText:{width:width*0.46, textAlign:I18nManager.isRTL?'left':'right', paddingHorizontal:width*0.05, color:COLORS.main}}} text='Disabled' /> */}
                            </MenuOptions>
                        </Menu>
                        <View style={{position:'absolute', top:width*0.02, right:width*0.02}}>
                            <Icon name="arrow-down" size={width*0.05} color={COLORS.main} />                
                        </View>
                        <View style={{position:'absolute', top:width*0.01, right:width*0.8}}>
                            <Icon name="barcode" size={width*0.06} color={COLORS.main} />                
                        </View>
                    {/* </TouchableOpacity> */}
                    {this.props.error?<Text style={styles.inputError}> {this.props.error} </Text>:null}
                </View>

            )
        }else{
            return (
                <View style={{minHeight:this.props.lastItem?height*0.06:height*0.1}}>
                    {/* {this.state.focused?<Text style={styles.inputHeader}> {this.props.placeholder} </Text>:null} */}
                    <View style={styles.textInputCotainer}>
                        <View style={{width:width*0.1, justifyContent:'center', alignItems:'center'}}>
                            <Icon name={this.props.iconName} size={width*0.06} color={COLORS.main} />                
                        </View>
                        <TextInput
                            placeholder={this.props.placeholder}
                            style={styles.textInput}
                            // onFocus={()=>this.setState({focused:true})}
                            onSubmitEditing={this.props.onSubmitEditing}
                            placeholderTextColor={COLORS.main}
                            secureTextEntry={this.props.password && !this.props.text}
                            onChangeText={this.props.onChangeText}
                            returnKeyType={this.props.returnKeyType}
                            returnKeyLabel={this.props.returnKeyLabel}
                            keyboardType={this.props.keyboardType}
                            blurOnSubmit={this.props.returnKeyLabel=="go"}
                            ref={this.props.reference}
                            value={this.props.value}
                            multiline={this.props.multiline}
                            />
                        {this.props.password?
                            <TouchableOpacity onPress={this.props.read} style={{position:'absolute', right:width*0.02}}>
                                <Icon name={this.props.text?"eye":"eye-slash"} size={width*0.05} color={COLORS.main} /> 
                            </TouchableOpacity>
                        : 
                        null}
                    </View>
                    {this.props.error?<Text style={styles.inputError}> {this.props.error} </Text>:null}
                </View>

            )
        }
    }
}

const styles = StyleSheet.create({
    textInputCotainer:{
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        // borderRadius:width*0.01,
        borderBottomWidth:width*0.002,
        borderBottomColor:COLORS.main,
        width:width*0.88,
        minHeight: height*0.04,
        maxHeight: height*0.15,
        backgroundColor:COLORS.text,
        // padding:width*0.01,
        // elevation: 3,
        // marginTop:height*0.02,
    },
    textInput:{
        padding:0,
        textAlign:!I18nManager.isRTL?'left':'right',
        textAlignVertical:'center',
        width:width*0.8,
        fontSize:width*0.045,
        color:COLORS.main
    },
    inputHeader:{
        fontSize:width*0.03,
        color:COLORS.textBlack,
        marginBottom:width*0.02
    },
    inputError:{
        fontSize:width*0.03,
        color:'red',
        marginTop:width*0.02,
        marginHorizontal:width*0.02
    }
});
