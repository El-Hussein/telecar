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

const CustomerForm = () => {
  return (
    <View>
      <Form />
    </View>
  );
};

const mapState = state => {
  return {
    ...state.auth
  };
};
const mapDispatch = dispatch => {
  return {};
};
export default connect(
  mapState,
  mapDispatch
)(CustomerForm);
