import React, { Component } from "react";
import firebase from "react-native-firebase";
import { AsyncStorage } from "react-native";
import { connect } from "react-redux";

const displayLocal = (title, subtitle, name = "local", data = {}) => {
  console.log("===========noti local=========================");
  console.log(notification);
  console.log("====================================");
  const notification = new firebase.notifications.Notification();
  // notification.setSubtitle(subtitle);
  notification.setTitle(title);
  // notification.subtitle = "awesome";
  notification.setSound("default");
  notification.android.setPriority(
    firebase.notifications.Android.Priority.High
  );
  notification.android.setChannelId("test-channel");
  notification.android.setChannelId("test-channel");
  notification.android.setSmallIcon("ic_launcher");
  notification.android.setLargeIcon("ic_launcher");
  notification.android.setLargeIcon();
  notification.android.setBigText(subtitle);
  notification.setData({ ...data, name });
  // notification.setBody({ ...data, name: name });
  notification.setBody(subtitle);
  firebase.notifications().displayNotification(notification);
};

class NotificationWrapper extends Component {
  createNotificationChannel = async () => {
    const channel = new firebase.notifications.Android.Channel(
      "test-channel",
      "Test Channel",
      firebase.notifications.Android.Importance.Max
    ).setDescription("My apps test channel");

    await firebase.notifications().android.createChannel(channel);
  };
  componentDidMount() {
    this.createNotificationChannel();
    this.checkPermission();
    this.createNotificationListeners();
  }

  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
  }

  async createNotificationListeners() {
    /*
     * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
     * */
    firebase.messaging().subscribeToTopic('New_Offer');

    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      this._handleNotification(notificationOpen.notification, false);
    }
    /*
     * Triggered when a particular notification has been received in foreground
     * */
    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        notification.setSound("default");
        this._handleNotification(notification, true);
      });

    /*
     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
     * */
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        this._handleNotification(notificationOpen.notification, false);
      });

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
      console.log('enabled')
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  //3
  async getToken() {
    let fcmToken = await AsyncStorage.getItem("fcmToken");
    if (!fcmToken) {
      console.log('new one requested?')
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem("fcmToken", fcmToken);
      }
    }
    let f = await AsyncStorage.getItem("fcmToken");
    console.log("============loool token========================");
    console.log(f);
    console.log("================looool token====================");
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
  //
  _handleNotification = (notification, IsAppForGround = true) => {
    notification.android.setChannelId("test-channel");
    notification.android.setChannelId("test-channel");
    firebase.notifications().displayNotification(notification);
    return;
    if (notification.data && notification.data.name === "localMessage") {
      this.props.navigation.navigate("MyMessages", {
        item: notification.data.message
      });

      firebase
        .notifications()
        .removeDeliveredNotification(notification.notificationId);
      return;
    }
    if (notification.data && notification.data.name === "localNewOffer") {
      this.props.navigation.navigate("Offers", {
        item: notification.data.orderId
      });

      firebase
        .notifications()
        .removeDeliveredNotification(notification.notificationId);
      return;
    }
    if (notification.data && notification.data.name === "localNewOrder") {
      this.props.navigation.navigate("OpenDeals");
      firebase
        .notifications()
        .removeDeliveredNotification(notification.notificationId);
      return;
    }

    notification.android.setChannelId("test-channel");
    notification.android.setChannelId("test-channel");
    let TimOut = IsAppForGround ? 0 : 300;
    let TYPE = JSON.parse(notification.data.data).notificationType;
    let Data = JSON.parse(notification.data.data);
    setTimeout(() => {
      if (["offerAccepted", "providerDone", "orderDone"].includes(TYPE)) {
        if (IsAppForGround) {
          displayLocal(
            notification._title,
            notification._body,
            "localMessage",
            Data
          );
          return;
        }
        this.props.navigation.navigate("MyMessages", {
          item: Data.message
        });
        firebase
          .notifications()
          .removeDeliveredNotification(notification.notificationId);
        return;
      }
      if (TYPE === "newOrder") {
        if (IsAppForGround) {
          let NotificationTitle = "عرض جديد";
          // displayLocal(Data.text, NotificationTitle, "localNewOffer", Data);
          displayLocal(
            notification._body,
            NotificationTitle,
            "localNewOrder",
            Data
          );
          firebase
            .notifications()
            .removeDeliveredNotification(notification.notificationId);
          return;
        }

        this.props.navigation.navigate("OpenDeals");
        firebase
          .notifications()
          .removeDeliveredNotification(notification.notificationId);
        return;
      }
      if (TYPE === "newOffer") {
        if (IsAppForGround) {
          let NotificationTitle = "عرض جديد";
          displayLocal(
            notification._body,
            NotificationTitle,
            "localNewOffer",
            Data
          );
          firebase
            .notifications()
            .removeDeliveredNotification(notification.notificationId);
          return;
        }

        this.props.navigation.navigate("Offers", {
          item: Data.orderId
        });
        firebase
          .notifications()
          .removeDeliveredNotification(notification.notificationId);
        return;
      }

      if (TYPE === "chat") {
        if (IsAppForGround) {
          displayLocal(Data.text, "لديك رساله جديده", "localMessage", Data);
          firebase
            .notifications()
            .removeDeliveredNotification(notification.notificationId);
          return;
        }
        this.props.navigation.navigate("MyMessages", {
          item: Data.message
        });
        firebase
          .notifications()
          .removeDeliveredNotification(notification.notificationId);
        return;
      }
    }, TimOut);
    if (!IsAppForGround) {
      firebase.notifications().displayNotification(notification);
      // firebase
      //   .notifications()
      //   .removeDeliveredNotification(notification.notificationId);
      return;
    }
  };
}

const mapStat = state => {
  return {
    ...state.navigation
  };
};

const mapDispatch = dispatch => {
  return {};
};
export default connect(mapStat, mapDispatch)(NotificationWrapper);
