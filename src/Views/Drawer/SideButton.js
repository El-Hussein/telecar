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
import localization from "../../localization/localization";
const SideButton = ({ title, icon, onPress }) => {
  return (
    <TouchableOpacity style={Styles.TouchableOpacity} onPress={onPress}>
      <MaterialCommunityIcons
        name={icon}
        size={RFValue(24)}
        color={colors.main}
        style={Styles.Icon}
      />
      <Text style={Styles.Text}> {title}</Text>
    </TouchableOpacity>
  );
};
const Styles = StyleSheet.create({
  Icon: {
    width: "20%",
    textAlign: "left",
    textAlignVertical: "center",
    alignSelf: "center",
    height: "100%",
    alignSelf: "center"
  },
  Text: {
    alignSelf: "flex-end",
    textAlignVertical: "center",
    // width: "60%",
    flexWrap: "wrap",
    paddingLeft: moderateScale(3),
    fontWeight: "600",
    fontSize: RFValue(15)
  },
  TouchableOpacity: {
    width: width * 0.5,
    flexDirection: localization.getLanguage() !== "en" ? "row-reverse" : "row",
    direction: localization.getLanguage() !== "ar" ? "rtl" : "ltr",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: moderateScale(10)
  }
});

export default SideButton;
