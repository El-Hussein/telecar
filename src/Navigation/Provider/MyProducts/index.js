import React, { Fragment, useRef, useState, Component } from "react";
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  FlatList,
  Platform,
  RefreshControl,
  TouchableWithoutFeedback
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
import Card from "../../../Components/Card";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import ActionSheet from "react-native-actionsheet";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";
import {
  getMyOrdersByStatus,
  getMyProducts,
  deletProduct
} from "../../../Redux/actions/provider";
import Moment from "moment";
import "moment/locale/ar-sa";
import Spinner from "react-native-spinkit";
import localization from "../../../localization/localization";
import { baseUrl } from "../../../config";

class MyHandels extends Component {
  async componentDidMount() {
    this.FetchProducts();
  }
  FetchProducts = async () => {
    getMyProducts().then(data => {
      this.setState({
        data,
        loading: false
      });
    });
  };
  renderItem = ({ item, index }) => {
    const { name, details, offers, image, salary, views, offer, _id } = item;
    return (
      <View
        style={{
          width: "50%",
          minWidth: "50%",
          alignSelf: "center"
        }}
      >
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("Product", { item: item });
          }}
        >
          <View
            style={{
              flex: 1,
              alignSelf: "center",
              backgroundColor: "white",
              padding: moderateScale(4),
              margin: moderateScale(5),
              width: "90%"
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Image
                source={{
                  uri: baseUrl + image
                }}
                style={{
                  resizeMode: "stretch",
                  height: height * 0.1,
                  width: "100%"
                }}
              />
            </View>

            <View
              style={{
                width: "100%",
                display: "flex",
                minHeight: height * 0.1
              }}
            >
              <View
                style={{
                  flex: 4,
                  justifyContent: "center",
                  padding: moderateScale(2)
                }}
              >
                <Text
                  style={{
                    fontSize: RFValue(16),
                    color: colors.main
                  }}
                >
                  {name}
                </Text>
                <Text
                  style={{
                    fontSize: RFValue(12),
                    color: "#ccc",
                    flexWrap: "wrap"
                  }}
                  numberOfLines={2}
                >
                  {details}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <Text
                style={{
                  color: "red",
                  textAlign:
                    localization.getLanguage() == "ar" ? "right" : "left",
                  fontSize: RFValue(14),
                  alignSelf: "flex-start"
                }}
              >
                {offer} offer
              </Text>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("Product", { item: item });
                  }}
                  style={{
                    marginHorizontal: moderateScale(5),
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text style={{ fontSize: RFValue(10), color: colors.main }}>
                    {views}
                  </Text>
                  <MaterialCommunityIcons
                    name="eye"
                    color={colors.main}
                    size={RFValue(14)}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  disabled={this.state.deleteLoading === _id}
                  onPress={() => {
                    this.setState({ deleteLoading: _id });
                    deletProduct(_id).then(res => {
                      if (res) {
                        this.setState({
                          loading: true
                        });
                        this.FetchProducts();
                      }
                    });
                    // this.props.navigation.navigate("Product", { item: item });
                  }}
                >
                  {this.state.deleteLoading === _id ? (
                    <Spinner
                      style={{
                        // marginVertical: moderateScale(2),
                        justifyContent: "center",
                        alignSelf: "center",
                        alignItems: "center"
                      }}
                      size={moderateScale(15)}
                      isVisible={true}
                      type="Circle"
                      color={colors.main}
                    />
                  ) : (
                    <MaterialCommunityIcons
                      name="delete"
                      color="red"
                      size={RFValue(14)}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                position: "absolute",
                backgroundColor: colors.main,
                // width: width * 0.15,
                paddingHorizontal: moderateScale(10),
                paddingVertical: moderateScale(5)
              }}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: RFValue(10)
                }}
              >
                {salary + " " + localization.riyal}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  state = {
    loading: true,
    data: [],
    deleteLoading: true
  };

  render() {
    let data = [];
    return (
      <View style={{ flex: 1, backgroundColor: colors.BackGround }}>
        <Header
          navigation={this.props.navigation}
          title={localization.myProducts}
          hidelogo
        />
        <ScrollView bounces={false} style={{ flex: 1 }}>
          <FlatList
            bounces={false}
            numColumns={2}
            data={this.state.data}
            style={{
              flex: 1,
              paddingBottom: moderateScale(50)
            }}
            renderItem={this.renderItem}
            contentContainerStyle={{
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center"
            }}
            ListFooterComponent={
              this.state.loading ? (
                <Spinner
                  style={{
                    marginVertical: moderateScale(20),
                    justifyContent: "center",
                    alignSelf: "center",
                    alignItems: "center"
                  }}
                  isVisible={true}
                  type="Circle"
                  color={colors.main}
                />
              ) : (
                <View />
              )
            }
            keyExtractor={(item, index) => {
              item.title + index;
            }}
            ListEmptyComponent={
              this.state.loading ? (
                <View />
              ) : (
                <Text
                  style={{
                    textAlign: "center",
                    marginTop: moderateScale(30),
                    alignSelf: "center"
                  }}
                >
                  {localization.noProductsExist}
                </Text>
              )
            }
          />
        </ScrollView>
      </View>
    );
  }
}

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
  }
});

const MapStateToProps = state => {
  return {
    myorders: state.Customer.myOrders
  };
};
const MapDispatchToProps = dispatch => {
  return {
    fetchRunning: page => getMyOrdersByStatus(page, 1, dispatch),
    fetchFinished: page => getMyOrdersByStatus(page, 3, dispatch)
  };
};
export default connect(MapStateToProps, MapDispatchToProps)(MyHandels);
