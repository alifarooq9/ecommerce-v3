import { legacy_createStore } from "redux";
import { cartReducers } from "./cartReducer";

export const cartStore = legacy_createStore(cartReducers);
