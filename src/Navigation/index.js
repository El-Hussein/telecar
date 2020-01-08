import React from "react";
import {
  createDrawerNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";
import { Platform } from "react-native";
import { width } from "@config";
import Drawer from "../Views/Drawer";
import Customer from "./Customer/index";
import Provider from "./Provider/index";
import Main from "./Main";
import CheckAuth from "./CheckAuth";
import AlertMeassage from "../Components/Alert";
import localization from "../localization/localization";
 
const App = createSwitchNavigator({
  CheckAuth,
  Main: Main,
  Merchant: Provider,
  Customer: Customer
});

// export const MainApp = createDrawerNavigator(
//   {
//     MainApp: App
//   },
//   {
//     contentComponent: props => <Drawer {...props} />,
//     drawerPosition: localization.getLanguage() === "ar" ? "right" : "left",
//     // drawerLockMode: Platform.OS === "ios" ? "locked-closed" : "unlocked",
//     drawerType: "slide",
//     drawerWidth: width * 0.6
//   }
// );
export default createAppContainer(App);
