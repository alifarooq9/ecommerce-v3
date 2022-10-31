import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../redux/slices/cartSlice";
import type { RootState } from "../redux/stores/cartStore";

const UseCart = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  const incrementFnc = () => {
    dispatch(increment());
  };

  return { incrementFnc, count };
};

export default UseCart;
