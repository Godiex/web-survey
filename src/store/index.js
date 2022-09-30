import thunkMiddleware from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./reducers";

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production")
    return composeWithDevTools(applyMiddleware(...middleware));
  return applyMiddleware(...middleware);
};

const middleware = [thunkMiddleware];
const store = createStore(reducers, bindMiddleware(middleware));
export default store;
