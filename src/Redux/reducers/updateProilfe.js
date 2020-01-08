import {
  Update_Profile_Attemp,
  Update_Profile_Success,
  Update_Profile_Fail
} from "../types";

const initialState = {
  loading: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    // case Update_Profile_Attemp:
    //   return { ...state, loading: true };
    // case Update_Profile_Success:
    //   return initialState;
    // case Update_Profile_Fail:
    //   return initialState;

    default:
      return state;
  }
};
