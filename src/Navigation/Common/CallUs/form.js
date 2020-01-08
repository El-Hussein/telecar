import React, { Fragment } from "react";
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
  TouchableWithoutFeedback
} from "react-native";
import { SimpleAnimation } from "react-native-simple-animations";
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
import { ContactUs } from "../../../Redux/actions/AuthActions";
const Form = props => {
  return (
    <View style={{ flex: 1 }}>
      <Formik
        initialValues={{
          name: "",
          message: "",
          email: "",
          phone: "",
          password: ""
        }}
        onSubmit={({ email, name, phone, message }) => {
          // props.ContactUsNow(email, name, phone, message);
        }}
        validationSchema={yup.object().shape({
          name: yup.string().required("هذا الحقل مطلوب"),
          message: yup.string().required("هذا الحقل مطلوب"),
          email: yup
            .string()
            .email("يرجيء ادخال بريد الكتروني صحيح")
            .required("هذا الحقل مطلوب"),
          phone: yup.string().required("هذا الحقل مطلوب")
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
          <ScrollView contentContainerStyle={{ marginTop: moderateScale(10) }}>
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
                  onChangeText={handleChange("name")}
                  onBlur={() => setFieldTouched("name")}
                  placeholder="الاسم"
                  style={[
                    styles.Input,
                    {
                      borderBottomColor:
                        touched.name && errors.name ? "red" : "gray"
                    }
                  ]}
                />
              </Item>
              {touched.name && errors.name && (
                <AnimationTextError error={errors.name} />
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
                    touched.username && errors.username ? "red" : "gray",
                  marginBottom: height * 0.02
                }}
              >
                <Input
                  multiline
                  value={values.message}
                  onChangeText={handleChange("message")}
                  onBlur={() => setFieldTouched("message")}
                  placeholder="اكتب رسالتك"
                  style={[
                    styles.Input,
                    {
                      minHeight: height * 0.05,
                      borderBottomColor:
                        touched.message && errors.message ? "red" : "gray",
                      paddingBottom: moderateScale(4)
                    }
                  ]}
                />
              </Item>
              {touched.message && errors.message && (
                <AnimationTextError error={errors.message} />
              )}
            </View>
            <Button
              bordered
              style={{
                backgroundColor: colors.main,
                borderRadius: width * 0.3,
                width: width * 0.5,
                height: height * 0.08,
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center"
              }}
              title="Sign In"
              disabled={!isValid}
              onPress={handleSubmit}
            >
              {props.loading ? (
                <Spinner
                  style={{
                    justifyContent: "center",
                    alignSelf: "center",
                    alignItems: "center"
                  }}
                  isVisible={props.loading}
                  type="Circle"
                  color={"white"}
                />
              ) : (
                <Text
                  style={{
                    color: "white",
                    flex: 1,
                    alignSelf: "center",
                    textAlign: "center",
                    fontWeight: "800"
                  }}
                >
                  ارسال
                </Text>
              )}
            </Button>
            <View style={{ height: 100 }} />
          </ScrollView>
        )}
      </Formik>
      {/* <Button
        bordered
        style={{
          backgroundColor: "#57B235",
          borderRadius: width * 0.3,
          width: width * 0.5,
          height: height * 0.08,
          alignSelf: "center"
        }}
        title="Sign In"
        // disabled={!isValid}
        onPress={() => alert("fuck")}
      >
        <Text
          style={{
            color: "red",
            flex: 1,
            alignSelf: "center",
            textAlign: "center",
            fontWeight: "800"
          }}
        >
          إرسال
        </Text>
      </Button> */}
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

const mapState = state => {
  return {
    ...state.contactUs
  };
};
const mapDispatch = dispatch => {
  return {
    ContactUsNow: (email, name, phone, message) =>
      ContactUs(dispatch, email, name, phone, message)
  };
};
export default connect(mapState, mapDispatch)(Form);
