import { createContext, ReactNode, useReducer } from "react";
import { cartContextType, ReducerAction } from "../types/cart-types";
import { ProductType } from "../types/product-types";

const cartContext = createContext<cartContextType>({
  items: [],
  dispatch: () => {
    return;
  },
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const initialState: ProductType[] = [];

  const Reducer = (state: ProductType[] = [], action: ReducerAction) => {
    return state;
  };

  const [state, dispatch] = useReducer(Reducer, initialState);

  const context = {
    items: state,
    dispatch,
  };

  return (
    <cartContext.Provider value={context}>{children}</cartContext.Provider>
  );
};

export default cartContext;
