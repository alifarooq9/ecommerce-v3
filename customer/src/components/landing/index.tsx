import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const Landing: FC = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center py-28">
      <div className="mx-auto grid h-full max-w-7xl grid-cols-1  px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="z-10 col-span-1 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
          <main className="mx-auto mt-10 max-w-7xl sm:mt-12 md:mt-16 lg:mt-20  xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
                <span className="block">
                  Buy high quality clothing in discounted price
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
                lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
                fugiat aliqua.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link href="/store">
                    <a className="flex w-full items-center justify-center rounded-md border border-transparent bg-black px-8 py-3  text-base text-white  transition-colors duration-300 hover:bg-gray-700 md:px-10">
                      Buy Now
                    </a>
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link href="/auth/create-account">
                    <a className="flex w-full items-center justify-center rounded-md border border-transparent bg-gray-200 px-8 py-3  text-base text-black transition-colors duration-300 hover:bg-gray-300 md:px-10">
                      Create Account
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
        <div className="relative z-10 col-span-1 aspect-1 h-full w-full">
          <Image
            src="https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg"
            alt="hero image"
            layout="fill"
            objectFit="cover"
            className="scale-100 rounded-lg lg:scale-75"
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
