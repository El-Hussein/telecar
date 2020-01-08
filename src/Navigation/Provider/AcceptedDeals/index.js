import React, { Fragment, useRef, useState } from "react";
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  Platform,
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
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";
import { driverGetOrders } from "../../../Redux/actions/provider";

import Spinner from "react-native-spinkit";
const RenderIemCard = props => {
  const { title, date, city, price, time, order } = props.item;

  return (
    <View style={styles.card}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row" }}>
          <MaterialCommunityIcons
            name="wallet-travel"
            size={RFValue(20)}
            color="#57B235"
            style={{ alignSelf: "center" }}
          />
          <Text style={{ fontWeight: "bold", top: "8%" }}>
            {order.service.name}
          </Text>
        </View>
        <Text
          style={{ textDecorationLine: "underline", fontSize: RFValue(14) }}
        >
          {date}
        </Text>
      </View>
      <View
        style={{
          marginVertical: moderateScale(15),
          flexDirection: "row"
        }}
      >
        <TouchableOpacity style={styles.itemDetails}>
          <Text
            style={{
              fontSize: RFValue(14),
              height: "100%",
              top: Platform.OS === "ios" ? moderateScale(7) : null
            }}
          >
            {time} أيام
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemDetails}>
          <Text
            style={{
              fontSize: RFValue(14),
              height: "100%",
              top: Platform.OS === "ios" ? moderateScale(7) : null
            }}
          >
            {price} ريال
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemDetails}>
          <Text
            style={{
              fontSize: RFValue(14),
              height: "100%",
              top: Platform.OS === "ios" ? moderateScale(7) : null
            }}
          >
            {city}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("MyMessages");
          }}
          style={[
            styles.itemDetails,
            {
              position: "absolute",
              right: 0,
              backgroundColor: colors.main,
              paddingHorizontal: moderateScale(10)
            }
          ]}
        >
          <Text
            style={{
              fontSize: RFValue(14),
              height: "100%",
              top: Platform.OS === "ios" ? moderateScale(7) : null,
              color: "white"
            }}
          >
            مراسلة
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const MyHandels = props => {
  React.useEffect(() => {
    props.getOrdersNow(1, 3);
  }, []);
  return (
    <ScrollView bounces={false} style={{ flex: 1 }}>
      <Header
        navigation={props.navigation}
        title={
          props.navigation.state.params && props.navigation.state.params.item
            ? "احدث الرسائل"
            : "عروض معتمدة"
        }
      />
      <Spinner
        style={{
          marginVertical: moderateScale(20),
          justifyContent: "center",
          alignSelf: "center",
          alignItems: "center"
        }}
        isVisible={props.status3.loading}
        type="Circle"
        color={"#57B235"}
      />
      <FlatList
        bounces={false}
        data={props.status3.data}
        style={{
          flex: 1,
          height: height * 0.78
        }}
        keyExtractor={(item, i) => String(i)}
        refreshing={false}
        onEndReached={() => {
          if (
            !props.status3.isEnd &&
            !props.status3.loading &&
            props.status3.data.length > 5
          )
            props.getOrdersNow(props.status3.page + 1, 3, true);
        }}
        onEndReachedThreshold={0}
        ListFooterComponent={
          props.status3.length > 8 && props.status3.loading ? (
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
            onRefresh={() => props.getOrdersNow(1, 3)}
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
  itemDetails: {
    flexDirection: "row",
    backgroundColor: "#EDF9F1",
    borderWidth: 1,
    borderColor: colors.main,
    borderRadius: moderateScale(5),
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: moderateScale(3),
    marginHorizontal: moderateScale(3),
    paddingVertical: moderateScale(5)
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
