import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import products from "../../../public/dummyProducts.json";

const Products: FC = () => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((p) => (
        <Link href={`/store/${p.id}`} key={p.id}>
          <div className="group cursor-pointer rounded-md bg-gray-100 p-4 transition-transform duration-200 ease-out hover:scale-95">
            <div className="min-h-80 aspect-w-1 aspect-h-1 relative w-full overflow-hidden rounded-md bg-gray-200 lg:h-80">
              <Image
                src={p.images[0]?.imageSrc as string}
                alt={p.images[0]?.imageAlt}
                layout="fill"
                placeholder="blur"
                blurDataURL={p.images[0]?.imageSrc}
                objectFit="cover"
              />
            </div>
            <div className="mt-4 flex justify-between">
              <h3 className="text-sm font-medium text-gray-700">
                <span aria-hidden="true" className="" />
                {p.title}
              </h3>

              <p className="text-sm font-medium text-gray-900">
                ${p.variants.find((v) => v.id === p.defaultVariant)?.price}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Products;
