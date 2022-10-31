import { Dispatch } from "react";
import { ProductType } from "./product-types";

export interface cartContextType {
  items: ProductType[];
  cart: Dispatch<any>;
}

export type actionType = "ADD_ITEM" | "REMOVE_ITEM";

export interface ReducerAction {
  type: actionType;
  payload?: any;
}
