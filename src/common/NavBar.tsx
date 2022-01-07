import { Disclosure, Transition } from "@headlessui/react";
import classNames from "classnames";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
const navigation = [
  {
    name: "Home",
    scroll: "home",
    hidden: false,
    href: "body",
  },
];
const NavBar: React.FC = ({}) => {
  const [show, setShow] = useState(true);
  const disButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    let lastScroll = 0;
    window.addEventListener("scroll", () => {
      const newScroll = window.scrollY;
      setShow(newScroll <= lastScroll);
      lastScroll = newScroll;
    });
  }, []);

  const router = useRouter();
  const { locale, pathname, query, asPath } = router;

  const changeLocale = (locale: string) => {
    router.push({ pathname, query }, asPath, { locale });
  };
  return (
    <Disclosure
      as="nav"
      className={classNames(
        "fixed w-full z-30 transform duration-300",
        show ? "translate-y-0" : "-translate-y-full"
      )}
    >
      {({ open }) => (
        <>
          <div className="bg-black max-w-screen-2xl mx-auto px-2 sm:px-6 lg:px-8 xl:px-16 py-2 relative z-30">
            <div className="relative flex items-center justify-between h-16">
              <div className="flex-shrink-0 flex items-center text-2xl font-extrabold select-none duration-300 gap-x-2">
                <button
                  onClick={() => changeLocale("id")}
                  className={classNames(
                    locale === "id"
                      ? "text-primary"
                      : "text-white hover:text-primary",
                    "duration-300"
                  )}
                >
                  ID
                </button>
                <button
                  onClick={() => changeLocale("en-US")}
                  className={classNames(
                    locale === "en-US"
                      ? "text-primary"
                      : "text-white hover:text-primary",
                    "duration-300"
                  )}
                >
                  EN
                </button>
              </div>
              <div className="sm:hidden relative flex items-center">
                <Disclosure.Button
                  className="inline-flex items-center justify-center p-4 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                  ref={disButton}
                >
                  <span className="sr-only">Open main menu</span>
                  <div className="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    {open ? (
                      <>
                        <span
                          aria-hidden="true"
                          className="block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out rotate-45"
                        ></span>
                        <span
                          aria-hidden="true"
                          className="block absolute  h-0.5 w-5 bg-current   transform transition duration-500 ease-in-out opacity-0"
                        ></span>
                        <span
                          aria-hidden="true"
                          className="block absolute  h-0.5 w-5 bg-current transform  transition duration-500 ease-in-out -rotate-45"
                        ></span>
                      </>
                    ) : (
                      <>
                        <span
                          aria-hidden="true"
                          className="block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out -translate-y-1.5"
                        ></span>
                        <span
                          aria-hidden="true"
                          className="block absolute  h-0.5 w-5 bg-current   transform transition duration-500 ease-in-out"
                        ></span>
                        <span
                          aria-hidden="true"
                          className="block absolute  h-0.5 w-5 bg-current transform  transition duration-500 ease-in-out translate-y-1.5"
                        ></span>
                      </>
                    )}
                  </div>
                </Disclosure.Button>
              </div>
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => {
                        if (item.href) {
                          document
                            .querySelector(item.href)
                            ?.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className={`px-3 py-2 text-base font-bold select-none cursor-pointer hover:text-white/90 duration-200 tracking-wide`}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <Transition
            show={open}
            enter="transition duration-100"
            enterFrom="transform -translate-y-full"
            enterTo="transform translate-y-0"
            leave="transition duration-100"
            leaveFrom="transform translate-y-0"
            leaveTo="transform -translate-y-full"
          >
            <Disclosure.Panel className={`sm:hidden bg-zinc-900 z-20`}>
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    className={`text-center hover:text-white hover:bg-zinc-800 block px-3 py-2 rounded-md text-base font-bold cursor-pointer`}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
};

export default React.memo(NavBar);
