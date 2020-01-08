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
import ImagePicker from "react-native-image-picker";
import { ChangePasswordAction } from "../../../../Redux/actions/AuthActions";
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
import { Input, Item, Button, Thumbnail } from "native-base";
import { Formik } from "formik";
import * as yup from "yup";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";

import { Images } from "@assets";

const Form = props => {
  const { user, chagePasswordLoading } = props;
  return (
    <Formik
      initialValues={{
        currentPassword: "",
        newPassword: "",
        newPassword1: ""
      }}
      onSubmit={({ currentPassword, newPassword }) => {
        props.changePasswordNow(user.token, currentPassword, newPassword);
      }}
      validationSchema={yup.object().shape({
        currentPassword: yup.string().required("هذا الحقل مطلوب"),
        newPassword: yup.string().required("هذا الحقل مطلوب"),
        newPassword1: yup
          .string()
          .required("هذا الحقل مطلوب")
          .oneOf([yup.ref("newPassword"), null], "كلمه المرور غير متطابقه")
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
                borderWidth: 1,
                borderBottomColor:
                  touched.currentPassword && errors.currentPassword
                    ? "red"
                    : "gray",
                marginBottom: height * 0.02
              }}
            >
              <Input
                value={values.currentPassword}
                onChangeText={handleChange("currentPassword")}
                onBlur={() => setFieldTouched("currentPassword")}
                placeholder="كلمة المرور الحالية"
                textContentType="password"
                secureTextEntry
                style={[
                  styles.Input,
                  {
                    borderBottomWidth: 1,
                    borderBottomColor:
                      touched.currentPassword && errors.currentPassword
                        ? "red"
                        : "gray"
                  }
                ]}
              />
            </Item>
            {touched.currentPassword && errors.currentPassword && (
              <AnimationTextError error={errors.currentPassword} />
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
                  touched.newPassword && errors.newPassword ? "red" : "gray",
                marginBottom: height * 0.02
              }}
            >
              <Input
                value={values.newPassword}
                secureTextEntry
                onChangeText={handleChange("newPassword")}
                textContentType="password"
                onBlur={() => setFieldTouched("newPassword")}
                placeholder="كلمة المرور الجديدة"
                style={[
                  styles.Input,
                  {
                    borderBottomColor:
                      touched.newPassword && errors.newPassword ? "red" : "gray"
                  }
                ]}
              />
            </Item>
            {touched.newPassword && errors.newPassword && (
              <AnimationTextError error={errors.newPassword} />
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
                  touched.newPassword1 && errors.newPassword1 ? "red" : "gray",
                marginBottom: height * 0.02
              }}
            >
              <Input
                textContentType="password"
                secureTextEntry
                value={values.newPassword1}
                onChangeText={handleChange("newPassword1")}
                onBlur={() => setFieldTouched("newPassword1")}
                placeholder="تأكيد كلمة المرور"
                style={[
                  styles.Input,
                  {
                    borderBottomColor:
                      touched.newPassword1 && errors.newPassword1
                        ? "red"
                        : "gray"
                  }
                ]}
              />
            </Item>
            {touched.newPassword1 && errors.newPassword1 && (
              <AnimationTextError error={errors.newPassword1} />
            )}
          </View>

          <View
            style={{
              width: width * 0.8,
              alignSelf: "center",
              marginTop: height * 0.03
            }}
          >
            {/* <TouchableWithoutFeedback
              onPress={() => {
                setFieldTouched("agreeToTerms", true);
              }}
              style={{
                width: width * 0.8,
                alignSelf: "center",
                marginTop: height * 0.03
              }}
            > */}
          </View>
          <View style={{ marginTop: moderateScale(50) }}>
            <Button
              bordered
              style={{
                backgroundColor: colors.main,
                borderRadius: moderateScale(3),
                borderColor: colors.main,
                width: width * 0.8,
                height: height * 0.08,
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: moderateScale(50)
              }}
              title="Sign In"
              disabled={!isValid}
              onPress={handleSubmit}
            >
              {!chagePasswordLoading ? (
                <Text
                  style={{
                    color: "white",
                    flex: 1,
                    alignSelf: "center",
                    textAlign: "center",
                    fontWeight: "800"
                  }}
                >
                  حفظ
                </Text>
              ) : (
                <Spinner
                  style={{
                    justifyContent: "center",
                    alignSelf: "center",
                    alignItems: "center"
                  }}
                  isVisible={true}
                  type="Circle"
                  color={"#57B235"}
                />
              )}
            </Button>
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
    //  borderBottomWidth: 1,

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
    ...state.auth
  };
};
const mapDispatch = dispatch => {
  return {
    changePasswordNow: (token, password, newPassword) =>
      ChangePasswordAction(dispatch, token, password, newPassword)
  };
};
export default connect(mapState, mapDispatch)(Form);
