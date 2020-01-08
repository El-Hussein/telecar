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
  ForgetPasswordFail
} from "../types";

import axios from "axios";

import firebase from "react-native-firebase";
import localization from "../../localization/localization";
import { baseUrl, baseUrl2 } from "@config";
import Store from "../index";
import Axios from "axios";
import {
  Fetch_Orders_Watting_Attem,
  Fetch_Orders_Watting_Success,
  Fetch_Orders_Watting_Fail,
  Fetch_Orders_Running_Attem,
  Fetch_Orders_Finished_Attem,
  Fetch_Orders_Running_Success,
  Fetch_Orders_Finished_Success,
  Fetch_Orders_Running_Fail,
  Fetch_Orders_Finished_Fail,
  Fetch_Counts_Success,
  Fetch_Counts_Fail,
  Fetch_Counts_Attemp,
  Fetch_Orders_Offers_Attem,
  Fetch_Orders_Offers_Success,
  Fetch_Orders_Offers_Fail,
  Fetch_BEST_OFFERS_Attemp,
  Fetch_BEST_OFFERS_Success,
  Fetch_BEST_OFFERS_fail,
  Reset_BEST_OFFERS,
  FetchFAV,
  Fetch_CATEGORY_PRODUCTS_Attemp,
  Fetch_CATEGORY_PRODUCTS_Success,
  Fetch_CATEGORY_PRODUCTS_fail,
  Reset_CATEGORY_PRODUCTS,
} from "../types/Customer";
import { AsyncStorage } from "react-native";
export const GiveRate = async (rate, offer_id) => {
  const AlertMessage = Store.getState().Config.alert;
  const token = Store.getState().auth.user.token;
  return await axios
    .post(
      `${baseUrl}api/users/giverate`,
      { rate, offer_id },
      {
        headers: { Authorization: token }
      }
    )
    .then(res => {
      console.log("====================================");
      console.log(res);
      console.log("====================================");
      AlertMessage("success", "شكرا لك", "تم التقيم بنجاح");
      return;
    })
    .catch(e => {
      console.log("====================================");
      console.log(e);
      console.log("====================================");
      AlertMessage("error", "خطـأ", "ther is some thing wrong");
      return;
    });
};

export const fetchFav = async (dispatch)=>{
  return await AsyncStorage.getItem('favourites').then((favourites)=>{
    JSON.parse(favourites);
    console.log(favourites);
    return dispatch({ type : FetchFAV, payload:favourites});
  })
}
 

// done
export const AddOrder = async (payload, navigationaction) => {
  const AlertMessage = Store.getState().Config.alert;
  const token = Store.getState().auth.user.token;
  return await axios
    .post(`${baseUrl}api/merchants/product/add`, payload, {
      headers: { Authorization: 'Bearer ' + token }
    })
    .then(res => {
      if(res.data.status){
        AlertMessage("success", "", "تم إضافة المنتج بنجاح");
        console.log("ADD PRODUCT RESSULTSSSSSS")
        console.log(res)
        console.log("ADD PRODUCT RESSULTSSSSSS")
        navigationaction();
        return res.data.data.all_products;
      }else{
        AlertMessage("error", "خطأ", "حدث خطأ ما");
        return res.data.errors
      }
    })
    .catch(e => {
      console.log(e, e.response);
      AlertMessage("error", "خطأ", "حدث خطأ ما");
      return e.response;
    });
};

export const getMyOrdersByStatus = async (page, status, dispatch) => {
  const storedPage = await Store.getState().Customer.myOrders.waitting.page;

  switch (status) {
    case 0:
      dispatch({ type: Fetch_Orders_Watting_Attem });
      break;
    case 1:
      dispatch({ type: Fetch_Orders_Running_Attem });
      break;
    case 3:
      dispatch({ type: Fetch_Orders_Finished_Attem });
      break;
    default:
      break;
  }
  const token = Store.getState().auth.user.token;

  Axios.get(baseUrl + "api/users/myorders?status=" + status + "&page=" + page, {
    headers: { Authorization: token }
  })
    .then(res => {
      console.log("==res==================================");
      console.log(page, res);
      console.log("====================================");
      if (res.data.orders && (page === 1 || res.data.orders.length > 0)) {
        switch (status) {
          case 0:
            dispatch({
              type: Fetch_Orders_Watting_Success,
              payload: { page: page, data: res.data.orders }
            });
            break;
          case 1:
            dispatch({
              type: Fetch_Orders_Running_Success,
              payload: { page: page, data: res.data.orders }
            });
            break;
          case 3:
            dispatch({
              type: Fetch_Orders_Finished_Success,
              payload: { page: page, data: res.data.orders }
            });
            break;
          default:
            break;
        }
      } else {
        switch (status) {
          case 0:
            dispatch({
              type: Fetch_Orders_Watting_Fail,
              payload: { isEnd: true }
            });
            break;
          case 1:
            dispatch({
              type: Fetch_Orders_Running_Fail,
              payload: { isEnd: true }
            });
            break;
          case 3:
            dispatch({
              type: Fetch_Orders_Finished_Fail,
              payload: { isEnd: true }
            });

            break;
          default:
            break;
        }
      }
    })
    .catch(err => {
      switch (status) {
        case 0:
          dispatch({
            type: Fetch_Orders_Watting_Fail,
            payload: { isEnd: false }
          });
          break;
        case 1:
          dispatch({
            type: Fetch_Orders_Running_Fail,
            payload: { isEnd: false }
          });
          break;
        case 3:
          dispatch({
            type: Fetch_Orders_Finished_Fail,
            payload: { isEnd: false }
          });

          break;
        default:
          break;
      }
    });
};
export const RemoveMyOrder = async order_id => {
  const AlertMessage = Store.getState().Config.alert;
  const token = Store.getState().auth.user.token;
  return await axios
    .delete(`${baseUrl}api/users/order/${order_id}`, {
      headers: { Authorization: token }
    })
    .then(result => {
      AlertMessage("success", "", "تم إغلاق المعاملة بنجاخ");
    })
    .catch(err => {
      AlertMessage("error", "", "حدث خطأ ما");
    });
};

// done
export const GetBESTOFFERS = async (page, dispatch) => {
  //http://localhost:5000/api/users/get/product/by/discount
  // const token = Store.getState().auth.user.token;
  // console.log("*************** GET BEST OFFERS ***************");
  // console.log(page, dispatch);
  // console.log("*************** GET BEST OFFERS ***************");
  dispatch({type:Fetch_BEST_OFFERS_Attemp, more:page!=1})
  return await axios
  .get(`${baseUrl}api/users/get/product/by/discount?page=${page}`, {
    // headers: { Authorization: token }
    // headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZDk3MjNmY2U2MThlMDAzYTg5MzlkZiIsInBhc3N3b3JkIjoiJDJhJDEwJDh4dXV5bVh5N1owYklzRE8vZ2ZuUU9QTlNVWjZkMnR6MVM0RDZ0S2cvMkUxSzdMMDAvZjJHIiwiaWF0IjoxNTc1Nzk2MjA4fQ.vQKwBMX__1b56L3xjanTYMjs40LPs-wJuc1XfjBJIqY" }
  })
  .then(result => {
    console.log("*************** GET BEST OFFERS ***************");
    console.log(result)
    console.log("*************** GET BEST OFFERS ***************");
      if(page==result.data.data.products.last_page){
        console.log("is end?")
        dispatch({type:Fetch_BEST_OFFERS_fail, payload:{isEnd:true}})
      }else{
        console.log("is not end?")
        dispatch({type:Fetch_BEST_OFFERS_Success, payload:{page:page, data:result.data.data.products.data}})
      }
      // return result.data.data.products;
    })
    .catch(err => {
      console.log("*************** GET BEST OFFERS ERROR ***************");
      console.log(err)
      console.log("*************** GET BEST OFFERS ERROR ***************");
      dispatch({type:Fetch_BEST_OFFERS_fail, payload:{isEnd:false}})
      // return [];
    });
};

// done
export const GetOFFERS = async () => {
  //http://localhost:5000/api/users/get/product/by/discount
  // const token = Store.getState().auth.user.token;
  return await axios
    .get(`${baseUrl}api/users/get/product/by/discount`, {
      // headers: { Authorization: token }
    })
    .then(result => {
      return result.data.data.products;
    })
    .catch(err => {
      return [];
    });
};
 
// done
export const GetNotifications = async () => {
  const userType = Store.getState().Config.userType;
  const type = userType === "Merchant" ? "merchants" : "users";
  const token = Store.getState().auth.user.token;
  return await axios
    .get(`${baseUrl}api/users/get/notifications`, {
    })
    .then(result => {
      console.log(
        `${baseUrl}api/users/get/notifications`,
        "=====notification Result==============================="
      );
      console.log(result);
      console.log("====================================");
      return result.data.data.all_notification;
    })
    .catch(err => {
      return [];
    });
};

// done
export const GetProductsByView = async () => {
  //http://localhost:5000/api/users/get/product/by/discount
  // const token = Store.getState().auth.user.token;
  return await axios
    .get(`${baseUrl}api/users/get/product/by/views`, {
      // headers: { Authorization: token }
    })
    .then(result => {
      return result.data.data.products;
    })
    .catch(err => {
      return [];
    });
};

// done
export const GetProductsByCatId = async (id, page, dispatch) => {
  //http://localhost:5000/api/users/get/product/by/discount
  // const token = Store.getState().auth.user.token;
  // console.log("*************** GET CATEGORY PRODUCTS ***************");
  // console.log(page, id, dispatch);
  // console.log("*************** GET CATEGORY PRODUCTS ***************");
  dispatch({type:Fetch_CATEGORY_PRODUCTS_Attemp, more:page!=1})
  return await axios
    .get(`${baseUrl}api/users/get/product/by/cat/${id}?page=${page}`, {
      // headers: { Authorization: token }
    })
    .then(result => {
      console.log("*************** GET CATEGORY PRODUCTS ***************");
      console.log(result)
      console.log("*************** GET CATEGORY PRODUCTS ***************");
      if(page==result.data.data.products.last_page){
        console.log("is end?")
        dispatch({type:Fetch_CATEGORY_PRODUCTS_fail, payload:{isEnd:true}})
      }else{
        console.log("is not end?")
        dispatch({type:Fetch_CATEGORY_PRODUCTS_Success, payload:{page:page, data:result.data.data.products.data}})
      }
      // return result.data.data.products;
    })
    .catch(err => {
      console.log("*************** GET CATEGORY PRODUCTS ERROR ***************");
      console.log(err)
      console.log("*************** GET CATEGORY PRODUCTS ERROR ***************");
      dispatch({type:Fetch_CATEGORY_PRODUCTS_fail, payload:{isEnd:false}})
      // return [];
    });
};

// error
export const IncreaseProductView = async id => {
  //http://localhost:5000/api/users/get/product/by/discount
  const token = Store.getState().auth.user.token;
  console.log('vieeeeeeeeeeeeew : ' + id);
  return await axios
    .post(
      `${baseUrl}api/users/increase/product/view`,
      {
        id: id
      },
      {
        headers: { Authorization: token }
      }
    )
    .then(result => {
      console.log(result)
      return result.data.data.products;
    })
    .catch(err => {
      console.log(err)
      return [];
    });
};

export const getMyOrdersCount = async dispatch => {
  const token = Store.getState().auth.user.token;
  dispatch({ type: Fetch_Counts_Attemp });
  Axios.get(baseUrl + "api/users/myorderscount", {
    headers: { Authorization: token }
  })
    .then(newConts => {
      console.log("==========cou==========================");
      console.log(newConts);
      console.log("====================================");
      dispatch({ type: Fetch_Counts_Success, payload: newConts.data.counts });
    })
    .catch(err => dispatch({ type: Fetch_Counts_Fail }));
};

export const getOrderOffers = async (order_id, dispatch, page) => {
  dispatch({ type: Fetch_Orders_Offers_Attem, payload: { order_id, page } });
  const token = Store.getState().auth.user.token;
  return await axios
    .post(
      `${baseUrl}api/users/offers?page=${page}`,
      { order_id, page },
      {
        headers: { Authorization: token }
      }
    )
    .then(res => {
      if (res.data.offers.length < 1) {
        dispatch({ type: Fetch_Orders_Offers_Fail, payload: { isEnd: true } });
        return;
      } else
        dispatch({
          type: Fetch_Orders_Offers_Success,
          payload: { data: res.data.offers, page: page }
        });
    })
    .catch(e => {
      dispatch({ type: Fetch_Orders_Offers_Fail, payload: { isEnd: true } });
    });
};

export const userAcceptOffer = async (order_id, provider_id, navigation) => {
  const token = Store.getState().auth.user.token;
  return await axios
    .post(
      `${baseUrl}api/users/acceptorder`,
      { order_id, provider_id },
      {
        headers: { Authorization: token }
      }
    )
    .then(res => {
      navigation.navigate("MyMessages", { item: res.data.result });
      // navigation.navigate("MyHandels", { index: 1 });
    })
    .catch(e => {
      console.log("=========err===========================");
      console.log(e.response);
      console.log("====================================");
      const AlertMessage = Store.getState().Config.alert;
      AlertMessage("error", "خطـأ", e.response.data.error);
    });
};
