import Axios from "axios";
import { baseUrl } from "@config";
import {
  Fetch_Contracts_IN_Room_Attemp,
  Fetch_Contracts_IN_Room_Success,
  Fetch_Contracts_IN_Room_fail
} from "../types";
import Store from "../index";

export const FetchContracts = async (page, dispatch) => {
  //room=order_id
  dispatch({ type: Fetch_Contracts_IN_Room_Attemp });
  const AlertMessage = Store.getState().Config.alert;
  const token = Store.getState().auth.user.token;
  return Axios.get(
    baseUrl +
      "api/users/contracts/" +
      Store.getState().auth.user._id +
      "/" +
      page,
    {
      headers: {
        Authorization: token
      }
    }
  )
    .then(res => {
      if ((res.data.result && res.data.result.length > 1) || page == 1) {
        console.log("==============res=conre=====================");
        console.log(res.data);
        console.log("====================================");
        dispatch({
          type: Fetch_Contracts_IN_Room_Success,
          payload: {
            page: page,
            data: res.data.result
          }
        });
      } else {
        dispatch({
          type: Fetch_Contracts_IN_Room_fail,
          payload: { isEnd: true }
        });
      }
    })
    .catch(err => {
      console.log("====================================");
      console.log(err.response);
      console.log("====================================");
      dispatch({
        type: Fetch_Contracts_IN_Room_fail,
        payload: { isEnd: true }
      });
    });
};
export const SendContract = async (text, texttype, dispatch) => {
  const token = Store.getState().auth.user.token;
  const AlertMessage = Store.getState().Config.alert;
  return Axios.post(
    baseUrl + "api/users/contract",
    { room: Store.getState().auth.user._id, text, texttype },
    {
      headers: {
        Authorization: token
      }
    }
  )
    .then(result => {
      console.log("=======contract=============================");
      console.log(result);
      console.log("====================================");
      FetchContracts(1, dispatch);
      AlertMessage("success", "", "تم الاضافة بنجاح بانتظار مراجعة الادمن");
    })
    .catch(err => {
      console.log("==send Contract Error==================================");
      console.log(err.response.data.error);
      console.log("====================================");
      AlertMessage("error", "خطأ", err.response.data.error);
    });
};
