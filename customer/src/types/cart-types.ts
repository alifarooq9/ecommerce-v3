import { Item } from "react-use-cart";

export type Sizes =
  | "xxs"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl";

export interface Variants {
  id: Sizes;
  price: number;
  size: Sizes;
  qty: number;
}

export interface Color {
  name: string;
  code: string;
}

export interface Description {
  main: string;
  highlights: string[];
  details: string;
}

export interface ImagesType {
  imageSrc: string;
  imageAlt: string;
}

export interface itemTypes extends Item {
  id: string;
  key: string;
  title: string;
  description: Description;
  color: Color;
  variants: Variants[];
  quantity: number;
  size: Sizes;
  images: ImagesType[];
}
