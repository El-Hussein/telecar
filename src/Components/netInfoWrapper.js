import React from "react";
import { View, Text, StyleSheet, NetInfo, Dimensions } from "react-native";
import { connect } from "react-redux";

import { UpdateConnectionStatus } from "../Redux/actions/netInfo";

const { height } = Dimensions.get("window");

class MyNetInfo extends React.PureComponent {
  constructor(props) {
    super(props);

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

    if (netInfo.isConnected) return <View />;
    return (
      <View style={styles.connectionStatus}>
        <Text style={styles.connectionText}>تاكد من اتصالك بالانترنت</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  connectionStatus: {
    // position: "absolute",
    // bottom: 0,
    width: "100%",
    height: "600%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  connectionText: {
    color: "white",
    fontSize: 13,
    fontWeight: "bold"
  }
});

const mapStateToProps = state => {
  return {
    netInfo: state.netInfo
  };
};

export default connect(
  mapStateToProps,
  { UpdateConnectionStatus }
)(MyNetInfo);
