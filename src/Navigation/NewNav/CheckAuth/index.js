import React from "react";
import { View, Text, AsyncStorage } from "react-native";
import { connect } from "react-redux";
import Splash from "react-native-splash-screen";
import Spinner from "react-native-spinkit";
import { GetAppInitials } from "../../../Redux/actions/Config";


class CheckAuth extends React.Component{
  
  componentDidMount(){
    this.init();
  }
  
  getType = async()=>{
    return await AsyncStorage.getItem('userType');
  }
  
  async init (){
  // Splash.hide();
    this.props.getInitials();
    console.log("LOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOL")
    let userType = 'Customer'
    data = await this.getType();
    console.log(data);
    userType = data?data:'Customer';
    this.props.user&&console.log(this.props.user);
    console.log("LOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOL")
    if (userType == "Merchant" && this.props.user) {
      this.props.navigation.navigate("Merchant");
    }else{
      this.props.navigation.navigate("Customer");
    }
  }

  render(){
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Spinner
          style={{
            justifyContent: "center",
            alignSelf: "center",
            alignItems: "center"
          }}
          isVisible={this.props.loading}
          type="FadingCircle"
          color={"#57B235"}
        />
      </View>
    );
  }
}
const mapStateToPros = state => {
  return {
    type: state.Config.userType,
    user: state.auth.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getInitials: () => GetAppInitials(dispatch)
  };
};
export default connect(
  mapStateToPros,
  mapDispatchToProps
)(CheckAuth);
