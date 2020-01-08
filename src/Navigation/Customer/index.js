import React from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { createStackNavigator } from "react-navigation";
import Main from "./Main";
import Profile from "./Profile";
import MyHandels from "./MyHandels";
// import Offers from "./Offers";
import DealFollow from "./DealFollow";
import MyMessages from "../Common/MyMessages";
import AddOrder from "./AddOrder";
import Contracts from "./Contract";
import EditeProfile from "../Common/EditeProfile";
import ProfileSettings from "../Common/ProfileSetting";
import ChangePassword from "../Common/ChangePassword";
import CallUs from "../Common/CallUs";
import About from "../Common/About";
import Policy from "../Common/Policy";
import Charge from "../Common/Charge";
import Chat from "../Common/Chat";
import RechargeAccount from "./RechargeAccount";
import RateProvider from "./RateProvider/indx";
import { colors } from "../../config";
import { Easing } from "react-native";
import { Notifications, Offers, Favourite } from "./Bottoms";
import BottomComponent from "./Bottoms/Bottom";
import { Product } from "../Common";
import Search from "../Customer/Search";
import Cat from "./Cat";
let CollapseExpand = (index, position) => {
  const inputRange = [index - 1, index, index + 1];
  const opacity = position.interpolate({
    inputRange,
    outputRange: [0, 1, 1]
  });

  const scaleY = position.interpolate({
    inputRange,
    outputRange: [0, 1, 1]
  });

  return {
    opacity,
    transform: [{ scaleY }]
  };
};
let SlideFromRight = (index, position, width) => {
  const inputRange = [index - 1, index, index + 1];
  const translateX = position.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [width, 0, 0]
  });
  const slideFromRight = { transform: [{ translateX }] };
  return slideFromRight;
};
const TransitionConfiguration = () => {
  return {
    transitionSpec: {
      duration: 750,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps;
      const width = layout.initWidth;
      const { index, route } = scene;
      const params = route.params || {}; // <- That's new
      const transition = params.transition || "default"; // <- That's new
      return {
        collapseExpand: CollapseExpand(index, position),
        default: SlideFromRight(index, position, width)
      }[transition];
    }
  };
};
class BottomContainer extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.props.children}
        <View
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            left: 0
          }}
        >
          <BottomComponent navigation={this.props.navigation} />
        </View>
      </View>
    );
  }
}

export default createStackNavigator(
  {
    Profile: {
      screen: props => (
        <BottomContainer navigation={props.navigation}>
          {<Profile navigation={props.navigation} />}
        </BottomContainer>
      )
    },
    Favourite,
    Product: Product,
    Offers,
    Notifications,

    Contracts,
    Charge: {
      screen: Charge
    },
    Customer: Main,
    MyHandels: MyHandels,
    // Offers,
    DealFollow,
    MyMessages,
    AddOrder,
    EditeProfile,
    ProfileSettings: ProfileSettings,
    ChangePassword: ChangePassword,
    CallUs: CallUs,
    About: About,
    Policy: Policy,
    Chat: Chat,
    RechargeAccount,
    RateProvider,
    Search,
    Cat
  },
  {
    // initialRouteName: "Notifications",
    headerMode: "none",
    cardStyle: {
      backgroundColor: colors.BackGround
    },
    mode: "modal"
    // transitionConfig: TransitionConfiguration
  }
);
