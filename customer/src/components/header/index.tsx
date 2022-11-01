import { FC, useContext, useEffect, useState } from "react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import Link from "next/link";
import NavLinks from "./navLinks";
import AuthState from "./authState";
import UseCart from "../../hooks/useCart";
const MiniCart = dynamic(() => import("./miniCart"));
const MobileNav = dynamic(() => import("./mobileNav"));

const Header: FC = () => {
  //menu states
  const [openMobileMenu, setOpenMobileMenu] = useState<boolean>(false);
  const [openMiniCart, setOpenMiniCart] = useState<boolean>(false);

  // use cart
  const { totalItems } = UseCart();

  return (
    <div className="fixed top-0 left-0 z-30 w-screen bg-white">
      {/* Mobile menu */}
      <MobileNav open={openMobileMenu} setOpen={setOpenMobileMenu} />

      {/* mini cart */}
      <MiniCart open={openMiniCart} setOpen={setOpenMiniCart} />

      <header className="relative border-b border-gray-200 bg-white">
        <p className="flex h-10 items-center justify-center bg-black px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Get free delivery on orders over $100
        </p>

        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div>
            <div className="flex h-16 items-center">
              {/* Mobile menu icon */}
              <button
                type="button"
                className="rounded-md bg-white text-gray-400 lg:hidden"
                onClick={() => setOpenMobileMenu(true)}
              >
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link href={"/"}>
                  <a>
                    <span className="text-xl font-bold text-gray-900">
                      Ecom
                    </span>
                  </a>
                </Link>
              </div>

              {/* Navlinks */}
              <NavLinks />

              <div className="ml-auto flex items-center">
                {/* auth state */}
                <AuthState />

                {/* Search */}
                <div className="flex lg:ml-4">
                  <button className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  </button>
                </div>

                {/* Cart */}
                <div className="ml-2 flow-root lg:ml-6">
                  <button
                    onClick={() => setOpenMiniCart(true)}
                    className="group -m-2 flex items-center p-2"
                  >
                    <ShoppingBagIcon
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      {totalItems}
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
