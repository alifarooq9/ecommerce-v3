import { Dispatch } from "react";
import { ProductType } from "./product-types";

export interface cartContextType {
  items: ProductType[];
  dispatch: Dispatch<any>;
}

enum ReducerActionType {
  ADD_ITEM,
}

export interface ReducerAction {
  type: ReducerActionType;
  payload?: any;
}
