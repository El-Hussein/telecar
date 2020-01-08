import React, { Component } from "react";
import { Text, View, TouchableOpacity, WebView } from "react-native";
var paytabs = require("paytabs_api");
import SplashScreen from "react-native-splash-screen";
import { baseUrl } from "@config";
export default class paytabsComponent extends Component {
  state = {
    link: null,
    showLink: true
  };
  componentWillMount() {
    SplashScreen.hide();
  }
  componentDidMount() {
    paytabs.validateSecretKey(
      {
        merchant_email: "ebrahimhassan121@gmail.com",
        secret_key:
          "e4nfwo4dVPHBYexJsBl1KxTpLpRP0hWfljuRIz4EoMgn1N6tpsv90pyMPpBPHx52RATA9YfyLwVNk2gJvMSvbrh0RTQyrVAjwuTF"
      },
      response => {
        console.log(response);
      }
    );

    paytabs.createPayPage(
      {
        merchant_email: "ebrahimhassan121@gmail.com",
        secret_key:
          "e4nfwo4dVPHBYexJsBl1KxTpLpRP0hWfljuRIz4EoMgn1N6tpsv90pyMPpBPHx52RATA9YfyLwVNk2gJvMSvbrh0RTQyrVAjwuTF",
        currency: "SAR", //change this to the required currency
        //    amount: "10", //change this to the required amount
        site_url: "could-b.com", //change this to reflect your site
        title: "Order for Shoes", //Change this to reflect your order title
        quantity: 1, //Quantity of the product
        unit_price: 10, //Quantity * price must be equal to amount
        products_per_title: "شحن حساب وكلني", //Change this to your products
        return_url: `${baseUrl}api/payment`, //This should be your callback url
        cc_first_name: "Samy", //Customer First Name
        cc_last_name: "Saad", //Customer Last Name
        cc_phone_number: "00966", //Country code
        phone_number: "12332323", //Customer Phone
        billing_address: "Address", //Billing Address
        city: "Manama", //Billing City
        state: "Manama", //Billing State
        postal_code: "1234", //Postal Code
        country: "SAU", //Iso 3 country code
        email: "<CUSTOMER EMAIL>", //Customer Email
        ip_customer: "<CUSTOMER IP>", //Pass customer IP here
        ip_merchant: "<MERCHANT IP>", //Change this to your server IP
        address_shipping: "Shipping", //Shipping Address
        city_shipping: "Manama", //Shipping City
        state_shipping: "Manama", //Shipping State
        postal_code_shipping: "973",
        country_shipping: "SAU",
        other_charges: 0, //Other chargs can be here
        reference_no: 1234, //Pass the order id on your system for your reference
        msg_lang: "ar", //The language for the response
        cms_with_version: "Nodejs Lib v1" //Feel free to change this
      },
      result => {
        console.log("=====result===============================");
        console.log(result);
        console.log("===========result=========================");
        if (result.response_code == 4012) {
          //Redirect your merchant to the payment link
          console.log(result.payment_url);
          this.setState({ link: result.payment_url });
        } else {
          //Handle the error
          console.log(result);
        }
      }
    );
  }
  _onNavigationStateChange(webViewState) {
    console.log("==========url==========================");
    console.log(webViewState.url);
    console.log("=============url=======================");
    if (webViewState.url === `${baseUrl}api/payment?status=success`) {
      alert("tmam");
    }
    if (webViewState.url === `${baseUrl}api/payment?status=fail`) {
      alert("mes tmam");
    }
  }
  render() {
    if (this.state.link && this.state.showLink) {
      return (
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={{
              height: 40,
              backgroundColor: "gray"
            }}
            hitSlop={{ right: 30, left: 30, top: 30, bottom: 30 }}
            onPress={() => this.setState({ showLink: false })}
          >
            <Text
              style={{
                color: "black",
                fontWeight: "700",
                fontSize: 30
              }}
            >
              X
            </Text>
          </TouchableOpacity>
          <WebView
            te
            bounces={false}
            useWebKit
            source={{ uri: this.state.link }}
            style={{ flex: 1 }}
            onNavigationStateChange={this._onNavigationStateChange.bind(this)}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            //   injectedJavaScript={this.state.cookie}
            startInLoadingState={false}
          />
        </View>
      );
    }
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    );
  }
}
