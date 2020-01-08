import React, { Component, Fragment, useRef, useState } from "react";
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  FlatList
} from "react-native";

import {
  width,
  height,
  moderateScale,
  scale,
  verticalScale,
  colors
} from "@config";
import Header from "@components/Header";
import { Images } from "@assets";
import Card from "../../../Components/Card";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import ActionSheet from "react-native-actionsheet";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Item } from "native-base";
import { connect } from "react-redux";
import {
  addService_City,
  addService_Sector,
  addService_Employer,
  addService_Address
} from "../../../Redux/types/Customer";

class CustomPicker extends Component {
  constructor(props) {
    super(props);
    this.title;
    this.state = {
      title: props.index === 0 ? "أختر المدينة" : "أختر القطاع"
    };
  }
  render() {
    let props = this.props;
    let { index, head, data } = props;
    // if (index === 0) this.title = props.city ? props.city : head;
    // if (index === 1) this.title = props.sector ? props.sector : head;
    // if (index === 2) this.title = props.employer ? props.employer : head;
    const referance = o => {
      if (index === 0) {
        return (refs_City = o);
      }
      if (index === 1) {
        return (refs_Socket = o);
      }
      if (index === 2) {
        return (refs_Employer = o);
      }
      if (index === 3) {
        return (refs_address = o);
      }
    };
    return (
      <View
        style={{
          width: "80%",
          alignSelf: "center",
          marginTop: moderateScale(15)
        }}
      >
        <ActionSheet
          ref={referance}
          title={head}
          options={data}
          cancelButtonIndex={data.length - 1}
          onPress={selected => {
            if (selected !== data.length - 1) {
              props.onChange(selected);
              this.setState({ title: data[selected] });
              // switch (index) {
              //   case 0:
              //     return props.dispatch({
              //       type: addService_City,
              //       payload: data[selected]
              //     });
              //   case 1:
              //     return props.dispatch({
              //       type: addService_Sector,
              //       payload: data[selected]
              //     });
              //   case 2:
              //     return props.dispatch({
              //       type: addService_Employer,
              //       payload: data[selected]
              //     });
              // }
            }
          }}
        />
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: RFValue(14) }}>{head}</Text>
          <MaterialCommunityIcons
            name="star"
            size={RFValue(10)}
            color={colors.main}
            style={{ paddingHorizontal: moderateScale(10), top: 0 }}
          />
        </View>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            borderWidth: 1,
            borderColor: "#ccc",
            alignItems: "center",
            marginTop: moderateScale(5)
          }}
          onPress={() => {
            if (index === 0) {
              refs_City.show();
            }
            if (index === 1) {
              refs_Socket.show();
            }
            if (index === 2) {
              refs_Employer.show();
            }
          }}
        >
          <Text
            style={{
              width: "90%",
              marginVertical: moderateScale(10),
              textAlign: "center",
              alignSelf: "center",
              fontSize: RFValue(14)
            }}
          >
            {this.state.title}
          </Text>
          <MaterialCommunityIcons name="menu-down" size={RFValue(22)} />
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.AddService
  };
};
const mapDispatchToProps = dispatch => {
  return { dispatch: dispatch };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomPicker);
