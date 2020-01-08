/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  I18nManager,
  AsyncStorage
} from "react-native";
import Spinner from "react-native-spinkit";
import Navigation from "./src/Navigation";
import codePush from "react-native-code-push";

import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/es/integration/react";
import DropdownAlert from "react-native-dropdownalert";
import NetInfoWrapper from "./src/Components/netInfoWrapper";
import { MenuProvider } from "react-native-popup-menu";

import {
  width,
  height,
  moderateScale,
  scale,
  verticalScale,
  colors
} from "@config";
import store from "./src/Redux";
import AlertMeassage from "./src/Components/Alert";
import NotificationWrapper from "./src/NotificationWrapper";
import Axios from "axios";
import AppWrapper from "./AppWrapper";
import localization from "./src/localization/localization";
import SplashScreen from "react-native-splash-screen";


import TestPage from './src/screens/customer/Home';


import firebaseJs from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyD0VyA0rUEdcfofxp7WL8R8y6GL3iLlsjY",
  authDomain: "telecar-3c801.firebaseapp.com",
  databaseURL: "https://telecar-3c801.firebaseio.com",
  projectId: "telecar-3c801",
  storageBucket: "telecar-3c801.appspot.com",
  messagingSenderId: "876175163051",
  appId: "1:876175163051:web:f257fdda4cddba132cc1ee"
  // apiKey: "AIzaSyAagE1pAz8lZ8xXEt_d8l3CCKNKD_gONME",
  // authDomain: "manager-f3334.firebaseapp.com",
  // databaseURL: "https://manager-f3334.firebaseio.com",
  // projectId: "manager-f3334",
  // storageBucket: "manager-f3334.appspot.com",
  // messagingSenderId: "584623961160",
  // appId: "1:584623961160:web:d5b3ac41acdc0c6850547d"
};
class App extends Component {
  constructor(props) {
    if (!__DEV__) {
      console.log = () => {};
    }

    super(props);
    if (!firebaseJs.apps.length) {
      firebaseJs.initializeApp(firebaseConfig);
    }

    AsyncStorage.getItem("@lang").then(lang => {
      if (lang === "en") {
        I18nManager.forceRTL(false);
        localization.setLanguage("en");
      } else {
        I18nManager.forceRTL(true);
        localization.setLanguage("ar");
      }
      // this.forceUpdate();
      console.log("*******************LANGUAGE SECTIOOOOON********************")
      console.log("LANGUAGE see: " + lang)
      console.log("I18MANAGER see: " + JSON.stringify(I18nManager.isRTL));     
      console.log("LOCALIZATION see: " + localization.getLanguage());
      console.log("SHOULD CHANGE see: " + this.Should_Force_RTL_Design());
      console.log("*******************LANGUAGE SECTIOOOOON********************")
    });


    // let oldRender = Text.render;
    // Text.render = function(...args) {
    //   let origin = oldRender.call(this, ...args);
    //   return React.cloneElement(origin, {
    //     style: [
    //       {
    //         fontSize: RFValue(18),
    //         fontFamily: "Cairo-SemiBold",
    //         color: "black",
    //         writingDirection:
    //           localization.getLanguage() === "en" ? "ltr" : "rtl",
    //         TextAlign: localization.getLanguage() === "en" ? "left" : "right"
    //         // top: Platform.OS === "ios" ? moderateScale(5) : null
    //       },
    //       origin.props.style
    //     ]
    //   });
    // };

    // let oldRenderView = View.render;
    // View.render = function(...args) {
    //   let origin = oldRenderView.call(this, ...args);
    //   return React.cloneElement(origin, {
    //     style: [
    //       {
    //         direction: localization.getLanguage() === "en" ? "ltr" : "rtl"
    //       },
    //       origin.props.style
    //     ]
    //   });
    // };
  }
  
  Should_Force_RTL_Design(){
    return I18nManager.isRTL != (localization.getLanguage()=='ar')
  }

  codePushStatusDidChange(status) {
    switch (status) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        console.log("Checking for updates.");
        break;
      case codePush.SyncStatus.DOWNLOADING_PACKAGE: {
        this.setState({ newUpdate: true });
        console.log("Downloading package.");
        break;
      }
      case codePush.SyncStatus.INSTALLING_UPDATE: {
        this.setState({ newUpdate: true });
        console.log("Installing update.");
        break;
      }
      case codePush.SyncStatus.UP_TO_DATE:
        console.log("Up-to-date.");
        break;
      case codePush.SyncStatus.UPDATE_INSTALLED: {
        this.setState({ newUpdate: false });
        console.log("Update installed.");
        break;
      }
    }
  }

  codePushDownloadDidProgress(progress) {
    console.log(
      progress.receivedBytes + " of " + progress.totalBytes + " received."
    );
  }
  componentDidMount() {}
  state = {
    newUpdate: false
  };
  render() {
    const persistor = persistStore(store);

    return (
      // <MenuProvider>
      //   <TestPage />
      // </MenuProvider>
      
      <Provider store={store}>
        <PersistGate
          persistor={persistor}
          onBeforeLift={() => {
            setTimeout(() => SplashScreen.hide(), 50);
          }}
        >
          <MenuProvider>
            <AppWrapper />
          </MenuProvider>
          <AlertMeassage />
          {/* <NotificationWrapper /> */}
          {this.state.newUpdate && (
            <View
              style={{
                position: "absolute",
                width: width,
                height: height,
                backgroundColor: "rgba(0,0,0,0.5)",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "white",
                  padding: moderateScale(10),
                  borderRadius: moderateScale(10)
                }}
              >
                <Spinner
                  style={{
                    justifyContent: "center",
                    alignSelf: "center",
                    alignItems: "center"
                  }}
                  isVisible={true}
                  type="Circle"
                  color={"green"}
                />
                <Text style={{ color: "green" }}>{localization.update}</Text>
              </View>
            </View>
          )}
        </PersistGate>
      </Provider>
    );
  }
}

let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.IMMEDIATE
};
// export default codePush(codePushOptions)(App);
export default App;
