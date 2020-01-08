import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import localization from "../../../localization/localization";
import { RFValue } from "react-native-responsive-fontsize";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { height, colors, moderateScale } from "../../../config";
const Comp = ({ text, IconComponent, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress()} style={styles.Button}>
      <IconComponent />
      <Text style={styles.text}>{text.toUpperCase()}</Text>
    </TouchableOpacity>
  );
};
const Bottom = props => {
  const iconIitialProps = {
    size: RFValue(18),
    color: colors.main
  };
  return (
    <View style={styles.container}>
      <Comp
        text={localization.offers}
        IconComponent={() => (
          <MaterialIcons name="local-offer" {...iconIitialProps} />
        )}
        onPress={() => props.navigation.navigate("Offers")}
      />
      <Comp
        text={localization.notification}
        IconComponent={() => (
          <MaterialIcons name="notifications" {...iconIitialProps} />
        )}
        onPress={() => props.navigation.navigate("Notifications")}
      />
      <Comp
        text={localization.favourite}
        IconComponent={() => (
          <MaterialIcons name="favorite" {...iconIitialProps} />
        )}
        onPress={() => props.navigation.navigate("Favourite")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: localization.getLanguage() === "ar" ? "row-reverse" : "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    // height: height * 0.07,
    padding: moderateScale(5),
    paddingBottom: moderateScale(5),
    backgroundColor: "white", // colors.mainDark,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8
  },
  Button: {
    // flexDirection: localization.getLanguage() === "ar" ? "row-reverse" : "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  text: {
    fontSize: RFValue(10),
    color: colors.main
  }
});
export default Bottom;
