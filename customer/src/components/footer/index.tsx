import Link from "next/link";
import { FC } from "react";
import navigation from "../../../public/navigation.json";

const Footer: FC = () => {
  // authentication navigation
  const authNavigation = [
    {
      id: "1",
      href: "/auth/signin",
      name: "Sign in",
    },
    {
      id: "2",
      href: "/auth/create-account",
      name: "Create account",
    },
    {
      id: "3",
      href: "/auth/forget-password",
      name: "Forgot Password?",
    },
  ];

  return (
    <footer className="bg-gray-100" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="text-white xl:col-span-1">
            <a
              href="./index.html"
              className="tracking-relaxed transform text-3xl font-bold tracking-tighter text-black transition duration-500 ease-in-out lg:pr-8"
            >
              Ecommerce
            </a>
            <p className="mt-2 w-1/2 text-sm text-gray-500">
              Buy high quality product in discounted price
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-medium tracking-wider text-black">
                  Womens
                </h3>
                <ul role="list" className="mt-4 space-y-2">
                  {navigation.categories[0]?.sections[0]?.items.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href}>
                        <a className="text-sm font-normal text-gray-500 hover:text-gray-900">
                          {item.name}
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-medium tracking-wider text-black">
                  Mens
                </h3>
                <ul role="list" className="mt-4 space-y-2">
                  {navigation.categories[1]?.sections[0]?.items.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href}>
                        <a className="text-sm font-normal text-gray-500 hover:text-gray-900">
                          {item.name}
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-medium tracking-wider text-black">
                  Authentication
                </h3>
                <ul role="list" className="mt-4 space-y-2">
                  {authNavigation.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href}>
                        <a className="text-sm font-normal text-gray-500 hover:text-gray-900">
                          {item.name}
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-16">
        <div className="flex flex-wrap items-baseline">
          <span className="mt-2 text-sm font-light text-gray-500">
            Copyright © 2020 - 2021
            <a
              href="https://wickedlabs.dev"
              className="text-wickedblue mx-2 hover:text-gray-500"
              rel="noopener noreferrer"
            >
              @wickedlabsHQ
            </a>
            . Since 2020
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
