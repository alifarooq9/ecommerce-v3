import { cart } from "react";
import { ProductType } from "./product-types";

export interface cartContextType {
  items: ProductType[];
  cart: cart<any>;
}

enum ReducerActionType {
  ADD_ITEM,
}

export interface ReducerAction {
  type: ReducerActionType;
  payload?: any;
}
