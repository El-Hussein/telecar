import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import Header from "../../Components/Header";
import Card from "../../Components/Card";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import {
  width,
  height,
  moderateScale,
  scale,
  verticalScale,
  colors
} from "@config";
import { Images } from "@assets";
import { connect } from "react-redux";
import { Login_Type } from "../../Redux/types";
import store from "../../Redux/index";
import localization from "../../localization/localization";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
const Main = props => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F1FEFF",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {/* <Header navigation={props.navigation} hidelogo hideback /> */}
      <View
        style={{ flex: 0.5, justifyContent: "center", alignItems: "center" }}
      >
        <Image
          source={Images.Logo}
          style={{ flex: 1, resizeMode: "stretch" }}
        />
      </View>

      <View
        style={{
          width: width * 0.8,
          alignSelf: "center",
          height: height * 0.05,
          marginHorizontal: moderateScale(5),
          marginTop: height * 0.1
        }}
      >
        <Text
          style={{
            fontSize: RFPercentage(3.5)
          }}
        >
          {localization.selectType}
        </Text>
      </View>
      <View
        style={{
          width: width,
          flexDirection: "row"
        }}
      >
        <TouchableOpacity
          onPress={() => {
            props.changeType("Customer");
            props.navigation.navigate("Login", { type: "Customer" });
            // props.navigation.navigate("Customer");
          }}
          style={styles.card}
        >
          <Card
            image={Images.cardBack}
            text={localization.client}
            icon={<Entypo name="user" size={RFValue(70)} color={colors.main} />}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.changeType("Merchant");
            props.navigation.navigate("Login", { type: "Merchant" });
          }}
          style={styles.card}
        >
          <Card
            image={Images.cardBack}
            text={localization.seller}
            icon={
              <MaterialCommunityIcons
                name="store"
                size={RFValue(70)}
                color={colors.main}
              />
            }
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const mapDispatchToProps = dispatch => {
  return {
    changeType: type => dispatch({ type: "changeType", payload: type })
  };
};
export default connect(null, mapDispatchToProps)(Main);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    width: width * 0.4,
    height: height * 0.2,
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
  }
});
