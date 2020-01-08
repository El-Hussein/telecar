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
import Header from "@components/Header2";
import { Images } from "@assets";
import { RFPercentage } from "react-native-responsive-fontsize";
import CustomerForm from "./CustomerForm";
import localization from "../../../localization/localization";

const ChangePassword = props => {
  return (
    <ScrollView bounces={false} style={{ flex: 1 }}>
      <Header
        navigation={props.navigation}
        title={localization.editPassword}
        hidelogo
      />
      <CustomerForm />
    </ScrollView>
  );
};

export default ChangePassword;
