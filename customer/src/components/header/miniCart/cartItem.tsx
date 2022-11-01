import { TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { FC } from "react";
import UseCart from "../../../hooks/useCart";
import { itemTypes } from "../../../types/cart-types";

const CartItem: FC<{ product: itemTypes }> = ({ product }) => {
  //useCart
  const { removeItem, incrementQty, decrementQty, updateQty } = UseCart();

  return (
    <li key={product.id} className="flex py-6">
      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <Image
          src={product.images[0]?.imageSrc as string}
          alt={product.images[0]?.imageAlt}
          className="h-full w-full object-cover object-center"
          layout="fill"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3 className="line-clamp-1">{product.title}</h3>
            <p className="ml-4">${product.price}</p>
          </div>
          <div className="flex items-center space-x-2 divide-x py-0.5">
            <p className="mt-1 text-sm uppercase text-gray-500">
              {product.size}
            </p>
            <p className="mt-1 pl-2 text-sm capitalize text-gray-500">
              {product.color.name}
            </p>
          </div>
        </div>
        <div className="flex flex-1 items-end justify-between  text-sm">
          <div className="flex w-full items-center justify-between ">
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => decrementQty(product.id, product.quantity)}
                className="aspect-1 w-7 rounded-md bg-gray-100 transition-colors duration-200 hover:bg-gray-200"
              >
                -
              </button>
              <input
                className="m-0 w-10 rounded-md border border-gray-200 py-1 px-1 text-center text-gray-500"
                value={product.quantity}
                onChange={(e) => {
                  !isNaN(parseInt(e.target.value)) &&
                    updateQty(product.id, parseInt(e.target.value));
                }}
                type="number"
                min={1}
              />
              <button
                type="button"
                onClick={() => incrementQty(product.id, product.quantity)}
                className="aspect-1 w-7 rounded-md bg-gray-100 transition-colors duration-200 hover:bg-gray-200"
              >
                +
              </button>
            </div>

            <button
              onClick={() => removeItem(product.id)}
              type="button"
              className="flex items-center justify-center  font-medium text-red-500 transition-colors duration-200 hover:text-red-700"
            >
              <TrashIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
