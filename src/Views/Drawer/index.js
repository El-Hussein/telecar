import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView
} from "react-native";
import InitialDrawer from "./InitialDrawer";
import { connect } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { RFValue } from "react-native-responsive-fontsize";
import { Images } from "@assets";

import {
  width,
  height,
  moderateScale,
  scale,
  verticalScale,
  colors
} from "@config";
import SideButton from "./SideButton";
import CustomerDrawer from "./CustomerDrawer";
import ProviderDrawer from "./ProviderDrawer";
import Splash from "react-native-splash-screen";
import {
  Reset_CHat_Rooms,
  Reset_CHat_IN_Room,
  Reset_Customer_Order,
  Reset_Provider_Order
} from "../../Redux/types";

import store from "../../Redux/index";
import Axios from "axios";
import { baseUrl } from "../../config";

class Drawer extends Component {
  componentDidMount() {
    store.dispatch({ type: "navigation", payload: this.props.navigation });
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          backgroundColor: colors.BackGround
        }}
      >
        <View
          style={{
            height: height * 0.14,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            bottom: moderateScale(20),
            left: moderateScale(5)
          }}
        >
          <Image
            source={Images.Logo2}
            style={{ flex: 1, resizeMode: "contain" }}
          />
        </View>

        <View style={{ height: height * 0.5 }}>
          <ScrollView
            bounces={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            {!this.props.user && <InitialDrawer {...this.props} />}
            {this.props.user && this.props.type === "Customer" && (
              <CustomerDrawer {...this.props} />
            )}
            {this.props.user && this.props.type === "Provider" && (
              <ProviderDrawer {...this.props} />
            )}
            {this.props.user && (
              <SideButton
                onPress={() => {
                  this.props.navigation.navigate("EditeProfile");
                }}
                title="حسابي"
                icon="account-box"
              />
            )}
            <SideButton
              onPress={() => {
                this.props.navigation.navigate("CallUs");
              }}
              title="اتصل بنا"
              icon="email-open"
            />
            <SideButton
              onPress={() => {
                this.props.navigation.navigate("About");
              }}
              title="من نحن"
              icon="information-outline"
            />
            <SideButton
              onPress={() => {
                this.props.navigation.navigate("Policy");
              }}
              title="سياسة الخصوصية"
              icon="shield-check"
            />
            {this.props.user && (
              <SideButton
                onPress={() => {
                  this.props.logout();
                  this.props.navigation.navigate("Main");
                }}
                title="تسجيل الخروج"
                icon="logout"
              />
            )}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    // type: state.auth.LoginType,
    type: state.Config.userType,
    user: state.auth.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    logout: async () => {
      const token = await store.getState().auth.user.token;
      console.log("=========token===========================");
      console.log(token);
      console.log("====================================");
      await Axios.get(`${baseUrl}api/logout`, {
        headers: {
          Authorization: token
        }
      })
        .then(res => {
          console.log("==logoutres==================================");
          console.log(res);
          console.log("====================================");
        })
        .catch(e => {
          console.log("====================================");
          console.log(e, e.response);
          console.log("====================================");
        });
      dispatch({ type: "logout" });
      dispatch({ type: Reset_CHat_Rooms });
      dispatch({ type: Reset_CHat_IN_Room });
      dispatch({ type: Reset_CHat_IN_Room });
      dispatch({ type: Reset_Customer_Order });
      dispatch({ type: Reset_Provider_Order });
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Drawer);
