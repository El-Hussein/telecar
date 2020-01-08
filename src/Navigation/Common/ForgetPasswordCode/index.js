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
import Header from "@components/Header";
import { Images } from "@assets";
import FormeChangePassword from "./FormeChangePassword";

const Login = props => {
  return (
    <ScrollView bounces={false} style={{ flex: 1 }}>
      <Header
        navigation={props.navigation}
        hidelogo={true}
        title="نسيت كلمةالمرور"
      />
      <View
        style={{
          height: height * 0.17,
          width: width,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Image
          source={Images.Logo2}
          style={{ flex: 1, resizeMode: "contain" }}
        />
      </View>
      <FormeChangePassword navigation={props.navigation} />
    </ScrollView>
  );
};
export default Login;
