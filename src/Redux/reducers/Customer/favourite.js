import { ADDTOFAV, RemoveFromFAV, ToggleFav, FetchFAV } from "../../types/Customer";
import {AsyncStorage} from 'react-native';
const initialState = {
  fav: []
};
export default (state = initialState, action) => {
  switch (action.type) {
    case FetchFAV:{
        console.log("----------FAVOURITE FROM REDUCER---------------")
        console.log(action.payload)
        console.log("----------FAVOURITE FROM REDUCER---------------")
        return{
          fav: action.payload,
        }
    }
    case ToggleFav: {
      let isExist = state.fav.indexOf(action.payload) > -1;
      console.log("ACTION PAYLOAAAAAAAAAD " + JSON.stringify(action.payload))
      let newState = {};
      if (isExist) {
         newState = { ...state, fav: state.fav.filter(e => e !== action.payload) };
      } else {
        newState = { ...state, fav: [...state.fav, action.payload] };
      }
      AsyncStorage.setItem('favourite', JSON.stringify(newState));
      return newState;
    }
    default:
      return state;
  }
};
