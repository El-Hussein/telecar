import React from "react";
import { View, Text as T } from "react-native";

const Text = props => {
  return (
    <View>
      <T {...props}>{props.value}</T>
    </View>
  );
};

export default Text;
