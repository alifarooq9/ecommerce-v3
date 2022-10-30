import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { useContext, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import products from "../../../public/dummyProducts.json";
import Image from "next/image";
import cartContext from "../../context/cartContext";

const ProductsDetail: NextPage = (
  props: InferGetServerSidePropsType<GetServerSideProps>
) => {
  const product = products.find((p) => p.id === props.idParams);

  const [selectedColor, setSelectedColor] = useState(product?.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product?.variants[2]);

  return (
    <div className="bg-white pt-32">
      <main className="px-4 pt-6 sm:px-6 lg:px-8">
        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-w-3 aspect-h-4 hidden overflow-hidden rounded-lg lg:block">
            <Image
              src={product?.images[3]?.imageSrc as string}
              alt={product?.images[3]?.imageAlt}
              placeholder="blur"
              blurDataURL={product?.images[3]?.imageSrc}
              layout="fill"
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
              <Image
                src={product?.images[1]?.imageSrc as string}
                alt={product?.images[1]?.imageAlt}
                placeholder="blur"
                blurDataURL={product?.images[1]?.imageSrc}
                layout="fill"
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
              <Image
                src={product?.images[2]?.imageSrc as string}
                alt={product?.images[2]?.imageAlt}
                placeholder="blur"
                layout="fill"
                blurDataURL={product?.images[2]?.imageSrc}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
          <div className="aspect-w-4 aspect-h-5 sm:overflow-hidden sm:rounded-lg lg:aspect-w-3 lg:aspect-h-4">
            <Image
              src={product?.images[0]?.imageSrc as string}
              alt={product?.images[0]?.imageAlt}
              placeholder="blur"
              layout="fill"
              blurDataURL={product?.images[0]?.imageSrc}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {product?.title}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">
              ${product?.variants.find((p) => p.id === selectedSize?.id)?.price}
            </p>
            <p className="${} mt-2 text-sm font-medium opacity-50">
              {product?.variants.find((p) => p.id === selectedSize?.id)?.qty}{" "}
              items left
            </p>

            {/* Reviews */}

            <form className="mt-10">
              {/* Colors */}
              <div>
                <h3 className="text-sm font-medium text-gray-900">Color</h3>

                <RadioGroup
                  value={selectedColor}
                  onChange={setSelectedColor}
                  className="mt-4"
                >
                  <RadioGroup.Label className="sr-only">
                    {" "}
                    Choose a color{" "}
                  </RadioGroup.Label>
                  <div className="flex items-center space-x-3">
                    {product?.colors.map((color) => (
                      <RadioGroup.Option
                        key={color.name}
                        value={color.name}
                        className={({ active, checked }) =>
                          ` bg-[${color.code}]
                            ${
                              active || checked
                                ? "ring-2 ring-blue-500 ring-offset-2"
                                : ""
                            }
                            relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none`
                        }
                      >
                        <RadioGroup.Label as="span" className="sr-only">
                          {" "}
                          {color.name}{" "}
                        </RadioGroup.Label>
                        <span
                          aria-hidden="true"
                          className={`bg-[${color.code}]
                            h-8 w-8 rounded-full border border-black border-opacity-10`}
                        />
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* Sizes */}
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  <a
                    href="#"
                    className="text-sm font-medium text-blue-600 hover:text-blue-500"
                  >
                    Size guide
                  </a>
                </div>

                <RadioGroup
                  value={selectedSize}
                  onChange={setSelectedSize}
                  className="mt-4"
                >
                  <RadioGroup.Label className="sr-only">
                    {" "}
                    Choose a size{" "}
                  </RadioGroup.Label>
                  <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                    {product?.variants.map((size) => (
                      <RadioGroup.Option
                        key={size.size}
                        value={size}
                        disabled={size.qty === 0}
                        className={({ active }) =>
                          ` ${
                            size.qty !== 0
                              ? "cursor-pointer shadow-sm"
                              : "cursor-not-allowed text-gray-200"
                          } ${active ? "ring-2 ring-blue-500" : ""}
                            group relative flex items-center justify-center rounded-md border bg-white bg-gray-50 py-3 px-4 text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6`
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <RadioGroup.Label as="span">
                              {size.size}
                            </RadioGroup.Label>
                            {size.qty !== 0 ? (
                              <span
                                className={`${active ? "border" : "border-2"}
                                 ${
                                   checked
                                     ? "border-blue-500"
                                     : "border-transparent"
                                 }
                                  pointer-events-none absolute -inset-px rounded-md`}
                                aria-hidden="true"
                              />
                            ) : (
                              <span
                                aria-hidden="true"
                                className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                              >
                                <svg
                                  className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                  viewBox="0 0 100 100"
                                  preserveAspectRatio="none"
                                  stroke="currentColor"
                                >
                                  <line
                                    x1={0}
                                    y1={100}
                                    x2={100}
                                    y2={0}
                                    vectorEffect="non-scaling-stroke"
                                  />
                                </svg>
                              </span>
                            )}
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-900 py-3 px-8 text-base font-medium text-white transition-colors duration-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Add to bag
              </button>
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">
                  {product?.description}
                </p>
              </div>
            </div>

            {/* <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  {product?.highlights.map((highlight) => (
                    <li key={highlight} className="text-gray-400">
                      <span className="text-gray-600">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div> */}

            {/* <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{product.details}</p>
              </div>
            </div> */}
          </div>
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const idParams = context?.params?.id;
  console.log(idParams);

  return {
    props: {
      idParams,
    },
  };
};

export default ProductsDetail;
