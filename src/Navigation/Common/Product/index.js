import React, { useState } from "react";
import { View, ScrollView, Text, StyleSheet, Linking } from "react-native";
import Image from "../../../Components/Image";
import Header2 from "../../../Components/Header2";
import {
  moderateScale,
  height,
  colors,
  width,
  baseUrl,
  verticalScale
} from "../../../config";
import localization from "../../../localization/localization";
import { RFValue } from "react-native-responsive-fontsize";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { Button } from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { ToggleFAV } from "../../../Redux/types/Customer";
import Store from "../../../Redux/index";
import { IncreaseProductView } from "../../../Redux/actions/Customer";
const handleClick = url => {
  return Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url);
      return true;
    } else {
      const AlertMessage = Store.getState().Config.alert;
      AlertMessage("error", localization.someThingWentWrong);

      console.log("Don't know how to open URI: " + url);
      return false;
    }
  });
};
function Index(props) {
  console.log("====this is props================================");
  console.log(props);
  console.log("====================================");
  const {
    name,
    details,
    offer,
    salary,

    image,
    facebook,
    whatsapp,
    call,
    message,
    creator = null,
    _id
  } = props.navigation.state.params.item;
  let lat = 37.78825;
  let long = -122.4324;
  if (creator) {
    lat = creator.lat ? parseFloat(creator.lat) : lat;
    long = creator.long ? parseFloat(creator.long) : long;
  }
  const [firstLoad, setFirstLoad] = useState(true);
  if (firstLoad) {
    setFirstLoad(false);
    IncreaseProductView(_id);
  }
  return (
    <View style={{ flex: 1 }}>
      <Header2 title={name} hidelogo navigation={props.navigation} />
      <ScrollView style={{ flex: 1, padding: moderateScale(5) }}>
        <View>
          <Image
            source={{
              uri: baseUrl + image
            }}
            style={{
              resizeMode: "stretch",
              height: height * 0.23,
              width: "100%"
            }}
          />
          {props.type === "Customer" && (
            <View
              style={{
                position: "absolute",
                padding: width * 0.05,
                width: width,
                alignItems: "flex-end"
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  props.toggleFav(props.navigation.state.params.item);
                }}
              >
                <FontAwesome
                  name="heart"
                  color={
                    props.favs.indexOf(props.navigation.state.params.item) > -1
                      ? "red"
                      : "grey"
                  }
                  size={RFValue(22)}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.contactUsContainer}>
          <Text style={styles.contactUsText}>{localization.contactUs}</Text>
          <View style={styles.contactUsButtonsContainer}>
            {facebook ? (
              <AntDesign
                name={"facebook-square"}
                color="blue"
                onPress={() => {
                  handleClick(`${facebook}`);
                  // handleClick(`fb://profile/${facebook}`);
                }}
                style={styles.contactUsButtons}
              />
            ) : (
              <View />
            )}

            {whatsapp ? (
              <FontAwesome5
                name={"whatsapp-square"}
                color="green"
                onPress={() => {
                  handleClick(`whatsapp://send?phone=${whatsapp}&text=`);
                }}
                style={styles.contactUsButtons}
              />
            ) : (
              <View />
            )}
            <AntDesign
              name={"message1"}
              color="green"
              onPress={() => {
                if (creator && creator.name && creator._id) {
                  props.navigation.navigate("MyMessages", {
                    name: creator.name,
                    _id: creator._id,
                    productId: _id
                  });
                }
              }}
              style={styles.contactUsButtons}
            />
            <Text>
              {call ? (
                <FontAwesome
                  name={"phone-square"}
                  color="blue"
                  onPress={() => {
                    handleClick(`tel:${call}`);
                  }}
                  style={styles.contactUsButtons}
                />
              ) : (
                ""
              )}
            </Text>
          </View>
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: moderateScale(10),
            backgroundColor: "rgba(0,0,0,0.03)",
            marginHorizontal: moderateScale(-5),
            marginTop: moderateScale(5)
          }}
        >
          <Text
            style={{ color: colors.main }}
            adjustsFontSizeToFit
            allowFontScaling
          >
            {name}
          </Text>
          <Text
            style={{ fontSize: RFValue(12), color: "grey", flexWrap: "wrap" }}
          >
            {details}
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            height: height * 0.3
          }}
        >
          <Text
            style={styles.locationText}
            adjustsFontSizeToFit
            allowFontScaling
          >
            {localization.location}
          </Text>
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={{
              flex: 1,
              backgroundColor: colors.BackGround,
              marginBottom: verticalScale(20)
            }}
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
              latitude: lat ? lat : 0.0,
              longitude: long ? long : 0.0,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121
            }}
          >
            {lat && long && (
              <Marker
                coordinate={{
                  latitude: lat,
                  longitude: long
                }}
              >
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text style={{ color: "yellow", fontSize: RFValue(14) }}>
                    {name}
                  </Text>
                  <FontAwesome
                    name="map-marker"
                    color={colors.white}
                    size={RFValue(50)}
                  />
                </View>
              </Marker>
            )}
          </MapView>
        </View>
        {true && props.type === "Customer" && (
          <Button
            onPress={() => {
              if (creator && creator.name && creator._id) {
                props.navigation.navigate("MyMessages", {
                  name: creator.name,
                  _id: creator._id,
                  productId: _id
                });
              }
            }}
            block
            color={"white"}
            style={{
              backgroundColor: colors.main,
              marginVertical: moderateScale(20)
            }}
            hasText
          >
            <Text style={{ color: colors.white, fontSize: RFValue(16) }}>
              {localization.orderNow}
            </Text>
          </Button>
        )}
      </ScrollView>
    </View>
  );
}

export default connect(
  state => {
    return {
      type: state.Config.userType,
      favs: state.FAV.fav
    };
  },
  dispatch => {
    return {
      toggleFav: item => dispatch({ type: ToggleFAV, payload: item })
    };
  }
)(Index);
const styles = StyleSheet.create({
  contactUsContainer: {
    flexDirection: localization.getLanguage() === "en" ? "row" : "row-reverse",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: moderateScale(10),
    alignSelf: "center"
  },
  contactUsButtonsContainer: {
    flexDirection: localization.getLanguage() === "en" ? "row" : "row-reverse",
    justifyContent: "flex-end",
    flex: 1,
    flexGrow: 2,
    alignItems: "center"
  },
  contactUsButtons: {
    marginHorizontal: moderateScale(5),
    alignSelf: "center",
    textAlign: "center",
    fontSize: RFValue(35)
  },
  contactUsText: {
    flex: 1,
    fontSize: RFValue(16),
    fontFamily: "Cairo-SemiBold",
    color: colors.Gray
  },
  locationText: {
    fontSize: RFValue(16),
    fontFamily: "Cairo-SemiBold",
    color: colors.Gray
  }
});
