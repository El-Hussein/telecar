import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  I18nManager,
  NetInfo,
  Dimensions,
  AsyncStorage
} from "react-native";
import Navigation from "./src/Navigation";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/es/integration/react";
import DropdownAlert from "react-native-dropdownalert";
import NetInfoWrapper from "./src/Components/netInfoWrapper";
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

import { connect } from "react-redux";
import { UpdateConnectionStatus } from "./src/Redux/actions/netInfo";
import Icon from "react-native-vector-icons/FontAwesome";
import localization from "./src/localization/localization";
import Home from "./src/Navigation/NewNav";
import { GetAppInitials } from "./src/Redux/actions/Config";
import NavigationService from "./src/Navigation/NewNav/NavigationService";

class MyNetInfo extends React.PureComponent {
  constructor(props) {
    super(props);
    GetAppInitials();
    this.skipFirstToast = true;
  }

  componentDidMount() {
    NetInfo.isConnected.fetch().then(isConnected => {
      this.props.UpdateConnectionStatus(isConnected);
    });
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this._handleConnectionChange
    );
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this._handleConnectionChange
    );
  }

  _handleConnectionChange = isConnected =>
    this.props.UpdateConnectionStatus(isConnected);

  render() {
    const { netInfo } = this.props;

    if (true || netInfo.isConnected)
      return (
        <View style={{ flex: 1, backgroundColor: "#CAE4E5" }}>
          {/* <Navigation /> */}

          <Home ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}/>

          <NotificationWrapper nav={this.props.navigation}/>
        </View>
      );
    return (
      <View style={styles.connectionStatus}>
        <Icon
          name="bell-slash"
          color="#57B235"
          size={scale(50)}
          style={{
            fontWeight: "bold",
            marginBottom: 30
          }}
        />
        <Text style={styles.connectionText}>تاكد من اتصالك بالانترنت</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  connectionStatus: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  connectionText: {
    color: "#57B235",
    fontSize: 13,
    fontWeight: "700"
  }
});

const mapStateToProps = state => {
  return {
    netInfo: state.netInfo,
    lang: state.Config.lang
  };
};

export default connect(
  mapStateToProps,
  { UpdateConnectionStatus }
)(MyNetInfo);
