import axios from "axios";
import { baseUrl } from "@config";
import {
  Fetch_SEARCH_PRODUCTS_Attemp,
  Fetch_SEARCH_PRODUCTS_Success,
  Fetch_SEARCH_PRODUCTS_fail,
} from "../types/Customer";

// done
export const SearchProdcts = async (searchText, page, dispatch) => {
  //http://localhost:5000/api/users/get/product/by/discount
  // const token = Store.getState().auth.user.token;
  // console.log("*************** GET SEARCH PRODUCTS ***************");
  // console.log(page, searchText, dispatch);
  // console.log("*************** GET SEARCH PRODUCTS ***************");
  dispatch({type:Fetch_SEARCH_PRODUCTS_Attemp, more:page!=1})
  return await axios
    .get(`${baseUrl}api/user/search/${searchText}?page=${page}`, {
      // headers: { Authorization: token }
    })
    .then(result => {
      console.log("*************** GET SEARCH PRODUCTS ***************");
      console.log(result)
      console.log("*************** GET SEARCH PRODUCTS ***************");
      if(page==result.data.data.search_products.last_page){
        console.log("is end?")
        dispatch({type:Fetch_SEARCH_PRODUCTS_fail, payload:{isEnd:true}})
      }else{
        console.log("is not end?")
        dispatch({type:Fetch_SEARCH_PRODUCTS_Success, payload:{page:page, data:result.data.data.search_products.data}})
      }
      // return result.data.data.search_products;
    })
    .catch(err => {
      console.log("*************** GET SEARCH PRODUCTS ERROR ***************");
      console.log(err)
      console.log("*************** GET SEARCH PRODUCTS ERROR ***************");
      dispatch({type:Fetch_SEARCH_PRODUCTS_fail, payload:{isEnd:false}})
      // return [];
    });
};
