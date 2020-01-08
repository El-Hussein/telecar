import React, { Fragment, Component } from "react";
import {
  View,
  ScrollView,
  TouchableWithoutFeedback,
  StyleSheet,
  Text
} from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import {
  width,
  height,
  moderateScale,
  scale,
  verticalScale,
  colors,
  baseUrl
} from "@config";

import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import localization from "../localization/localization";
import Image from "./Image";
import AntDesign from "react-native-vector-icons/AntDesign";
export default function ProductCard(props) {
  const { item } = props;
  console.log("offers", item);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        props.navigation.navigate("Product", { item: item });
      }}
    >
      <View
        style={{
          minWidth: width * 0.5,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            padding: moderateScale(4),
            margin: moderateScale(5)
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image
              source={{
                uri: baseUrl + item.image
              }}
              style={{
                resizeMode: "stretch",
                height: height * 0.1,
                width: "100%"
              }}
            />
          </View>

          <View
            style={{
              width: "100%",
              display: "flex",
              flexDirection: localization.getLanguage("en")
                ? "row"
                : "row-reverse",
              minHeight: height * 0.1
            }}
          >
            <View
              style={{
                flex: 4,
                justifyContent: "center",
                padding: moderateScale(2)
              }}
            >
              <Text style={{ fontSize: RFValue(16), color: colors.main }}>
                {item.name}
              </Text>
              <Text
                style={{
                  fontSize: RFValue(12),
                  color: "#ccc",
                  flexWrap: "wrap"
                }}
                numberOfLines={2}
              >
                {item.details}
              </Text>
            </View>
          </View>
          <View
            style={{ justifyContent: "space-between", flexDirection: "row" }}
          >
            <Text
              style={{
                color: "red",
                textAlign:
                  localization.getLanguage() == "ar" ? "right" : "left",
                fontSize: RFValue(14)
              }}
            >
              {item.offer} offer
            </Text>
            <Text
              style={{
                color: colors.main,
                textAlign:
                  localization.getLanguage() == "ar" ? "right" : "left",
                fontSize: RFValue(14)
              }}
            >
              {" " + item.views}
              <AntDesign name="eye" color={colors.main} size={RFValue(15)} />
            </Text>
          </View>
          <View
            style={{
              position: "absolute",
              backgroundColor: colors.main,
              // width: width * 0.15,
              paddingHorizontal: moderateScale(10),
              paddingVertical: moderateScale(5)
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontSize: RFValue(10)
              }}
            >
              {item.salary + " " + localization.riyal}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    alignSelf: "center",
    width: width * 0.44,
    height: height * 0.15,
    marginHorizontal: moderateScale(2),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9
  },
  drawer: {
    marginHorizontal: moderateScale(30)
  },
  itemCard: {
    backgroundColor: "rgba(0,0,0,0.05)",
    width: width * 0.28,
    height: height * 0.1,
    marginHorizontal: width * 0.025,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 2,
    borderRadius: moderateScale(5)
  }
});
