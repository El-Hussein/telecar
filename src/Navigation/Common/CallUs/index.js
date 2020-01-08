import React, { Fragment, useState } from "react";
import { View, Image, ScrollView, Text, ImageBackground } from "react-native";

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
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import Form from "./form";
import Axios from "axios";
import { baseUrl } from "../../../config";
import localization from "../../../localization/localization";

const CallUsDetails = ({ title, details }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: moderateScale(10)
    }}
  >
    <Text
      style={{
        fontSize: RFValue(12),
        alignSelf: "center",
        flex: 1,
        top: 0
      }}
    >
      {title}
    </Text>
    <Text
      style={{
        fontSize: RFValue(12),
        flexWrap: "wrap",
        width: "60%",
        alignSelf: "flex-end",
        textAlign: "center",
        writingDirection: title === "رقم الهاتف" ? "ltr" : "rtl"
      }}
    >
      {details}
    </Text>
  </View>
);

const CallUs = props => {
  const [firstload, setfistLoad] = useState(true);
  const [contactInfo, setcontactInfo] = useState({
    address: "",
    contactmail: "",
    phone: ""
  });
  if (firstload) {
    Axios.get(baseUrl + "api/contactdetails").then(result => {
      setcontactInfo(result.data);
    });
    setfistLoad(false);
  }
  return (
    <ScrollView bounces={false} style={{ flex: 1 }}>
      <Header
        navigation={props.navigation}
        title={localization.callUs}
        hidelogo
      />
      {/* <View
        style={{
          width: "90%",
          height: height * 0.2,
          flexDirection: "row",
          backgroundColor: "white",
          alignSelf: "center",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 5
          },
          shadowOpacity: 0.34,
          shadowRadius: 6.27,

          elevation: 10,
          borderRadius: moderateScale(10),
          top: moderateScale(60)
        }}
      >
        <ImageBackground
          source={Images.mapBack}
          borderRadius={moderateScale(20)}
          style={{
            width: width * 0.3,
            margin: moderateScale(20),
            justifyContent: "center",
            alignItems: "center"
          }}
          resizeMode="contain"
        >
          <Image source={Images.location} style={{ resizeMode: "cover" }} />
        </ImageBackground>
        <View
          style={{
            flex: 1,
            width: width * 0.5,
            height: "100%",
            marginHorizontal: moderateScale(10)
          }}
        >
          <CallUsDetails
            title="البريد الإلكتروني"
            details={contactInfo.contactmail}
          />
          <CallUsDetails title="رقم الهاتف" details={contactInfo.phone} />
          <CallUsDetails title="العنوان" details={contactInfo.address} />
        </View>
      </View>
   */}
      <View
        style={{
          flex: 1,
          width: "90%",
          top: moderateScale(60)
        }}
      >
        <Form />
      </View>
    </ScrollView>
  );
};

export default CallUs;
