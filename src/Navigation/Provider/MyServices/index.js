import React, { Fragment, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableWithoutFeedback,
  Platform
} from "react-native";
import Header from "@components/Header";

import { SimpleAnimation } from "react-native-simple-animations";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";
import Spinner from "react-native-spinkit";
import {
  width,
  height,
  moderateScale,
  scale,
  verticalScale,
  colors
} from "@config";
import { Input, Item, Button } from "native-base";
import { Formik } from "formik";
import * as yup from "yup";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";

import { Images } from "@assets";
import CustomPicker from "./CustomPicker";
import {
  getMyService,
  DeleteMyService,
  AddMyService
} from "../../../Redux/actions/provider";
const Form = props => {
  const [Refs, SetRefs] = useState([]);
  const [servicesError, SetServicesError] = useState(false);
  const [loading, Setloading] = useState(true);
  const [firstLoad, SetfirstLoad] = useState(true);
  if (firstLoad) {
    getMyService().then(result => {
      console.log("=====res serv===============================");
      console.log(result);
      console.log("====================================");
      Setloading(false);
      if (!result) {
        return;
      }
      SetRefs(result);
    });
    SetfirstLoad(false);
  }
  return (
    <View style={{ flex: 1 }}>
      <Header navigation={props.navigation} title="خدماتي" />

      <ScrollView>
        <View>
          <View
            style={{
              width: "80%",
              alignSelf: "center",
              marginTop: moderateScale(50)
            }}
          >
            <Text
              style={{
                flex: 1,
                fontWeight: "bold",
                fontSize: RFValue(18),
                flexWrap: "wrap-reverse"
              }}
            >
              الخدمات المقدمة
            </Text>
          </View>

          {Refs.length > 0 &&
            Refs.map((item, index) => {
              console.log("================item====================");
              console.log(item);
              console.log("====================================");
              return (
                <View key={index} style={{ marginTop: moderateScale(10) }}>
                  <CustomPicker
                    serviceref={`service${index}`}
                    subServiceref={`subService${index}`}
                    services={props.services}
                    servicesTypes={props.servicesTypes}
                    SetSelection={payload => {
                      const RefsNew = Refs;
                      // RefsNew[payload.index] = payload._id;
                      Setloading(true);
                      AddMyService(payload._id._id).then(newRefs => {
                        Setloading(false);
                        if (!newRefs) return;
                        SetRefs(newRefs);
                      });
                      // SetRefs(RefsNew);
                      // console.log("======newRefs==============================");
                      // console.log(RefsNew);
                      // console.log("====================================");
                    }}
                    index={index}
                    myservice={item}
                    SetOfServices={Refs}
                  />
                  {/* {Refs.length === index + 1 */}
                  {true && (
                    <TouchableOpacity
                      onPress={async () => {
                        let numberOfIdsExist = [];
                        await Refs.map(e => {
                          return e._id ? numberOfIdsExist.push(e._id) : null;
                        });
                        if (Refs.length > 1) {
                          Setloading(true);
                          // numberOfIdsExist.length > 1
                          if (Refs[index]._id) {
                            DeleteMyService(Refs[index]._id).then(newRefs => {
                              Setloading(false);
                              if (!newRefs) return;
                              SetRefs(newRefs);
                            });
                          } else {
                            let NewRefs = await [...Refs];
                            await NewRefs.splice(index, 1);
                            SetRefs(NewRefs);
                            Setloading(false);
                          }
                        }
                      }}
                      style={{ position: "absolute", top: 0, right: "3%" }}
                    >
                      <MaterialIcons
                        name="remove-circle-outline"
                        color={colors.main}
                        size={RFValue(22)}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              );
            })}

          <View
            style={{
              width: "80%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignSelf: "center"
            }}
          >
            <Text>اضافة المزيد من الخدمات</Text>
            <TouchableOpacity
              onPress={() => {
                SetRefs([...Refs, 0]);
              }}
            >
              <MaterialIcons
                name="add-circle"
                color={colors.main}
                size={RFValue(22)}
              />
            </TouchableOpacity>
          </View>
          {servicesError && (
            <AnimationTextError error="يجب اختيار خدمة واحدة علي الأقل" />
          )}
          {/* {Refs.map((item, index) => {
            return (
              <View key={index} style={{ marginTop: moderateScale(10) }}>
                <CustomPicker
                  index={0}
                  ref={o => (customRef[`service${index}`] = o)}
                  data={["الجوازات السعودية", "السجلات السعودية", "إلغاء"]}
                />
                <CustomPicker
                  index={1}
                  ref={o => (customRef[`type${index}`] = o)}
                  //   ref={`type${index}`}
                  data={["تغير مهنة", "اصدار جواز سفر", "إلغاء"]}
                />
                <TouchableOpacity
                  onPress={async () => {
                    if (Refs.length > 1) {
                      let NewRefs = await [...Refs];
                      await NewRefs.splice(index, 1);
                      SetRefs(NewRefs);
                    }
                  }}
                  style={{ position: "absolute", top: 0, right: "3%" }}
                >
                  <MaterialIcons
                    name="remove-circle-outline"
                    color={colors.main}
                    size={RFValue(22)}
                  />
                </TouchableOpacity>
              </View>
            );
          })} */}

          {/* <View
            style={{
              width: "80%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignSelf: "center"
            }}
          >
            <Text>اضافة المزيد من الخدمات</Text>
            <TouchableOpacity
              onPress={() => {
                SetRefs([...Refs, 0]);
              }}
            >
              <MaterialIcons
                name="add-circle"
                color={colors.main}
                size={RFValue(22)}
              />
            </TouchableOpacity>
          </View> */}
        </View>
      </ScrollView>

      {loading && (
        <View
          style={{
            position: "absolute",
            flex: 1,
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.1)"
          }}
        >
          <Spinner
            style={{
              marginVertical: moderateScale(20),
              justifyContent: "center",
              alignSelf: "center",
              alignItems: "center"
            }}
            isVisible={loading}
            type="Circle"
            color={"#57B235"}
          />
        </View>
      )}
    </View>
  );
};

const AnimationTextError = ({ error }) => (
  <SimpleAnimation
    delay={100}
    duration={500}
    movementType="slide"
    staticType="bounce"
    direction="up"
  >
    <Text style={styles.TextError}>{error}</Text>
  </SimpleAnimation>
);
const styles = StyleSheet.create({
  Input: {
    borderBottomWidth: 1,
    textAlign: "right",
    fontSize: RFValue(14),
    color: "gray"
  },
  TextError: {
    flex: 1,
    color: "red",
    textAlign: "left",
    fontSize: RFPercentage(1.5)
  }
});
export default connect(
  state => {
    return {
      // type: state.auth.LoginType
      services: state.Config.services,
      servicesTypes: state.Config.servicesTypes,
      myServices: state.provider.myservices
    };
  },
  dispatch => {
    return {
      getMyServices: () => getMyService(dispatch)
    };
  }
)(Form);
