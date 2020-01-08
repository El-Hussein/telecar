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
import Header from "@components/Header2";
import { Images } from "@assets";
import { RFPercentage } from "react-native-responsive-fontsize";
import CustomerForm from "./CustomerForm";
import localization from "../../../localization/localization";

const Register = props => {
  return (
    <ScrollView
      bounces={false}
      style={{
        flex: 1,
        backgroundColor: "#F1FEFF",
        paddingBottom: moderateScale(100)
      }}
      ref={e => {
        parentScroll = e;
      }}
    >
      <Header
        navigation={props.navigation}
        hidelogo
        title={localization.register}
      />
      <View
        style={{
          height: height * 0.17,
          width: width,
          justifyContent: "center",
          alignItems: "center",
          marginTop: moderateScale(50)
        }}
      >
        <Image
          source={Images.Logo}
          style={{ flex: 1, resizeMode: "contain" }}
        />
      </View>
      <CustomerForm navigation={props.navigation} />
    </ScrollView>
  );
};

export default Register;
