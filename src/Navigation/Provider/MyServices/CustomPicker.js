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
      title: props.myservice ? props.myservice.type.name : "أختر جهة الخدمة",
      subTitile: props.myservice ? props.myservice.name : "أختر الخدمة",
      subServices: []
    };
  }
  componentWillReceiveProps(nxt) {
    if (nxt.myservice) {
      this.setState({
        title: nxt.myservice ? nxt.myservice.type.name : "أختر جهة الخدمة",
        subTitile: nxt.myservice ? nxt.myservice.name : "أختر الخدمة"
      });
      this.props = nxt;
    }
  }
  render() {
    let props = this.props;
    let { index, services, serviceref, subServiceref, myservice } = props;

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
                    props.SetOfServices,
                    e.type.name,
                    this.servicesTypes[selected]
                  );
                  console.log("====================================");
                  if (
                    !props.SetOfServices.map(e => e._id).includes(e._id) &&
                    e.type.name === this.servicesTypes[selected]
                  )
                    arrOfSubServices.push(e);
                  return;
                });
                console.log("====================================");
                console.log(arrOfSubServices);
                console.log("====================================");

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
                  _id: this.state.subServices[selected]
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

// import React, { Component, Fragment, useRef, useState } from "react";
// import {
//   View,
//   Image,
//   ScrollView,
//   TouchableOpacity,
//   StyleSheet,
//   Text,
//   FlatList
// } from "react-native";

// import {
//   width,
//   height,
//   moderateScale,
//   scale,
//   verticalScale,
//   colors
// } from "@config";
// import Header from "@components/Header";
// import { Images } from "@assets";
// import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
// import ActionSheet from "react-native-actionsheet";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import { Item } from "native-base";
// import { connect } from "react-redux";

// class CustomPicker extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       title: this.props.data[0]
//     };
//   }
//   render() {
//     let props = this.props;
//     let { index, head, data, ref } = props;

//     return (
//       <View
//         style={{
//           width: "80%",
//           alignSelf: "center",
//           marginTop: moderateScale(1)
//         }}
//       >
//         <ActionSheet
//           ref={a => (ref = a)}
//           title={head}
//           options={data}
//           cancelButtonIndex={2}
//           onPress={selected => {
//             if (selected !== data.length - 1) {
//               this.setState({ title: data[selected] });
//             }
//           }}
//         />
//         <TouchableOpacity
//           style={{
//             flexDirection: "row",
//             borderWidth: 1,
//             borderColor: "#ccc",
//             alignItems: "center",
//             marginTop: moderateScale(1)
//           }}
//           onPress={() => {
//             ref.show();
//           }}
//         >
//           <Text
//             style={{
//               width: "90%",
//               marginVertical: moderateScale(10),
//               textAlign: "center",
//               alignSelf: "center",
//               fontSize: RFValue(14)
//             }}
//           >
//             {this.state.title}
//           </Text>
//           <MaterialCommunityIcons name="menu-down" size={RFValue(22)} />
//         </TouchableOpacity>
//       </View>
//     );
//   }
// }

// const mapStateToProps = state => {
//   return {
//     ...state.AddService
//   };
// };
// const mapDispatchToProps = dispatch => {
//   return { dispatch: dispatch };
// };
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(CustomPicker);
