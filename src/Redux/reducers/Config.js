import {
  Fetch_Cities,
  Fetch_About,
  Fetch_Privicy,
  Fetch_Services,
  Fetch_Services_Types,
  Fetch_Strips,
  Fetch_CitiesLoading,
  Fetch_ServicesLoading,
  Fetch_Services_TypesLoading,
  Fetch_StripsLoading,
  Fetch_CitiesFail,
  Fetch_Services_TypesFail,
  Fetch_ServicesFail,
  Fetch_Categories
} from "../types";
const CitesDump = [
  { id: 0, name: "ابوظبي" },
  { id: 1, name: "عجمان" },
  { id: 2, name: "الفجيرة" },
  { id: 3, name: "الشارقة" },
  { id: 4, name: "دبي" },
  { id: 5, name: "رأس الخيمه" },
  { id: 6, name: "ام القيوين" }
];
const initialstate = {
  alert: null,
  userType: "Customer",
  about: null,
  privicy: null,
  services: [],
  servicesTypes: [],
  cities: CitesDump,
  strips: [],
  citiesLoading: false,
  stripsLoading: false,
  servicesLoading: false,
  servicesTypesLoading: false,
  lang: "en",
  categories: []
};
export default (state = initialstate, action) => {
  switch (action.type) {
    case "changelang": {
      return {
        ...state,
        lang: action.payload
      };
    }
    case "alert": {
      return { ...state, alert: action.payload };
    }
    case "changeType": {
      return { ...state, userType: action.payload };
    }
    case Fetch_CitiesLoading: {
      return { ...state, citiesLoading: true };
    }
    case Fetch_Services_TypesLoading: {
      return { ...state, servicesTypesLoading: true };
    }
    case Fetch_ServicesLoading: {
      return { ...state, servicesLoading: true };
    }
    case Fetch_Services_TypesFail: {
      return { ...state, servicesTypesLoading: false };
    }
    case Fetch_ServicesFail: {
      return { ...state, servicesLoading: false };
    }

    case Fetch_CitiesFail: {
      return { ...state, citiesLoading: false };
    }
    case Fetch_StripsLoading: {
      return { ...state, stripsLoading: true };
    }

    case Fetch_Cities: {
      return { ...state, cities: CitesDump, citiesLoading: false };
    }
    case Fetch_About: {
      return { ...state, about: action.payload };
    }
    case Fetch_Privicy: {
      return { ...state, privicy: action.payload };
    }
    case Fetch_Services: {
      return { ...state, services: action.payload, servicesLoading: false };
    }
    case Fetch_Services_Types: {
      return {
        ...state,
        servicesTypes: action.payload,
        servicesTypesLoading: false
      };
    }
    case Fetch_Categories: {
      console.log("fetch categoties ")
      console.log(action.payload)
      return { ...state, categories: action.payload };
    }
    case Fetch_Strips: {
      return { ...state, strips: action.payload };
    }
    default: {
      return state;
    }
  }
};
