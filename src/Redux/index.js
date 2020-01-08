import { createStore, applyMiddleware, compose } from "redux";
import logger from "redux-logger";
import Thunk from "redux-thunk";

import reducers from "./reducers";
//export default createStore(reducers, {}, applyMiddleware(middleware));

// export default compose(applyMiddleware(Thunk, logger))(createStore)(reducers);
export default compose(applyMiddleware(Thunk))(createStore)(reducers);
