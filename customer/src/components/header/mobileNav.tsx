import { Dispatch, FC, Fragment, SetStateAction } from "react";
import { Dialog, Tab, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import navigation from "../../../public/navigation.json";
import Image from "next/image";
import Link from "next/link";

interface mobileNavProptypes {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const MobileNav: FC<mobileNavProptypes> = ({ open, setOpen }) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as={Fragment} onClose={setOpen}>
        <div className="relative z-40 lg:hidden">
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pt-5 pb-2">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as={Fragment}>
                  <div className="mt-2 border-b border-gray-200">
                    <Tab.List className="-mb-px flex space-x-8 px-4">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            `
                              ${
                                selected
                                  ? "border-indigo-600 text-indigo-600"
                                  : "border-transparent text-gray-900"
                              }
                                flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium
                              `
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {navigation.categories.map((category) => (
                      <Tab.Panel
                        key={category.name}
                        className="space-y-10 px-4 pt-10 pb-8"
                      >
                        <div className="grid grid-cols-2 gap-x-4">
                          {category.featured.map((item) => (
                            <div
                              key={item.name}
                              className="group relative  text-sm"
                            >
                              <div className="aspect-w-1 aspect-h-1 relative h-32 w-full overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                <Image
                                  src={item.imageSrc}
                                  alt={item.imageAlt}
                                  placeholder="blur"
                                  blurDataURL={item.imageSrc}
                                  layout="fill"
                                  className="object-cover object-center"
                                />
                              </div>
                              <Link href={item.href}>
                                <a className="mt-6 block font-medium text-gray-900">
                                  <span
                                    className="absolute inset-0 z-10"
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </a>
                              </Link>
                              <p aria-hidden="true" className="mt-1">
                                Shop now
                              </p>
                            </div>
                          ))}
                        </div>
                        {category.sections.map((section) => (
                          <div key={section.name}>
                            <p
                              id={`${category.id}-${section.id}-heading-mobile`}
                              className="font-medium text-gray-900"
                            >
                              {section.name}
                            </p>
                            <ul
                              role="list"
                              aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                              className="mt-6 flex flex-col space-y-6"
                            >
                              {section.items.map((item) => (
                                <li key={item.name} className="flow-root">
                                  <Link href={item.href}>
                                    <a className="-m-2 block p-2 text-gray-500">
                                      {item.name}
                                    </a>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <Link href={page.href}>
                        <a className="-m-2 block p-2 font-medium text-gray-900">
                          {page.name}
                        </a>
                      </Link>
                    </div>
                  ))}
                </div>

                <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                  <div className="flow-root">
                    <Link href="/">
                      <a className="-m-2 block p-2 font-medium text-gray-900">
                        Sign in
                      </a>
                    </Link>
                  </div>
                  <div className="flow-root">
                    <Link href="/">
                      <a className="-m-2 block p-2 font-medium text-gray-900">
                        Create account
                      </a>
                    </Link>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default MobileNav;
