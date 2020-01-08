import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  TouchableWithoutFeedback
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
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Images } from "@assets";
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";
import localization from "../../../localization/localization";
const DATA = ["car Maintaince", "Car Wash", "Car Fix"];
import ActionSheet from "react-native-actionsheet";
import { Input } from "native-base";
import { connect } from "react-redux";

class Header extends Component {
  _ActionSheet = null;
  state = {
    activeFiltelModel: false,
    categoriesFilter: localization.allcategories,
    categoriesFilterId: null,
    inputFilter: ""
  };
  handleOnChange = () => {
    this.props.onChange(this.state.inputFilter, this.state.categoriesFilterId);
  };
  render() {
    const rtl = localization.getLanguage() === "ar";
    return (
      <View>
        <View style={styles.Container}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={styles.drawer}
              onPress={() => {
                this.setState({
                  activeFiltelModel: !this.state.activeFiltelModel
                });
              }}
            >
              <Icon
                name="filter"
                color="white"
                size={scale(35)}
                style={{ marginRight: moderateScale(10) }}
              />
            </TouchableOpacity>

            {/* <TouchableOpacity
              style={styles.drawer}
              onPress={() => {
                // this.props.navigation.toggleDrawer();
                this.showMenu();
              }}
            >
              <Ionicons
                name="md-more"
                color="white"
                size={scale(35)}
                style={{ marginRight: moderateScale(10) }}
              />
            </TouchableOpacity>
         */}
          </View>
          <View
            style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
          >
            {this.props.title && (
              <Text
                style={{
                  textAlignVertical: "center",
                  alignSelf: "center",
                  // top: Platform.OS === "ios" ? moderateScale(10) : null,
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
        <View>
          <ActionSheet
            ref={o => (this._ActionSheet = o)}
            title={localization.categories}
            options={[...this.props.cats.map(e => e.name), "Cancle"]}
            cancelButtonIndex={this.props.cats.length}
            destructiveButtonIndex={this.props.cats.length}
            onPress={selected => {
              if (selected !== this.props.cats.length) {
                this.setState({
                  categoriesFilter: this.props.cats[selected].name,
                  categoriesFilterId: this.props.cats[selected]._id
                });
              }
            }}
          />

          {this.state.activeFiltelModel && (
            <View
              style={{
                width: width,
                backgroundColor: "rgba(0,0,0,0.07)",
                elevation: 8,
                zIndex: 100,
                padding: moderateScale(10),
                paddingBottom: moderateScale(50),
                direction: localization.getLanguage() === "ar" ? "rtl" : "ltr"
              }}
            >
              <View
                style={{
                  flexDirection:
                    localization.getLanguage() === "ar" ? "row-reverse" : "row",
                  direction: localization.getLanguage() === "ar" ? "rtl" : "ltr"
                }}
              >
                <Input
                  style={{
                    width: "100%",
                    borderWidth: 1,
                    borderColor: "grey",
                    backgroundColor: "rgba(0,0,0,0.07)",
                    // paddingVertical: moderateScale(25),
                    color: colors.main,
                    borderRadius: moderateScale(5)
                  }}
                  placeholder={localization.whatyouarsearchfor}
                  onChangeText={v => {
                    this.setState({ inputFilter: v });
                  }}
                  value={this.state.inputFilter}
                />
                <View
                  style={{
                    position: "absolute",
                    height: "100%",
                    right: rtl ? null : "1%",
                    left: rtl ? "1%" : null,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Ionicons
                    name="ios-search"
                    color={colors.main}
                    size={RFValue(25)}
                  />
                </View>
              </View>
              <TouchableOpacity
                style={{
                  width: "100%",
                  alignSelf: "center",
                  borderWidth: 1,
                  borderColor: "grey",
                  backgroundColor: "rgba(0,0,0,0.07)",
                  padding: moderateScale(10),
                  borderRadius: moderateScale(5),
                  flexDirection:
                    localization.getLanguage() === "ar" ? "row-reverse" : "row",
                  direction:
                    localization.getLanguage() === "ar" ? "rtl" : "ltr",
                  justifyContent: "space-between",
                  marginTop: moderateScale(5)
                }}
                onPress={() => this._ActionSheet.show()}
              >
                <Text
                  style={{
                    fontSize: RFValue(14),
                    paddingHorizontal: moderateScale(10),
                    color: colors.main
                  }}
                >
                  {this.state.categoriesFilter}
                </Text>
                <Ionicons
                  name="ios-arrow-down"
                  color={colors.main}
                  size={RFValue(18)}
                  style={{
                    alignSelf: "center",
                    paddingHorizontal: moderateScale(10)
                  }}
                />
              </TouchableOpacity>
              <View
                style={{
                  width: "100%",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  marginTop: moderateScale(10),

                  direction:
                    localization.getLanguage() === "ar" ? "rtl" : "ltr",
                  flexDirection:
                    localization.getLanguage() === "ar" ? "row-reverse" : "row"
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: colors.main,
                    padding: moderateScale(10)
                  }}
                  onPress={() => {
                    this.handleOnChange();
                    this.setState({
                      categoriesFilterId: null,
                      activeFiltelModel: false
                    });
                  }}
                >
                  <Text style={{ color: "white" }}>
                    {localization.applyFilters}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: "white",
                    padding: moderateScale(10)
                  }}
                  onPress={() => {
                    this.setState({
                      categoriesFilter: localization.allcategories,
                      inputFilter: "",
                      activeFiltelModel: false
                    });
                    this.props.resetFilter();
                  }}
                >
                  <Text>{localization.resetFilters}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
    );
  }
}
export default connect(state => {
  return {
    cats: state.Config.categories
  };
})(Header);
const styles = StyleSheet.create({
  Container: {
    // flex: 1,
    width: width,
    height: height * 0.06,
    minHeight: 70,
    // marginTop: verticalScale(30),
    paddingHorizontal: moderateScale(10),
    flexDirection: localization.getLanguage() === "ar" ? "row" : "row-reverse",
    justifyContent: "space-evenly",
    backgroundColor: colors.main
    // direction: localization.getLanguage() === "en" ? "ltr" : "rtl"
    // marginBottom: verticalScale(3)
  },
  drawer: {
    // alignSelf: "center",
    // flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
    // flex: 1
  }
});
