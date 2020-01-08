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
import Fontisto from "react-native-vector-icons/Fontisto";
import StarRating from "react-native-star-rating";

const RenderIemCard = props => {
  const { name, rate, details, price, date } = props.item;
  return (
    <View style={styles.card}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: moderateScale(20)
        }}
      >
        <View>
          <Text style={{ fontSize: RFValue(12), fontWeight: "bold" }}>
            تجديد الإقامة
          </Text>
          <Text style={{ fontSize: RFValue(10), writingDirection: "ltr" }}>
            07-07-2019 2:12 am
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text style={{ fontSize: RFValue(12) }}>
            قيد الإجراء
            <Fontisto
              name="ellipse"
              size={RFValue(5)}
              color="#57B235"
              style={{ alignSelf: "center" }}
            />
          </Text>
        </View>
      </View>
    </View>
  );
};

const MyHandels = props => {
  return (
    <View style={{ flex: 1 }}>
      <Header navigation={props.navigation} title="متابعة الصفقات" />
      <ScrollView bounces={false} style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row-reverse",
            width: "90%",
            alignSelf: "center"
          }}
        >
          <Text>الحالات</Text>
        </View>
        <FlatList
          bounces={false}
          data={[
            {
              name: "تحديد اقامة",
              rate: "منذ ١٠ ساعات",
              details:
                "السلام عليكم يسرني التعامل معكم السلام عليكم يسرني التعامل معكم ",
              price: "300",
              date: "12"
            },
            {
              name: "تحديد اقامة",
              rate: "منذ ١٠ ساعات",
              details:
                "السلام عليكم يسرني التعامل معكم السلام عليكم يسرني التعامل معكم ",
              price: "300",
              date: "12"
            },
            {
              name: "تحديد اقامة",
              rate: "منذ ١٠ ساعات",
              details:
                "السلام عليكم يسرني التعامل معكم السلام عليكم يسرني التعامل معكم ",
              price: "300",
              date: "12"
            },
            {
              name: "تحديد اقامة",
              rate: "منذ ١٠ ساعات",
              details:
                "السلام عليكم يسرني التعامل معكم السلام عليكم يسرني التعامل معكم ",
              price: "300",
              date: "12"
            },
            {
              name: "تحديد اقامة",
              rate: "منذ ١٠ ساعات",
              details:
                "السلام عليكم يسرني التعامل معكم السلام عليكم يسرني التعامل معكم ",
              price: "300",
              date: "12"
            },
            {
              name: "تحديد اقامة",
              rate: "منذ ١٠ ساعات",
              details:
                "السلام عليكم يسرني التعامل معكم السلام عليكم يسرني التعامل معكم ",
              price: "300",
              date: "12"
            }
          ]}
          style={{
            flex: 1,
            paddingBottom: moderateScale(100),
            marginBottom: moderateScale(20)
          }}
          renderItem={({ item, index }) => (
            <RenderIemCard item={item} key={index} />
          )}
          keyExtractor={(item, index) => {
            item.title + index;
          }}
        />
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

export default MyHandels;
