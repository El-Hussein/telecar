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

import Header2 from "./Header";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import { connect } from "react-redux";
import {
  getMyOrdersCount,
  GetBESTOFFERS,
  GetOFFERS
} from "../../../Redux/actions/Customer";
import Spinner from "react-native-spinkit";
import localization from "../../../localization/localization";
import ProductCard from "../../../Components/ProductCard";
class Login extends Component {
  state = {
    Offers: {
      loading: true,
      data: []
    },
    filter: null
  };
  componentDidMount() {
    GetOFFERS().then(res => {
      this.setState({ Offers: { loading: false, data: res } });
    });
  }
  filterData = () => {
    let Offers = this.state.Offers.data;
    let textSearch = this.state.filter.text;
    let catSearch = this.state.filter.cat;
    if (textSearch && !catSearch) {
      return Offers.filter(
        e => e.name.includes(textSearch) || e.details.includes(textSearch)
      );
    }
    if (textSearch && catSearch) {
      return Offers.filter(
        e =>
          (e.name.includes(textSearch) || e.details.includes(textSearch)) &&
          e.category == catSearch
      );
    }
    if (!textSearch && catSearch) {
      return Offers.filter(e => e.category == catSearch);
    } else {
      return Offers;
    }
  };

  render() {
    let props = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: colors.BackGround }}>
        <Header2
          navigation={props.navigation}
          title={localization.offers}
          hidelogo
          onChange={async (text, cat) => {
            console.log("=======text==cat===========================");
            console.log(text, cat);
            console.log("====================================");
            await this.setState({ filter: { text, cat } });
            // this.filterData(text, cat);
          }}
          resetFilter={() => this.setState({ filter: null })}
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
            data={
              this.state.filter ? this.filterData() : this.state.Offers.data
            }
            renderItem={({ item, index }) => {
              return (
                <ProductCard item={item} navigation={this.props.navigation} />
              );
            }}
          />
          {this.state.Offers.loading && (
            <View
              style={{
                width: width,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
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
            </View>
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
