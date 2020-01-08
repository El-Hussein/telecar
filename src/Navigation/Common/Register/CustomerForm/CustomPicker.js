import React, { Component, Fragment, useRef, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";

import {
  width,
  height,
  moderateScale,
  scale,
  verticalScale,
  colors
} from "@config";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import ActionSheet from "react-native-actionsheet";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";

class CustomPicker extends Component {
  constructor(props) {
    super(props);
    this.servicesTypes = this.props.servicesTypes.map(e => e.name);
    this.state = {
      title: "أختر جهة الخدمة",
      subTitile: "أختر الخدمة",
      subServices: []
    };
  }
  render() {
    let props = this.props;
    let { index, services, serviceref, subServiceref } = props;

    return (
      <View>
        <View
          style={{
            width: "80%",
            alignSelf: "center",
            marginTop: moderateScale(1)
          }}
        >
          <ActionSheet
            ref={a => (serviceref = a)}
            title="اختر جهة الخدمة"
            options={[...this.servicesTypes, "إلغاء"]}
            cancelButtonIndex={this.servicesTypes.length}
            onPress={async selected => {
              if (selected !== this.servicesTypes.length) {
                let arrOfSubServices = [];

                await services.map(e => {
                  console.log(
                    "========= !(e._id in props.SetOfServices) &&==========================="
                  );
                  console.log(
                    !props.SetOfServices.includes(e._id),
                    e._id,
                    props.SetOfServices
                  );
                  console.log("====================================");
                  if (
                    !props.SetOfServices.includes(e._id) &&
                    e.type.name === this.servicesTypes[selected]
                  )
                    arrOfSubServices.push(e);
                  return;
                });
                this.setState({
                  title: this.servicesTypes[selected],
                  subTitile: "اختر الخدمة",
                  subServices: arrOfSubServices
                });
              }
            }}
          />
          <TouchableOpacity
            style={{
              flexDirection: "row",
              borderWidth: 1,
              borderColor: "#ccc",
              alignItems: "center",
              marginTop: moderateScale(1)
            }}
            onPress={() => {
              serviceref.show();
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

        <View
          style={{
            width: "80%",
            alignSelf: "center",
            marginTop: moderateScale(1)
          }}
        >
          <ActionSheet
            ref={a => (subServiceref = a)}
            title="اختر الخدمة"
            options={[...this.state.subServices.map(e => e.name), "إلغاء"]}
            cancelButtonIndex={this.state.subServices.length}
            onPress={selected => {
              if (selected !== this.state.subServices.length) {
                this.setState({
                  subTitile: this.state.subServices.map(e => e.name)[selected]
                });
                console.log(
                  "==============SetOfServices======================"
                );
                console.log(props.SetOfServices);
                console.log("====================================");
                props.SetSelection({
                  index,
                  _id: this.state.subServices[selected]._id
                });
              }
            }}
          />
          <TouchableOpacity
            style={{
              flexDirection: "row",
              borderWidth: 1,
              borderColor: "#ccc",
              alignItems: "center",
              marginTop: moderateScale(1)
            }}
            onPress={() => {
              subServiceref.show();
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
              {this.state.subTitile}
            </Text>
            <MaterialCommunityIcons name="menu-down" size={RFValue(22)} />
          </TouchableOpacity>
        </View>
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
