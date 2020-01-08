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
const InitialDrawer = props => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <View>
        <Text
          style={{
            fontSize: RFPercentage(3),
            marginBottom: moderateScale(10)
          }}
        >
          التسجيل كـ
        </Text>
        <View
          style={{
            flexDirection: "row",
            width: "80%",
            borderWidth: 1,
            borderColor: "#57B235",
            alignSelf: "center"
          }}
        >
          <TouchableOpacity
            onPress={() => {
              props.changeType("Customer");
            }}
            style={{
              flex: 1,
              padding: moderateScale(10),
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              backgroundColor: props.type === "Customer" ? "#57B235" : null
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: RFValue(15),
                color: props.type === "Customer" ? "white" : "gray"
              }}
            >
              عميل
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.changeType("Provider");
            }}
            style={{
              flex: 1,
              padding: moderateScale(5),
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: props.type === "Provider" ? "#57B235" : null
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: RFValue(15),
                color: props.type === "Provider" ? "white" : "gray"
              }}
            >
              مقدم خدمة
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            paddingVertical: moderateScale(5)
          }}
        >
          <View
            style={{
              position: "absolute",
              left: -width * 0.2,
              right: -width * 0.2,
              // width: width * 0.85,
              borderBottomColor: "#ccc",
              // backgroundColor: "#ccc",
              borderBottomWidth: 1,
              paddingVertical: moderateScale(5)
            }}
          />
        </View>

        <View style={{ width: "80%" }}>
          <SideButton
            onPress={() => {
              props.navigation.navigate("Main");
            }}
            title="الرئيسية"
            icon="home"
          />
          <SideButton
            title="تسجيل الدخول"
            icon="login"
            onPress={() => {
              props.navigation.navigate("Login");
            }}
          />
          <SideButton
            title="تسجيل حساب جديد"
            icon="account-plus"
            onPress={() => {
              props.navigation.navigate("Register");
            }}
          />
          {/* <SideButton
              title="نسيت كلمة المرور"
              icon="lock-reset"
              onPress={() => {
                props.navigation.navigate("Register");
              }}
            /> */}
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
    changeType: type => dispatch({ type: "changeType", payload: type })
  };
};
export default connect(
  null,
  mapDispatchToProps
)(InitialDrawer);
