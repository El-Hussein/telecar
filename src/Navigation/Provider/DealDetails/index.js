import React, { Fragment, useRef, useState } from "react";
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  FlatList
} from "react-native";

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
import Card from "../../../Components/Card";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import ActionSheet from "react-native-actionsheet";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import StarRating from "react-native-star-rating";
import Moment from "moment";
import { baseUrl } from "../../../config";
const textIpsum = `و المضي وبحلول ركز والإتحاد نفس إذ. ما رئيس والديون كان, بها أي اللمّ ثم, ليبين طوكيو بل بحق, جهة سليمان، الحيلولة مع.`;
const CustomDetails = ({ title, details }) => {
  return (
    <View
      style={{
        width: "80%",
        alignSelf: "center",
        marginTop: moderateScale(30)
      }}
    >
      <Text style={{ color: colors.main }}>{title}</Text>
      <Text
        style={{
          padding: moderateScale(10),
          paddingHorizontal: moderateScale(20),
          borderColor: "#ccc",
          borderWidth: 1,
          fontWeight: "600",
          fontSize: RFValue(14)
        }}
      >
        {details}
      </Text>
    </View>
  );
};
const DealDetails = props => {
  const DealInfo = props.navigation.state.params;
  return (
    <View style={{ flex: 1 }}>
      <Header navigation={props.navigation} title="صفقات معروضة" />

      <ScrollView bounces={false} style={{ flex: 1 }}>
        <View
          style={{ flexDirection: "row", width: "80%", alignSelf: "center" }}
        >
          <View style={{ flexDirection: "row" }}>
            <Image
              style={{
                width: width * 0.2,
                height: height * 0.1,
                resizeMode: "stretch",
                backgroundColor: "#eee"
              }}
              source={{
                uri: baseUrl + "api/user/image/0/" + DealInfo.user._id
              }}
            />
            <View
              style={{
                padding: moderateScale(10)
              }}
            >
              <Text
                style={{
                  fontSize: RFValue(12),
                  fontWeight: "bold"
                }}
              >
                {DealInfo.user.name}
              </Text>
              <Text
                style={{
                  writingDirection: "ltr",
                  fontSize: RFValue(10),
                  textAlign: "center",
                  color: "#ccc"
                }}
              >
                {Moment(DealInfo.date).format('DD-MM-YYYY hh:mm A"')}
              </Text>
              {/* <StarRating
                fullStarColor={colors.main}
                disabled={true}
                maxStars={5}
                rating={4}
                starSize={RFValue(12)}
                containerStyle={{
                  alignSelf: "flex-start",
                  justifyContent: "center",
                  flexDirection: "row-reverse"
                }}
              /> */}
            </View>
          </View>
        </View>
        <CustomDetails
          title="عنوان الخدمة المطلوبة"
          details={DealInfo.service.name}
        />
        <CustomDetails title="القطاع" details={DealInfo.strip.name} />
        <CustomDetails
          title="جهة الخدمة"
          details={DealInfo.service.type.name}
        />
        <CustomDetails title="المدينة" details={DealInfo.city.name} />
        <CustomDetails title="تفاصيل الخدمة" details={DealInfo.details} />
        <TouchableOpacity
          style={{
            backgroundColor: colors.main,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            borderRadius: moderateScale(10),
            marginTop: moderateScale(10)
          }}
          onPress={() =>
            props.navigation.navigate("SendDeal", { order_id: DealInfo._id })
          }
        >
          <Text
            style={{
              color: "white",
              paddingVertical: moderateScale(10),
              paddingHorizontal: moderateScale(20)
            }}
          >
            تقديم عرض
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: moderateScale(20),
    alignSelf: "center",
    width: width * 0.9,
    marginHorizontal: moderateScale(2),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4
    },
    padding: moderateScale(10),
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    borderColor: "#eee",
    borderWidth: 1,
    elevation: 9,
    borderRadius: moderateScale(4),
    backgroundColor: "white"
  },
  drawer: {
    marginHorizontal: moderateScale(30)
  },
  Icon: {
    textAlign: "right",
    height: "100%",
    marginRight: moderateScale(3)
  }
});
export default DealDetails;
