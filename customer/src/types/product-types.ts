type Sizes =
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

interface Variants {
  id: Sizes;
  price: number;
  size: Sizes;
}

interface Colors {
  name: string;
  code: string;
}

export interface ProductType {
  id: string;
  key: string;
  title: string;
  description: string;
  colors: Colors[] | Colors;
  variants: Variants[];
  quantity: {
    size: Sizes;
    qty: number;
  };
  images: {
    imageSrc: string;
    imageAlt: string;
  }[];
}
