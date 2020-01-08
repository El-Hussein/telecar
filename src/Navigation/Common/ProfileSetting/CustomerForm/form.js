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
  ActivityIndicator,
  TouchableWithoutFeedback
} from "react-native";
import { SimpleAnimation } from "react-native-simple-animations";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ImagePicker from "react-native-image-picker";
import ActionSheet from "react-native-actionsheet";

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
import Spinner from "react-native-spinkit";
import { Images } from "@assets";
import { connect } from "react-redux";
import { UpdateProfileAction } from "../../../../Redux/actions/AuthActions";
import { baseUrl } from "@config";
const Form = props => {
  const {
    email,
    name,
    phone,
    token,
    updateProfileNow,
    loading,
    avatar,
    type,
    _id
  } = props;
  console.log("====props================================");
  console.log(props);
  console.log("====================================");
  let userType = type === "Customer" ? 0 : 1;

  return (
    <Formik
      initialValues={{
        username: name ? name : "",
        email: email ? email : "",
        phone: phone ? phone : "",
        Image: `${baseUrl}api/user/image/${userType}/${_id}?${new Date()}`,
        city: props.city ? props.city.name : "",
        selectedCity: props.city ? props.city._id : ""
      }}
      onSubmit={({ username, email, phone, Image, selectedCity }) =>
        updateProfileNow(token, email, phone, username, Image, selectedCity)
      }
      validationSchema={yup.object().shape({
        username: yup.string().required("هذا الحقل مطلوب"),
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
        <View
          style={{
            marginTop: moderateScale(10)
          }}
        >
          <View
            style={{
              width: width * 0.8,
              alignSelf: "center"
            }}
          >
            {/* <View style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={() => {
                  ImagePicker.showImagePicker({}, response => {
                    // resizebase64(base64, maxWidth, maxHeight);

                    if (response.didCancel) {
                      console.log("User cancelled image picker");
                    } else if (response.error) {
                      console.log("ImagePicker Error: ", response.error);
                    } else if (response.customButton) {
                      console.log(
                        "User tapped custom button: ",
                        response.customButton
                      );
                    } else {
                      // const source = { uri: response.uri };
                      setFieldValue(
                        "Image",
                        `data:${response.type};base64,` + response.data
                      );

                      // You can also display the image using data:
                      // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                    }
                  });
                }}
              >
                <Thumbnail
                  large
                  source={{
                    uri: values.Image
                      ? values.Image
                      : "http://www.sclance.com/pngs/user-png/user_png_1449784.png"
                  }}
                  style={{
                    alignSelf: "center",
                    borderWidth: 1,
                    borderColor: colors.main,
                    backgroundColor: "#eee"
                  }}
                />
              </TouchableOpacity>
            </View> */}

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
          {/* <View
            style={{
              width: "80%",
              alignSelf: "center",
              marginTop: moderateScale(1)
            }}
          >
            <ActionSheet
              ref={a => (city = a)}
              title={"أختر المدينة"}
              options={[...props.cities.map(a => a.name), "إلغاء"]}
              cancelButtonIndex={props.cities.length}
              onPress={selected => {
                if (selected !== props.cities.length) {
                  setFieldValue("city", props.cities[selected].name);
                  setFieldValue("selectedCity", props.cities[selected]._id);
                }
              }}
            />
            <TouchableOpacity
              style={{
                flexDirection: "row",
                borderWidth: 1,
                borderColor: "#ccc",
                alignItems: "center",
                marginTop: moderateScale(1)
              }}
              onPress={() => {
                setFieldTouched("city", true);
                city.show();
              }}
            >
              {!props.citiesLoading ? (
                <Text
                  style={{
                    width: "90%",
                    marginVertical: moderateScale(10),
                    textAlign: "center",
                    alignSelf: "center",
                    fontSize: RFValue(14)
                  }}
                >
                  {values.city ? values.city : "أختر المدينة"}
                </Text>
              ) : (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "90%"
                  }}
                >
                  <Text>اختر المدينة</Text>
                  <Spinner
                    style={{
                      justifyContent: "center",
                      alignSelf: "center",
                      alignItems: "center",
                      padding: moderateScale(5)
                    }}
                    size={moderateScale(20)}
                    isVisible={true}
                    type="Circle"
                    color={"#57B235"}
                  />
                </View>
              )}
              <MaterialCommunityIcons name="menu-down" size={RFValue(22)} />
            </TouchableOpacity>
            {touched.city && errors.city && (
              <AnimationTextError error={errors.city} />
            )}
          </View> */}

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
              // disabled={!isValid}
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
                  حفظ
                </Text>
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
    ...state.auth.user,
    ...state.updateProfile,
    type: state.Config.userType,
    cities: state.Config.cities
  };
};
const mapDispatch = dispatch => {
  return {
    updateProfileNow: (token, email, phone, name, avatar, city) =>
      UpdateProfileAction(dispatch, token, email, phone, name, avatar, city)
  };
};

export default connect(mapState, mapDispatch)(Form);
