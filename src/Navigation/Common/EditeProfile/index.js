import React, { Fragment, useState } from "react";
import { View, Image, ScrollView, Text, TouchableOpacity } from "react-native";

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
import { RFValue } from "react-native-responsive-fontsize";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Switch } from "native-base";
import { AnimatedModal } from "react-native-modal-animated";
import { connect } from "react-redux";
import localization from "../../../localization/localization";
const Item = props => {
  let { title, image, action } = props;
  const rtl = localization.getLanguage() === "ar";
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
        borderBottomColor: "#ccc",
        paddingBottom: moderateScale(10),
        margin: moderateScale(10)
      }}
      onPress={props.action}
    >
      <View
        style={{
          marginHorizontal: moderateScale(10),
          marginRight: moderateScale(30),
          height: "100%"
        }}
      >
        <Image
          source={image}
          style={{ padding: moderateScale(20) }}
          resizeMode="stretch"
        />
      </View>
      <View
        style={{
          alignSelf: "center",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text
          style={{
            fontSize: RFValue(14),
            fontWeight: "300"
          }}
        >
          {title}
        </Text>
      </View>

      <AntDesign
        name={rtl ? "left" : "right"}
        size={RFValue(22)}
        style={{
          alignSelf: "center",
          textAlign: "center",
          position: "absolute",
          top: "20%",
          right: 0
        }}
      />
    </TouchableOpacity>
  );
};
const EditeProfile = props => {
  return (
    <View style={{ flex: 1 }}>
      <Header
        navigation={props.navigation}
        title={localization.editProfile}
        hidelogo
      />
      <ScrollView
        bounces={false}
        contentContainerStyle={{
          marginTop: moderateScale(50),
          width: "100%",
          borderWidth: 1,
          borderColor: "#ccc",
          alignSelf: "center",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,

          elevation: 4
        }}
        style={{ width: "90%", alignSelf: "center" }}
      >
        <Item
          image={Images.Icon_Edit}
          title={localization.profileSettings}
          action={() => {
            props.navigation.navigate("ProfileSettings");
          }}
        />
        <View
          style={{
            width: "100%",
            backgroundColor: "#ccc",
            paddingVertical: moderateScale(0.5)
          }}
        />
        <Item
          image={Images.Icon_Edit}
          title={localization.editPassword}
          action={() => props.navigation.navigate("ChangePassword")}
        />
        <View
          style={{
            width: "100%",
            backgroundColor: "#ccc",
            paddingVertical: moderateScale(0.5)
          }}
        />
        {/* {props.type === "Provider" && (
          <Item
            image={Images.Icon_Edit}
            title={localization.location}
            action={() => props.navigation.navigate("MyServices")}
          />
        )}
        {props.type === "Provider" && (
          <View
            style={{
              width: "100%",
              backgroundColor: "#ccc",
              paddingVertical: moderateScale(0.5)
            }}
          />
        )} */}

        <View
          style={{
            width: "100%",
            backgroundColor: "#ccc",
            paddingVertical: moderateScale(0.5)
          }}
        />
      </ScrollView>
    </View>
  );
};

export default connect(state => {
  return { type: state.Config.userType };
})(EditeProfile);
