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
import Form from "./FormLogin";
import CodeInput from "react-native-confirmation-code-field";

const Login = props => {
  const form = props.navigation.state.params.form;
  console.log("===form=================================");
  console.log(form);
  console.log("====================================");
  return (
    <ScrollView bounces={false} style={{ flex: 1 }}>
      <Header
        navigation={props.navigation}
        hidelogo={true}
        title="تأكيد رقم الجوال"
      />
      <View
        style={{
          // height: height * 0.17,
          width: width,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Image source={Images.Logo2} style={{ flex: 1, resizeMode: "cover" }} />
        {/* <Text style={{ textDecorationLine: "underline" }}>شكراً</Text> */}
        <Text style={{ marginTop: moderateScale(15) }}>
          تم إرسال كود التفعيل إلي
        </Text>
        <Text style={{ textDecorationLine: "underline", color: colors.main }}>
          {form.phone}
        </Text>
      </View>
      <Form navigation={props.navigation} form={form} />
    </ScrollView>
  );
};
export default Login;
