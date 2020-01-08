import {
  Fetch_Orders_Running_Attem,
  Fetch_Orders_Running_Success,
  Fetch_Orders_Running_Fail,
  Fetch_Orders_Watting_Attem,
  Fetch_Orders_Watting_Success,
  Fetch_Orders_Watting_Fail,
  Fetch_Orders_Finished_Attem,
  Fetch_Orders_Finished_Success,
  Fetch_Counts_Attemp,
  Fetch_Counts_Success,
  Fetch_Orders_Offers_Attem,
  Fetch_Orders_Offers_Success,
  Fetch_Orders_Finished_Fail,
  Fetch_Orders_Offers_Fail
} from "../../types/Customer";
import { Reset_Customer_Order } from "../../types";

const initialState = {
  myOrders: {
    waitting: {
      loading: false,
      page: 1,
      orders: [],
      isEnd: false
    },
    Running: {
      loading: false,
      page: 1,
      orders: [],
      isEnd: false
    },
    Finished: {
      loading: false,
      page: 1,
      orders: [],
      isEnd: false
    }
  },
  counts: {
    loading: false,
    values: {
      Waitting: 0,
      Finished: 0,
      Running: 0
    }
  },
  Offers: {
    loading: false,
    data: [],
    page: 1,
    isEnd: false
  },
  addOrderSuccess: false,
  addOrderFail: false
};
export default (state = initialState, action) => {
  switch (action.type) {
    ////////////////Waitting/////////////////////////
    case Fetch_Orders_Watting_Attem: {
      return {
        ...state,
        myOrders: {
          ...state.myOrders,
          waitting: { ...state.myOrders.waitting, loading: true }
        }
      };
    }
    case Fetch_Orders_Watting_Success: {
      let newOrders =
        action.payload.page > 1
          ? [...state.myOrders.waitting.orders, ...action.payload.data]
          : action.payload.data;
      return {
        ...state,
        myOrders: {
          ...state.myOrders,
          waitting: {
            orders: newOrders,
            page: action.payload.page + 1,
            loading: false
          }
        }
      };
    }
    case Fetch_Orders_Watting_Fail: {
      return {
        ...state,
        myOrders: {
          ...state.myOrders,
          waitting: {
            ...state.myOrders.waitting,
            loading: false,
            isEnd: action.payload.isEnd
          }
        }
      };
    }
    /////////////////Running////////////////////////
    case Fetch_Orders_Running_Attem: {
      return {
        ...state,
        myOrders: {
          ...state.myOrders,
          Running: { ...state.myOrders.Running, loading: true }
        }
      };
    }
    case Fetch_Orders_Running_Success: {
      let newOrders =
        action.payload.page > 1
          ? [...state.myOrders.Running.orders, ...action.payload.data]
          : action.payload.data;
      return {
        ...state,
        myOrders: {
          ...state.myOrders,
          Running: {
            orders: newOrders,
            page: action.payload.page + 1,
            loading: false
          }
        }
      };
    }
    case Fetch_Orders_Running_Fail: {
      return {
        ...state,
        myOrders: {
          ...state.myOrders,
          Running: {
            ...state.myOrders.Running,
            loading: false,
            isEnd: action.payload.isEnd
          }
        }
      };
    }
    ////////////////Finished /////////////////////////
    case Fetch_Orders_Finished_Attem: {
      return {
        ...state,
        myOrders: {
          ...state.myOrders,
          Finished: { ...state.myOrders.Finished, loading: true }
        }
      };
    }
    case Fetch_Orders_Finished_Success: {
      let newOrders =
        action.payload.page > 1
          ? [...state.myOrders.Finished.orders, ...action.payload.data]
          : action.payload.data;
      return {
        ...state,
        myOrders: {
          ...state.myOrders,
          Finished: {
            orders: newOrders,
            page: action.payload.page + 1,
            loading: false
          }
        }
      };
    }
    case Fetch_Orders_Finished_Fail: {
      return {
        ...state,
        myOrders: {
          ...state.myOrders,
          Finished: {
            ...state.myOrders.Finished,
            loading: false,
            isEnd: action.payload.isEnd
          }
        }
      };
    }
    case Fetch_Counts_Attemp: {
      return { ...state, counts: { ...state.counts, loading: true } };
    }
    case Fetch_Counts_Success: {
      return {
        ...state,
        counts: { ...state.counts, values: action.payload, loading: false }
      };
    }
    case Fetch_Counts_Attemp: {
      return { ...state, counts: { ...state.counts, loading: false } };
    }
    case Fetch_Orders_Offers_Attem: {
      let Data = state.Offers.data;
      if (action.payload.page === 1) {
        Data = [];
      }
      return {
        ...state,
        Offers: { ...state.Offers, data: Data, loading: action.payload }
      };
    }
    case Fetch_Orders_Offers_Success: {
      const newData =
        action.payload.page === 1
          ? action.payload.data
          : [state.Offers.data, ...action.payload.data];
      return {
        ...state,
        Offers: {
          ...state.Offers,
          loading: false,
          data: newData,
          page: action.payload.page + 1
        }
      };
    }
    case Fetch_Orders_Offers_Fail: {
      console.log("================offe D====================");
      console.log(state.Offers.data);
      console.log("====================================");
      return {
        ...state,
        Offers: { ...state.Offers, loading: false, isEnd: action.payload.isEnd }
      };
    }
    case Reset_Customer_Order:
      return initialState;
    default: {
      return state;
    }
  }
};
