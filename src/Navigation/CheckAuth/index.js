import React from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import Splash from "react-native-splash-screen";
import Spinner from "react-native-spinkit";
import { GetAppInitials } from "../../Redux/actions/Config";

const CheckAuth = props => {
  // Splash.hide();
  props.getInitials();
  if (props.type === "Customer" && props.user) {
    props.navigation.navigate("Customer");
  } else if (props.type === "Merchant" && props.user) {
    props.navigation.navigate("Merchant");
  } else {
    props.navigation.navigate("Main");
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Spinner
        style={{
          justifyContent: "center",
          alignSelf: "center",
          alignItems: "center"
        }}
        isVisible={props.loading}
        type="FadingCircle"
        color={"#57B235"}
      />
    </View>
  );
};
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
