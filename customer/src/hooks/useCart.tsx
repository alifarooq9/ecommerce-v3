import { useCart, Item } from "react-use-cart";
import { itemTypes } from "../types/cart-types";

const UseCart = () => {
  const { addItem, items, emptyCart } = useCart();
  const productItems = items as itemTypes[];

  const handleAddItem = (product: itemTypes) => {
    addItem({
      ...product,
      id: product.id + product.size,
    } as itemTypes);
  };

  return { handleAddItem, productItems, emptyCart };
};

export default UseCart;
