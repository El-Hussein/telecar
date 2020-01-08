import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform
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
import Icon from "react-native-vector-icons/SimpleLineIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Images } from "@assets";
export default class Header extends Component {
  render() {
    return (
      <View style={styles.Container}>
        <View style={{ flexDirection: "row", flex: 0.8 }}>
          <TouchableOpacity
            style={styles.drawer}
            onPress={() => {
              this.props.navigation.toggleDrawer();
            }}
          >
            <Icon
              name="menu"
              color="white"
              size={scale(18)}
              style={{
                // fontWeight: "bold",
                // fontSize: RFValue(18),
                marginRight: moderateScale(10)
              }}
            />
          </TouchableOpacity>
          {this.props.title && (
            <Text
              style={{
                flex: 1,
                fontFamily: "Tajawal-ExtraBold",
                textAlignVertical: "center",
                alignSelf: "center",
                top: Platform.OS === "ios" ? moderateScale(10) : null,
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
            marginHorizontal: moderateScale(25),
            justifyContent: "center",
            alignItems: "center"
          }}
        >
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
                name="ios-arrow-back"
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
    // flex: 1,
    width: width,
    height: height * 0.06,
    minHeight: 70,
    marginTop: verticalScale(30),
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.main,
    marginBottom: verticalScale(3)
  },
  drawer: {
    marginLeft: moderateScale(30),
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});
