import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import {
  width,
  height,
  moderateScale,
  scale,
  verticalScale,
  colors
} from "@config";
import { connect } from "react-redux";
import { Segment, Button } from "native-base";
import { Login_Type } from "../../Redux/types";
import SideButton from "./SideButton";
const ProviderDrawer = props => {
  return (
    <View style={{}}>
      <View>
        <View style={{}}>
          <SideButton
            title="الرئيسية"
            icon="home"
            onPress={() => {
              props.navigation.navigate("Profile");
            }}
          />
          {/* <SideButton
            title="متابعة الصفقات"
            icon="crosshairs"
            onPress={() => {
              props.navigation.navigate("DealFollow");
            }}
          /> */}
          <SideButton
            title="معاملاتي "
            icon="clipboard-outline"
            onPress={() => {
              props.navigation.navigate("MyHandels", { index: 1 });
              // props.navigation.navigate("AcceptedDeals");
            }}
          />
          <SideButton
            title="الرصيد"
            icon="bank"
            onPress={() => {
              props.navigation.navigate("Charge");
            }}
          />
        </View>
      </View>
    </View>
  );
};
const Styles = StyleSheet.create({
  Icon: {
    marginRight: moderateScale(15),
    width: "20%",
    textAlign: "right",
    textAlignVertical: "center",
    alignSelf: "center",
    height: "100%",
    alignSelf: "center"
  },
  Text: {
    alignSelf: "flex-end",
    textAlignVertical: "center",
    textAlign: "left",
    width: "60%",
    flexWrap: "wrap",
    paddingLeft: moderateScale(3)
  },
  TouchableOpacity: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: moderateScale(10)
  }
});
const mapDispatchToProps = dispatch => {
  return {
    changeType: type => dispatch({ type: Login_Type, payload: type })
  };
};
export default connect(
  null,
  mapDispatchToProps
)(ProviderDrawer);
