// components/ThemeSwitcher.jsx
import React, { useEffect, useState } from "react";
import { BsMoonFill, BsSunFill } from "react-icons/bs";

const ThemeSwitcher = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="ml-4 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition text-xl"
      title="Toggle Theme"
    >
      {darkMode ? (
        <BsSunFill className="text-yellow-400" />
      ) : (
        <BsMoonFill className="text-blue-500" />
      )}
    </button>
  );
};

export default ThemeSwitcher;
