import {
  GetProviderCountAttemp,
  GetProviderCountSuccess,
  GetProviderCountFail,
  PorviderGetOrdersByStatusAttemp,
  PorviderGetOrdersByStatusSuccess,
  PorviderGetOrdersByStatusFail,
  GetOpenOrdersAttemp,
  GetOpenOrderSuccess,
  GetOpenOrdersFail,
  GetProviderServiceAttemp,
  GetProviderServiceSuccess,
  GetProviderServiceFail
} from "../../types/porvider/index";
import { ActionSheet } from "native-base";
import { Reset_Provider_Order } from "../../types";
const initialState = {
  counts: {
    Finished: 0,
    Messages: 0,
    Running: 0,
    openOrders: 0
  },
  countsLodaing: false,
  status1: {
    loading: false,
    data: [],
    page: 1,
    isEnd: false
  },
  status3: {
    loading: false,
    data: [],
    page: 1,
    isEnd: false
  },
  openOrders: {
    loading: false,
    data: [],
    page: 1,
    isEnd: false
  },
  myservices: {
    loading: false,
    services: []
  }
};

export default (
  state = initialState,
  { type, payload, status = 1, page = 1, paginate = false }
) => {
  switch (type) {
    case GetProviderCountAttemp:
      return { ...state, countsLodaing: true };
    case GetProviderCountSuccess:
      return { ...state, countsLodaing: false, counts: payload };
    case GetProviderCountFail:
      return { ...state, countsLodaing: false };
    case PorviderGetOrdersByStatusAttemp:
      return {
        ...state,
        status1:
          status === 1
            ? {
                loading: true,
                data: paginate ? state.status1.data : [],
                page: 1,
                isEnd: false
              }
            : state.status1,
        status3:
          status === 3
            ? {
                loading: true,
                data: paginate ? state.status3.data : [],
                page: 1,
                isEnd: false
              }
            : state.status3
      };
    case PorviderGetOrdersByStatusSuccess:
      return {
        ...state,
        status1:
          status === 1
            ? {
                isEnd:
                  paginate && payload.length === state.status1.data.length
                    ? true
                    : false,
                loading: false,
                data:
                  paginate && payload.length === state.status1.data.length
                    ? payload
                    : paginate
                    ? [...state.status1.data, ...payload]
                    : payload,
                page
              }
            : state.status1,
        status3:
          status === 3
            ? {
                isEnd:
                  paginate && payload.length === state.status3.data.length
                    ? true
                    : false,
                loading: false,
                data:
                  paginate && payload.length === state.status3.data.length
                    ? payload
                    : paginate
                    ? [...state.status3.data, ...payload]
                    : payload,
                page
              }
            : state.status3
      };
    case PorviderGetOrdersByStatusFail:
      return {
        ...state,
        status1:
          status === 1
            ? {
                loading: false,
                data: [],
                page: 1,
                isEnd: false
              }
            : state.status1,
        status3:
          status === 3
            ? {
                loading: false,
                data: [],
                page: 1,
                isEnd: false
              }
            : state.status3
      };
    case GetOpenOrdersAttemp:
      return {
        ...state,
        openOrders: {
          ...state.openOrders,
          loading: page === 1 ? true : false,
          data: page === 1 ? [] : state.openOrders.data,
          page
        }
      };
    case GetOpenOrderSuccess:
      console.log("======payload==============================");
      console.log(payload);
      console.log("====================================");
      return {
        ...state,
        openOrders: {
          loading: false,
          data:
            payload === []
              ? state.openOrders.data
              : page === 1
              ? payload
              : [...state.openOrders.data, ...payload],
          page,
          isEnd: payload === [] ? true : false
        }
      };
    case GetOpenOrdersFail:
      return {
        ...state,
        openOrders: {
          ...state.openOrders,
          loading: false
        }
      };

    case GetProviderServiceAttemp:
      return { ...state, myservices: { ...state.myservices, loading: true } };
    case GetProviderServiceSuccess:
      return { ...state, myservices: { services: payload, loading: false } };
    case GetProviderServiceFail:
      return { ...state, myservices: { ...state.myservices, loading: false } };
    case Reset_Provider_Order:
      return {
        ...state,
        counts: { ...initialState.counts },
        countsLodaing: { ...initialState.countsLodaing },
        openOrders: { ...initialState.openOrders }
      };
    default:
      return state;
  }
};
