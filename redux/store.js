// redux/store.js
import { createStore, combineReducers } from "redux";
import reducer from "./reducers";
import auditReducer from "./auditReducer";

const rootReducer = combineReducers({
  reducer,
  auditReducer,
});

const store = createStore(rootReducer);

export default store;
