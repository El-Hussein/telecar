import React, { Fragment, useRef, useState } from "react";
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  FlatList,
  RefreshControl
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
import { connect } from "react-redux";
import { driverGetOrders } from "../../../Redux/actions/provider";
import Spinner from "react-native-spinkit";

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
            بانتظار الموافقة
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
  React.useEffect(() => {
    props.getOrdersNow(1, 1);
  }, []);
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
        <Spinner
          style={{
            marginVertical: moderateScale(20),
            justifyContent: "center",
            alignSelf: "center",
            alignItems: "center"
          }}
          isVisible={props.status1.loading}
          type="Circle"
          color={"#57B235"}
        />
        <FlatList
          bounces={false}
          data={props.status1.data}
          style={{
            flex: 1,
            height: height * 0.78
          }}
          keyExtractor={(item, i) => String(i)}
          refreshing={false}
          onEndReached={() => {
            if (
              !props.status1.isEnd &&
              !props.status1.loading &&
              props.status1.data.length > 5
            )
              props.getOrdersNow(props.status1.page + 1, 1, true);
          }}
          onEndReachedThreshold={0}
          ListFooterComponent={
            props.status1.length > 8 && proºps.status1.loading ? (
              <Spinner
                style={{
                  marginVertical: moderateScale(20),
                  justifyContent: "center",
                  alignSelf: "center",
                  alignItems: "center"
                }}
                isVisible={true}
                type="Circle"
                color={"#57B235"}
              />
            ) : (
              <View />
            )
          }
          ListEmptyComponent={
            <Text
              style={{
                textAlign: "center",
                marginTop: moderateScale(30),
                alignSelf: "center"
              }}
            >
              لايوجد معاملات في هذه الفئة
            </Text>
          }
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={() => props.getOrdersNow(1, 1)}
              //    colors="white"
              tintColor="white"
              style={{
                color: "white"
              }}
            />
          }
          renderItem={({ item, index }) => (
            <RenderIemCard
              navigation={props.navigation}
              item={item}
              key={index}
            />
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
const mapState = state => {
  return {
    ...state.provider
  };
};
const mapDispatch = dispatch => {
  return {
    getOrdersNow: (page, status, paginate = false) =>
      driverGetOrders(dispatch, page, status, paginate)
  };
};
export default connect(
  mapState,
  mapDispatch
)(MyHandels);
