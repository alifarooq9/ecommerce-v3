import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../slices/cartSlice";

export const cartStore = configureStore({
  reducer: {
    counter: cartSlice,
  },
});

export type RootState = ReturnType<typeof cartStore.getState>;
export type AppDispatch = typeof cartStore.dispatch;
