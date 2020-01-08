import React, { Component } from "react";
import { Text, View, TouchableOpacity, WebView } from "react-native";
var paytabs = require("paytabs_api");
import SplashScreen from "react-native-splash-screen";
import { baseUrl } from "@config";
import { connect } from "react-redux";
import Spinner from "react-native-spinkit";
import { AddBalance } from "../../Redux/actions/AuthActions";
import { height, width, moderateScale } from "../../config";
import Axios from "axios";
class PayTabsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      link: null,
      showLink: true,
      amount: props.navigation.state.params.amount,
      linkLoaded: false,
      paytabsInfo: {
        loading: true,
        merchant_email: null,
        secret_key: null
      }
    };
  }

  componentWillMount() {
    Axios.get(baseUrl + "api/paytabs", {
      headers: { Authorization: this.props.token }
    }).then(result => {
      paytabs.validateSecretKey(
        {
          merchant_email: result.data.merchant_email,
          secret_key: result.data.secret_key
        },
        response => {
          console.log(response);
        }
      );

      paytabs.createPayPage(
        {
          // merchant_email: "ebrahimhassan121@gmail.com",
          // secret_key:
          //   "e4nfwo4dVPHBYexJsBl1KxTpLpRP0hWfljuRIz4EoMgn1N6tpsv90pyMPpBPHx52RATA9YfyLwVNk2gJvMSvbrh0RTQyrVAjwuTF",
          merchant_email: result.data.merchant_email,
          secret_key: result.data.secret_key,
          currency: "SAR", //change this to the required currency
          amount: this.state.amount, //change this to the required amount
          site_url: result.data.site_url, //change this to reflect your site
          title: "Order for Shoes", //Change this to reflect your order title
          quantity: 1, //Quantity of the product
          unit_price: this.state.amount, //Quantity * price must be equal to amount
          products_per_title: "شحن حساب وكلني", //Change this to your products
          return_url: `${baseUrl}api/payment`, //This should be your callback url
          cc_first_name: this.props.name, //Customer First Name
          cc_last_name: this.props.name, //Customer Last Name
          cc_phone_number: "00966", //Country code
          phone_number: this.props.phone, //Customer Phone
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
      // this.setState({paytabsInfo:{loading:false,merchant_email:result.data.merchant_email,secret_key:result.data.secret_key}})
    });
  }
  _onNavigationStateChange(webViewState) {
    if (
      webViewState.url === `${baseUrl}api/payment?status=success` ||
      webViewState.url.includes("api/payment?status=success")
    ) {
      this.props.AddBalanceNow(this.state.amount);
      this.props.navigation.goBack();
    }
    if (
      webViewState.url === `${baseUrl}api/payment?status=fail` ||
      webViewState.url.includes("api/payment?status=fail")
    ) {
      console.log("paymen fail");
      this.props.navigation.goBack();
    }
  }
  render() {
    if (this.state.link) {
      return (
        <View
          style={{
            flex: 1,
            paddingVertical: moderateScale(20),
            backgroundColor: "lightgray"
          }}
        >
          <WebView
            bounces={false}
            source={{ uri: this.state.link }}
            style={{ flex: 1 }}
            onNavigationStateChange={this._onNavigationStateChange.bind(this)}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            //   injectedJavaScript={this.state.cookie}
            startInLoadingState={false}
            onLoadEnd={() => this.setState({ linkLoaded: true })}
          />
          {!this.state.linkLoaded && (
            <Spinner
              style={{
                marginVertical: 10,
                justifyContent: "center",
                alignSelf: "center",
                alignItems: "center",
                position: "absolute",
                top: height * 0.5,
                left: width / 2
              }}
              isVisible={true}
              type="Circle"
              color={"#57B235"}
            />
          )}
        </View>
      );
    }
    return (
      <Spinner
        style={{
          marginVertical: 10,
          justifyContent: "center",
          alignSelf: "center",
          alignItems: "center"
        }}
        isVisible={true}
        type="Circle"
        color={"#57B235"}
      />
    );
  }
}
const mapState = state => {
  return {
    ...state.auth.user
  };
};
const mapDispatch = dispatch => {
  return {
    AddBalanceNow: balance => AddBalance(dispatch, balance)
  };
};
export default connect(
  mapState,
  mapDispatch
)(PayTabsComponent);
