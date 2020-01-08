import React from "react";
import { View, ImageBackground, Image, Text } from "react-native";
import { Card as CardView } from "native-base";
import {
  width,
  height,
  moderateScale,
  scale,
  verticalScale,
  colors
} from "@config";
import { RFValue } from "react-native-responsive-fontsize";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const Card = props => {
  return (
    <ImageBackground
      source={props.image}
      style={{ flex: 1 }}
      resizeMode="stretch"
    >
      <View
        style={{
          flex: 0.9,
          alignSelf: "center",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {props.icon && props.icon}
        {props.text2 && (
          <Text
            style={{
              textAlign: "center",
              alignSelf: "center",
              fontFamily: "Tajawal-ExtraBold",
              paddingVertical: moderateScale(10),
              fontSize: RFValue(24)
            }}
          >
            {props.text2}
          </Text>
        )}
        <Text style={{ textAlign: "center" }}>{props.text}</Text>
      </View>
    </ImageBackground>
  );
};

export default Card;
