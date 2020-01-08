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
  RefreshControl
} from "react-native";

import {
  width,
  height,
  moderateScale,
  scale,
  verticalScale,
  colors
} from "@config";
import Header from "@components/Header";
import { Images } from "@assets";
import Card from "../../../Components/Card";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import ActionSheet from "react-native-actionsheet";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";
import {
  getMyOrdersByStatus,
  getOrderOffers,
  RemoveMyOrder
} from "../../../Redux/actions/Customer";
import Moment from "moment";
import "moment/locale/ar-sa";
import Spinner from "react-native-spinkit";

const RenderIemCard = props => {
  const { service, date, status, _id } = props.item.order
    ? props.item.order
    : props.item;
  const [loading, setloading] = useState(false);
  return (
    <View key={date} style={styles.card}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row" }}>
          <MaterialCommunityIcons
            name="wallet-travel"
            size={RFValue(20)}
            color="#57B235"
            style={{ alignSelf: "center" }}
          />
          <Text style={{ fontWeight: "bold", top: "8%" }}>{service.name}</Text>
        </View>
        <Text
          style={{ textDecorationLine: "underline", fontSize: RFValue(14) }}
        >
          {Moment(date)
            // .lang("ar")
            .locale("ar-sa")
            .format("DD-MM-YYYY hh:mm A")}
        </Text>
      </View>
      <View
        style={{
          marginVertical: moderateScale(15),
          flexDirection: "row"
        }}
      >
        <TouchableOpacity
          disabled={status != 0}
          style={{
            flexDirection: "row",
            backgroundColor: "#EDF9F1",
            borderWidth: 1,
            borderColor: colors.main,
            borderRadius: moderateScale(5),
            width: width * 0.2,
            alignItems: "center",
            justifyContent: "center",
            marginHorizontal: moderateScale(10),
            paddingVertical: moderateScale(5),
            opacity: status != 0 ? 0.6 : null
          }}
          onPress={() => {
            setloading(true);
            RemoveMyOrder(_id).then(() => {
              props.fetchWaitting(1);
              setloading(false);
            });
          }}
        >
          {loading ? (
            <Spinner
              style={{
                marginVertical: moderateScale(3),
                justifyContent: "center",
                alignSelf: "center",
                alignItems: "center"
              }}
              isVisible={true}
              type="Circle"
              color={"#57B235"}
              size={moderateScale(10)}
            />
          ) : (
            <View style={{ flexDirection: "row" }}>
              <MaterialCommunityIcons
                name="eye"
                size={RFValue(14)}
                color="#57B235"
                style={styles.Icon}
              />
              <Text
                style={{
                  fontSize: RFValue(14),
                  height: "100%",
                  top: Platform.OS === "ios" ? moderateScale(7) : null
                }}
              >
                اغلاق
              </Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          disabled={status != 0}
          style={{
            flexDirection: "row",
            backgroundColor: "#EDF9F1",
            borderWidth: 1,
            borderColor: colors.main,
            borderRadius: moderateScale(5),
            width: width * 0.2,
            alignItems: "center",
            justifyContent: "center",
            marginRight: moderateScale(10),
            paddingVertical: moderateScale(5),
            opacity: status != 0 ? 0.6 : null
          }}
          onPress={() => {
            // props.fetchOrderOffers(props.item._id);
            props.navigation.navigate("Offers", { item: props.item._id });
          }}
        >
          <MaterialCommunityIcons
            name="fullscreen"
            size={RFValue(14)}
            color="#57B235"
            style={styles.Icon}
          />
          <Text
            style={{
              fontSize: RFValue(14),
              height: "100%",
              top: Platform.OS === "ios" ? moderateScale(7) : null
            }}
          >
            العروض
          </Text>
        </TouchableOpacity>
        {status != 0 && (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              // backgroundColor: "#EDF9F1",
              backgroundColor: "#57B235",
              borderWidth: 1,
              borderColor: colors.main,
              borderRadius: moderateScale(5),
              width: width * 0.2,
              alignItems: "center",
              justifyContent: "center",
              marginRight: moderateScale(10),
              paddingVertical: moderateScale(5),
              position: "absolute",
              right: 0
            }}
            onPress={() =>
              props.navigation.navigate("MyMessages", {
                item: {
                  ...props.item,
                  _id: props.item.order._id,
                  files: props.item.order.files,
                  offer: props.item,
                  provider: props.item.provider,
                  user: props.item.order.user,
                  service: props.item.order.service
                },
                callBack: props.update
              })
            }
          >
            <Text
              style={{
                fontSize: RFValue(14),
                height: "100%",
                top: Platform.OS === "ios" ? moderateScale(7) : null,
                color: "white"
              }}
            >
              مراسلة
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

class MyHandels extends Component {
  async componentDidMount() {
    let index =
      this.props.navigation.state.params &&
      this.props.navigation.state.params.index;
    if (!index) index = 0;
    this.setState({ index });

    // index === 0 && this.props.fetchWaitting(1);
    // index === 1 && this.props.fetchRunning(1);
    // index === 2 && this.props.fetchFinished(1);
    this.props.fetchWaitting(1);
    this.props.fetchRunning(1);
    this.props.fetchFinished(1);
  }
  state = {
    index: 0
  };
  data = ["قيد الإنتظار", "معاملة جارية", "معاملة منتهية", "إلغاء"];
  loadMore = () => {
    switch (this.state.index) {
      case 0:
        !this.props.myorders.waitting.isEnd &&
          !this.props.myorders.waitting.loading &&
          this.props.fetchWaitting(this.props.myorders.waitting.page);
        break;
      case 1:
        !this.props.myorders.Running.isEnd &&
          !this.props.myorders.Running.loading &&
          this.props.fetchRunning(this.props.myorders.Running.page);
        break;
      case 2:
        !this.props.myorders.Finished.isEnd &&
          !this.props.myorders.Finished.loading &&
          this.props.fetchFinished(this.props.myorders.Finished.page);
        break;

      default:
        break;
    }
  };
  render() {
    let data = [];

    if (this.state.index === 0) data = this.props.myorders.waitting.orders;
    if (this.state.index === 1) data = this.props.myorders.Running.orders;
    if (this.state.index === 2) data = this.props.myorders.Finished.orders;
    // if (this.state.index === 3) data = this.props.myorders.Finished.orders;
    console.log("=======props Data Myord=============================");
    console.log(data);
    console.log("====================================");
    return (
      <View style={{ flex: 1 }}>
        <Header navigation={this.props.navigation} title="معاملاتي" />
        <ScrollView bounces={false} style={{ flex: 1 }}>
          <TouchableOpacity
            style={{
              height: height * 0.05,
              maxWidth: "35%",
              marginLeft: moderateScale(30),
              borderWidth: 1,
              borderColor: "#eee",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row"
            }}
            onPress={() => {
              refs_ActionSheet.show();
            }}
          >
            <Text style={{ fontSize: RFValue(14), alignSelf: "center" }}>
              {this.data[this.state.index]}
            </Text>
            <MaterialCommunityIcons
              name="menu-down"
              size={RFValue(20)}
              color="black"
              style={{ alignSelf: "center" }}
            />
          </TouchableOpacity>
          <ActionSheet
            ref={o => (refs_ActionSheet = o)}
            title={"اختر الفئة "}
            options={this.data}
            cancelButtonIndex={this.data.length - 1}
            onPress={index => {
              if (index !== this.state.index && index !== this.data.length - 1)
                this.setState({ index });
            }}
          />
          <FlatList
            bounces={false}
            data={data}
            style={{
              flex: 1,
              paddingBottom: moderateScale(50)
            }}
            extraData={data}
            renderItem={({ item, index }) => (
              <RenderIemCard
                navigation={this.props.navigation}
                fetchOrderOffers={this.props.fetchOrderOffers}
                item={item}
                key={index + Date.now()}
                fetchWaitting={this.props.fetchWaitting}
                update={() => {
                  this.props.fetchWaitting(1);
                  this.props.fetchRunning(1);
                  this.props.fetchFinished(1);
                }}
              />
            )}
            key={(item, index) => index + Date.now()}
            onEndReached={() => {
              this.loadMore();
            }}
            ListFooterComponent={
              (this.state.index === 0 &&
                this.props.myorders.waitting &&
                this.props.myorders.waitting.loading) ||
              (this.state.index === 1 &&
                this.props.myorders.Running &&
                this.props.myorders.Running.loading) ||
              (this.state.index === 2 &&
                this.props.myorders.Finished &&
                this.props.myorders.Finished.loading) ? (
                <Spinner
                  style={{
                    marginVertical: moderateScale(20),
                    justifyContent: "center",
                    alignSelf: "center",
                    alignItems: "center"
                  }}
                  isVisible={true}
                  type="Circle"
                  color={"#57B235"}
                />
              ) : (
                <View />
              )
            }
            keyExtractor={(item, index) => {
              item.title + index;
            }}
            ListEmptyComponent={
              (this.state.index === 0 &&
                this.props.myorders.waitting &&
                this.props.myorders.waitting.loading) ||
              (this.state.index === 1 &&
                this.props.myorders.Running &&
                this.props.myorders.Running.loading) ||
              (this.state.index === 2 &&
                this.props.myorders.Finished &&
                this.props.myorders.Finished.loading) ? (
                <View />
              ) : (
                <Text
                  style={{
                    textAlign: "center",
                    marginTop: moderateScale(30),
                    alignSelf: "center"
                  }}
                >
                  لايوجد معاملات في هذه الفئة
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
    fetchWaitting: page => getMyOrdersByStatus(page, 0, dispatch),
    fetchRunning: page => getMyOrdersByStatus(page, 1, dispatch),
    fetchFinished: page => getMyOrdersByStatus(page, 3, dispatch),
    fetchOrderOffers: id => getOrderOffers(id, dispatch, 1)
  };
};
export default connect(
  MapStateToProps,
  MapDispatchToProps
)(MyHandels);
