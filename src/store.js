import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import jwtMiddleware from './middlewares/jwtMiddleware';
import reducers from "./reducers";
const middleWares = [thunk, jwtMiddleware]; 
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(...middleWares)));

export default store;