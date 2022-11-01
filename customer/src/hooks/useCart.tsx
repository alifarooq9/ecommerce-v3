import { useEffect, useState } from "react";
import { useCart } from "react-use-cart";
import { itemTypes } from "../types/cart-types";

const UseCart = () => {
  const {
    addItem,
    items,
    emptyCart,
    totalUniqueItems,
    removeItem,
    updateItemQuantity,
    cartTotal,
  } = useCart();
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

  const incrementQty = (id: string, qty: number) => {
    console.log(qty + 1);

    updateItemQuantity(id, qty + 1);
  };

  const decrementQty = (id: string, qty: number) => {
    updateItemQuantity(id, qty - 1);
  };

  const [totalPrice, setTotalPrice] = useState<number>(0);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setTotalPrice(cartTotal.toFixed(2) as any);
    }
  }, [cartTotal]);

  const updateQty = (id: string, qty: number) => {
    updateItemQuantity(id, qty);
  };

  return {
    handleAddItem,
    productItems,
    emptyCart,
    totalItems,
    removeItem,
    incrementQty,
    decrementQty,
    totalPrice,
    updateQty,
  };
};

export default UseCart;
