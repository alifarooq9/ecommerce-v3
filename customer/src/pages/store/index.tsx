/* eslint-disable prefer-const */
import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import sortOptions from "../../../public/sortOptions.json";
import {
  GetServerSideProps,
  NextPage,
  InferGetServerSidePropsType,
  GetServerSidePropsContext,
} from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import Router from "next/router";
import useFilter from "../../hooks/usefilter";
import Products from "../../components/store/products";
const MobileFilter = dynamic(
  () => import("../../components/store/mobileFilter")
);

const Store: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  // use filter
  const { onChangeFilter, filters, handleApplyFilters } = useFilter();

  //mobile filter state
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-white pt-14">
      <MobileFilter
        mobileFiltersOpen={mobileFiltersOpen}
        setMobileFiltersOpen={setMobileFiltersOpen}
      />

      <div>
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              New Arrivals
            </h1>

            <div className="flex items-center">
              {/* sort */}
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <button className="flex w-full justify-start">
                              <Link
                                href={{
                                  pathname: "/store",
                                  query: { ...Router.query, sort: option.href },
                                }}
                              >
                                <a
                                  className={`
                                ${
                                  props.query.sort === option.href
                                    ? "font-medium text-gray-900"
                                    : "text-gray-500"
                                }
                                ${active ? "bg-gray-100" : ""}
                                 flex w-full justify-start px-4 py-2 text-sm
                              `}
                                >
                                  {option.name}
                                </a>
                              </Link>
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              {/* mobile filter btn */}
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form
                onSubmit={(e) => handleApplyFilters(e)}
                className="hidden lg:block"
              >
                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-b border-gray-200 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  onChange={(e) => {
                                    onChangeFilter(e, section.id);
                                  }}
                                  type="checkbox"
                                  checked={option.checked}
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
                <button className="mt-10 w-full rounded-md bg-gray-900 py-3 text-sm text-white transition-colors duration-300 hover:bg-gray-700">
                  Apply
                </button>
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">
                {/* Replace with your content */}
                <Products />
                {/* /End replace */}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const query = context.query;

  return {
    props: {
      query: query ? query : "",
    },
  };
};

export default Store;
