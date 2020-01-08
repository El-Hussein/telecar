import React, { Fragment } from "react";
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
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
import Header2 from "@components/Header2";
import { Images } from "@assets";
import Card from "../../../Components/Card";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import { connect } from "react-redux";
import { getMyOrdersCount } from "../../../Redux/actions/provider";
import Spinner from "react-native-spinkit";
import { baseUrl } from "@config";
import localization from "../../../localization/localization";

import firebaseJs from "firebase";

class Profile extends React.Component {
  state = {
    messages: [],
    loading: false
  };
  async componentWillMount() {
    this.props.getCounts();
    this.database = firebaseJs.database().ref("chat");

    await this.get_messages_onload();
  }
  get_messages_onload = async () => {
    this.setState({ loading: true });
    //let S = Date.now();
    let messages = [];
    let result = [];
    await this.database.once("value", snapshot =>
      snapshot.forEach(message => {
        messages.push({ id: message.key, ...message.val() });
      })
    );
    messages = messages
      .filter(t => t.merchantId === this.props._id)
      .sort(function(a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.timestamp) - new Date(a.timestamp);
      })
      .filter(function(a) {
        return !this[a.userId] && (this[a.userId] = true);
      }, Object.create(null));
    messages.length > 0 &&
      messages.map(t => {
        let f = t[Object.keys(t)[Object.keys(t).length - 1]];
        let ob = {
          avatar: "https://randomuser.me/api/portraits/men/75.jpg",
          alt: t.from,
          title: t.from,
          subtitle: t.message,
          date: t.timestamp,
          unread: 0
        };
        console.log("====================================");
        console.log();
        console.log("====================================");
        result.push(ob);
      });

    this.setState({ messages: result, loading: false });
    console.log("==============messages======================");
    console.log(this.state.messages);
    console.log("====================================");
  };

  render() {
    let props = this.props;
    const {
      _id,
      avatar,
      name,
      products = "0",
      messages = "0",
      notifications = "0",
      views = "0"
    } = this.props;
    let AVATAR = `${baseUrl}api/user/image/1/${_id}?${new Date()}`;

    return (
      <View style={{ flex: 1, backgroundColor: colors.BackGround }}>
        <Header2
          navigation={props.navigation}
          title={localization.home}
          hideback
          hidelogo
        />
        <ScrollView
          bounces={true}
          style={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={() => this.props.getCounts()}
              //    colors="white"
              tintColor="white"
              style={{
                color: "white"
              }}
            />
          }
        >
          {props.loadingCount && (
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
          )}
          <View
            style={{
              height: height * 0.35,
              width: "80%",
              alignSelf: "center",
              borderWidth: 1,
              borderColor: "#eee",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image
              // source={{ uri: AVATAR }}
              source={Images.Logo2}
              style={{
                width: width * 0.35,
                height: width * 0.35,
                alignSelf: "center"
              }}
              resizeMode="stretch"
            />
            <Text>{name}</Text>
            <View
              style={{
                width: "80%",
                alignSelf: "center",
                justifyContent: "space-between",
                flexDirection: "row",
                marginTop: moderateScale(5)
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: colors.main,
                  paddingVertical: moderateScale(10),
                  marginHorizontal: moderateScale(5),
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: moderateScale(5)
                }}
                onPress={() => {
                  props.navigation.navigate("EditeProfile");
                }}
              >
                <Text style={{ color: "white", fontSize: RFValue(14) }}>
                  {localization.settings}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: colors.main,
                  paddingVertical: moderateScale(5),
                  marginHorizontal: moderateScale(5),
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: moderateScale(5)
                }}
                onPress={() => {
                  props.navigation.navigate("AddProduct");
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: RFValue(14),
                    textAlign: "center"
                  }}
                >
                  {localization.AddProduct}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              width: width,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: moderateScale(20)
            }}
          >
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                props.navigation.navigate("MyProducts", { index: 0 })
              }
            >
              <Card
                image={Images.cardBack}
                text={localization.myProducts}
                text2={String(products)} //Running
              />
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={styles.card}
               onPress={() => props.navigation.navigate("OpenDeals")}
            >
              <Card
                image={Images.cardBack}
                text={localization.AddProduct}
                text2={""} //
              />
            </TouchableOpacity> */}
          </View>
          <View
            style={{
              width: width,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: moderateScale(20)
            }}
          >
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                props.navigation.navigate("Notifications", { index: 1 })
              }
            >
              <Card
                image={Images.cardBack}
                text={localization.Mynotifications}
                text2={String(notifications)} //
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                props.navigation.navigate("Chat", { item: "messages" })
              }
            >
              <Card
                image={Images.cardBack}
                text={localization.myMessages}
                text2={String(this.state.messages.length)} //Messages
              />
            </TouchableOpacity>
          </View>
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
  }
});

const mapState = state => {
  return {
    ...state.auth.user,
    ...state.provider.counts,
    loadingCount: state.provider.countsLodaing
  };
};
const mapDispatch = dispatch => {
  return {
    getCounts: () => getMyOrdersCount(dispatch)
  };
};

export default connect(mapState, mapDispatch)(Profile);
