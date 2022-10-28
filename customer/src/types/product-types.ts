enum Sizes {
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "3xl",
}

interface Variants {
  id: Sizes;
  price: number;
  size: Sizes;
}

export interface ProductType {
  title: string;
  shortDescription: string;
  description: string;
  colors: {
    name: string;
    code: string;
  }[];
  variants: Variants[];
  defaultVariant: string;
  quantity: number;
  images: {
    imageSrc: string;
    imageAlt: string;
  }[];
}
