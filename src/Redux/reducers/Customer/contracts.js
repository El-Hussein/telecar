import {
  Fetch_Contracts_IN_Room_Attemp,
  Fetch_Contracts_IN_Room_Success,
  Fetch_Contracts_IN_Room_fail,
  Reset_Contracts_IN_Room
} from "../../types";

const initialState = {
  contracts: {
    loading: false,
    data: [],
    page: 1,
    isEnd: false
  }
};
export default (state = initialState, action) => {
  switch (action.type) {
    case Fetch_Contracts_IN_Room_Attemp: {
      return {
        ...state,
        contracts: { ...state.contracts, loading: true, isEnd: false }
      };
    }
    case Fetch_Contracts_IN_Room_Success: {
      const { page, data } = action.payload;
      let newContractData =
        page === 1 ? data : [...data, ...state.contracts.data];
      return {
        ...state,
        contracts: {
          ...state.contracts,
          loading: false,
          data: newContractData,
          page: page + 1
        }
      };
    }
    case Fetch_Contracts_IN_Room_fail: {
      const { isEnd } = action.payload;
      return {
        ...state,
        contracts: { ...state.contracts, isEnd, loading: false }
      };
    }
    case Reset_Contracts_IN_Room: {
      return initialState;
    }

    default:
      return state;
  }
};
