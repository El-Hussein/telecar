import {
  LOGIN_ATTEMPT,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REGISTER_ATTEM,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  Update_Profile_Attemp,
  Update_Profile_Success,
  Update_Profile_Fail,
  ForgetPasswordAttemp,
  ForgetPasswordSucces,
  ForgetPasswordFail,
  ChangePasswordAteemp,
  ChangePasswordSuccess,
  ChangePasswordFail,
  GetMyPalanceSuccess,
  GetMyPalanceAttemp,
  GetMyPalanceFail,
  PaymentDoneAttemp,
  PaymentDoneFail,
  PaymentDoneSuccess,
  ContactUsAttemp,
  ContactUseSuccess,
  ContactUsFail,
  Verifyphoe_ATTEM,
  Verifyphoe_SUCCESS,
  Verifyphoe_FAIL
} from "../types";
import { AsyncStorage } from "react-native";
import axios from "axios";

import firebase from "react-native-firebase";
import localization from "../../localization/localization";
import { baseUrl } from "@config";
import Store from "../index";
import RNRestart from "react-native-restart";

const getMyLocation = async () => {
  let loc = {
    latitude: 37.78825,
    longitude: -122.4324
  };
  await navigator.geolocation.getCurrentPosition(
    position => {
      loc = { longitude: position.coords.longitude, latitude: position.coords.latitude };
      console.log(position)
    },
    error => {
      //   alert(JSON.stringify(error));
    },
    {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 1000
    }
  );
  return loc;
};

export const ContactUs = (dispatch, email, name, phone, message) => {
  const token = Store.getState().auth.user.token;
  const AlertMessage = Store.getState().Config.alert;
  let config = {
    headers: {
      Authorization: token
    }
  };
  dispatch({ type: ContactUsAttemp });

  return axios
    .post(
      `${baseUrl}api/contactus`,
      {
        email,
        name,
        phone,
        message
      }
      //   config
    )

    .then(e => {
      dispatch({ type: ContactUseSuccess });
      AlertMessage("success", "تاكيد", "تم ارسال الرساله بنجاح");
    })
    .catch(e => {
      console.log("====================================");
      console.log(e.response, e);
      console.log("====================================");
      dispatch({ type: ContactUsFail });
      AlertMessage("error", "خطـأ", "هناك خطا");
    });
};

export const AddBalance = (dispatch, balance) => {
  const token = Store.getState().auth.user.token;
  const AlertMessage = Store.getState().Config.alert;
  let config = {
    headers: {
      Authorization: token
    }
  };
  dispatch({ type: PaymentDoneAttemp });
  console.log("======from redux==============================");
  console.log(balance);
  console.log("====================================");
  return axios
    .put(`${baseUrl}api/users/charge`, { balance }, config)

    .then(e => {
      console.log("==========success==========================");
      console.log(e.data);
      console.log("====================================");
      dispatch({ type: PaymentDoneSuccess });
      GetMyPalance(dispatch);
    })
    .catch(e => {
      console.log("=================fail===================");
      console.log(e.response, e);
      console.log("=====================fail===============");
      dispatch({ type: PaymentDoneFail });
    });
};

export const GetMyPalance = dispatch => {
  const token = Store.getState().auth.user.token;
  const AlertMessage = Store.getState().Config.alert;
  dispatch({ type: PaymentDoneAttemp });
  let config = {
    headers: {
      Authorization: token
    }
  };
  dispatch({ type: GetMyPalanceAttemp });
  console.log("====token is================================");
  console.log(token);
  console.log("============token is========================");
  return axios
    .get(`${baseUrl}api/balnce`, config)
    .then(res => {
      dispatch({
        type: GetMyPalanceSuccess,
        payload: res.data.balance
      });
      console.log("====================================");
      console.log(res.data);
      console.log("====================================");
    })
    .catch(e => {
      dispatch({ type: GetMyPalanceFail });
      console.log("====================================");
      console.log(e.response);
      console.log("====================================");
      AlertMessage("error", "خطـأ", "هناك خطا");
    });
};

export async function ClearUserToken(token) {
  let config = {
    headers: {
      Authorization: token
    }
  };
  try {
    let r = await axios.post(baseUrl + "api/logout", null, config);

    console.log("================res clear token backebd====================");
    console.log(r);
    console.log("====================================");
  } catch (error) {
    console.log("=============error clear token back=======================");
    console.log(error);
    console.log("====================================");
  }
}

export const UpdateProfile = async payload => {
  const AlertMessage = Store.getState().Config.alert;
  const token = await GeneratNewToken();
  
  let formdata = new FormData();
  Object.entries(payload.form).map(i=>{
    console.log(i[0], i[1])
    if(i[0] == 'avatar' && i[1] != ''){
      formdata.append('image', {uri:i[1], name:'avatar.png', type:'image/png'})
      console.log('avatar')
    }else if(i[1] && i[0] != 'token'){
      console.log('not avatar')
      formdata.append(i[0],i[1])
    }
  })
  formdata.append('fcm_token',token)

  console.log(formdata, payload)
  const { navigation, dispatch } = payload;
  dispatch({ type: Update_Profile_Attemp });
  // const datatype = type.toLowerCase();
  return fetch(
    // `${baseUrl}api/${type === "Customer" ? "users" : "merchants"}/register`,
    `${baseUrl}api/person/update/profile`,
    {
      method:'POST',
      body:formdata,
      headers:{
        'Authorization': `Bearer ${payload.token}`,
        'Content-Type': `multipart/form-data`,
        'Accept': 'application/json',
      }
    }
  ).then((response)=> response.json())
  .then(res => {
    console.log("register response")
    console.log(res);
    console.log("register response")
    if(res.status){
      dispatch({
        type: Update_Profile_Success,
        payload: {...res.data.user, token:payload.token}
      });
      return true;
    }else{
      dispatch({ type: Update_Profile_Fail, payload: res.errors });
      return false;
    }
  })
  .catch(e => {
    console.log('register response error in: ')
    console.log(e);
    console.log("register response error" + JSON.stringify(payload.form) + ' fcm ' + token + ' token ' + payload.token)

    // let obj = e.response && e.response.errors;
    // if (obj.email) {
    //   AlertMessage("error", "خطـأ", "البريد الإلكتروني مستخدم من قبل");
    // } else if (obj.phone) {
    //   AlertMessage("error", "خطـأ", "الهاتف مستخدم من قبل");
    // } else if (obj.password) {
    //   AlertMessage("error", "خطـأ", "كلمة السر يجب الا تقل عن 6 حروف");
    // }
    // dispatch({ type: REGISTER_FAIL, payload: e.data });
    dispatch({ type: Update_Profile_Fail, payload: e });
    return false;
  });
};

export const ChangePasswordAction = async (
  dispatch,
  token,
  password,
  newPassword
) => {
  const AlertMessage = Store.getState().Config.alert;

  dispatch({ type: ChangePasswordAteemp });
  let config = {
    headers: {
      Authorization: token
    }
  };
  console.log("====================================");
  console.log(token, password, newPassword);
  console.log("====================================");
  return await axios
    .put(
      `${baseUrl}api/changepassword`,
      {
        password: String(password),
        newPassword: String(newPassword)
      },
      config
    )
    .then(res => {
      dispatch({
        type: ChangePasswordSuccess,
        paload: res.data
      });
      console.log("====================================");
      console.log(res);
      console.log("====================================");

      const userType = Store.getState().Config.userType;
      const returntype = userType === "Merchant" ? "merchant" : "user";
      dispatch({
        type: Update_Profile_Success,
        payload: res.data[returntype]
      });
      AlertMessage("success", "تاكيد", "تم تغيير كلمة المرور بنجاح");
    })
    .catch(e => {
      dispatch({ type: ChangePasswordFail });
      console.log("====================================");
      console.log(e.response, e);
      console.log("====================================");
      AlertMessage("error", "خطـأ", "هناك خطا ما");
    });
};

const requestPermission = async () => {
  const AlertMessage = Store.getState().Config.alert;
  await firebase
    .messaging()
    .requestPermission()
    .then(async () => {
      let fcmToken = await firebase.messaging().getToken();
      AsyncStorage.setItem('fcmToken', fcmToken);
      return fcmToken;
    })
    .catch(err => {
      AlertMessage(
        "error",
        "خطـأ",
        "لتتمكن من إستخدام التطبيق يجب تفعيل إشعارات التطبيق من الإعدادات"
      );
      return false;
    });
};

export const GeneratNewToken = async () => {
  const enabled = await firebase.messaging().hasPermission();
  if (enabled) {
    let fcmToken = await firebase.messaging().getToken();
    AsyncStorage.setItem('fcmToken', fcmToken);
    return fcmToken;
  } else {
    return await requestPermission();
  }
};

// export const getToken = async () => {
//   const token = await Store.getState().auth.notificationToken;
//   if (token) return token;
//   const newToken = await GeneratNewToken();
//   return newToken;
// };
/**
|--------------------------------------------------
|           client auth
|--------------------------------------------------
*/
export const VerfiyPhone = async payload => {
  const AlertMessage = Store.getState().Config.alert;
  const token = await GeneratNewToken();
  const { navigation, type, dispatch } = payload;
  if (!token) return;
  dispatch({ type: Verifyphoe_ATTEM });
  const datatype = type.toLowerCase();
  return axios
    .post(
      `${baseUrl}api/${
        datatype === "customer" ? "users" : "providers"
      }/verifyphone`,
      {
        ...payload.form,
        token
      }
    )
    .then(res => {
      dispatch({
        type: Verifyphoe_SUCCESS,
        payload: res.data[datatype === "customer" ? "user" : "driver"]
      });
      AlertMessage("success", "", "برجاء إدخال كود التفعيل");
      navigation.navigate("PhoneVerfiy", payload);
    })
    .catch(e => {
      console.log("====================================");
      console.log(e);
      console.log("====================================");
      let obj = e.response && e.response.data;
      if (obj.email) {
        AlertMessage("error", "خطـأ", "البريد الإلكتروني مستخدم من قبل");
      } else if (obj.phone) {
        AlertMessage("error", "خطـأ", "الهاتف مستخدم من قبل");
      }
      dispatch({ type: Verifyphoe_FAIL, payload: e.data });
    });
};
export const RegistClient = async payload => {
  const AlertMessage = Store.getState().Config.alert;
  const token = await GeneratNewToken();
  const location = await getMyLocation();
  console.log("location")
  console.log(location)
  console.log("location")
  
  console.log(payload)
  const { navigation, type, dispatch } = payload;
  dispatch({ type: REGISTER_ATTEM });
  // const datatype = type.toLowerCase();
  return axios
    .post(
      // `${baseUrl}api/${type === "Customer" ? "users" : "merchants"}/register`,
      `${baseUrl}api/person/register`,
      {
        ...payload.form,
        // lat: location.latitude,
        // lan: location.longitude,
        fcm_token:token
      }
    )
    .then(res => {
      console.log("register response")
      console.log(res);
      // console.log(navigation);
      console.log("register response")
      if(res.data.status){
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data.data.user
        });
        navigation.navigate(payload.form.type_user=="Customer"?"Home":"Merchant");
      }else{
        dispatch({ type: REGISTER_FAIL, payload: res.data.errors });
      }
    })
    .catch(e => {
      console.log('register response error in: ' + type)
      console.log(e);
      console.log("register response error" + JSON.stringify(payload.form) + '  ' + token + '  ' + location.latitude + '  ' + location.longitude)

      // let obj = e.response && e.response.errors;
      // if (obj.email) {
      //   AlertMessage("error", "خطـأ", "البريد الإلكتروني مستخدم من قبل");
      // } else if (obj.phone) {
      //   AlertMessage("error", "خطـأ", "الهاتف مستخدم من قبل");
      // } else if (obj.password) {
      //   AlertMessage("error", "خطـأ", "كلمة السر يجب الا تقل عن 6 حروف");
      // }
      // dispatch({ type: REGISTER_FAIL, payload: e.data });
      dispatch({ type: REGISTER_FAIL, payload: e });
    });
};

export const LoginClient = async payload => {
  const AlertMessage = Store.getState().Config.alert;
  const token = await GeneratNewToken();
  console.log("..............NEW TOKEN..............")
  console.log(token)
  console.log("..............NEW TOKEN..............")
  const location = await getMyLocation();
  const { email, password, navigation, type, dispatch } = payload;

  if (!token) return;
  dispatch({ type: LOGIN_ATTEMPT });
  return await axios
    .post(
      `${baseUrl}api/person/login`,
      // `${baseUrl}api/${type === "Customer" ? "users" : "merchants"}/login`,
      {
        email,
        password,
        // lat: location.latitude,
        // long: location.longitude,
        fcm_token:token
      }
    )
    .then(res => {
      const returntype = type === "Customer" ? "user" : "merchant";
      console.log("==================rer==================");
      console.log(returntype);
      console.log(email + ' ' + `${baseUrl}api/${type === "Customer" ? "users" : "merchants"}/login` + ' = ' + password + ' = ' + token)
      console.log("====================================");
      if(res.data.status){
        dispatch({
          type: LOGIN_SUCCESS,
          // payload: res.data[returntype]
          payload: res.data.data.user
        });
        // GetMyPalance(dispatch);
        console.log("TYYYYYYYYYYPPPEE :  " + type )
        type=="Customer"?navigation.navigate("Home"):navigation.navigate("Merchant");
      }else{
        dispatch({ type: LOGIN_FAILED });
        AlertMessage(
          "error",
          "خطـأ",
          "برجاء التاكد من البريد الالكتروني أو كلمة المرور"
        );
      }
        // type=="Customer"?navigation.navigate("Home"):RNRestart.Restart();
    })
    .catch(e => {
      console.log("e====================================");
      console.log(e, e.response);
      console.log("====================================");
      dispatch({ type: LOGIN_FAILED });
      AlertMessage(
        "error",
        "خطـأ",
        "برجاء التاكد من البريد الالكتروني أو كلمة المرور"
      );
    });
};

export const UpdateCLientProfile = (token, email, name, phone, dispatch) => {
  dispatch({ type: Update_Profile_Attemp });
  let config = {
    headers: {
      Authorization: token
    }
  };
  axios
    .post(
      "http://134.209.231.14:5000/api/users/update",
      { email, name, phone },
      config
    )
    .then(e => {
      dispatch({ type: Update_Profile_Success, payload: e.data.user });
      DoToast(localization.yourAccountHasUpdatedSuccessfully);
    })
    .catch(e => {
      dispatch({ type: Update_Profile_Fail, error: e.response });
      DoToast(localization.therIsSomeThingWrong);
    });
};

/**
|--------------------------------------------------
|         auth driver
|--------------------------------------------------
*/

export const RegisterDriver = (
  name,
  email,
  password,
  phone,
  token,
  city,
  vehicalType,
  identity,
  vehicalNum,
  vehicalphotoid,
  vehicalphotofront,
  vehicalphotoback,
  driverphotoid,
  navigation,
  dispatch
) => {
  console.log("==============parameter======================");
  console.log(
    name,
    email,
    password,
    phone,
    token,
    city,
    vehicalType,
    identity,
    vehicalNum
  );
  console.log("=============paramters=======================");
  dispatch({ type: REGISTER_ATTEM });
  return axios
    .post("http://134.209.231.14:5000/api/drivers/register", {
      name,
      email,
      password: password,
      password2: password,
      phone,
      token: token, //
      city: String(city),
      vehicalType, //
      identity, //
      vehicalNum,
      vehicalphotoid,
      vehicalphotofront,
      vehicalphotoback,
      driverphotoid
    })
    .then(res => {
      console.log("=============verified=======================");
      console.log(res.data.driver.verfied);
      console.log("===========verified=========================");
      console.log("=============verified=======================");
      console.log(res.data.driver.verfied);
      console.log("====================================");
      if (!res.data.driver.verfied || res.data.driver.verfied === false) {
        DoToast(localization.YourAccountHasBeenDoneWatingForAdminApproval);
        dispatch({ type: REGISTER_FAIL });
        return;
      }
      dispatch({ type: REGISTER_SUCCESS, payload: res.data.driver, token });
      navigation.navigate("HomeNav");
    })
    .catch(e => {
      let obj = e.response.data;

      DoToast(obj[Object.keys(obj)[0]]);

      dispatch({ type: REGISTER_FAIL });
    });
};
export const LoginDriver = (email, password, token, navigation, dispatch) => {
  dispatch({ type: LOGIN_ATTEMPT });

  return axios
    .post("http://134.209.231.14:5000/api/drivers/login", {
      email,
      password,
      token
    })
    .then(res => {
      console.log("=============verified=======================");
      console.log(res.data.driver.verfied);
      console.log("====================================");
      if (!res.data.driver.verfied || res.data.driver.verfied === false) {
        DoToast(localization.watingForAminApproval);
        dispatch({ type: LOGIN_FAILED, payload: {} });
        return;
      }
      dispatch({ type: LOGIN_SUCCESS, payload: res.data.driver, token });
      navigation.navigate("HomeNav");
    })
    .catch(e => {
      dispatch({ type: LOGIN_FAILED, payload: e });
      DoToast(localization.errorLogin);
    });
};

/**
|--------------------------------------------------
|                       general client and driver
|- -------------------------------------------------
*/
export const logout = (dispatch) => {
  //STORE.dispatch({ type: "changeRoute", paload: "AuthNav" });
  console.log("============logout called========================");

  console.log("====================================");
  return dispatch({type: "logout"});
};

export const ISCIENT = payload => {
  console.log("============is client called========================");
  console.log("====================================");
  return {
    type: "isClient",
    payload
  };
};

export const ToggleDrawer = navigation => {
  console.log("=============ToggleDrawer=======================");
  console.log(navigation);
  console.log("===============ToggleDrawer=====================");
  return { type: "toggle", navigation };
};
