import React, { Fragment, Component } from "react";
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  RefreshControl,
  FlatList
} from "react-native";
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
import { connect } from "react-redux";
import { getMyOrdersCount } from "../../../Redux/actions/Customer";
import Spinner from "react-native-spinkit";
import localization from "../../../localization/localization";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Header2 from "@components/Header2";

const RenderNotificationItem = ({ rtl }) => (
  <View
    style={{
      backgroundColor: "rgba(0,0,0,0.03)",
      width: "90%",
      alignSelf: "center",
      padding: moderateScale(10),
      marginTop: moderateScale(10),
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      direction: rtl ? "rtl" : "ltr",
      elevation: 1
    }}
  >
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        minHeight: height * 0.1,
        alignSelf: "center"
      }}
    >
      <View style={{ flex: 1, flexGrow: 4 }}>
        <Text>title</Text>
        <Text
          numberOfLines={3}
          style={{
            color: "gray",
            fontSize: RFValue(12),
            lineHeight: moderateScale(20)
          }}
        >
          body body body body body body body body body body body body body body
          body body body body body body body body body body body body body body
          body body body body body body body body body body body body body body
          body body body body body body body body body body{" "}
        </Text>
      </View>
    </View>
    <View
      style={{
        flexDirection: rtl ? "row-reverse" : "row",
        justifyContent: "flex-end"
      }}
    >
      <Text
        style={{
          fontSize: RFValue(10),
          color: "grey",
          marginHorizontal: moderateScale(5)
        }}
      >
        3/10/2019
      </Text>
      <Text
        style={{
          fontSize: RFValue(10),
          color: "grey",
          marginHorizontal: moderateScale(5)
        }}
      >
        2:06:AM
      </Text>
    </View>
  </View>
);

export default class Notifications extends Component {
  render() {
    let props = this.props;
    const rtl = localization.getLanguage() === "ar";
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.BackGround,
          direction: rtl ? "rtl" : "ltr"
        }}
      >
        <Header2
          navigation={props.navigation}
          title={localization.notification.toUpperCase()}
          hidelogo
        />
        <FlatList
          style={{ flex: 1 }}
          data={[1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5]}
          renderItem={() => <RenderNotificationItem rtl={rtl} />}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
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
