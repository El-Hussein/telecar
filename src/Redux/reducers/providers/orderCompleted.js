import {
  DriverOrderCompletedAttemp,
  DriverOrdersCompltetedFail,
  DriverOrdersCompletedSUccess
} from "../../types/porvider";

const initialState = {
  orderCompltetedloading: false,
  orderCompltetedSuccess: false,
  orderCompltetedFail: false
};
export default (state = initialState, action) => {
  switch (action.type) {
    case DriverOrderCompletedAttemp: {
      return { ...initialState, orderCompltetedloading: true };
    }
    case DriverOrdersCompletedSUccess: {
      return {
        ...initialState,
        orderCompltetedloading: false,
        orderCompltetedSuccess: true
      };
    }
    case DriverOrdersCompltetedFail: {
      return {
        ...initialState,
        orderCompltetedloading: true,
        orderCompltetedFail: true
      };
    }
  }
};
