import Axios from "axios";
import { baseUrl } from "@config";
import {
  Fetch_Chat_IN_Room_Attemp,
  Fetch_Chat_IN_Room_Success,
  Fetch_CHat_IN_Room_fail,
  Fetch_Chat_Rooms_Attemp,
  Fetch_Chat_Rooms_Success,
  Fetch_CHat_Rooms_fail,
  Fetch_Order_detail_Attemp,
  Fetch_Order_detail_Success,
  Fetch_Order_detail_Fail
} from "../types";
import Store from "../index";

export const FetchRoomChat = async (room, page, dispatch) => {
  //room=order_id
  dispatch({ type: Fetch_Chat_IN_Room_Attemp, payload: room });
  const AlertMessage = Store.getState().Config.alert;
  const token = Store.getState().auth.user.token;
  return Axios.post(
    baseUrl + "api/chat/room",
    { room, page },
    {
      headers: {
        Authorization: token
      }
    }
  )
    .then(res => {
      if ((res.data.result && res.data.result.length > 1) || page == 1) {
        dispatch({
          type: Fetch_Chat_IN_Room_Success,
          payload: {
            page: page,
            data: res.data.result
            // order: res.data.info
          }
        });
      } else {
        dispatch({ type: Fetch_CHat_IN_Room_fail, payload: { isEnd: true } });
      }
    })
    .catch(err => {
      console.log("====================================");
      console.log(err);
      console.log("====================================");
      dispatch({ type: Fetch_CHat_IN_Room_fail, payload: { isEnd: false } });
    });
};
export const FetchAllChat = async (page, dispatch) => {
  return;
  dispatch({ type: Fetch_Chat_Rooms_Attemp });
  const AlertMessage = Store.getState().Config.alert;
  const token = Store.getState().auth.user.token;
  return Axios.post(
    baseUrl + "api/chat",
    { page },
    {
      headers: {
        Authorization: token
      }
    }
  )
    .then(res => {
      if ((res.data.result && res.data.result.length > 1) || page == 1) {
        dispatch({
          type: Fetch_Chat_Rooms_Success,
          payload: {
            page: page,
            data: res.data.result
          }
        });
      } else {
        dispatch({ type: Fetch_CHat_Rooms_fail, payload: { isEnd: true } });
      }
    })
    .catch(err => {
      console.log("====================================");
      console.log(err);
      console.log("====================================");
      dispatch({ type: Fetch_CHat_Rooms_fail, payload: { isEnd: false } });
    });
};

export const SendMessage = async (
  room,
  text,
  texttype,
  isProblem,
  io,
  dispatch
) => {
  const token = Store.getState().auth.user.token;
  io.emit("send", {
    token,
    text,
    texttype,
    isProblem
  });
};
export const getOrderDetails = async (order_id, dispatch) => {
  dispatch({ type: Fetch_Order_detail_Attemp });
  const token = Store.getState().auth.user.token;

  Axios.get(`${baseUrl}api/order/${order_id}`, {
    Authorization: token
  })
    .then(result => {
      if (result) {
        dispatch({
          type: Fetch_Order_detail_Success,
          payload: result.data.result
        });
      }
    })
    .catch(err => {
      dispatch({ type: Fetch_Order_detail_Fail, payload: result.data.result });
    });
};
export const orderCompleted = async offer_id => {
  const AlertMessage = Store.getState().Config.alert;
  const token = Store.getState().auth.user.token;
  return Axios.post(
    baseUrl + "api/ordercomplete",
    { offer_id },
    {
      headers: { Authorization: token }
    }
  )
    .then(res => {
      AlertMessage("success", "تم إعتماد الطلب", res.data.success);
      return;
    })
    .catch(err => {
      console.log("===========error=========================");
      console.log(err.response);
      console.log("====================================");
      AlertMessage("error", "خطـأ", "حدث خطأ ما");
      return;
    });
};
