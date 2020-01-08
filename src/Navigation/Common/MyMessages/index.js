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
  TouchableWithoutFeedback,
  TextInput
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
import Store from "../../../Redux";
import Axios from "axios";

//update
const ChatItem = ({
  date = "27-2-1993",
  title = "hani",
  subtitle = "message",
  navigation
}) => (
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
);

class Chat extends Component {
  async componentDidMount() {
    this.database = firebaseJs.database().ref("chat");
    await this.get_messages_onload();
    await this.get_new_messages();
  }

  state = {
    messages: [],
    loading: false,
    index: 0,
    message: "",
    disabled: false
  };
  getUnique = (arr, comp) => {
    const unique = arr
      .map(e => e[comp])

      // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)

      // eliminate the dead keys & store unique objects
      .filter(e => arr[e])
      .map(e => arr[e]);

    return unique;
  };
  get_messages_onload = async () => {
    this.setState({ loading: true });
    //let S = Date.now();
    let messages = [];
    let userType =
      this.props.LoginType === "Customer" ? "userId" : "merchantId";

    await this.database.once("value", snapshot =>
      snapshot.forEach(message => {
        messages.push({ id: message.key, ...message.val() });
      })
    );
    let result = [];
    let temp = messages
      .filter(
        t =>
          t.productId &&
          t.productId === this.props.navigation.state.params.productId
      )
      .sort(function(a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.timestamp) - new Date(a.timestamp);
      });
    if (temp.length > 0) {
      temp.map(t => {
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
    }

    await this.setState(
      {
        messages: result.reverse(),
        loading: false
      },
      () => {
        console.log("====================================");
        console.log(this.state.messages);
        console.log("====================================");
      }
    );
    //let E = Date.now();
    // alert(E - S);
  };

  get_new_messages = async () => {
    this.database.limitToLast(1).on("child_added", snapshot =>
      this.setState(prev => ({
        messages: [
          {
            id: snapshot.key,
            ...{
              avatar: "https://randomuser.me/api/portraits/men/75.jpg",
              alt: snapshot.val().from,
              title: snapshot.val().from,
              subtitle: snapshot.val().message,
              date: snapshot.val().timestamp,
              unread: 0
            }
          },
          ...prev.messages
        ].reverse()
      }))
    );
  };
  send_message = async (missedCall = false) => {
    this.setState({ disabled: true });
    let userType =
      this.props.LoginType === "Customer" ? "userId" : "merchantId";
    let merchantId =
      userType === "merchantId"
        ? this.props._id
        : this.props.navigation.state.params._id;
    let userId =
      userType === "userId"
        ? this.props._id
        : this.props.navigation.state.params._id;
    let message = this.state.message;
    this.setState({ message: "" });

    // try {
    //   this.setState({ inputDisable: true });
    //   let notification = await Api.post("api/notifications/patients", {
    //     id: this.state.appointment.patient.id,
    //     appointmentId: this.props.navigation.getParam("id"),
    //     message: this.state.message,

    //     content: {
    //       en: `new message from ${this.state.appointment.patient.name}`
    //     },
    //     data: { type: "message" }
    //   });
    // } catch (error) {}
    let data = {
      message,
      type: "text",
      timestamp: Number(Date.now()),
      from: this.props.name,
      to: this.props.navigation.state.params.name,
      merchantId,
      userId,
      productId: this.props.navigation.state.params.productId
    };

    console.log("====================================");
    console.log(data);
    console.log("====================================");
    this.database.push(data);
    this.setState({ disabled: false });
    const token = Store.getState().auth.user.token;
    if (this.props.LoginType === "Customer") {
      let not = await Axios.post(
        baseUrl + "api/users/notifiy/merchant",
        {
          message: data.message,
          productId: data.productId,
          merchantId: data.merchantId,
          from: data.from,
          to: data.to,
          userId: data.userId
        },
        {
          headers: { Authorization: token }
        }
      );
      console.log("=======not=============================");
      console.log(not, not.response);
      console.log("====================================");
    } else {
      let not = await Axios.post(
        baseUrl + "api/merchants/notifiy/user",
        {
          message: data.message,
          productId: data.productId,
          merchantId: data.merchantId,
          from: data.from,
          to: data.to,
          userId: data.userId
        },
        {
          headers: { Authorization: token }
        }
      );
      console.log("=======not=============================");
      console.log(not, not.response);
      console.log("====================================");
    }
  };
  loadMore = () => {};
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          navigation={this.props.navigation}
          title={localization.myMessages}
          hidelogo
        />
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
            ref={r => (this.ScrollView = r)}
            //       bounces={false}
            inverted
            data={this.state.messages.reverse()}
            style={{
              flex: 1
            }}
            //  extraData={this.props.myRooms.data}
            renderItem={({ item, index }) => (
              <ChatItem
                {...item}
                navigation={this.props.navigation}
                key={String(index)}
              />
            )}
            //endFillColor="#57B235"

            ListHeaderComponent={
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 10,
                  marginBottom: moderateScale(10)
                }}
              >
                <TextInput
                  value={this.state.message}
                  onChangeText={message => this.setState({ message })}
                  style={{
                    width: "75%",
                    borderWidth: 2,
                    borderRadius: 15,
                    padding: 5
                  }}
                />
                <TouchableOpacity
                  disabled={this.state.disabled}
                  onPress={this.send_message}
                >
                  <View
                    style={{
                      width: 80,
                      height: 40,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: colors.main,
                      borderRadius: 15
                    }}
                  >
                    <Text style={{ color: "white" }}>send</Text>
                  </View>
                </TouchableOpacity>
              </View>
            }
            keyExtractor={(item, index) => String(index)}
          />
        )}
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
