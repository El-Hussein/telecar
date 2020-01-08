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
import ActionSheet from "react-native-actionsheet";
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
import {
  RegistClient,
  VerfiyPhone
} from "../../../../Redux/actions/AuthActions";
import { Images } from "@assets";
import CustomPicker from "./CustomPicker";
import { FetchCities, GetAppInitials } from "../../../../Redux/actions/Config";
import localization from "../../../../localization/localization";

const Form = props => {
  const [Refs, SetRefs] = useState([null]);
  const [servicesError, SetServicesError] = useState(false);
  const [firstLoading, setFirstLoading] = useState(true);
  if (firstLoading) {
    setFirstLoading(false);
    props.Reset();
    if (props.cities.length < 1 && !props.citiesLoading) {
      // props.FetchCities();
      props.getInitials();
    }
  }
  return (
    <Formik
      initialValues={{
        // username: "test",
        // email: "test@test.test",
        // phone: "0125552",
        // password: "123456",
        // repassword: "123456"
        username: "",
        email: "",
        phone: "",
        password: "",
        repassword: ""
      }}
      onSubmit={async values => {
        props.Register({
          form: {
            name: values.username,
            email: values.email,
            phone: values.phone,
            password: values.password,
            password2: values.repassword
          },
          navigation: props.navigation,
          type: props.type
        });
      }}
      validationSchema={yup.object().shape({
        username: yup.string().required("هذا الحقل مطلوب"),
        email: yup
          .string()
          .email("يرجيء ادخال بريد الكتروني صحيح")
          .required("هذا الحقل مطلوب"),
        phone: yup.string().required("هذا الحقل مطلوب"),
        password: yup
          .string()
          .min(6, "يجب الا تقل كلمة المرور عن ٦ احرف")
          .required("هذا الحقل مطلوب"),
        repassword: yup
          .string()
          .min(6, "يجب الا تقل كلمة المرور عن ٦ احرف")
          .test("passwords-match", "يحب تطابق كلمتي المرور", function(value) {
            return this.parent.password === value;
          })
          .required("هذا الحقل مطلوب")
      })}
    >
      {({
        values,
        handleChange,
        errors,
        setFieldTouched,
        touched,
        isValid,
        handleSubmit,
        setFieldValue
      }) => (
        <View style={{ marginTop: moderateScale(10) }}>
          <View
            style={{
              width: width * 0.8,
              alignSelf: "center"
            }}
          >
            <Item
              style={{
                borderBottomColor:
                  touched.username && errors.username ? "red" : "gray",
                marginBottom: height * 0.02
              }}
            >
              <Input
                value={values.username}
                onChangeText={handleChange("username")}
                onBlur={() => setFieldTouched("username")}
                placeholder="اسم المستخدم"
                style={[
                  styles.Input,
                  {
                    borderBottomColor:
                      touched.username && errors.username ? "red" : "gray"
                  }
                ]}
              />
            </Item>
            {touched.username && errors.username && (
              <AnimationTextError error={errors.username} />
            )}
          </View>

          <View
            style={{
              width: width * 0.8,
              alignSelf: "center"
            }}
          >
            <Item
              style={{
                borderBottomColor:
                  touched.email && errors.email ? "red" : "gray",
                marginBottom: height * 0.02
              }}
            >
              <Input
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={() => setFieldTouched("email")}
                placeholder="البريد الإلكتروني"
                keyboardType="email-address"
                style={[
                  styles.Input,
                  {
                    borderBottomColor:
                      touched.email && errors.email ? "red" : "gray"
                  }
                ]}
              />
            </Item>
            {touched.email && errors.email && (
              <AnimationTextError error={errors.email} />
            )}
          </View>
          <View
            style={{
              width: width * 0.8,
              alignSelf: "center"
            }}
          >
            <Item
              style={{
                borderBottomColor:
                  touched.phone && errors.phone ? "red" : "gray",
                marginBottom: height * 0.02
              }}
            >
              <Input
                value={values.phone}
                onChangeText={handleChange("phone")}
                onBlur={() => setFieldTouched("phone")}
                placeholder="رقم الجوال"
                style={[
                  styles.Input,
                  {
                    borderBottomColor:
                      touched.phone && errors.phone ? "red" : "gray"
                  }
                ]}
              />
            </Item>
            {touched.phone && errors.phone && (
              <AnimationTextError error={errors.phone} />
            )}
          </View>

          <View
            style={{
              width: width * 0.8,
              alignSelf: "center"
            }}
          >
            <Item
              style={{
                borderBottomColor:
                  touched.email && errors.email ? "red" : "gray",
                marginBottom: height * 0.02
              }}
            >
              <Input
                value={values.password}
                onChangeText={v => setFieldValue("password", v)}
                placeholder="كلمة المرور"
                onBlur={() => setFieldTouched("password")}
                secureTextEntry={true}
                style={[
                  styles.Input,
                  {
                    borderBottomColor:
                      touched.password && errors.password ? "red" : "gray"
                  }
                ]}
              />
            </Item>
            {touched.password && errors.password && (
              <AnimationTextError error={errors.password} />
            )}
          </View>
          <View
            style={{
              width: width * 0.8,
              alignSelf: "center"
            }}
          >
            <Item
              style={{
                borderBottomColor:
                  touched.email && errors.email ? "red" : "gray",
                marginBottom: height * 0.02
              }}
            >
              <Input
                value={values.repassword}
                // onChangeText={handleChange("repassword")}
                onChangeText={v => setFieldValue("repassword", v)}
                placeholder="تأكيد كلمة المرور"
                onBlur={() => setFieldTouched("repassword")}
                secureTextEntry={true}
                style={[
                  styles.Input,
                  {
                    borderBottomColor:
                      touched.repassword && errors.repassword ? "red" : "gray"
                  }
                ]}
              />
            </Item>
            {touched.repassword && errors.repassword && (
              <AnimationTextError error={errors.repassword} />
            )}
          </View>

          <View style={{ marginVertical: moderateScale(50) }}>
            <Button
              bordered
              style={{
                backgroundColor: colors.main,
                borderRadius: width * 0.02,
                width: width * 0.8,
                height: height * 0.06,
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center"
              }}
              title="Sign In"
              disabled={props.loading}
              onPress={() => handleSubmit()}
            >
              {props.loading ? (
                <Spinner
                  style={{
                    justifyContent: "center",
                    alignSelf: "center",
                    alignItems: "center"
                  }}
                  size={RFValue(25)}
                  isVisible={props.loading}
                  type="Circle"
                  color={"white"}
                />
              ) : (
                <Text
                  style={{
                    color: "white",
                    alignSelf: "center",
                    textAlign: "center",
                    fontWeight: "800"
                  }}
                >
                  {localization.register}
                </Text>
              )}
            </Button>

            <TouchableOpacity
              style={{ alignSelf: "center", marginTop: moderateScale(50) }}
              onPress={() => props.navigation.navigate("Login")}
            >
              <Text
                style={{
                  fontSize: RFValue(12),
                  color: "black"
                }}
              >
                لديك حساب بالفعل ؟
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
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
      type: state.Config.userType,
      privicy: state.Config.privicy,
      cities: state.Config.cities,
      citiesLoading: state.Config.citiesLoading,
      servicesLoading: state.Config.servicesLoading,
      servicesTypesLoading: state.Config.servicesTypesLoading,
      services: state.Config.services,
      servicesTypes: state.Config.servicesTypes,
      loading: state.auth.VerfiyPhoneLoading
    };
  },
  dispatch => {
    return {
      Reset: () => dispatch({ type: "resetload" }),
      Register: payload => RegistClient({ ...payload, dispatch }),
      FetchCities: () => FetchCities(dispatch),
      getInitials: () => GetAppInitials(dispatch)
    };
  }
)(Form);
