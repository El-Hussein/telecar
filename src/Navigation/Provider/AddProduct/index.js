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
import Header from "@components/Header2";
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
import localization from "../../../localization/localization";
import ImagePicker from "react-native-image-picker";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Axios from "axios";
import { baseUrl } from "../../../config";

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
const RenderInput = ({
  title,
  error,
  value,
  onChangeText,
  iSnumber,
  placeholder,
  required
}) => {
  return (
    <View
      style={{
        width: "80%",
        alignSelf: "center",
        marginTop: moderateScale(15)
      }}
    >
      <View style={{ flexDirection: "row", marginBottom: moderateScale(5) }}>
        <Text style={{ fontSize: RFValue(14) }}>{title}</Text>
        {required && (
          <MaterialCommunityIcons
            name="star"
            size={RFValue(10)}
            color={colors.main}
            style={{ paddingHorizontal: moderateScale(10), top: 0 }}
          />
        )}
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        <Input
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            height: height * 0.05,
            fontSize: 10
          }}
          value={value}
          onChangeText={onChangeText}
          keyboardType={iSnumber ? "decimal-pad" : "default"}
          placeholder={placeholder}
        />
      </View>
      {error && <AnimationTextError error={localization.fieldRequired} />}
    </View>
  );
};
const getMyLocation = async () => {
  let loc = {
    latitude: 37.78825,
    longitude: -122.4324
  };
  await navigator.geolocation.getCurrentPosition(
    position => {
      loc = { longitude: position.longitude, latitude: position.latitude };
    },
    error => {
      //   alert(JSON.stringify(error));
    },
    {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 1000
    }
  );
  return loc;
};
const MyHandels = props => {
  const dataCity = [...props.cities.map(e => e.name), "إلغاء"];
  const [newOrder, SetOrder] = useState({
    pic: null,
    salary: "",
    offer: "",
    name: "",
    details: "",
    city: "",
    facebook: "",
    whatsapp: "",
    call: "",
    latitude: 37.78825,
    longitude: -122.4324
  });
  const [loading, SetLoading] = useState(false);
  const [newOrderError, setnewOrderError] = useState({});
  const [Productphoto, SetProductPhoto] = useState(Images.upload);
  const [firstLoad, setFirstLoad] = useState(true);
  if (firstLoad) {
    setFirstLoad(false);
    getMyLocation().then(loc => {
      SetOrder({ ...newOrder, ...loc });
    });
  }
  return (
    <View style={{ flex: 1 }}>
      <Header
        navigation={props.navigation}
        title={localization.AddProduct}
        hidelogo
      />
      {/* <KeyboardAvoidingView
          // keyboardVerticalOffset={moderateScale(50)}
          style={{ flex: 1 }}
          behavior={Platform.OS === "android" ? "position" : "padding"}
        > */}

      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            width: "90%",
            flex: 1
          }}
        >
          <MaterialCommunityIcons
            name={
              localization.getLanguage() === "ar" ? "menu-left" : "menu-right"
            }
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
            {localization.ProductDetsils}
          </Text>
        </View>
        <CustomPicker
          index={1}
          head={localization.selectDepartment}
          data={[...props.categories.map(e => e.name), localization.cancle]}
          onChange={index => {
            if (index === props.categories.length) {
              return;
            }
            let category = props.categories[index]._id;
            SetOrder({ ...newOrder, category });
          }}
        />
        {newOrderError.category && (
          <AnimationTextError error={localization.fieldRequired} />
        )}
        <CustomPicker
          index={0}
          head={localization.SelectCity}
          data={dataCity}
          onChange={index => {
            let CityObj = props.cities[index];
            console.log("c", index);
            SetOrder({ ...newOrder, city: CityObj.id + "" });
          }}
        />
        {newOrderError.city && (
          <AnimationTextError error={localization.fieldRequired} />
        )}
        <View
          style={{
            width: "80%",
            alignSelf: "center",
            marginTop: moderateScale(15)
          }}
        ></View>

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
              {localization.ProductTitle}
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
              alignItems: "center"
            }}
          >
            <Input
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                height: height * 0.05,
                fontSize: 10
              }}
              value={newOrder.name}
              onChangeText={value => SetOrder({ ...newOrder, name: value })}
            />
          </View>
          {newOrderError.name && (
            <AnimationTextError error={localization.fieldRequired} />
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
            style={{ flexDirection: "row", marginBottom: moderateScale(5) }}
          >
            <Text style={{ fontSize: RFValue(14) }}>
              {localization.ProductDetsils}
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
              alignItems: "center"
            }}
          >
            <Input
              multiline
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                height: height * 0.1,
                fontSize: 10
              }}
              value={newOrder.details}
              onChangeText={value => SetOrder({ ...newOrder, details: value })}
            />
          </View>
          {newOrderError.details && (
            <AnimationTextError error={localization.fieldRequired} />
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
            <Text style={{ fontSize: RFValue(14) }}>
              {localization.AddPhoto}
            </Text>
            <MaterialCommunityIcons
              name="star"
              size={RFValue(10)}
              color={colors.main}
              style={{ paddingHorizontal: moderateScale(10), top: 0 }}
            />
          </View>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "center"
            }}
            onPress={async () => {
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
                  // alert(response.uri);
                  SetOrder({
                    ...newOrder,
                    pic: {
                      uri: "data:image/jpeg;base64," + response.data,
                      uri: response.uri,
                      type: response.type,
                      name: response.fileName
                    }
                  });
                }
              });
            }}
          >
            <Image
              source={newOrder.pic ? newOrder.pic : Productphoto}
              style={{
                resizeMode: "stretch",
                height: height * 0.2,
                width: "100%"
              }}
            />
          </TouchableOpacity>
          {newOrderError.pic && (
            <AnimationTextError error={localization.fieldRequired} />
          )}
        </View>

        {/* <View
            style={{
              width: "95%",
              alignSelf: "center",
              marginTop: moderateScale(15),
              height: height * 0.3
            }}
          >
            <View
              style={{ flexDirection: "row", marginBottom: moderateScale(3) }}
            >
              <Text style={{ fontSize: RFValue(14), marginHorizontal: "2%" }}>
                {localization.SelectProductOnMap}
              </Text>
              <MaterialCommunityIcons
                name="star"
                size={RFValue(10)}
                color={colors.main}
                style={{ paddingHorizontal: moderateScale(10), top: 0 }}
              />
            </View>
            <MapView
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              style={{ flex: 1, backgroundColor: colors.BackGround }}
              customMapStyle={[
                {
                  elementType: "geometry",
                  stylers: [
                    {
                      color: "#1d2c4d"
                    }
                  ]
                },
                {
                  elementType: "labels.text.fill",
                  stylers: [
                    {
                      color: "#8ec3b9"
                    }
                  ]
                },
                {
                  elementType: "labels.text.stroke",
                  stylers: [
                    {
                      color: "#1a3646"
                    }
                  ]
                },
                {
                  featureType: "administrative.country",
                  elementType: "geometry.stroke",
                  stylers: [
                    {
                      color: "#4b6878"
                    }
                  ]
                },
                {
                  featureType: "administrative.land_parcel",
                  elementType: "labels.text.fill",
                  stylers: [
                    {
                      color: "#64779e"
                    }
                  ]
                },
                {
                  featureType: "administrative.province",
                  elementType: "geometry.stroke",
                  stylers: [
                    {
                      color: "#4b6878"
                    }
                  ]
                },
                {
                  featureType: "landscape.man_made",
                  elementType: "geometry.stroke",
                  stylers: [
                    {
                      color: "#334e87"
                    }
                  ]
                },
                {
                  featureType: "landscape.natural",
                  elementType: "geometry",
                  stylers: [
                    {
                      color: "#023e58"
                    }
                  ]
                },
                {
                  featureType: "poi",
                  elementType: "geometry",
                  stylers: [
                    {
                      color: "#283d6a"
                    }
                  ]
                },
                {
                  featureType: "poi",
                  elementType: "labels.text.fill",
                  stylers: [
                    {
                      color: "#6f9ba5"
                    }
                  ]
                },
                {
                  featureType: "poi",
                  elementType: "labels.text.stroke",
                  stylers: [
                    {
                      color: "#1d2c4d"
                    }
                  ]
                },
                {
                  featureType: "poi.park",
                  elementType: "geometry.fill",
                  stylers: [
                    {
                      color: "#023e58"
                    }
                  ]
                },
                {
                  featureType: "poi.park",
                  elementType: "labels.text.fill",
                  stylers: [
                    {
                      color: "#3C7680"
                    }
                  ]
                },
                {
                  featureType: "road",
                  elementType: "geometry",
                  stylers: [
                    {
                      color: "#304a7d"
                    }
                  ]
                },
                {
                  featureType: "road",
                  elementType: "labels.text.fill",
                  stylers: [
                    {
                      color: "#98a5be"
                    }
                  ]
                },
                {
                  featureType: "road",
                  elementType: "labels.text.stroke",
                  stylers: [
                    {
                      color: "#1d2c4d"
                    }
                  ]
                },
                {
                  featureType: "road.highway",
                  elementType: "geometry",
                  stylers: [
                    {
                      color: "#2c6675"
                    }
                  ]
                },
                {
                  featureType: "road.highway",
                  elementType: "geometry.stroke",
                  stylers: [
                    {
                      color: "#255763"
                    }
                  ]
                },
                {
                  featureType: "road.highway",
                  elementType: "labels.text.fill",
                  stylers: [
                    {
                      color: "#b0d5ce"
                    }
                  ]
                },
                {
                  featureType: "road.highway",
                  elementType: "labels.text.stroke",
                  stylers: [
                    {
                      color: "#023e58"
                    }
                  ]
                },
                {
                  featureType: "transit",
                  elementType: "labels.text.fill",
                  stylers: [
                    {
                      color: "#98a5be"
                    }
                  ]
                },
                {
                  featureType: "transit",
                  elementType: "labels.text.stroke",
                  stylers: [
                    {
                      color: "#1d2c4d"
                    }
                  ]
                },
                {
                  featureType: "transit.line",
                  elementType: "geometry.fill",
                  stylers: [
                    {
                      color: "#283d6a"
                    }
                  ]
                },
                {
                  featureType: "transit.station",
                  elementType: "geometry",
                  stylers: [
                    {
                      color: "#3a4762"
                    }
                  ]
                },
                {
                  featureType: "water",
                  elementType: "geometry",
                  stylers: [
                    {
                      color: "#0e1626"
                    }
                  ]
                },
                {
                  featureType: "water",
                  elementType: "labels.text.fill",
                  stylers: [
                    {
                      color: "#4e6d70"
                    }
                  ]
                }
              ]}
              region={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121
              }}
              onLongPress={e => {
                SetOrder({ ...newOrder, ...e.nativeEvent.coordinate });
              }}
            >
              <Marker
                coordinate={{
                  latitude: newOrder.latitude,
                  longitude: newOrder.longitude
                }}
                draggable
              >
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text
                    style={{
                      // color: "yellow",
                      padding: moderateScale(2),
                      fontSize: RFValue(10),
                      backgroundColor: colors.BackGround
                    }}
                  >
                    {localization.longPressmap}
                  </Text>
                  <FontAwesome
                    name="map-marker"
                    color={colors.white}
                    size={RFValue(50)}
                  />
                </View>
              </Marker>
            </MapView>
          </View> */}
        <RenderInput
          title={localization.ProductPrice}
          value={newOrder.salary}
          onChangeText={value => SetOrder({ ...newOrder, salary: value })}
          iSnumber={true}
          error={newOrderError.salary}
          placeholder={"100"}
          required
        />
        <RenderInput
          title={localization.discount}
          value={newOrder.offer}
          onChangeText={value => SetOrder({ ...newOrder, offer: value })}
          placeholder={"0.00%"}
          error={newOrderError.offer}
          required
        />
        <RenderInput
          title={localization.facebookAccount}
          value={newOrder.facebook}
          placeholder={"https://facebook.com/profile_id"}
          onChangeText={value => SetOrder({ ...newOrder, facebook: value })}
        />
        <RenderInput
          title={localization.phoneNumber}
          value={newOrder.call}
          placeholder={"201222222222"}
          onChangeText={value => SetOrder({ ...newOrder, call: value })}
        />
        <RenderInput
          title={localization.whatsApp}
          value={newOrder.whatsapp}
          placeholder={"201222222222"}
          onChangeText={value => SetOrder({ ...newOrder, whatsapp: value })}
        />
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
            if (!newOrder.category) {
              Errors.category = true;
            }
            if (!newOrder.name) {
              Errors.name = true;
            }
            if (!newOrder.details) {
              Errors.details = true;
            }
            if (!newOrder.pic) {
              Errors.pic = true;
            }
            if (!newOrder.salary) {
              Errors.salary = true;
            }
            if (!newOrder.offer) {
              Errors.offer = true;
            }
            setnewOrderError(Errors);
            console.log(newOrder);
            if (Object.keys(Errors).length === 0) {
              let formData = new FormData();
              for (let key in newOrder) {
                formData.append(key, newOrder[key]);
              }
              formData.append("lat", newOrder.latitude);
              formData.append("long", newOrder.longitude);

              SetLoading(true);
              AddOrder(formData, () => {
                props.navigation.navigate("MyProducts");
              }).then(result => {
                SetLoading(false);
              });
            }
          }}
        >
          {loading ? (
            <Spinner
              style={{
                marginVertical: moderateScale(5),
                justifyContent: "center",
                alignSelf: "center",
                alignItems: "center"
              }}
              isVisible={true}
              size={moderateScale(15)}
              type="Circle"
              color={"white"}
            />
          ) : (
            <Text style={{ color: "white", margin: moderateScale(10) }}>
              {localization.add}
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
      {/* </KeyboardAvoidingView> */}
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
    categories: state.Config.categories,
    strips: state.Config.strips,
    services: state.Config.services,
    servicesTypes: state.Config.servicesTypes,
    user: state.auth.user
  };
})(MyHandels);
