import { useEffect, useState } from "react";
import { useCart } from "react-use-cart";
import { itemTypes } from "../types/cart-types";

const UseCart = () => {
  const { addItem, items, emptyCart, totalUniqueItems } = useCart();
  const productItems = items as itemTypes[];

  const handleAddItem = (product: itemTypes) => {
    addItem({
      ...product,
      id: product.id + product.size,
    } as itemTypes);
  };

  const [totalItems, setTotalItems] = useState<number>(0);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setTotalItems(totalUniqueItems);
    }
  }, [totalUniqueItems]);

  return { handleAddItem, productItems, emptyCart, totalItems };
};

export default UseCart;
