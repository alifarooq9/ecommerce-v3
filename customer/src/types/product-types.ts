enum Sizes {
  "xxs",
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "4xl",
  "5xl",
}

interface Variants {
  id: Sizes;
  price: number;
  size: Sizes;
}

export interface ProductType {
  id: string;
  title: string;
  description: string;
  colors: {
    name: string;
    code: string;
  }[];
  variants: Variants[];
  defaultVariant: string;
  quantity: {
    size: Sizes;
    qty: number;
  }[];
  images: {
    imageSrc: string;
    imageAlt: string;
  }[];
}
