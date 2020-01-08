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
import { baseUrl } from "@config";

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
import store from "../../../Redux";
import {
  getMyOrdersByStatus,
  getOrderOffers
} from "../../../Redux/actions/Customer";
import Moment from "moment";
import "moment/locale/ar-sa";
import Spinner from "react-native-spinkit";
import { FetchAllChat } from "../../../Redux/actions/Chat";
import localization from "../../../localization/localization";
import firebaseJs from "firebase";

const RenderIemCard = props => {
  const {
    sendertype,
    provider,
    user,
    admin,
    date,
    text,
    texttype
  } = props.item;
  let USERDATA = {};
  let profile;
  switch (sendertype) {
    case "users": {
      USERDATA = user[0];
      profile = baseUrl + "api/user/image/0/" + USERDATA._id;
      break;
    }
    case "providers": {
      USERDATA = provider[0];
      profile = baseUrl + "api/user/image/1/" + USERDATA._id;
      break;
    }
    case "admin": {
      const adminImage = `data:image/png;base64,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`;

      USERDATA = { name: "الإدارة" };
      profile = adminImage;

      break;
    }
  }
  const name = USERDATA.name;

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={{}}
        onPress={() => {
          props.navigation.navigate("MyMessages", {
            item: {
              admin: props.item.admin,
              files: props.item.files[0],
              date: props.item.date,
              from: props.item.from,
              provider: props.item.provider[0],
              room: props.item.room,
              service: props.item.service[0],
              user: props.item.user[0],
              _id: props.item._id,
              offer: props.item.offer[0],
              order: props.item.order[0]
            }
          });
        }}
      >
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderBottomColor: "#eee",
              borderBottomWidth: 1,
              paddingBottom: moderateScale(8)
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold", top: "8%" }}>
                {/* {props.item.service[0].name} */}
                Car Wash
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginTop: moderateScale(20)
            }}
          >
            <Image
              source={{ uri: profile }}
              style={{
                width: width * 0.2,
                height: height * 0.1,
                resizeMode: "stretch",
                backgroundColor: "#eee"
              }}
            />
            <Text
              style={{
                fontWeight: "bold",
                top: "8%",
                marginHorizontal: moderateScale(15)
              }}
            >
              {name}
            </Text>
          </View>
          <Text
            style={{
              fontSize: RFValue(14),
              width: width * 0.7,
              flexWrap: "wrap",
              textAlign: "left"
            }}
          >
            {text}
          </Text>
        </View>
        <Text
          style={{
            writingDirection: "ltr",
            fontSize: RFValue(14),
            alignSelf: "flex-end",
            color: "#ccc"
          }}
        >
          {Moment(date).format('DD-MM-YYYY hh:mm A"')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
//update
const ChatItem = ({
  date = "27-2-1993",
  title = "hani",
  subtitle = "message",
  navigation,
  merchantId,
  userId,
  productId
}) => (
  <TouchableWithoutFeedback
    onPress={() => {
      otherPart =
        store.getState().Config.userType === "Customer" ? merchantId : userId;
      navigation.navigate("MyMessages", {
        name: "aymmman",
        _id: otherPart,
        productId
      });
    }}
  >
    <View
      style={{
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: "#E6E6FA",
        paddingVertical: 5,
        justifyContent: "center",
        marginBottom: 10
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center"
          }}
        >
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/men/75.jpg" }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              marginHorizontal: 5
            }}
          />
          <Text
            style={{
              color: "gray",
              fontSize: 13,
              fontWeight: "400"
            }}
          >
            {title}
          </Text>
        </View>
        <Text
          style={{
            color: "gray",
            fontSize: 13,
            fontWeight: "400"
          }}
        >
          {Moment(date).format('DD-MM-YYYY hh:mm A"')}
        </Text>
      </View>
      <View>
        <Text>{subtitle} </Text>
      </View>
    </View>
  </TouchableWithoutFeedback>
);

class Chat extends Component {
  async componentDidMount() {
    this.database = firebaseJs.database().ref("chat");
    await this.get_messages_onload();
  }
  get_messages_onload = async () => {
    this.setState({ loading: true });
    //let S = Date.now();
    let messages = [];
    let result = [];
    let filterType =
      this.props.LoginType === "Customer" ? "userId" : "merchantId";
    await this.database.once("value", snapshot =>
      snapshot.forEach(message => {
        messages.push({ id: message.key, ...message.val() });
      })
    );
    messages = messages
      .filter(t => t[filterType] === this.props._id)
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
          unread: 0,
          merchantId: t.merchantId,
          userId: t.userId,
          productId: t.productId
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

  state = {
    messages: [],
    loading: true,
    index: 0
  };
  loadMore = () => {
    if (!this.props.myRooms.isEnd) {
      this.props.fetchAllMessages(this.props.myRooms.page);
    }
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          navigation={this.props.navigation}
          title={localization.myMessages}
          hidelogo
        />
        <ScrollView bounces={false} style={{ flex: 1 }}>
          {this.state.loading ? (
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
            <FlatList
              bounces={false}
              data={this.state.messages}
              style={{
                flex: 1,
                paddingBottom: moderateScale(50)
              }}
              //  extraData={this.props.myRooms.data}
              renderItem={({ item, index }) => (
                <ChatItem
                  {...item}
                  //  title={item.titl}
                  navigation={this.props.navigation}
                  key={String(item)}
                />
              )}
              //endFillColor="#57B235"
              onEndReached={() => {
                this.loadMore();
              }}
              ListFooterComponent={
                this.props.myRooms.loading ? (
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
                this.props.myRooms.loading ? (
                  <View />
                ) : (
                  <Text
                    style={{
                      textAlign: "center",
                      marginTop: moderateScale(30),
                      alignSelf: "center"
                    }}
                  >
                    <Text>لايوجد اى رسائل</Text>
                  </Text>
                )
              }
            />
          )}
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
    myRooms: state.Chat.Rooms,
    ...state.auth.user,
    LoginType: state.Config.userType
  };
};
const MapDispatchToProps = dispatch => {
  return {
    fetchAllMessages: page => FetchAllChat(page, dispatch)
  };
};
export default connect(MapStateToProps, MapDispatchToProps)(Chat);
