const initialState = {
  navigation: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "navigation":
      return { ...state, navigation: payload };

    default:
      return state;
  }
};
