import {
  ContactUsAttemp,
  ContactUseSuccess,
  ContactUsFail
} from "../types/index";

const initialState = {
  loading: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ContactUsAttemp:
      return { ...state, loading: true };
    case ContactUseSuccess:
      return { ...state, loading: false };
    case ContactUsFail:
      return { ...state, loading: false };

    default:
      return state;
  }
};
