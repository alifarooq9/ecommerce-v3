/* eslint-disable react/no-unescaped-entities */
import { NextPage } from "next";
import Link from "next/link";

const FourOFour: NextPage = (props) => {
  return (
    <section className="flex h-full min-h-screen items-center p-16">
      <div className="container mx-auto my-8 flex flex-col items-center justify-center px-5">
        <div className="max-w-md text-center">
          <h2 className="mb-8 text-9xl font-extrabold dark:text-gray-800">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">
            Sorry, we couldn't find this page.
          </p>
          <p className="mt-4 mb-8 dark:text-gray-400">
            But dont worry, you can find plenty of other things on our homepage.
          </p>
          <Link href={"/"}>
            <a
              rel="noopener noreferrer"
              className="rounded bg-black px-8 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-gray-700"
            >
              Back to homepage
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FourOFour;
