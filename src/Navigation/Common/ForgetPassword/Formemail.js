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
  colors,
  baseUrl
} from "@config";
import { Input, Item, Button } from "native-base";
import { Formik } from "formik";
import * as yup from "yup";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";

import Header from "../../../Components/Header";
import { Images } from "@assets";
import { connect } from "react-redux";
import { LoginClient } from "../../../Redux/actions/AuthActions";
import { LOGIN_FAILED } from "../../../Redux/types";
import Axios from "axios";
import localization from "../../../localization/localization";
class Form extends Component {
  componentDidMount() {}
  state = {
    loading: false
  };
  render() {
    let props = this.props;
    return (
      <Formik
        initialValues={{
          email: ""
        }}
        onSubmit={values => {
          this.setState({ loading: true });
          Axios.post(baseUrl + "forgetpassword", { email: values.email })
            .then(result => {
              if (result.data == "البريد الإلكتروني غير صحيح") {
                props.AlertMessage("error", "البريد الالكتروني غير صحيح");
              } else {
                props.AlertMessage("success", "", result.data);
              }
              console.log("====================================");
              console.log(result, result.data);
              console.log("====================================");
              // props.navigation.navigate("ForgetPasswordCode", {
              //   email: values.email
              // });
              this.setState({ loading: false });
            })
            .catch(error => {
              this.setState({ loading: false });
              props.AlertMessage("error", "البريد الالكتروني غير صحيح");
              console.log("====================================");
              console.log(error, error.data);
              console.log("====================================");
            });
          // props.Login({
          //   ...values,
          //   type: props.type,
          //   navigation: props.navigation
          // })
        }}
        validationSchema={yup.object().shape({
          email: yup
            .string()
            .email()
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
          handleSubmit
        }) => (
          <View style={{ marginTop: moderateScale(50) }}>
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
                <SimpleAnimation
                  delay={100}
                  duration={500}
                  movementType="slide"
                  staticType="bounce"
                  direction="up"
                >
                  <Text style={styles.TextError}>{errors.email}</Text>
                </SimpleAnimation>
              )}
            </View>
            <View
              style={{
                height: height * 0.3
              }}
            >
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
                disabled={this.state.loading}
                onPress={handleSubmit}
              >
                {this.state.loading ? (
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
                  <Text
                    style={{
                      color: "white",
                      alignSelf: "center",
                      textAlign: "center",
                      fontWeight: "800"
                    }}
                  >
                    {localization.forgetPassword}
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
      AlertMessage: state.Config.alert,
      loading: state.auth.loginLoading
    };
  },
  dispatch => {
    return {
      reset: () => dispatch({ type: LOGIN_FAILED }),
      Login: payload => LoginClient({ ...payload, dispatch })
    };
  }
)(Form);
