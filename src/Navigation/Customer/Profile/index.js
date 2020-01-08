import React, { Fragment, Component } from "react";
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  RefreshControl,
  FlatList,
  AsyncStorage
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

import Header from "@components/Header";
import Header2 from "@components/Header2";
import { Images } from "@assets";
import Card from "../../../Components/Card";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import { connect } from "react-redux";
import {
  getMyOrdersCount,
  GetBESTOFFERS
} from "../../../Redux/actions/Customer";
import Spinner from "react-native-spinkit";
import localization from "../../../localization/localization";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import ProductCard from "../../../Components/ProductCard";
class Login extends Component {
  state = {
    BestOffers: {
      loading: true,
      data: []
    }
  };
  componentDidMount() {
    GetBESTOFFERS().then(res => {
      this.setState({ BestOffers: { loading: false, data: res } });
    });
  }
  render() {
    let props = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: colors.BackGround }}>
        <Header2
          navigation={props.navigation}
          title={localization.home}
          hideback
          hidelogo
          search
        />
        <ScrollView
          bounces={true}
          style={{ flex: 1 }}
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
          <SliderBox
            images={[
              "https://di-uploads-pod4.dealerinspire.com/tamaroffhonda/uploads/2019/06/Rental-Center-Page-Banner.jpg",
              "https://www.autorepairloveland.com/images/rbanner16.jpg",
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmJhFMJIMrEcssxYy2OBtUOZraV0quOLNMccioRbTXG4n_AfPe",
              "https://relentlesstowing.com/wp-content/uploads/2019/07/Banner-2-Relentless-Towing.jpg"
            ]}
            onCurrentImagePressed={index =>
              console.warn(`image ${index} pressed`)
            }
            sliderBoxHeight={height * 0.2}
            dotColor={colors.main}
            inactiveDotColor="#90A4AE"
            parentWidth={width}
            circleLoop
          />
          <FlatList
            style={{
              width: width,
              paddingVertical: moderateScale(20)
            }}
            data={[...props.cats]}
            // horizontal
            numColumns={3}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("Cat", { item })
                  }
                  key={index}
                  style={styles.itemCard}
                >
                  <Image
                    source={{
                      uri: baseUrl + item.image
                    }}
                    style={{
                      flex: 0.8,
                      width: "100%",
                      height: "80%",
                      resizeMode: "stretch",
                      backgroundColor: "#eee"
                    }}
                  />
                  <Text style={{ fontSize: RFValue(12), color: colors.main }}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            }}
            bounces={false}
          />

          <Text
            style={{
              fontSize: RFValue(16),
              color: colors.main,
              marginHorizontal: moderateScale(10),
              borderColor: colors.main,
              marginBottom: moderateScale(5)
            }}
          >
            {localization.offers.toUpperCase()}
          </Text>
          <FlatList
            numColumns={2}
            data={this.state.BestOffers.data}
            renderItem={({ item, index }) => {
              return (
                <ProductCard item={item} navigation={this.props.navigation} />
              );
            }}
            contentContainerStyle={{
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center"
            }}
          />
          {this.state.BestOffers.loading && (
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
          )}
          <View style={{ height: height * 0.1 }} />
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
    // backgroundColor: "rgba(0,0,0,0.03)",
    backgroundColor: "white",
    width: width * 0.28,
    height: height * 0.1,
    marginHorizontal: width * 0.025,
    marginBottom: moderateScale(5),
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
      type: state.Config.userType,
      cats: state.Config.categories
    };
  },
  dispatch => {
    return { getCounts: () => getMyOrdersCount(dispatch) };
  }
)(Login);
