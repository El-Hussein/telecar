import {
  DriverMakeOfferAttemp,
  DriverMakeOfferFail,
  DriverMakeOfferSuccess,
  DriverOrderCompletedAttemp,
  DriverOrdersCompltetedFail,
  DriverOrdersCompletedSUccess
} from "../../types/porvider";

const initialState = {
  makeOfferloading: false,
  makeOffrtSuccess: false,
  makeOfferFail: false
};
export default (state = initialState, action) => {
  switch (action.type) {
    case DriverMakeOfferAttemp: {
      return { ...initialState, makeOfferloading: true };
    }
    case DriverMakeOfferSuccess: {
      return {
        ...initialState,
        makeOfferloading: false,
        makeOffrtSuccess: true
      };
    }
    case DriverMakeOfferFail: {
      return { ...initialState, makeOfferloading: true, makeOfferFail: true };
    }
  }
};
