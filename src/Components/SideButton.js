import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { RFValue } from "react-native-responsive-fontsize";
import {
  width,
  height,
  moderateScale,
  scale,
  verticalScale,
  colors
} from "@config";
import localization from "../localization/localization";
const SideButton = ({ title, icon, onPress }) => {
  return (
    <View style={Styles.TouchableOpacity} onPress={onPress}>
      <MaterialCommunityIcons
        name={icon}
        size={RFValue(24)}
        style={Styles.Icon}
      />
      <Text style={Styles.Text}> {title}</Text>
    </View>
  );
};
const Styles = StyleSheet.create({
  Icon: {
    textAlignVertical: "center",
    alignSelf: "center",
    height: "100%",
    color: "white"
  },
  Text: {
    textAlignVertical: "center",
    flexWrap: "wrap",
    paddingLeft: moderateScale(1),
    fontWeight: "600",
    fontSize: RFValue(15),
    color: "white"
  },
  TouchableOpacity: {
    flexDirection: "row", //localization.getLanguage() === "ar" ? "row-reverse" : "row",
    direction: localization.getLanguage() === "ar" ? "rtl" : "ltr",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: moderateScale(10)
  }
});

export default SideButton;
