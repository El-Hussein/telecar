import { combineReducers } from "redux";

import { persistCombineReducers } from "redux-persist";
import storage from "redux-persist/es/storage";
const config = {
  key: "root",
  storage,
  // blacklist: ["netInfo", "AddService", "updateProfile", "contactUs"]
  // whitelist: ["auth", "Config"]
  whitelist: ["auth"]
};

import AuthReducer from "./AuthReducer";
import AddService from "./Customer/addService";
import Customer from "./Customer";
import Config from "./Config";
import Chat from "./Chat";
import netInfo from "./netinfo";
import updateProfile from "./updateProilfe";
import provider from "./providers";
import navigation from "./navigation";
import contracts from "./Customer/contracts";
import FAV from "./Customer/favourite";
import contactUs from "./contactUs";
import product from "./Customer/product";
import search from "./Customer/search";
export default persistCombineReducers(config, {
  auth: AuthReducer,
  AddService,
  Config,
  Customer,
  Contracts: contracts,
  Chat,
  netInfo,
  updateProfile,
  provider,
  navigation,
  contactUs,
  FAV,
  product,
  search,
});
