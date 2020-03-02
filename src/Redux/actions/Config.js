import {
  Fetch_Cities,
  Fetch_About,
  Fetch_Privicy,
  Fetch_Services,
  Fetch_Services_Types,
  Fetch_Strips,
  Fetch_CitiesLoading,
  Fetch_CitiesFail,
  Fetch_ServicesLoading,
  Fetch_Services_TypesLoading,
  Fetch_ServicesFail,
  Fetch_Services_TypesFail,
  Fetch_Categories,
} from "../types";
import Axios from "axios";
import { baseUrl } from "@config";
import store from "../../Redux";
import { AsyncStorage } from "react-native";
import { FetchFAV } from "../types/Customer";
export const GetAppInitials = async () => {
  console.log("APP INITIALS >...........................")
  store.dispatch({ type: Fetch_CitiesLoading });  

  // Axios.get(baseUrl + "api/general/get/about").then(res => {
  //   store.dispatch({ type: Fetch_About, payload: res.data.data });
  // });

  // Axios.get(baseUrl + "api/general/get/terms").then(res => {
  //   store.dispatch({ type: Fetch_Privicy, payload: res.data.data });
  // });
  Axios.get(baseUrl + "api/admin/cats/get", {
    headers:{
      "Accept":"application/json",
    }
  }).then(res => {
    console.log("cat cat cat cat cat cat cat cat cat cat")
    console.log(res.data.data.categories)
    console.log("cat cat cat cat cat cat cat cat cat cat")
    store.dispatch({ type: Fetch_Categories, payload: res.data.data.categories });
  }).catch((er)=>{
    console.log("cat cat cat cat cat cat cat cat cat cat")
    console.log(er);
    console.log("cat cat cat cat cat cat cat cat cat cat")
  });

  AsyncStorage.getItem('favourite').then((favourites)=>{
    favourites = JSON.parse(favourites);
    console.log("------------FAVOURITES---------------")
    console.log(favourites);
    console.log("------------FAVOURITES---------------")
    store.dispatch({ type : FetchFAV, payload:favourites?favourites.fav:[]});
  })

};
export const FetchCities = async () => {
  store.dispatch({ type: Fetch_CitiesLoading });
  Axios.get(baseUrl + "api/admin/cities")
    .then(res => {
      store.dispatch({ type: Fetch_Cities, payload: res.data.cities });
    })
    .catch(e => {
      store.dispatch({ type: Fetch_CitiesFail });
    });
};
