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
import Moment from "moment";

import Header from "@components/Header";
import { Images } from "@assets";
import Card from "../../../Components/Card";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import ActionSheet from "react-native-actionsheet";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import StarRating from "react-native-star-rating";
import { connect } from "react-redux";

import { GetOpenOrders } from "../../../Redux/actions/provider";
import Spinner from "react-native-spinkit";
import { baseUrl } from "../../../config";

const RenderIemCard = props => {
  console.log("=========item===========================");
  console.log(props.item);
  console.log("====================================");
  const { user, pidfrom, pidto, service, date, _id } = props.item;
  return (
    <View style={styles.card}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flexDirection: "row" }}>
          <Image
            style={{
              width: width * 0.2,
              height: height * 0.1,
              resizeMode: "stretch",
              backgroundColor: "#eee"
            }}
            source={{ uri: baseUrl + "api/user/image/0/" + user._id }}
          />
          <View
            style={{
              padding: moderateScale(10)
            }}
          >
            <Text
              style={{
                fontSize: RFValue(12),
                fontWeight: "bold",
                textAlign: "center"
              }}
            >
              {user.name}
            </Text>
            <Text
              style={{
                writingDirection: "ltr",
                fontSize: RFValue(10),
                textAlign: "center",
                color: "#ccc"
              }}
            >
              {Moment(date).format('DD-MM-YYYY hh:mm A"')}
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
      <View>
        <Text
          style={{
            marginTop: moderateScale(10),
            fontSize: RFValue(12),
            width: "60%",
            flexWrap: "wrap"
          }}
        >
          {service.name}
        </Text>
      </View>
      <View
        style={{
          marginVertical: moderateScale(15),
          flexDirection: "row"
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            backgroundColor: "#EDF9F1",
            borderWidth: 1,
            borderColor: colors.main,
            borderRadius: moderateScale(5),
            width: width * 0.2,
            alignItems: "center",
            justifyContent: "center",
            marginHorizontal: moderateScale(10),
            paddingVertical: moderateScale(5)
          }}
        >
          <Text
            style={{
              fontSize: RFValue(12),
              height: "100%",
              color: colors.main,
              fontWeight: "bold"
            }}
          >
            {pidfrom == 0 ? "--" : pidfrom} ريال
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            backgroundColor: "#EDF9F1",
            borderWidth: 1,
            borderColor: colors.main,
            borderRadius: moderateScale(5),
            width: width * 0.2,
            alignItems: "center",
            justifyContent: "center",
            marginRight: moderateScale(10),
            paddingVertical: moderateScale(5)
          }}
        >
          <Text
            style={{
              fontSize: RFValue(12),
              height: "100%",
              color: colors.main,
              fontWeight: "bold"
            }}
          >
            {pidto == 0 ? "--" : pidto} ريال
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            backgroundColor: colors.main,
            borderRadius: moderateScale(10),
            width: width * 0.25,
            alignItems: "center",
            justifyContent: "center",
            marginRight: moderateScale(10),
            position: "absolute",
            right: 0,
            top: -moderateScale(10),
            paddingVertical: moderateScale(10),
            paddingHorizontal: moderateScale(5)
          }}
          onPress={() => {
            props.navigation.navigate("SendDeal", { order_id: _id });
          }}
        >
          <Text
            style={{
              fontSize: RFValue(12),
              color: "white",
              fontWeight: "bold"
            }}
          >
            تقديم العرض
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const OpenDeals = props => {
  let refs_ActionSheet = useRef();
  let data = ["مشروع منتهي", "مشروع قائم", "إلغاء"];
  const [currentIndex, setcurrentIndex] = useState(0);
  React.useEffect(() => {
    props.getOrdersNow(1);
    console.log("====props================================");
    console.log(props);
    console.log("=========props===========================");
  }, []);
  return (
    <ScrollView bounces={false} style={{ flex: 1 }}>
      <Header navigation={props.navigation} title="صفقات معروضة" />
      <Spinner
        style={{
          marginVertical: moderateScale(20),
          justifyContent: "center",
          alignSelf: "center",
          alignItems: "center"
        }}
        isVisible={props.loading}
        type="Circle"
        color={"#57B235"}
      />
      <FlatList
        bounces={false}
        data={props.data}
        style={{
          flex: 1,
          height: height * 0.78
        }}
        keyExtractor={(item, i) => String(i)}
        refreshing={false}
        onEndReached={() => {
          console.log("=============end Reach=======================");
          console.log(props.page);
          console.log("====================================");
          if (!props.isEnd && !props.loading && props.data.length >= 5)
            props.getOrdersNow(props.page + 1);
        }}
        onEndReachedThreshold={0.9}
        ListFooterComponent={
          props.data.length > 8 && props.loading ? (
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
          !props.loading && (
            <Text
              style={{
                textAlign: "center",
                marginTop: moderateScale(30),
                alignSelf: "center"
              }}
            >
              لايوجد معاملات في هذه الفئة
            </Text>
          )
        }
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => props.getOrdersNow(1)}
            //    colors="white"
            tintColor="white"
            style={{
              color: "white"
            }}
          />
        }
        keyExtractor={(item, index) => {
          item.title + index;
        }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => props.navigation.navigate("DealDetails", item)}
          >
            <RenderIemCard
              navigation={props.navigation}
              item={item}
              key={index}
            />
          </TouchableOpacity>
        )}
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
  Icon: {
    textAlign: "right",
    height: "100%",
    marginRight: moderateScale(3)
  }
});

const mapState = state => {
  return {
    ...state.provider.openOrders
  };
};
const mapDispatch = dispatch => {
  return {
    getOrdersNow: page => GetOpenOrders(dispatch, page)
  };
};
export default connect(
  mapState,
  mapDispatch
)(OpenDeals);
