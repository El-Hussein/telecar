import React, { Fragment } from "react";
import { View, Image, ScrollView, Text } from "react-native";

import {
  width,
  height,
  moderateScale,
  scale,
  verticalScale,
  colors
} from "@config";
import Header from "@components/Header";
import { Images } from "@assets";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import Form from "./form";
import { connect } from "react-redux";

const CustomerForm = props => {
  return (
    <View>
      {/* <View
        style={{
          width: width * 0.7,
          marginLeft: width * 0.1,
          marginHorizontal: moderateScale(5)
        }}
      >
        <Text
          style={{
            flex: 1,
            fontWeight: "800",
            fontSize: RFValue(22),
            flexWrap: "wrap-reverse"
          }}
        >
          {props.type === "Customer"
            ? "تسجيل حساب جديد العميل"
            : "تسجيل حساب جديد مقدم الخدمة"}
        </Text>
      </View> */}
      <Form navigation={props.navigation} />
    </View>
  );
};

export default connect(state => {
  return {
    type: state.Config.userType
  };
})(CustomerForm);
