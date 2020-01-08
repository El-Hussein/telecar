import React from "react";
import { createStackNavigator } from "react-navigation";
import Main from "./Main";
import {
  CallUs,
  Login,
  Register,
  About,
  Policy,
  ForgetPassword,
  ForgetPasswordCode,
  PhoneVerfiy
} from "../Common";

export default MainApp = createStackNavigator(
  {
    Main: Main,
    Register: Register,
    Login: Login,
    PhoneVerfiy,
    ForgetPassword: ForgetPassword,
    ForgetPasswordCode: ForgetPasswordCode,

    CallUs: CallUs,
    About,
    Policy
  },

  {
    // initialRouteName: "Register",
    headerMode: "none"
  }
);
