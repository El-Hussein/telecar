import React, { Component } from "react";
import { Text, View, Dimensions } from "react-native";
import DropdownAlert from "react-native-dropdownalert";
import store from "../Redux/index";
export default class AlertMeassage extends Component {
  render() {
    const { height } = Dimensions.get("screen");
    return (
      <DropdownAlert
        ref={ref => {
          ref !== null &&
            ref.alertWithType &&
            store.dispatch({ type: "alert", payload: ref.alertWithType });
        }}
        messageStyle={{ color: "white" }}
        titleStyle={{ marginTop: height * 0.02, color: "white" }}
      />
    );
  }
}
