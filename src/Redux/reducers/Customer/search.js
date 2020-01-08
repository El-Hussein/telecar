import {
    Fetch_SEARCH_PRODUCTS_Attemp,
    Fetch_SEARCH_PRODUCTS_Success,
    Fetch_SEARCH_PRODUCTS_fail,
    Reset_SEARCH_PRODUCTS,
  } from "../../types/Customer";
  
  const initialState = {    
    searchProducts: {
      loading: false,
      loadMoreLoading: false,
      data: [],
      page: 1,
      isEnd: false
    }
  };

  export default (state = initialState, action) => {
    switch (action.type) {
      case Fetch_SEARCH_PRODUCTS_Attemp: {
        return {
          ...state,
          searchProducts: { ...state.searchProducts, loading: action.more?false:true, loadMoreLoading:action.more?true:false, isEnd: false }
        };
      }
      case Fetch_SEARCH_PRODUCTS_Success: {
        const { page, data } = action.payload;
        let newContractData =
          page === 1 ? data : [...state.searchProducts.data, ...data];
        return {
          ...state,
          searchProducts: {
            ...state.searchProducts,
            loading: false,
            loadMoreLoading:false,
            data: newContractData,
            page: page + 1
          }
        };
      }
      case Fetch_SEARCH_PRODUCTS_fail: {
        const { isEnd } = action.payload;
        return {
          ...state,
          searchProducts: { ...state.searchProducts, isEnd, loadMoreLoading:false, loading: false }
        };
      }
      case Reset_SEARCH_PRODUCTS: {
        return initialState;
      }
  
      default:
        return state;
    }
  };
  