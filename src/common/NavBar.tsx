import { Disclosure, Transition } from "@headlessui/react";
import React, { useEffect, useRef, useState } from "react";
const navigation = [
  {
    name: "Home",
    scroll: "home",
    hidden: false,
    href: undefined,
  },
  {
    name: "Projects",
    scroll: "projects",
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
  return (
    <Disclosure
      as="nav"
      className={`bg-black fixed w-full z-30 transform duration-300`}
    >
      {({ open }) => (
        <>
          <div className="max-w-screen-2xl mx-auto px-2 sm:px-6 lg:px-8 xl:px-16 py-2">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button
                  className="inline-flex items-center justify-center p-4 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-900"
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
              <div className="text-primary hover:text-white flex-shrink-0 flex items-center text-2xl font-extrabold select-none duration-300">
                ARSA
              </div>
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href || undefined}
                      className={`px-3 py-2 text-base font-bold select-none cursor-pointer hover:text-white/90 duration-200 tracking-wide`}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <Transition
            show={open}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel className={`sm:hidden`}>
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    className={`hover:text-gray-500 block px-3 py-2 rounded-md text-base font-bold cursor-pointer`}
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

export default NavBar;
