import { FC, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import navigation from "../../../../public/navigation.json";
import { UserIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import useAuth from "../../../hooks/useAuth";

const UserMenu: FC = () => {
  //current session
  const { data: session } = useSession();

  //use auth custom hook
  const { handleSignout } = useAuth();

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div className="flex">
        <Menu.Button className="p-2 text-gray-400 hover:text-gray-500">
          <span className="sr-only">Search</span>
          <UserIcon className="h-6 w-6" aria-hidden="true" />
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              <div className={`block py-2 px-4 text-sm text-gray-700`}>
                <h4 className="font-medium line-clamp-1">
                  {session?.user?.name}
                </h4>
                <p className="line-clamp-1">{session?.user?.email}</p>
              </div>
            </Menu.Item>
          </div>

          <div className="py-1">
            {navigation.authNav.map((n) => (
              <Menu.Item key={n.id}>
                {({ active }) => (
                  <div>
                    <Link href={n.href}>
                      <a
                        className={`
                   ${active ? "bg-gray-100 text-gray-900" : "text-gray-700"}
                   block py-2 px-4 text-sm`}
                      >
                        {n.name}
                      </a>
                    </Link>
                  </div>
                )}
              </Menu.Item>
            ))}
          </div>

          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleSignout}
                  className={`${
                    active ? "bg-red-100" : "bg-white"
                  } flex w-full py-2 px-4 text-sm text-red-600`}
                >
                  Sign out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserMenu;
