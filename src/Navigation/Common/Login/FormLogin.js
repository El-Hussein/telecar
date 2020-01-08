import React, { Fragment, Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  StyleSheet,
  ImageBackground,
  TouchableWithoutFeedback,
  I18nManager
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
import { LoginClient } from "../../../Redux/actions/AuthActions";
import { LOGIN_FAILED } from "../../../Redux/types";
import localization from "../../../localization/localization";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginButton
} from "react-native-fbsdk";
class Form extends Component {
  componentDidMount() {
    this.props.reset();
  }
  facebookSignIn() {
    LoginManager.setLoginBehavior("web_only");
    LoginManager.logInWithPermissions(["email", "public_profile"])
      .then(
        result => {
          console.log(result);
          if (result.isCancelled) {
            alert("Login cancelled");
          } else {
            alert(
              "Login success with permissions: " +
                result.grantedPermissions.toString()
            );
            AccessToken.getCurrentAccessToken().then(token => {
              // TOKEN = token;
              console.log(token);

              const infoRequest = new GraphRequest(
                "/me",
                {
                  accessToken: token.accessToken,
                  parameters: {
                    fields: {
                      string:
                        "email,name,first_name,middle_name,last_name,picture"
                    }
                  }
                },
                this._responseInfoCallback
              );
              // Start the graph request.
              new GraphRequestManager().addRequest(infoRequest).start();
            });
          }
        },
        error => {
          alert("Login fail with error: " + error);
        }
      )
      .catch(err => {
        console.log("==fb==================================");
        console.log(err);
        console.log("====================================");
      });
  }

  _responseInfoCallback(error, result) {
    if (error) {
      console.log("Error fetching data: " + error.toString());
    } else {
      console.log("Success fetching data: ", result);
    }
  }

  render() {
    let props = this.props;
    return (
      <Formik
        initialValues={{
          // email:
          //   props.type === "Customer" ? "test@test.tests" : "test1@test.test",
          // password: "123456",
          // email: "ali@ali.com"
          // email: "hani@hani.com",
          // password: "123456789"
          email: "",
          password: ""
        }}
        onSubmit={values =>
          props.Login({
            ...values,
            type: props.type,
            navigation: props.navigation
          })
        }
        validationSchema={yup.object().shape({
          email: yup
            .string()
            .email()
            .required(localization.thisFieldIsRequired),
          password: yup
            .string()
            .min(6)
            .required(localization.thisFieldIsRequired)
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
                  placeholder={localization.email}
                  autoCapitalize="none"
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
                  value={values.password}
                  onChangeText={handleChange("password")}
                  placeholder={localization.password}
                  onBlur={() => setFieldTouched("password")}
                  secureTextEntry={true}
                  autoCapitalize="none"
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
                alignSelf: "center",
                marginTop: moderateScale(20)
              }}
            >
              <TouchableOpacity
                style={{ width: width * 0.4, alignSelf:I18nManager.isRTL?"flex-end":"flex-start" }}
                onPress={() => {
                  props.navigation.navigate("ForgetPassword");
                }}
              >
                <Text
                  style={{
                    fontSize: RFValue(12)
                  }}
                >
                  {localization.forgetPassword}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: moderateScale(20) }}>
              <Button
                bordered
                style={{
                  backgroundColor: colors.main,
                  borderRadius: width * 0.03,
                  width: width * 0.8,
                  height: height * 0.06,
                  alignSelf: "center",
                  justifyContent: "center",
                  alignItems: "center"
                }}
                title="Sign In"
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
                    {localization.login}
                  </Text>
                )}
              </Button>
            </View>

            {/* <Text
              style={{
                alignSelf: "center",
                textAlign: "center",
                fontSize: RFValue(10),
                marginVertical: moderateScale(5)
              }}
            >
              {localization.orsignInBy}
            </Text>
            <View
              style={{
                width: "95%",
                justifyContent: "space-evenly",
                alignItems: "center",
                flexDirection: "row",
                marginTop: moderateScale(10)
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: "white",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: moderateScale(5),
                  paddingVertical: moderateScale(10),
                  marginHorizontal: moderateScale(3),
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 7
                  },
                  shadowOpacity: 0.41,
                  shadowRadius: 9.11,

                  elevation: 14,
                  height: height * 0.06
                }}
              >
                <Text
                  style={{
                    color: "red",
                    alignSelf: "center",
                    fontSize: RFValue(12),
                    // lineHeight: 0,
                    textAlignVertical: "center"
                  }}
                >
                  Google
                </Text>
                <Image
                  source={Images.google}
                  style={{
                    resizeMode: "contain",
                    width: width * 0.1,
                    height: height * 0.03
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: colors.main,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: moderateScale(5),
                  paddingVertical: moderateScale(10),
                  marginHorizontal: moderateScale(3),
                  height: height * 0.06,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 7
                  },
                  shadowOpacity: 0.41,
                  shadowRadius: 9.11,

                  elevation: 14
                }}
                onPress={() => this.facebookSignIn()}
              >
                <Text
                  style={{
                    color: "white",
                    alignSelf: "center",
                    fontSize: RFValue(12),

                    // lineHeight: 0,
                    textAlignVertical: "center"
                  }}
                >
                  Facebook
                </Text>
                <MaterialCommunityIcons
                  name="facebook-box"
                  color={"#fff"}
                  size={RFValue(25)}
                  style={{ height: "100%" }}
                />
              </TouchableOpacity>
            </View>
        */}
            <TouchableOpacity
              style={{ alignSelf: "center", marginTop: moderateScale(50) }}
              onPress={() => props.navigation.navigate("Register")}
            >
              <Text
                style={{
                  fontSize: RFValue(12)
                }}
              >
                {localization.registerNewAccount}
              </Text>
            </TouchableOpacity>
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
