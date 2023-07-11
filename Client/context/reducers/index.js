import { combineReducers } from "redux";
import feedsReducers from "./feedsReducers";
import cartReducer from "./cartReducers";

const myReducer = combineReducers({
  feeds: feedsReducers,
  cartItem:cartReducer
});

export default myReducer;