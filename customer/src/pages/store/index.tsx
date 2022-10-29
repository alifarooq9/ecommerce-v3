/* eslint-disable prefer-const */
import { ChangeEvent, FormEvent, Fragment, useState } from "react";
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
const MobileFilter = dynamic(
  () => import("../../components/store/mobileFilter")
);

interface queryTypes {
  id: string;
  queries: string[];
}

const Store: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  //router

  //mobile filter state
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);

  //filter
  const [filters, setFilter] = useState([
    {
      id: "color",
      name: "Color",
      options: [
        { value: "white", label: "White", checked: false },
        { value: "beige", label: "Beige", checked: false },
        { value: "blue", label: "Blue", checked: false },
        { value: "brown", label: "Brown", checked: false },
        { value: "green", label: "Green", checked: false },
        { value: "purple", label: "Purple", checked: false },
      ],
    },
    {
      id: "category",
      name: "Category",
      options: [
        { value: "new-arrivals", label: "New Arrivals", checked: false },
        { value: "sale", label: "Sale", checked: false },
        { value: "travel", label: "Travel", checked: false },
        { value: "organization", label: "Organization", checked: false },
        { value: "accessories", label: "Accessories", checked: false },
      ],
    },
    {
      id: "size",
      name: "Size",
      options: [
        { value: "2l", label: "2L", checked: false },
        { value: "6l", label: "6L", checked: false },
        { value: "12l", label: "12L", checked: false },
        { value: "18l", label: "18L", checked: false },
        { value: "20l", label: "20L", checked: false },
        { value: "40l", label: "40L", checked: false },
      ],
    },
  ]);

  const [useQuery, setUseQuery] = useState<queryTypes[]>([
    {
      id: "size",
      queries: [],
    },
    {
      id: "color",
      queries: [],
    },
    {
      id: "category",
      queries: [],
    },
  ]);

  //query
  const onChangeFilter = (
    e: ChangeEvent<HTMLInputElement>,
    sectionId: string,
    valueIndex: number
  ) => {
    if (e.target.checked) {
      setUseQuery(
        [...useQuery].map((q) => {
          if (q.id === sectionId) {
            return {
              ...q,
              queries: [...q.queries, e.target.value],
            };
          }

          return q;
        })
      );

      return;
    }

    const temp = [...useQuery];
    temp.map((tq) => {
      if (tq.id === sectionId) {
        tq.queries.splice(valueIndex, 1);
      }
    });
    setUseQuery(temp);
  };

  const handleApplyFilters = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let colorQuery: any = [];
    let categoryQuery: any = [];
    let sizeQuery: any = [];
    useQuery.map((q) => {
      if (q.id === "color") {
        return colorQuery.push(q.queries);
      }

      if (q.id === "category") {
        return categoryQuery.push(q.queries);
      }

      if (q.id === "size") {
        return sizeQuery.push(q.queries);
      }
    });

    await Router.push({
      pathname: "/store",
      query: {
        ...Router.query,
        color: JSON.stringify(colorQuery),
        size: JSON.stringify(sizeQuery),
        category: JSON.stringify(categoryQuery),
      },
    });
  };

  return (
    <div className="min-h-screen bg-white pt-14">
      <MobileFilter
        mobileFiltersOpen={mobileFiltersOpen}
        setMobileFiltersOpen={setMobileFiltersOpen}
        filters={filters as any}
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
                                  query: { sort: option.href, ...Router.query },
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
                                    onChangeFilter(e, section.id, optionIdx);
                                  }}
                                  type="checkbox"
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
                <div className="h-96 rounded-lg border-4 border-dashed border-gray-200 lg:h-full" />
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
