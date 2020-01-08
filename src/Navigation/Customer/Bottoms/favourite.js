import React, { Fragment, Component } from "react";
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  RefreshControl,
  FlatList
} from "react-native";
import {
  width,
  height,
  moderateScale,
  scale,
  verticalScale,
  colors,
  baseUrl
} from "@config";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import { connect } from "react-redux";
import { getMyOrdersCount } from "../../../Redux/actions/Customer";
import Spinner from "react-native-spinkit";
import localization from "../../../localization/localization";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Header2 from "@components/Header2";
import { ToggleFAV } from "../../../Redux/types/Customer";
import Moment from "moment";
import ProductCard from "../../../Components/ProductCard";
// let oldITem = (
//   <View key={item._id}>
//     <ProductCard item={item} navigation={this.props.navigation} />
//     <View
//       style={{
//         position: "absolute",
//         right: moderateScale(10)
//         // left: rtl ? moderateScale(10) : null
//       }}
//     >
//       <TouchableOpacity
//         onPress={() => {
//           this.props.toggleFav(item);
//         }}
//       >
//         <FontAwesome
//           name="heart"
//           color={this.props.favs.indexOf(item) > -1 ? "red" : "grey"}
//           size={RFValue(18)}
//           style={{ marginTop: moderateScale(10) }}
//         />
//       </TouchableOpacity>
//     </View>
//   </View>
// );
class Favourite extends Component {
  RenderNotificationItem = ({ rtl, item }) => (
    <View style={{ width: "100%", marginBottom: moderateScale(1) }}>
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate("Product", { item: item });
        }}
        style={{
          backgroundColor: "rgba(0,0,0,0.03)",
          width: "90%",
          alignSelf: "center",
          padding: moderateScale(1),
          marginTop: moderateScale(10),
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4
          },
          shadowOpacity: 0.3,
          shadowRadius: 4.65,
          elevation: 1
        }}
      >
        <View
          style={{
            flexDirection: rtl ? "row-reverse" : "row",
            justifyContent: "space-between",
            minHeight: height * 0.1,
            alignSelf: "center",
            direction: rtl ? "rtl" : "ltr"
          }}
        >
          <View style={{ flex: 1, flexGrow: 4, flexDirection: "row" }}>
            <Image
              source={{ uri: baseUrl + item.image }}
              style={{
                width: width * 0.3,
                height: height * 0.1,
                resizeMode: "stretch",
                marginRight: moderateScale(5),
                backgroundColor: "#eee"
              }}
            />
            <View style={{ flex: 1 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <Text>{item.name}</Text>

                <TouchableOpacity
                  onPress={() => {
                    this.props.toggleFav(item);
                  }}
                >
                  <FontAwesome
                    name="heart"
                    color={this.props.favs.indexOf(item) > -1 ? "red" : "grey"}
                    size={RFValue(18)}
                    style={{ marginTop: moderateScale(10) }}
                  />
                </TouchableOpacity>
              </View>
              <Text
                numberOfLines={3}
                style={{
                  color: "gray",
                  fontSize: RFValue(12),
                  lineHeight: moderateScale(20)
                }}
              >
                {item.details}
              </Text>
              <View
                style={{
                  flexDirection: rtl ? "row-reverse" : "row",
                  justifyContent: "flex-end"
                }}
              >
                <Text
                  style={{
                    fontSize: RFValue(10),
                    color: "grey",
                    marginHorizontal: moderateScale(5)
                  }}
                >
                  {Moment(item.createdAt).format("DD-MM-YYYY | hh:mm A")}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  render() {
    let props = this.props;
    const rtl = localization.getLanguage() === "ar";
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.BackGround,
          direction: rtl ? "rtl" : "ltr"
        }}
      >
        <Header2
          navigation={props.navigation}
          title={localization.favourite.toUpperCase()}
          hidelogo
        />
        <FlatList
          style={{ flex: 1 }}
          data={props.favs}
          numColumns={2}
          renderItem={({ item }) => (
            <this.RenderNotificationItem rtl={rtl} item={item} />
          )}
          keyExtractor={(item, index) => index}
          ListEmptyComponent={
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "grey" }}>
                {localization.noProductsExist}
              </Text>
            </View>
          }
        />
      </View>
    );
  }
}
export default connect(
  state => {
    return {
      favs: state.FAV.fav
    };
  },
  dispatch => {
    return {
      toggleFav: item => dispatch({ type: ToggleFAV, payload: item })
    };
  }
)(Favourite);
const styles = StyleSheet.create({
  card: {
    alignSelf: "center",
    width: width * 0.44,
    height: height * 0.15,
    marginHorizontal: moderateScale(2),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9
  },
  drawer: {
    marginHorizontal: moderateScale(30)
  },
  itemCard: {
    backgroundColor: "rgba(0,0,0,0.05)",
    width: width * 0.28,
    height: height * 0.1,
    marginHorizontal: width * 0.025,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 2,
    borderRadius: moderateScale(5)
  }
});
