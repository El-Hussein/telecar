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
class Form extends Component {
  componentDidMount() {
    this.props.reset();
  }
  state = {
    loading: false
  };
  render() {
    let props = this.props;
    return (
      <Formik
        initialValues={{
          email:
            (props.navigation.state.params &&
              props.navigation.state.params.email) ||
            "",
          password: "",
          password2: "",
          code: ""
        }}
        onSubmit={values => {
          this.setState({ loading: true });
          Axios.post(baseUrl + "api/forgetpasswordchange", {
            email: values.email,
            code: values.code,
            newPassword: values.password
          })
            .then(result => {
              props.AlertMessage("success", "", result.data.success);
              console.log("====================================");
              console.log(result, result.data);
              console.log("====================================");
              props.navigation.navigate("Login");
              this.setState({ loading: false });
            })
            .catch(error => {
              console.log("====================================");
              console.log(error.response);
              console.log("====================================");
              this.setState({ loading: false });
              props.AlertMessage("error", "خطـأ", error.response.data.error);
            });
        }}
        validationSchema={yup.object().shape({
          email: yup
            .string()
            .email()
            .required("هذا الحقل مطلوب"),
          code: yup.string().required("هذا الحقل مطلوب"),
          password: yup
            .string()
            .min(6)
            .required("هذا الحقل مطلوب"),
          password2: yup
            .string()
            .oneOf([yup.ref("password")], "يجب تطابق كلمتي المرور")
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
                  value={values.code}
                  onChangeText={handleChange("code")}
                  onBlur={() => setFieldTouched("code")}
                  placeholder="الكود المرسل اليك"
                  style={[
                    styles.Input,
                    {
                      borderBottomColor:
                        touched.code && errors.code ? "red" : "gray"
                    }
                  ]}
                />
              </Item>
              {touched.code && errors.code && (
                <SimpleAnimation
                  delay={100}
                  duration={500}
                  movementType="slide"
                  staticType="bounce"
                  direction="up"
                >
                  <Text style={styles.TextError}>{errors.code}</Text>
                </SimpleAnimation>
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
                    touched.password && errors.password ? "red" : "gray",
                  marginBottom: height * 0.02
                }}
              >
                <Input
                  value={values.password}
                  onChangeText={handleChange("password")}
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
                <SimpleAnimation
                  delay={100}
                  duration={500}
                  movementType="slide"
                  staticType="bounce"
                >
                  <Text style={styles.TextError}>{errors.password}</Text>
                </SimpleAnimation>
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
                    touched.password2 && errors.password2 ? "red" : "gray",
                  marginBottom: height * 0.02
                }}
              >
                <Input
                  value={values.password2}
                  onChangeText={handleChange("password2")}
                  placeholder="تأكيد كلمة المرور"
                  onBlur={() => setFieldTouched("password2")}
                  secureTextEntry={true}
                  style={[
                    styles.Input,
                    {
                      borderBottomColor:
                        touched.password2 && errors.password2 ? "red" : "gray"
                    }
                  ]}
                />
              </Item>
              {touched.password2 && errors.password2 && (
                <SimpleAnimation
                  delay={100}
                  duration={500}
                  movementType="slide"
                  staticType="bounce"
                >
                  <Text style={styles.TextError}>{errors.password2}</Text>
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
                  backgroundColor: "#57B235",
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
                    تغير كلمة المرور
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
