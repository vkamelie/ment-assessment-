import { createStore, applyMiddleware } from "redux";
import promiseMiddle from "redux-promise-middleware";
import reducer from "./redux/Reducer";

export default createStore(reducer, applyMiddleware(promiseMiddle));
