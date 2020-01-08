import React, { Fragment } from "react";
import { View, Image, ScrollView, TouchableOpacity, Text } from "react-native";

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
import Form from "./Formemail";
import localization from "../../../localization/localization";

const Login = props => {
  return (
    <ScrollView bounces={false} style={{ flex: 1 }}>
      <Header
        navigation={props.navigation}
        hidelogo={true}
        title={localization.forgetPassword}
      />
      <View
        style={{
          height: height * 0.17,
          width: width,
          justifyContent: "center",
          alignItems: "center",
          marginTop: moderateScale(20)
        }}
      >
        <Image
          source={Images.Logo2}
          style={{ flex: 1, resizeMode: "contain" }}
        />
      </View>
      <Form navigation={props.navigation} />
      {/* <TouchableOpacity
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center"
        }}
        onPress={() => props.navigation.navigate("ForgetPasswordCode")}
      >
        <Text>تمتلك الكود بالفعل ؟</Text>
      </TouchableOpacity> */}
      {/* <FormeChangePassword navigation={props.navigation} /> */}
    </ScrollView>
  );
};
export default Login;
