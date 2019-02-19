import { createStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import counter from "./counter.redux";
import user from "./user.redux";

export default createStore(
  // reducer模块化
  combineReducers({ counter, user }),
  applyMiddleware(logger, thunk)
);
