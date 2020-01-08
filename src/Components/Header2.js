import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  AsyncStorage,
  I18nManager,
  StatusBar
} from "react-native";
import {
  width,
  height,
  moderateScale,
  scale,
  verticalScale,
  colors
} from "@config";
import { RFValue } from "react-native-responsive-fontsize";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Images } from "@assets";
import localization from "../localization/localization";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from "react-native-popup-menu";
import SideButton from "./SideButton";
import { connect } from "react-redux";
import RNRestart from "react-native-restart";
class Header extends Component {
  _menu = null;
  state = {
    lang: "en"
  };
  componentDidMount() {
    AsyncStorage.getItem("@lang").then(lang => {
      this.setState({ lang: lang == "ar" ? "en" : "ar" });
    });
  }
  setMenuRef = ref => {
    this._menu = ref;
  };

  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };
  render() {
    return (
      <View style={styles.Container}>
        <View style={{ flexDirection: "row" }}>
          <Menu style={styles.drawer} placement="bottom">
            <MenuTrigger
              children={
                <MaterialCommunityIcons
                  name="dots-vertical"
                  color="white"
                  size={scale(35)}
                  style={{ marginRight: moderateScale(10) }}
                />
              }
            />
            <MenuOptions
              optionsContainerStyle={{
                marginTop: moderateScale(40),
                backgroundColor: "#1B2125",
                width: width * 0.7
              }}
            >
              {this.props.user && (
                <MenuOption
                  onSelect={() => {
                    this.props.navigation.navigate("EditeProfile");
                  }}
                  style={{
                    borderBottomColor: "gray",
                    borderWidth: 1
                  }}
                  children={
                    <SideButton title={localization.profile} icon="settings" />
                  }
                />
              )}
              {this.props.user && (
                <MenuOption
                  onSelect={() => {
                    this.props.navigation.navigate("Chat", {
                      item: "messages"
                    });
                  }}
                  style={{
                    borderBottomColor: "gray",
                    borderWidth: 1
                  }}
                  children={
                    <SideButton
                      title={localization.myMessages}
                      icon="message"
                    />
                  }
                />
              )}
              {/* <MenuOption
                onSelect={() => {
                  this.props.navigation.navigate("CallUs");
                }}
                style={{
                  borderBottomColor: "gray",
                  borderWidth: 1
                }}
                children={
                  <SideButton
                    title={localization.contactUs}
                    icon="email-open"
                  />
                }
              /> */}
              <MenuOption
                onSelect={() => {
                  this.props.navigation.navigate("About");
                }}
                style={{
                  borderBottomColor: "gray",
                  borderWidth: 1
                }}
                children={
                  <SideButton
                    title={localization.aboutUs}
                    icon="information-outline"
                  />
                }
              />
              <MenuOption
                onSelect={() => {
                  this.props.navigation.navigate("Policy");
                }}
                style={{
                  borderBottomColor: "gray",
                  borderWidth: 1
                }}
                children={
                  <SideButton
                    title={localization.termsConditions}
                    icon="shield-check"
                  />
                }
              />
              <MenuOption
                onSelect={() => {
                  // const NewLang = this.state.lang === "ar" ? "en" : "ar";
                  if (this.state.lang === "ar") {
                    I18nManager.forceRTL(true);
                  } else {
                    I18nManager.forceRTL(false);
                  }
                  AsyncStorage.setItem("@lang", this.state.lang).then(() => {
                    RNRestart.Restart();
                  });
                }}
                style={{
                  borderBottomColor: "gray",
                  borderWidth: 1
                }}
                children={
                  <SideButton title={this.state.lang} icon="translate" />
                }
              />
              <MenuOption
                onSelect={() => {
                  this.props.navigation.navigate("Main");
                }}
                style={{
                  borderBottomColor: "gray",
                  borderWidth: 1
                }}
                children={
                  <SideButton title={localization.exit} icon="logout" />
                }
              />
            </MenuOptions>
          </Menu>
        </View>
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          {this.props.title && (
            <Text
              style={{
                textAlignVertical: "center",
                alignSelf: "center",
                fontFamily: "Cairo-Bold",
                color: "white"
              }}
            >
              {this.props.title}
            </Text>
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {this.props.search && (
            <TouchableOpacity
              style={[styles.drawer, { marginLeft: moderateScale(0) }]}
              onPress={() => {
                this.props.navigation.navigate("Search");
              }}
            >
              <Ionicons name="ios-search" color="white" size={scale(35)} />
            </TouchableOpacity>
          )}
          {!this.props.hidelogo && (
            <TouchableOpacity
              disabled={true}
              style={[styles.drawer, { marginLeft: moderateScale(0) }]}
              onPress={() => {
                this.props.navigation.toggleDrawer();
              }}
            >
              <Image
                source={Images.Logo2}
                style={{
                  width: width * 0.2,
                  height: height * 0.05,
                  resizeMode: "contain"
                }}
              />
            </TouchableOpacity>
          )}
          {!this.props.hideback && (
            <TouchableOpacity
              hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}
              style={[styles.drawer, { marginLeft: moderateScale(0) }]}
              onPress={() => {
                this.props.navigation.goBack();
              }}
            >
              <Ionicons
                name={
                  localization.getLanguage() === "ar"
                    ? "ios-arrow-forward"
                    : "ios-arrow-back"
                }
                color={"white"}
                size={moderateScale(30)}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  Container: {
    width: width,
    height: height * 0.06,
    minHeight: 70,
    paddingHorizontal: moderateScale(10),
    flexDirection: localization.getLanguage() === "ar" ? "row" : "row-reverse",
    flexDirection: "row-reverse",
    // direction: "ltr",
    justifyContent: "space-evenly",
    backgroundColor: colors.main,
    paddingTop: Platform.OS === "ios" ? moderateScale(20) : 0
  },
  drawer: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
    // flex: 1
  }
});

export default connect(
  state => {
    return {
      lang: state.Config.lang,
      type: state.Config.userType,
      user: state.auth.user
    };
  },
  dispatch => {
    return {
      changLang: lang => dispatch({ type: "changelang", payload: lang })
    };
  }
)(Header);
