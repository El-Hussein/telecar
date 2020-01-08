import React, { Fragment, Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  StyleSheet,
  ImageBackground
} from "react-native";
import { SimpleAnimation } from "react-native-simple-animations";
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

import Header from "../../../Components/Header";
import { Images } from "@assets";
import { connect } from "react-redux";
import { LoginClient, RegistClient } from "../../../Redux/actions/AuthActions";
import { LOGIN_FAILED } from "../../../Redux/types";
import ConfirmationCodeInput from "react-native-confirmation-code-field";
class Form extends Component {
  componentDidMount() {
    this.props.reset();
  }
  render() {
    let props = this.props;
    const formdata = props.form;
    console.log("====================================");
    console.log(formdata);
    console.log("====================================");
    return (
      <Formik
        initialValues={{
          code: ""
        }}
        onSubmit={values =>
          props.Register({
            form: {
              code: values.code,
              ...formdata
            },
            type: props.type,
            navigation: props.navigation
          })
        }
        validationSchema={yup.object().shape({
          code: yup
            .string()
            .required("هذا الحقل مطلوب")
            .min(4, "يجب الا تقل كلمة المرور عن 4 ارقام")
        })}
      >
        {({
          values,
          handleChange,
          errors,
          setFieldTouched,
          touched,
          isValid,
          setFieldValue,
          handleSubmit
        }) => (
          <View style={{ marginTop: moderateScale(50) }}>
            <View
              style={{
                width: width * 0.8,
                alignSelf: "center"
              }}
            >
              <ConfirmationCodeInput
                onFulfill={e => {
                  setFieldValue("code", e);
                }}
                autoFocus
                inactiveColor="gray"
                activeColor="green"
                codeLength={4}
              />
              {errors.code && <AnimationTextError error={errors.code} />}
            </View>

            <View
              style={{
                justifyContent: "flex-end",
                height: height * 0.3
              }}
            >
              <Button
                bordered
                style={{
                  backgroundColor: "#57B235",
                  borderRadius: width * 0.3,
                  width: width * 0.5,
                  height: height * 0.08,
                  alignSelf: "center",
                  justifyContent: "center",
                  alignItems: "center"
                }}
                title="Verfiy"
                disabled={props.loading}
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
                      alignSelf: "center",
                      textAlign: "center",
                      fontWeight: "800"
                    }}
                  >
                    تأكيد
                  </Text>
                )}
              </Button>
            </View>
          </View>
        )}
      </Formik>
    );
  }
}

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
    color: "red",
    textAlign: "left",
    fontSize: RFPercentage(1.5)
  }
});
export default connect(
  state => {
    return {
      type: state.Config.userType,
      loading: state.auth.registerLoading
    };
  },
  dispatch => {
    return {
      reset: () => dispatch({ type: LOGIN_FAILED }),
      Register: payload => RegistClient({ ...payload, dispatch })
    };
  }
)(Form);
