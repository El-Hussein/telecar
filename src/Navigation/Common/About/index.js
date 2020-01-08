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
import Header2 from "@components/Header2";
import { Images } from "@assets";
import { RFValue } from "react-native-responsive-fontsize";
import { connect } from "react-redux";
import localization from "../../../localization/localization";
const About = props => {
  return (
    <ScrollView bounces={false} style={{ flex: 1 }}>
      <Header2
        navigation={props.navigation}
        hidelogo={true}
        title={localization.aboutUs}
      />
      <View
        style={{
          height: height * 0.3,
          width: width,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Image
          source={Images.Logo}
          style={{ flex: 1, resizeMode: "stretch" }}
        />
      </View>
      <View
        style={{
          width: "80%",
          alignSelf: "center",
          marginTop: moderateScale(20)
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: RFValue(26) }}>
          {localization.aboutUs}
        </Text>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "80%",
          alignSelf: "center"
        }}
      >
        <Text>{props.about}</Text>
      </View>
    </ScrollView>
  );
};

export default connect(state => {
  return {
    about: state.Config.about
  };
})(About);
