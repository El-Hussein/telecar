import React, { Fragment, useState } from "react";
import {
  View,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView
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
import { RFValue } from "react-native-responsive-fontsize";
import { Input, Item, Button } from "native-base";
import { connect } from "react-redux";
import { GetMyPalance } from "../../../Redux/actions/AuthActions";
import ActionSheet from "react-native-actionsheet";
import { getBanksInfo, UpadteBanks } from "../../../Redux/actions/provider";
import Spinner from "react-native-spinkit";
import Axios from "axios";
import { baseUrl } from "../../../config";
// var DATA = [100, 200, 300, "cancel"];

const Charge = props => {
  const [title, setTitle] = React.useState("فئة الشحن");
  const [providerData, SetProviderData] = useState({ loading: false });
  //   const [didmount, Setdidmount] = useState(false);
  //   const [providerData, SetProviderData] = useState({});
  //   if (!didmount) {
  //     Setdidmount(true);
  //     if (props.type === "Provider") {
  //       getBanksInfo().then(result => {
  //         SetProviderData(result);
  //       });
  //     }
  const [DATA, setDATA] = useState(["cancel"]);
  React.useEffect(() => {
    props.GetMyPalanceNow();
    Axios.get(`${baseUrl}api/bunches`)
      .then(res => {
        console.log("==bun==================================");
        console.log(res.data.bunches.map(e => e.unit));
        console.log("====================================");
        setDATA([...res.data.bunches.map(e => e.unit), "cancel"]);
      })
      .catch(err => {
        console.log("====================================");
        console.log(err);
        console.log("====================================");
      });
    if (props.type === "Provider") {
      getBanksInfo().then(result => {
        SetProviderData(result);
      });
    }
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <Header navigation={props.navigation} title="الرصيد" />
      <ActionSheet
        ref={o => (this.ActionSheet = o)}
        title={title}
        options={DATA}
        cancelButtonIndex={DATA.length - 1}
        destructiveButtonIndex={DATA.length - 1}
        onPress={selected => {
          if (selected !== DATA.length - 1) {
            setTitle();
            props.navigation.navigate("RechargeAccount", {
              amount: DATA[selected]
            });
          }
        }}
      />
      <View
        style={{
          width: "80%",
          alignSelf: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: moderateScale(50)
        }}
      >
        <Text style={{ textDecorationLine: "underline", color: colors.main }}>
          رصيدك الحالي
        </Text>
        <Text
          style={{ textDecorationLine: "underline", writingDirection: "ltr" }}
        >
          {props.balance} <Text style={{ color: colors.main }}>RS</Text>
        </Text>
      </View>
      <View
        style={{
          backgroundColor: "#ccc",
          marginTop: moderateScale(10),
          paddingVertical: moderateScale(1)
        }}
      />
      {props.type === "Provider" && (
        <KeyboardAvoidingView behavior="height">
          <ScrollView
            style={{
              width: "80%",
              alignSelf: "center",
              marginTop: moderateScale(50)
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                textDecorationLine: "underline",
                textDecorationColor: "#57B235"
              }}
            >
              معلومات الحساب البنكي
            </Text>
            <View
              style={{ marginTop: moderateScale(20), flexDirection: "column" }}
            >
              <Text
                style={{
                  width: "100%",
                  color: colors.main,
                  marginBottom: moderateScale(5)
                }}
              >
                اسم البنك
              </Text>
              <Item>
                <Input
                  textAlignVertical="center"
                  style={{
                    width: "100%",
                    borderWidth: 1,
                    borderColor: "#ccc",
                    textAlign: "right"
                  }}
                  placeholder="اسم البنك"
                  onChangeText={t => {
                    SetProviderData({ ...providerData, bankName: t });
                  }}
                  value={providerData.bankName ? providerData.bankName : null}
                />
              </Item>
            </View>
            <View
              style={{ marginTop: moderateScale(20), flexDirection: "column" }}
            >
              <Text
                style={{
                  width: "100%",
                  color: colors.main,
                  marginBottom: moderateScale(5)
                }}
              >
                رقم الحساب
              </Text>
              <Item>
                <Input
                  textAlignVertical="center"
                  style={{
                    width: "100%",
                    borderWidth: 1,
                    borderColor: "#ccc",
                    textAlign: "right"
                  }}
                  placeholder="رقم الحساب"
                  onChangeText={t => {
                    SetProviderData({ ...providerData, bankAccount: t });
                  }}
                  value={
                    providerData.bankAccount ? providerData.bankAccount : null
                  }
                />
              </Item>
            </View>
            <Text
              style={{
                textDecorationLine: "underline",
                marginVertical: moderateScale(5),
                fontSize: RFValue(12)
              }}
            >
              * يتم تحويل رصيدك علي هذا الحساب من قبل الإدارة شهرياً
            </Text>
            <TouchableOpacity
              onPress={() => {
                SetProviderData({ ...providerData, loading: true });
                UpadteBanks({
                  bankName: providerData.bankName,
                  bankAccount: providerData.bankAccount
                }).then(result => {
                  SetProviderData({ ...providerData, loading: false });
                  if (!result) return;
                });
              }}
              style={{
                marginTop: moderateScale(30),
                marginBottom: moderateScale(50),
                borderRadius: moderateScale(10),
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: colors.main,
                paddingVertical: moderateScale(15),
                paddingHorizontal: moderateScale(30),
                width: width * 0.7
              }}
            >
              {providerData.loading ? (
                <Spinner
                  style={{
                    justifyContent: "center",
                    alignSelf: "center",
                    alignItems: "center"
                  }}
                  isVisible={true}
                  type="Circle"
                  color={"white"}
                />
              ) : (
                <Text style={{ color: "white" }}>تحديث الحساب البنكي</Text>
              )}
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
      {props.type === "Customer" && (
        <View
          style={{
            width: "80%",
            marginTop: moderateScale(50),
            alignSelf: "center"
          }}
        >
          <TouchableOpacity disabled onPress={() => this.ActionSheet.show()}>
            <Text
              style={{
                color: colors.main,
                textDecorationLine: "underline",
                alignSelf: "center"
              }}
            >
              شحن الرصيد
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              color: colors.main,
              marginTop: moderateScale(50)
            }}
          >
            يمكنك الدفع بواسطه
          </Text>
          <View
            style={{
              marginTop: moderateScale(10),
              alignSelf: "center",
              flexDirection: "row-reverse",
              alignItems: "center",
              justifyContent: "space-evenly",
              width: width
            }}
          >
            <View style={stylse.paymentButtonContainer}>
              <TouchableOpacity
                style={[
                  stylse.paymentButton,
                  { borderBottomColor: "darkblue" }
                ]}
                onPress={() => this.ActionSheet.show()}
              >
                <Image source={Images.visa} />
              </TouchableOpacity>
            </View>
            <View style={stylse.paymentButtonContainer}>
              <TouchableOpacity
                onPress={() => this.ActionSheet.show()}
                style={[stylse.paymentButton, { borderBottomColor: "red" }]}
              >
                <Image source={Images.masterCard} />
              </TouchableOpacity>
            </View>
            <View style={stylse.paymentButtonContainer}>
              <TouchableOpacity
                style={[stylse.paymentButton, { borderBottomColor: "teal" }]}
                onPress={() => props.navigation.navigate("Contracts")}
              >
                <Image source={Images.cash} />
              </TouchableOpacity>
            </View>
          </View>

          {/* <Button
            style={{
              marginTop: moderateScale(30),
              backgroundColor: "#57B235",
              borderRadius: moderateScale(10),
              width: width * 0.7,
              height: height * 0.08,
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center"
            }}
            title="Verfiy"
            onPress={() => this.ActionSheet.show()}
          >
            <Text
              style={{
                color: "white",
                alignSelf: "center",
                textAlign: "center",
                fontWeight: "800"
              }}
            >
              إدفع الأن
            </Text>
          </Button> */}
        </View>
      )}
    </View>
  );
};

const stylse = StyleSheet.create({
  paymentButtonContainer: {
    shadowColor: "#000",
    width: "30%",
    marginHorizontal: moderateScale(3),
    height: height * 0.1,
    borderRadius: moderateScale(10),
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    justifyContent: "center",
    alignItems: "center",
    elevation: 7,
    backgroundColor: "white",
    paddingHorizontal: moderateScale(10)
  },
  paymentButton: {
    borderBottomWidth: 7,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: height * 0.08
  }
});
const mapDispatchToProps = dispatch => {
  return {
    GetMyPalanceNow: () => GetMyPalance(dispatch)
  };
};
export default connect(
  state => {
    return { type: state.Config.userType, ...state.auth };
  },
  mapDispatchToProps
)(Charge);
