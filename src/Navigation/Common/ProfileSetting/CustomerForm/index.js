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

const CustomerForm = () => {
  return (
    <View style={{ flex: 1 }}>
      <Form />
    </View>
  );
};

export default CustomerForm;
