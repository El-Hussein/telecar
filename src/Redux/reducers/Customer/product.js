import {
    Fetch_BEST_OFFERS_Attemp,
    Fetch_BEST_OFFERS_Success,
    Fetch_BEST_OFFERS_fail,
    Reset_BEST_OFFERS,

    Fetch_CATEGORY_PRODUCTS_Attemp,
    Fetch_CATEGORY_PRODUCTS_Success,
    Fetch_CATEGORY_PRODUCTS_fail,
    Reset_CATEGORY_PRODUCTS,
  } from "../../types/Customer";
  
  const initialState = {
    bestOffers: {
      loading: false,
      loadMoreLoading: false,
      data: [],
      page: 1,
      isEnd: false
    },
    
    categoryProducts: {
      loading: false,
      loadMoreLoading: false,
      data: [],
      page: 1,
      isEnd: false
    }
  };

  export default (state = initialState, action) => {
    switch (action.type) {
      case Fetch_BEST_OFFERS_Attemp: {
        return {
          ...state,
          bestOffers: { ...state.bestOffers, loading: action.more?false:true, loadMoreLoading:action.more?true:false, isEnd: false }
        };
      }
      case Fetch_BEST_OFFERS_Success: {
        const { page, data } = action.payload;
        let newContractData =
          page === 1 ? data : [...state.bestOffers.data, ...data];
        return {
          ...state,
          bestOffers: {
            ...state.bestOffers,
            loading: false,
            loadMoreLoading:false,
            data: newContractData,
            page: page + 1
          }
        };
      }
      case Fetch_BEST_OFFERS_fail: {
        const { isEnd } = action.payload;
        return {
          ...state,
          bestOffers: { ...state.bestOffers, isEnd, loadMoreLoading:false, loading: false }
        };
      }
      case Reset_BEST_OFFERS: {
        return initialState;
      }


      case Fetch_CATEGORY_PRODUCTS_Attemp: {
        return {
          ...state,
          categoryProducts: { ...state.categoryProducts, loading: action.more?false:true, loadMoreLoading:action.more?true:false, isEnd: false }
        };
      }
      case Fetch_CATEGORY_PRODUCTS_Success: {
        const { page, data } = action.payload;
        let newContractData =
          page === 1 ? data : [...state.categoryProducts.data, ...data];
        return {
          ...state,
          categoryProducts: {
            ...state.categoryProducts,
            loading: false,
            loadMoreLoading:false,
            data: newContractData,
            page: page + 1
          }
        };
      }
      case Fetch_CATEGORY_PRODUCTS_fail: {
        const { isEnd } = action.payload;
        return {
          ...state,
          categoryProducts: { ...state.categoryProducts, isEnd, loadMoreLoading:false, loading: false }
        };
      }
      case Reset_CATEGORY_PRODUCTS: {
        return initialState;
      }
  
      default:
        return state;
    }
  };
  