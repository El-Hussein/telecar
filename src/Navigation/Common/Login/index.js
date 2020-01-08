import React, { Fragment } from "react";
import { View, Image, ScrollView } from "react-native";

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
import Form from "./FormLogin";

const Login = props => {
  return (
    <ScrollView
      bounces={false}
      style={{ flex: 1 }}
      contentContainerStyle={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.BackGround
      }}
    >
      {/* <Header navigation={props.navigation} hidelogo={true} /> */}
      <View
        style={{
          height: height * 0.17,
          width: width,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Image
          source={Images.Logo}
          style={{ flex: 1, resizeMode: "contain" }}
        />
      </View>
      <Form navigation={props.navigation} />
    </ScrollView>
  );
};
export default Login;
