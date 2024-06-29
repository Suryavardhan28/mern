import { applyMiddleware, createStore } from "redux";
import { thunk } from "redux-thunk";
import loggerMiddleware from "./middleware/loggerMiddleware";
import rootReducer from "./reducers";

const middleware = [thunk, loggerMiddleware];

const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;
