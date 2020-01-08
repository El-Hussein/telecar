import {
  DribversOnlinegAttemp,
  DriverOnlineFail,
  DriverOnlineSuccess,
  DriverMakeOfferAttemp,
  DriverMakeOfferFail,
  DriverMakeOfferSuccess,
  DriverOrderCompletedAttemp,
  DriverOrdersCompltetedFail,
  DriverOrdersCompletedSUccess,
  GetMyOrdersAttemp,
  GetMyOrdersSuccess,
  GetMyOrdersFail,
  GetOpenOrdersAttemp,
  GetOpenOrderSuccess,
  GetOpenOrdersFail,
  GetProviderCountAttemp,
  GetProviderCountSuccess,
  GetProviderCountFail,
  PorviderGetOrdersByStatusAttemp,
  PorviderGetOrdersByStatusSuccess,
  PorviderGetOrdersByStatusFail
} from "../../types/porvider";

import axios from "axios";
import { baseUrl } from "@config";

import Store from "../../index";
import {
  Fetch_Orders_Watting_Attem,
  Fetch_Orders_Running_Attem,
  Fetch_Orders_Finished_Attem,
  Fetch_Orders_Watting_Success,
  Fetch_Orders_Running_Success,
  Fetch_Orders_Finished_Success,
  Fetch_Orders_Watting_Fail,
  Fetch_Orders_Running_Fail,
  Fetch_Orders_Finished_Fail
} from "../../types/Customer";
import Axios from "axios";
import localization from "../../../localization/localization";

// done
export const getMyOrdersCount = async dispatch => {
  const token = Store.getState().auth.user.token;
  dispatch({ type: GetProviderCountAttemp });
  axios
    .get(baseUrl + "api/merchants/counts/get", {
      headers: { Authorization:'Bearer ' + token }
    })
    .then(newConts => {
      dispatch({
        type: GetProviderCountSuccess,
        payload: newConts.data.counts
      });
    })
    .catch(err => dispatch({ type: GetProviderCountFail }));
};

// cancelled
export const driverOnlineAction = async (dispatch, token, status) => {
  dispatch({ type: DribversOnlinegAttemp });
  let config = {
    headers: {
      Authorization:'Bearer ' + token
    }
  };
  return await axios
    .post(
      `${baseUrl}api/providers/online`,
      {
        status
      },
      config
    )
    .then(res => {
      dispatch({
        type: DriverOnlineSuccess,
        paload: res.data
      });
    })
    .catch(e => {
      dispatch({ type: DriverOnlineFail });
      AlertMessage("error", "خطـأ", "هناك خطا ما");
    });
};

// done
export const GetOpenOrders = async (dispatch, page) => {
  const token = Store.getState().auth.user.token;
  const AlertMessage = Store.getState().Config.alert;

  dispatch({ type: GetOpenOrdersAttemp, page });
  let config = {
    headers: {
      Authorization:'Bearer ' + token
    }
  };
  return await axios
    .get(
      `${baseUrl}api/providers/open-orders/${page}`,

      config
    )
    .then(res => {
      console.log("=======open orders=============================");
      console.log(page, res.data);
      console.log("==================open order==================");
      dispatch({
        type: GetOpenOrderSuccess,
        payload: res.data.result,
        page
      });
    })
    .catch(e => {
      dispatch({ type: GetOpenOrdersFail, page });
      AlertMessage("error", "خطـأ", "هناك خطا ما");
    });
};

// 
export const driverMakeOrderAction = async (
  dispatch,
  token,
  introduction,
  time,
  price,
  order_id
) => {
  dispatch({ type: GetMyOrdersAttemp });
  let config = {
    headers: {
      Authorization:'Bearer ' + token
    }
  };
  return await axios
    .post(
      `${baseUrl}api/providers/makeoffer`,
      {
        introduction,
        time,
        price,
        order_id
      },
      config
    )
    .then(res => {
      dispatch({
        type: GetMyOrdersSuccess,
        paload: res.data
      });
    })
    .catch(e => {
      dispatch({ type: GetMyOrdersFail });
      AlertMessage("error", "خطـأ", "هناك خطا ما");
    });
};
/////////////////////////////////////////////////////////////////////////////////////////////////
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

  axios
    .get(
      baseUrl + "api/providers/myorders?status=" + status + "&page=" + page,
      {
        headers: { Authorization:'Bearer ' + token }
      }
    )
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

export const getMyService = async dispatch => {
  const token = Store.getState().auth.user.token;

  return await Axios.get(baseUrl + "api/providers/myServices", {
    headers: { Authorization:'Bearer ' + token }
  })
    .then(result => {
      return result.data.result;
    })
    .catch(e => {
      return [];
    });
};
/////////////////////////////////////////////////////////////////////////////////
export const DeleteMyService = async serviceId => {
  const token = Store.getState().auth.user.token;
  const AlertMessage = Store.getState().Config.alert;
  return await Axios.delete(baseUrl + "api/providers/service/" + serviceId, {
    headers: { Authorization:'Bearer ' + token }
  })
    .then(result => {
      AlertMessage("success", "", "تم حذف الخدمة ");
      return result.data.result;
    })
    .catch(e => {
      AlertMessage("error", "خطـأ", "هناك خطا ما");
      return null;
    });
};



export const AddMyService = async serviceId => {
  const token = Store.getState().auth.user.token;
  const AlertMessage = Store.getState().Config.alert;
  return await Axios.put(baseUrl + "api/providers/service/" + serviceId, null, {
    headers: { Authorization:'Bearer ' + token }
  })
    .then(result => {
      AlertMessage("success", "", "تم إضافة الخدمة بنجاح");
      return result.data.result;
    })
    .catch(e => {
      console.log("=error===================================");
      console.log(e.response);
      console.log("====================================");
      AlertMessage("error", "خطـأ", "هناك خطا ما");
      return null;
    });
};
////////////////////////////////////////////////////////////////////////////
export const driverGetOrders = async (
  dispatch,
  page,
  status,
  paginate = false
) => {
  const token = Store.getState().auth.user.token;
  dispatch({ type: PorviderGetOrdersByStatusAttemp, status, paginate });
  let config = {
    headers: {
      Authorization:'Bearer ' + token
    }
  };
  return await axios
    .get(
      `${baseUrl}api/providers/myorders?page=${page}&status=${status}`,

      config
    )
    .then(res => {
      dispatch({
        type: PorviderGetOrdersByStatusSuccess,
        payload: res.data.orders,
        status,
        page,
        paginate
      });
    })
    .catch(e => {
      dispatch({ type: PorviderGetOrdersByStatusFail });
      AlertMessage("error", "خطـأ", "هناك خطا ما");
    });
};

export const getBanksInfo = async () => {
  const token = Store.getState().auth.user.token;
  const AlertMessage = Store.getState().Config.alert;
  return await Axios.get(baseUrl + "api/providers/bank", {
    headers: { Authorization:'Bearer ' + token }
  })
    .then(result => {
      return result.data.result;
    })
    .catch(e => {
      console.log("=error===================================");
      console.log(e.response);
      console.log("====================================");
      AlertMessage("error", "خطـأ", "هناك خطا ما");
      return null;
    });
};
//////////////////////////////////////////////////////////////////////////////////////////////////////
export const UpadteBanks = async (payload, dispatch) => {
  const token = Store.getState().auth.user.token;
  const AlertMessage = Store.getState().Config.alert;
  if (!payload.bankAccount || !payload.bankName) {
    AlertMessage("warn", "", "يجب مليء جميع الحقول");
    return;
  }
  return await Axios.put(baseUrl + "api/providers/bank", payload, {
    headers: { Authorization:'Bearer '+ token }
  })
    .then(result => {
      AlertMessage("success", "", "تم  تحديث الحساب البنكي بنجاح");
      return result.data.result;
    })
    .catch(e => {
      console.log("=error===================================");
      console.log(e.response);
      console.log("====================================");
      AlertMessage("error", "خطـأ", "هناك خطا ما");
      return null;
    });
};

export const driverOrderCompletedSuccessAction = async (
  dispatch,
  token,
  offer_id
) => {
  dispatch({ type: DriverOrderCompletedAttemp });
  let config = {
    headers: {
      Authorization: token
    }
  };
  return await axios
    .post(
      `${baseUrl}api/providers/ordercompletedsuccess`,
      {
        offer_id
      },
      config
    )
    .then(res => {
      dispatch({
        type: DriverOrdersCompletedSUccess,
        paload: res.data
      });
    })
    .catch(e => {
      dispatch({ type: DriverOrdersCompltetedFail });
      AlertMessage("error", "خطـأ", "هناك خطا ما");
    });
};

// done
export const getMyProducts = async (page, status, dispatch) => {
  const token = Store.getState().auth.user.token;

  return await axios
    .get(baseUrl + "api/merchants/product/get", {
      headers: { Authorization: 'Bearer ' + token }
    })
    .then(res => {
      return res.data.data.products.data;
    })
    .catch(err => {
      return [];
    });
};

// done
export const deletProduct = async id => {
  const token = Store.getState().auth.user.token;
  const AlertMessage = Store.getState().Config.alert;
  console.log(id + ' hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh')
  return await axios
    .post(
      baseUrl + "api/merchants/product/delete",
      { id:id },
      {
        headers: { Authorization: 'Bearer ' + token }
      }
    )
    .then(res => {
      console.log(res)
      AlertMessage("success", "", localization.deletedSuccess);
      return true;
    })
    .catch(err => {
      AlertMessage("success", "", localization.someThingWentWrong);
      return false;
    });
};
