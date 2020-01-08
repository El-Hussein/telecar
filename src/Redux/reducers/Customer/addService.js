import {
  addService_City,
  addService_Sector,
  addService_Employer,
  addService_Address,
  addService_PriceFrom,
  addService_PriceTo,
  addService_Details,
  addService_Files
} from "../../types/Customer";

const InitialState = {
  city: null,
  sector: null,
  employer: null,
  address: null,
  priceFrom: null,
  priceTo: null,
  details: null,
  files: []
};
export default (state = InitialState, action) => {
  const payload = action.payload;
  console.log("============payload========================");
  console.log(payload);
  console.log("====================================");
  switch (action.type) {
    case addService_City:
      return {
        ...state,
        city: payload
      };
    case addService_Sector:
      return {
        ...state,
        sector: payload
      };
    case addService_Employer:
      return {
        ...state,
        employer: payload
      };
    case addService_Address:
      return {
        ...state,
        address: payload
      };
    case addService_PriceFrom:
      return {
        ...state,
        priceFrom: payload
      };
    case addService_PriceTo:
      return {
        ...state,
        priceTo: payload
      };
    case addService_Details:
      return {
        ...state,
        details: payload
      };
    case addService_Files:
      return {
        ...state,
        files: state.files.push[payload]
      };
    default:
      return state;
  }
};
