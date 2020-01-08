import {
  AddOrder_Attemp,
  AddOrder_Success,
  AddOrder_Fail
} from "../../types/Customer";

const initialState = {
  loading: false,
  addOrderSuccess: false,
  addOrderFail: false
};
export default (state = initialState, action) => {
  switch (action.type) {
    case AddOrder_Attemp: {
      return { ...state, loading: true };
    }
    case AddOrder_Success: {
      return { ...state, loading: false };
    }
    case AddOrder_Fail: {
      return { ...state, loading: true };
    }
  }
};
