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
import Spinner from "react-native-spinkit";
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
import StarRating from "react-native-star-rating";
import { Input } from "native-base";
import { SimpleAnimation } from "react-native-simple-animations";
import Axios from "axios";
import { baseUrl } from "../../../config";
import Store from "../../../Redux/index";
const AnimationTextError = ({ error }) => (
  <SimpleAnimation
    delay={100}
    duration={500}
    movementType="slide"
    staticType="bounce"
    direction="up"
  >
    <Text
      style={{
        flex: 1,
        color: "red",
        textAlign: "center",
        fontSize: RFPercentage(1.5)
      }}
    >
      {error}
    </Text>
  </SimpleAnimation>
);
const CustomDetails = ({
  isNumber,
  title,
  details,
  multiline,
  onChange,
  error
}) => {
  const [value, setValue] = useState(null);
  return (
    <View
      style={{
        width: "80%",
        alignSelf: "center",
        marginTop: moderateScale(30)
      }}
    >
      <Text style={{ color: colors.main }}>{title}</Text>
      <Input
        multiline={multiline}
        placeholder={details}
        value={value}
        style={{
          paddingTop: multiline ? moderateScale(30) : null,
          paddingBottom: multiline ? moderateScale(30) : null,
          paddingHorizontal: moderateScale(20),
          borderColor: "#ccc",
          borderWidth: 1,
          fontWeight: "600",
          fontSize: RFValue(14),
          textAlign: "right",
          flexWrap: "wrap"
        }}
        placeholderTextColor="#ccc"
        onChangeText={t => {
          isNumber ? setValue(t.replace(/[^0-9]/g, "")) : setValue(t);
          isNumber ? onChange(t.replace(/[^0-9]/g, "")) : onChange(t);
        }}
        keyboardType={isNumber ? "numeric" : "default"}
      />
      {error && <AnimationTextError error={error} />}
    </View>
  );
};
const SendDeal = props => {
  const [offerData, setOfferData] = useState({
    Submited: false,
    loading: false
  });
  const order_id = props.navigation.state.params.order_id;
  return (
    <View style={{ flex: 1 }}>
      <Header navigation={props.navigation} title="نموذج تقديم عرض" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        keyboardVerticalOffset={moderateScale(5)}
      >
        <ScrollView bounces={false} style={{ flex: 1 }}>
          <CustomDetails
            title="مقدمة العرض"
            multiline
            details={`السلام عليكم أستطيع تنفيذ العرض المطلوب . بكل الشروط المذكورة , وخلال المدةالمحددة`}
            onChange={t => setOfferData({ ...offerData, introduction: t })}
            error={
              offerData.Submited && !offerData.introduction && "هذا الحقل مطلوب"
            }
          />
          <CustomDetails
            title="المدة"
            details="12 يوم"
            onChange={t => setOfferData({ ...offerData, time: t })}
            error={offerData.Submited && !offerData.time && "هذا الحقل مطلوب"}
          />
          <CustomDetails
            title="السعر بالريال"
            details="300 "
            onChange={t => setOfferData({ ...offerData, price: t })}
            error={offerData.Submited && !offerData.price && "هذا الحقل مطلوب"}
            isNumber
          />
          <TouchableOpacity
            style={{
              backgroundColor: colors.main,
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              borderRadius: moderateScale(10),
              marginTop: moderateScale(10)
            }}
            onPress={() => {
              if (
                !offerData.introduction ||
                !offerData.time ||
                !offerData.price
              ) {
                setOfferData({ ...offerData, Submited: true });
                return;
              }
              setOfferData({ ...offerData, Submited: true, loading: true });
              const token = Store.getState().auth.user.token;
              const AlertMessage = Store.getState().Config.alert;
              Axios.post(
                baseUrl + "api/providers/makeoffer",
                { ...offerData, order_id },
                {
                  headers: {
                    Authorization: token
                  }
                }
              )
                .then(result => {
                  AlertMessage("success", "", "تم إرسال الطلب بنجاح ");
                  props.navigation.navigate("Profile");
                  setOfferData({ ...offerData, loading: false });
                })
                .catch(e => {
                  setOfferData({ ...offerData, loading: false });
                  AlertMessage("error", "خطأ", e.response.data.error);
                });
              // props.navigation.navigate("DealFollow")
            }}
            disabled={offerData.loading}
          >
            {offerData.loading ? (
              <Spinner
                style={{
                  marginVertical: moderateScale(20),
                  justifyContent: "center",
                  alignSelf: "center",
                  alignItems: "center",
                  marginHorizontal: moderateScale(20)
                }}
                isVisible={true}
                type="Circle"
                color={"white"}
              />
            ) : (
              <Text
                style={{
                  color: "white",
                  paddingVertical: moderateScale(10),
                  paddingHorizontal: moderateScale(20)
                }}
              >
                إرسال عرض
              </Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
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
  }
});
export default SendDeal;
