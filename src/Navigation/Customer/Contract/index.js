import React, { Fragment, useRef, useState, useEffect } from "react";
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  FlatList,
  KeyboardAvoidingView,
  Platform
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
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import ActionSheet from "react-native-actionsheet";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { Input } from "native-base";
import { SimpleAnimation } from "react-native-simple-animations";
import { connect } from "react-redux";
import {
  FetchRoomChat,
  orderCompleted,
  getOrderDetails
} from "../../../Redux/actions/Chat";
import io from "socket.io-client";
import { baseUrl } from "@config";
import {
  Reset_CHat_IN_Room,
  Fetch_Chat_IN_Room_Success
} from "../../../Redux/types";
import Moment from "moment";
import Spinner from "react-native-spinkit";
import Pdf from "react-native-pdf";
import { FetchContracts, SendContract } from "../../../Redux/actions/Contracts";
import ImagePicker from "react-native-image-picker";
const RenderIemCard = props => {
  const { from, sendertype, text, texttype, icon, details, date } = props.item;
  let SenderData = {};
  if (sendertype === "user") {
    SenderData = {
      name: props.user.name,
      profile: { uri: baseUrl + "api/user/image/0/" + props.user._id }
    };
  } else {
    SenderData = {
      name: "Admin",
      profile: {
        uri:
          "data:image/png;base64,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"
      }
    };
  }
  return (
    <View style={styles.card}>
      <View style={{}}>
        <View>
          <View
            style={{
              flexDirection: "row"
            }}
          >
            <Image
              source={SenderData.profile}
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
              {SenderData.name}
            </Text>
          </View>
          {texttype == "text" ? (
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
          ) : (
            <TouchableOpacity
              style={{ marginTop: moderateScale(20), width: width * 0.5 }}
              onPress={() => props.toggleImage(text)}
            >
              <Image
                source={{ uri: text }}
                style={{
                  width: width * 0.5,
                  height: height * 0.2,
                  resizeMode: "stretch",
                  backgroundColor: "#eee"
                }}
              />
            </TouchableOpacity>
          )}
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
      </View>
    </View>
  );
};

const MyHandels = props => {
  const [firstLoad, setfirstLoad] = useState(true);
  const [text, settext] = useState(null);
  const [texttype, settexttype] = useState("text");
  const [sendLoad, SetsendLoad] = useState(false);
  if (firstLoad) {
    props.fetchContracts(1);
    setfirstLoad(false);
  }

  const [typing, setTyping] = useState(false);
  const [showImage, SetShowImage] = useState(false);
  return (
    <View bounces={false} style={{ flex: 1 }}>
      <Header navigation={props.navigation} title="تحويلات" />

      <FlatList
        bounces={true}
        data={props.contracts.data}
        extraData={props.contracts.data}
        onEndReachedThreshold={0.5}
        // onEndReached={({ distanceFromEnd }) => {
        //   !props.contracts.isEnd && props.fetchContracts(props.contracts.page);
        // }}
        style={{
          flex: 1,
          height: height * 0.7,
          marginBottom: moderateScale(20)
        }}
        renderItem={({ item, index }) => (
          <RenderIemCard
            user={props.user}
            item={item}
            key={index}
            toggleImage={uri => {
              SetShowImage(uri);
            }}
          />
        )}
        keyExtractor={(item, index) => {
          " item.title" + index;
        }}
        ListEmptyComponent={
          props.contracts.loading ? (
            <View
              style={{
                flex: 1,
                height: height * 0.5,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Spinner
                style={{
                  justifyContent: "center",
                  alignSelf: "center",
                  alignItems: "center"
                }}
                isVisible={props.loading}
                type="Circle"
                color={"#57B235"}
              />
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                height: height * 0.5,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text>لايوجد تحويلات سابقة</Text>
            </View>
          )
        }
      />
      {!typing ? (
        <TouchableOpacity
          onPress={() => setTyping(true)}
          style={{
            position: "absolute",
            bottom: moderateScale(10),
            right: moderateScale(10)
          }}
        >
          <MaterialCommunityIcons
            name="plus-circle"
            color={colors.main}
            size={RFValue(50)}
          />
        </TouchableOpacity>
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "position" : "height"}
          keyboardVerticalOffset={moderateScale(10)}
          style={{
            width: "100%",
            maxHeight: height * 0.2,
            alignSelf: "center",
            position: "absolute",
            left: 0,
            bottom: moderateScale(15),
            zIndex: 1000,
            elevation: 20
          }}
        >
          <SimpleAnimation
            delay={100}
            duration={500}
            movementType="slide"
            staticType="bounce"
          >
            <View
              style={{
                width: "100%",
                maxHeight: height * 0.2,
                alignSelf: "center",
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <Input
                multiline
                style={{
                  backgroundColor: "white",
                  writingDirection: "rtl",
                  textAlign: "right",
                  fontSize: RFValue(16),
                  fontFamily: "Tajawal-light",
                  borderRadius: moderateScale(10),
                  marginHorizontal: moderateScale(10),
                  paddingTop: moderateScale(10),
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 12
                  },
                  shadowOpacity: 0.58,
                  shadowRadius: 16.0,
                  elevation: 50,
                  borderWidth: 1,
                  borderColor: "#ccc"
                }}
                textAlignVertical="center"
                placeholder="اكتب رسالتك"
                value={text}
                onChangeText={v => settext(v)}
              />
              <View style={{ width: "30%" }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: colors.main,
                    padding: moderateScale(10),
                    alignSelf: "center",
                    marginHorizontal: moderateScale(10),
                    borderRadius: moderateScale(10),
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: moderateScale(10)
                  }}
                  onPress={() => {
                    setTyping(false);
                  }}
                >
                  <Text style={{ color: "white" }}>إلغاء</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: colors.main,
                    padding: moderateScale(10),
                    alignSelf: "center",
                    marginHorizontal: moderateScale(10),
                    borderRadius: moderateScale(10),
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                  onPress={() => {
                    SendContract(text, "text", props.dispatch).then(e => {});
                  }}
                >
                  <Text style={{ color: "white" }}>إرسال</Text>
                </TouchableOpacity>
              </View>
              {sendLoad ? (
                <Spinner
                  style={{
                    position: "absolute",
                    left: moderateScale(10),
                    top: -moderateScale(40),
                    elevation: 5,
                    zIndex: 100,
                    elevation: 8
                  }}
                  isVisible={props.loading}
                  type="Circle"
                  color={"gray"}
                />
              ) : (
                <View
                  style={{
                    position: "absolute",
                    left: moderateScale(10),
                    top: -moderateScale(50),
                    elevation: 50,
                    height: height * 0.1,
                    paddingVertical: moderateScale(20)
                  }}
                >
                  <TouchableOpacity
                    hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}
                    onPress={() => {
                      ImagePicker.showImagePicker({}, response => {
                        console.log("Response = ", response);
                        // resizebase64(base64, maxWidth, maxHeight);
                        if (response.didCancel) {
                          // console.log("User cancelled image picker");
                        } else if (response.error) {
                          // console.log("ImagePicker Error: ", response.error);
                        } else if (response.customButton) {
                          // console.log(
                          //   "User tapped custom button: ",
                          //   response.customButton
                          // );
                        } else {
                          // const source = { uri: response.uri };
                          const source = {
                            uri: "data:image/jpeg;base64," + response.data
                          };
                          SetsendLoad(true);
                          SendContract(
                            source.uri,
                            "image",
                            props.dispatch
                          ).then(e => {
                            SetsendLoad(false);
                          });
                        }
                      });
                    }}
                  >
                    <EvilIcons name="image" size={width * 0.1} color="gray" />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </SimpleAnimation>
        </KeyboardAvoidingView>
      )}
      {showImage && (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            top: height * 0.2
          }}
        >
          <Image
            source={{ uri: showImage }}
            style={{ flex: 1 }}
            resizeMode="stretch"
          />
          <MaterialCommunityIcons
            onPress={() => SetShowImage(false)}
            name="close"
            size={RFValue(28)}
            color={"black"}
            style={{
              position: "absolute",
              top: 0,
              right: moderateScale(20)
            }}
          />
        </View>
      )}
    </View>
  );
};

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

export default connect(
  state => {
    return {
      contracts: state.Contracts.contracts,
      user: state.auth.user
    };
  },
  dispatch => {
    return {
      fetchContracts: page => FetchContracts(page, dispatch),
      dispatch
    };
  }
)(MyHandels);
