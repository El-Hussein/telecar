import React, { Component } from "react";
import firebase from "react-native-firebase";
import { AsyncStorage } from "react-native";
import { connect } from "react-redux";
import {NavigationActions} from 'react-navigation';
import NavigationService from "../Navigation/NewNav/NavigationService";
const displayLocal = (title, subtitle, name = "local", data = {}) => {
  const notification = new firebase.notifications.Notification();
  notification.setSubtitle(subtitle);
  notification.setTitle(title);
  notification.setSound("default");
  notification.android.setPriority(
    firebase.notifications.Android.Priority.High
  );
  notification.android.setChannelId("test-channel");
  notification.android.setSmallIcon("ic_launcher");
  notification.android.setLargeIcon("ic_launcher");
  notification.android.setLargeIcon();
  notification.android.setBigText(subtitle);
  notification.setData({ ...data, name });
  // notification.setBody({ ...data, name: name });
  notification.setBody(subtitle);
  console.log("===========noti local=========================");
  console.log(notification);
  console.log("====================================");
  firebase.notifications().displayNotification(notification);
};

class NotificationWrapper extends Component {
  // for android to recieve notifications.
  createNotificationChannel = async () => {
    const channel = new firebase.notifications.Android.Channel(
      "test-channel",
      "Test Channel",
      firebase.notifications.Android.Importance.Max
    ).setDescription("My apps test channel");

    await firebase.notifications().android.createChannel(channel);
  };

  componentDidMount() {
    console.log("NOTIFIIIIIIIIIICAAAAAAAAATIOOOOOOOOOOON...................")
    console.log(this.props.nav)
    this.createNotificationChannel();
    this.checkPermission();
    this.createNotificationListeners();
  }

  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
  }

  async createNotificationListeners() {
    // console.log("                 lll    " + this.props.user.type_user)
    if((this.props.user && this.props.user.type_user=='Customer') || !this.props.user){
      firebase.messaging().subscribeToTopic('New_Offer');
      // console.log("DID SUBSCRIPED? " + this.props.user.type_user)
    }else{
      firebase.messaging().unsubscribeFromTopic('New_Offer');
    }
    
    /*
     * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      console.log('notification OPEEEEEEEEEENNNNNNNNNNNNNNNNNNNNNNN')
      console.log(notificationOpen.notification)
      console.log('notification OPEEEEEEEEEENNNNNNNNNNNNNNNNNNNNNNN')
      notificationOpen.notification.android.setChannelId("test-channel");
      // firebase.notifications().displayNotification(notificationOpen.notification);
      if(notificationOpen.notification._title == "NewOffer")
          NavigationService.navigate("Product", {item:JSON.parse(notificationOpen.notification._data.object)[0]})
      else
          NavigationService.navigate("Chats", {item:JSON.parse(notificationOpen.notification._data.object)[0]})
      firebase.notifications().removeAllDeliveredNotifications();
    }
    /*
    * Triggered when a particular notification has been received in foreground
    * */
   this.notificationListener = firebase
   .notifications()
   .onNotification(notification => {
      console.log('notificatioOOOOOOOOOOOOOOOOOOOOOOONNNNNNNNNNNNNNNNNNN ................ pppppppppp')
      console.log(notification)
      console.log('notificatioOOOOOOOOOOOOOOOOOOOOOOONNNNNNNNNNNNNNNNNNN ................ pppppppppp')
      notification.setSound("default");
      notification.android.setChannelId("test-channel");
      if(notification._title == "NewOffer")
        firebase.notifications().displayNotification(notification);
      // firebase.notifications().removeDeliveredNotification(notification._notificationId)
      }
    );

    /*
     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
     * */
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        console.log('notification notificationOpen.notification')
        console.log(notificationOpen.notification)
        console.log('notification notificationOpen.notification')
        notificationOpen.notification.android.setChannelId("test-channel");
        // firebase.notifications().displayNotification(notificationOpen.notification);
        // firebase.notifications().removeDeliveredNotification(notificationOpen.notification._notificationId)
        if(notificationOpen.notification._title == "NewOffer")
          NavigationService.navigate("Product", {item:JSON.parse(notificationOpen.notification._data.object)[0]})
        else
          NavigationService.navigate("Chats", {item:JSON.parse(notificationOpen.notification._data.object)[0]})
        firebase.notifications().removeAllDeliveredNotifications();
      }
    );

    /*
     * Triggered for data only payload in foreground
     * */
    this.messageListener = firebase.messaging().onMessage(message => {
      //process data message
      console.log("====================================");
      console.log("dat only");
      console.log("====================================");
    });
  }

  //1
  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      console.log("notification enabled?")
      this.getToken();
    } else {
      console.log("notification not enabled!")
      this.requestPermission();
    }
  }

  //3
  async getToken() {
    let fcmToken = await AsyncStorage.getItem("fcmToken");
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem("fcmToken", fcmToken);
      }
    }
    let f = await AsyncStorage.getItem("fcmToken");
    console.log("============fcm token========================");
    console.log(f);
    console.log("================fcm token====================");
  }

  //2
  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log("permission rejected");
    }
  }

  render() {
    return null;
  }
}

const mapStat = state => {
  return {
    ...state.navigation,
    user: state.auth.user
  };
};

const mapDispatch = dispatch => {
  return {};
};
export default connect(mapStat, mapDispatch)(NotificationWrapper);
// export default (NotificationWrapper);
