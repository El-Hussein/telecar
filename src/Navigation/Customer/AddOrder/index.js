import React, { Fragment, useRef, useState } from "react";
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  FlatList,
  KeyboardAvoidingView,
  Platform
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
import RNFS from "react-native-fs";
import Card from "../../../Components/Card";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import ActionSheet from "react-native-actionsheet";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Item, Input, Textarea } from "native-base";
import CustomPicker from "./CustomPicker";
import CustomPickerService from "../../Common/Register/CustomerForm/CustomPicker";
import DocumentPicker from "react-native-document-picker";
import { connect } from "react-redux";
import { SimpleAnimation } from "react-native-simple-animations";
import { AddOrder } from "../../../Redux/actions/Customer";
import Spinner from "react-native-spinkit";
import RNFB from "rn-fetch-blob";
const PickMultipleFile = async () => {
  // Pick multiple files
  let files = [];
  return await DocumentPicker.pickMultiple({
    type: [DocumentPicker.types.pdf]
  })
    .then(async results => {
      for (let res of results) {
        if (res.size <= 1024000) {
          await RNFB.fs
            .readFile(
              Platform.OS === "android" ? res.uri : decodeURIComponent(res.uri),
              "base64"
            )
            .then(result => {
              files.push({ ...res, uri: result });
            })
            .catch(err => {
              console.log("====================================");
              console.log(err);
              console.log("====================================");
            });
        }
      }
    })
    .then(() => files);
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
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const MyHandels = props => {
  const dataCity = [...props.cities.map(e => e.name), "إلغاء"];
  const dataSocket = [...props.strips.map(e => e.name), "إلغاء"];
  const [service, setService] = useState(null);
  const [newOrder, SetOrder] = useState({
    pidfrom: 0,
    pidto: 0,
    details: null,
    city: null,
    strip: null,
    service: null
  });
  const [loading, SetLoading] = useState(false);
  const [newOrderError, setnewOrderError] = useState({});
  const [files, setfiles] = useState([]);
  return (
    <View style={{ flex: 1 }}>
      <Header navigation={props.navigation} />
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <KeyboardAvoidingView
          // keyboardVerticalOffset={moderateScale(50)}
          style={{ flex: 1 }}
          // behavior={Platform.OS === "android" ? "position" : "padding"}
        >
          <ScrollView bounces={false} style={{ flex: 1 }}>
            <View
              style={{
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderColor: "#ccc",
                paddingVertical: moderateScale(10)
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  width: "80%",
                  justifyContent: "space-between",
                  marginLeft: moderateScale(10),
                  marginBottom: moderateScale(15)
                }}
              >
                <Text style={{ color: colors.main }}>مرحباً بك</Text>
                <Text>{props.user.name}</Text>
              </View>
              <Text
                style={{
                  flexWrap: "wrap",
                  fontSize: RFValue(14),
                  width: "90%",
                  alignSelf: "center"
                }}
              >
                في هذه الصفحة نرجو منك تحديد متطلبات الخدمة التي تبحث عنها ,
                حاول أن تذكر كافة التفاصيل الممكنة وأن تكون دقيقا في طلبك حتي
                تحصل علي أفضل العروض .
              </Text>
            </View>
            <View style={{ flexDirection: "row", width: "90%" }}>
              <MaterialCommunityIcons
                name="menu-left"
                size={RFValue(35)}
                color={colors.main}
                style={{
                  marginRight: moderateScale(5),
                  alignSelf: "center",
                  fontFamily: "Tajawal-Bold"
                }}
              />
              <Text
                style={{
                  fontWeight: "bold",
                  justifyContent: "center",
                  textAlignVertical: "center",
                  alignSelf: "center",
                  fontSize: RFValue(14)
                }}
              >
                تفاصيل الخدمة المطلوبة
              </Text>
            </View>
            <CustomPicker
              index={0}
              head="المدينة"
              data={dataCity}
              onChange={index => {
                let CityObj = props.cities[index];
                SetOrder({ ...newOrder, city: CityObj._id });
              }}
            />
            {newOrderError.city && (
              <AnimationTextError error="يجب إختيار المدينة " />
            )}
            <CustomPicker
              index={1}
              head="القطاع"
              data={dataSocket}
              onChange={index => {
                let StripObj = props.strips[index];
                SetOrder({ ...newOrder, strip: StripObj._id });
              }}
            />
            {newOrderError.strip && (
              <AnimationTextError error="يجب إختيار القطاع " />
            )}
            <View
              style={{
                width: "80%",
                alignSelf: "center",
                marginTop: moderateScale(15)
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: RFValue(14) }}>الخدمة المطلوبة</Text>
                <MaterialCommunityIcons
                  name="star"
                  size={RFValue(10)}
                  color={colors.main}
                  style={{ paddingHorizontal: moderateScale(10), top: 0 }}
                />
              </View>
            </View>
            <CustomPickerService
              serviceref={`service2`}
              subServiceref={`subService2`}
              services={props.services}
              servicesTypes={props.servicesTypes}
              SetSelection={payload => {
                SetOrder({ ...newOrder, service: payload._id });
              }}
              index={0}
              SetOfServices={[]}
            />
            {newOrderError.service && (
              <AnimationTextError error="يجب إختيار عنوان الخدمة " />
            )}
            <View
              style={{
                width: "80%",
                alignSelf: "center",
                marginTop: moderateScale(15)
              }}
            >
              <View
                style={{ flexDirection: "row", marginBottom: moderateScale(5) }}
              >
                <Text style={{ fontSize: RFValue(14) }}>
                  الميزانية المررصودة للخدمة
                </Text>
                <MaterialCommunityIcons
                  name="star"
                  size={RFValue(10)}
                  color={colors.main}
                  style={{ paddingHorizontal: moderateScale(10), top: 0 }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly"
                }}
              >
                <View
                  style={{
                    width: width * 0.1,
                    height: width * 0.1,
                    backgroundColor: "#EDF9F1"
                  }}
                >
                  <Input
                    keyboardType="number-pad"
                    style={{
                      borderWidth: 1,
                      borderColor: "#ccc",
                      fontSize: RFValue(10),
                      textAlign: "center"
                    }}
                    placeholder="00"
                    value={newOrder.pidfrom}
                    onChangeText={value =>
                      SetOrder({ ...newOrder, pidfrom: value + "" })
                    }
                  />
                </View>
                <Text>إلي</Text>
                <View
                  style={{
                    width: width * 0.1,
                    height: width * 0.1,
                    backgroundColor: "#EDF9F1"
                  }}
                >
                  <Input
                    style={{
                      borderWidth: 1,
                      borderColor: "#ccc",
                      fontSize: RFValue(10),
                      textAlign: "center"
                    }}
                    placeholder="00"
                    keyboardType="number-pad"
                    value={newOrder.pidto}
                    onChangeText={value =>
                      SetOrder({ ...newOrder, pidto: value + "" })
                    }
                  />
                </View>
                <Text
                  style={{
                    textDecorationLine: "underline",
                    writingDirection: "ltr"
                  }}
                >
                  {newOrder.pidto && newOrder.pidfrom
                    ? newOrder.pidfrom + "-" + newOrder.pidto + " RS"
                    : "غير محدد"}
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "80%",
                alignSelf: "center",
                marginTop: moderateScale(15)
              }}
            >
              <View
                style={{ flexDirection: "row", marginBottom: moderateScale(5) }}
              >
                <Text style={{ fontSize: RFValue(14) }}>تفاصيل الخدمة</Text>
                <MaterialCommunityIcons
                  name="star"
                  size={RFValue(10)}
                  color={colors.main}
                  style={{ paddingHorizontal: moderateScale(10), top: 0 }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <Input
                  multiline
                  style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    height: height * 0.1
                  }}
                  value={newOrder.details}
                  onChangeText={value =>
                    SetOrder({ ...newOrder, details: value })
                  }
                />
              </View>
              {newOrderError.details && (
                <AnimationTextError error="يجب كتابة تفاصيل الخدمة " />
              )}
            </View>
            <View
              style={{
                width: "80%",
                alignSelf: "center",
                marginTop: moderateScale(15)
              }}
            >
              <View
                style={{ flexDirection: "row", marginBottom: moderateScale(3) }}
              >
                <Text style={{ fontSize: RFValue(14) }}>إرفاق ملفات</Text>
                <MaterialCommunityIcons
                  name="star"
                  size={RFValue(10)}
                  color={colors.main}
                  style={{ paddingHorizontal: moderateScale(10), top: 0 }}
                />
              </View>
              <Text
                style={{
                  fontSize: RFValue(10),
                  alignSelf: "flex-end",
                  textAlign: "left",
                  marginBottom: moderateScale(5)
                }}
              >
                لايتم رفع الملفات الا حين قبول الطلب
              </Text>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  alignSelf: "center"
                }}
                onPress={async () => {
                  PickMultipleFile().then(res => {
                    console.log("====================================");
                    console.log(res);
                    console.log("====================================");
                    setfiles(res);
                  });
                }}
              >
                <Image
                  source={Images.upload}
                  style={{ resizeMode: "stretch" }}
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: RFValue(10),
                  alignSelf: "flex-end",
                  textAlign: "left",
                  marginBottom: moderateScale(5)
                }}
              >
                * أقصي حجم للملف ١ ميجا بايت
              </Text>
              <Text
                style={{
                  fontSize: RFValue(10),
                  alignSelf: "flex-end",
                  textAlign: "left",
                  marginBottom: moderateScale(5)
                }}
              >
                الحد الأقصي لعدد الملفات هو 2
              </Text>
              {files.map((item, index) => {
                return (
                  <View>
                    <View
                      style={{
                        backgroundColor: "#eee",
                        borderRadius: moderateScale(10),
                        height: height * 0.01,
                        width: "90%",
                        alignSelf: "center"
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: "#57B235",
                          height: height * 0.01,
                          width: (item.size * 100) / 1024000,
                          borderRadius: moderateScale(10)
                        }}
                      />
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-between"
                      }}
                    >
                      <Text
                        style={{
                          fontSize: RFValue(10),
                          alignSelf: "flex-end",
                          textAlign: "right",
                          marginBottom: moderateScale(5)
                        }}
                      >
                        حجم الملف : {item.size}
                      </Text>
                      <Text
                        style={{
                          fontSize: RFValue(10),
                          alignSelf: "flex-end",
                          textAlign: "right",
                          marginBottom: moderateScale(5)
                        }}
                      >
                        نوع الملف : {item.type}
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: RFValue(10),
                        alignSelf: "center",
                        textAlign: "center",
                        marginBottom: moderateScale(5)
                      }}
                    >
                      إسم الملف : {item.name.trim(10)}
                    </Text>
                  </View>
                );
              })}
            </View>
            <TouchableOpacity
              style={{
                width: width * 0.4,
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: colors.main,
                borderRadius: moderateScale(10),
                marginTop: moderateScale(10),
                marginBottom: moderateScale(50)
              }}
              onPress={() => {
                let Errors = {};
                if (!newOrder.city) {
                  Errors.city = true;
                }
                if (!newOrder.strip) {
                  Errors.strip = true;
                }
                if (!newOrder.service) {
                  Errors.service = true;
                }
                if (!newOrder.details) {
                  Errors.details = true;
                }
                setnewOrderError(Errors);
                if (Object.keys(Errors).length === 0) {
                  //     let formData=new FormData();
                  //     for ( let key in newOrder ) {
                  //       formData.append(key, newOrder[key]);
                  //   }
                  //   for ( let key in files ) {
                  //     formData.append(key, newOrder[key].uri);
                  // }
                  SetLoading(true);
                  AddOrder({ ...newOrder, files: files }, () => {
                    props.navigation.goBack();
                  }).then(result => {
                    SetLoading(false);
                  });
                }
                //props.navigation.navigate("DealFollow")
              }}
            >
              {loading ? (
                <Spinner
                  style={{
                    marginVertical: moderateScale(20),
                    justifyContent: "center",
                    alignSelf: "center",
                    alignItems: "center"
                  }}
                  isVisible={true}
                  type="Circle"
                  color={"#57B235"}
                />
              ) : (
                <Text style={{ color: "white", margin: moderateScale(10) }}>
                  إرسال
                </Text>
              )}
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: moderateScale(20),
    alignSelf: "center",
    width: width * 0.9,
    marginHorizontal: moderateScale(2),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4
    },
    padding: moderateScale(10),
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    borderColor: "#eee",
    borderWidth: 1,
    elevation: 9,
    borderRadius: moderateScale(4),
    backgroundColor: "white"
  },
  drawer: {
    marginHorizontal: moderateScale(30)
  },
  Icon: {
    textAlign: "right",
    height: "100%",
    marginRight: moderateScale(3)
  },
  TextError: {
    flex: 1,
    color: "red",
    textAlign: "center",
    fontSize: RFPercentage(1.5)
  }
});

export default connect(state => {
  return {
    cities: state.Config.cities,
    strips: state.Config.strips,
    services: state.Config.services,
    servicesTypes: state.Config.servicesTypes,
    user: state.auth.user
  };
})(MyHandels);
