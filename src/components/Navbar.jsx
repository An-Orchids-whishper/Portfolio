import React, { useState, useEffect } from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { BsMoonFill, BsSunFill } from "react-icons/bs";

const navigation = ["About", "Skills", "Projects", "Resume", "Contact"];

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(() =>
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <Disclosure
      as="nav"
      className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-md shadow-md sticky top-0 z-50"
    >
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="text-xl font-bold text-gray-800 dark:text-white">
                Kartik Pal
              </div>

              <div className="hidden md:flex items-center space-x-6">
                {navigation.map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-800 dark:text-gray-200 hover:text-blue-500 transition"
                  >
                    {item}
                  </a>
                ))}
              </div>

              <div className="flex items-center space-x-4">
                {/* Theme Toggle */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="text-xl p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  {darkMode ? (
                    <BsSunFill className="text-yellow-400" />
                  ) : (
                    <BsMoonFill className="text-blue-500" />
                  )}
                </button>

                {/* Mobile menu button */}
                <div className="md:hidden">
                  <Disclosure.Button className="p-2 rounded-md text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                    {open ? (
                      <XMarkIcon className="h-6 w-6" />
                    ) : (
                      <Bars3Icon className="h-6 w-6" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden px-2 pb-4 space-y-2">
            {navigation.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block px-3 py-2 rounded-md text-base text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                {item}
              </a>
            ))}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
