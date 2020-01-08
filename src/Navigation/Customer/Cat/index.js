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
import { SliderBox } from "react-native-image-slider-box";
import {
  width,
  height,
  moderateScale,
  scale,
  verticalScale,
  colors,
  baseUrl
} from "@config";

import Header2 from "@components/Header2";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import { connect } from "react-redux";
import {
  getMyOrdersCount,
  GetBESTOFFERS,
  GetOFFERS,
  GetProductsByCatId
} from "../../../Redux/actions/Customer";
import Spinner from "react-native-spinkit";
import localization from "../../../localization/localization";
import ProductCard from "../../../Components/ProductCard";
class Login extends Component {
  state = {
    Category: this.props.navigation.state.params.item,

    Products: {
      loading: true,
      data: []
    }
  };
  componentDidMount() {
    GetProductsByCatId(this.state.Category._id).then(res => {
      this.setState({ Products: { loading: false, data: res } });
    });
  }
  render() {
    let props = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: colors.BackGround }}>
        <Header2
          navigation={props.navigation}
          title={this.state.Category.name}
          hidelogo
        />
        <ScrollView
          bounces={true}
          style={{ flex: 1, marginVertical: moderateScale(20), zIndex: -1 }}
          contentContainerStyle={{
            justifyContent: "center",
            alignSelf: "center",
            marginTop: moderateScale(10)
          }}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={() => {}} // colors="white"
              tintColor="white"
              style={{
                color: "white"
              }}
            />
          }
        >
          <FlatList
            numColumns={2}
            style={{}}
            contentContainerStyle={{
              justifyContent: "space-between",
              alignItems: "center",
              alignSelf: "center"
            }}
            data={this.state.Products.data}
            renderItem={({ item, index }) => {
              return (
                <ProductCard item={item} navigation={this.props.navigation} />
              );
            }}
            ListEmptyComponent={() => {
              return this.state.Products.loading ? (
                <View />
              ) : (
                <Text style={{ color: "grey" }}>
                  {localization.noProductsExist}
                </Text>
              );
            }}
          />
          {this.state.Products.loading && (
            <Spinner
              style={{
                marginVertical: moderateScale(20),
                justifyContent: "center",
                alignSelf: "center",
                alignItems: "center",
                marginTop: moderateScale(20)
              }}
              isVisible={true}
              type="Circle"
              color={colors.main}
            />
          )}
        </ScrollView>
      </View>
    );
  }
}
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

export default connect(
  state => {
    return {
      counts: state.Customer.counts,
      user: state.auth.user,
      type: state.Config.userType
    };
  },
  dispatch => {
    return { getCounts: () => getMyOrdersCount(dispatch) };
  }
)(Login);
