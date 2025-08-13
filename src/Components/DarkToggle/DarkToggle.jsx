import React, { useContext, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { ThemeContext } from "../../ThemeProvider/ThemeContext";

const DarkToggle = () => {
  const [checked, setChecked] = useState(false);
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  const toggle = () => {
    setChecked(!checked);
    setDarkMode(!darkMode);
  };
  return (
    <div>
      <div
        onClick={toggle}
        className={`relative w-10 h-6 flex items-center cursor-pointer rounded-full transition-colors duration-300 ${
          checked ? "bg-blue-200" : "bg-blue-300"
        }`}
      >
        {/* Toggle knob */}
        <div
          className={`flex justify-center items-center absolute left-0 top-0 w-6 h-6 bg-blue-100 rounded-full shadow-md transform transition-transform duration-300 ${
            checked ? "translate-x-4" : ""
          }`}
        >
          {/* Icon inside the knob */}
          {checked ? (
            <FaMoon className="text-gray-900 mx-auto my-auto" size={14} />
          ) : (
            <FaSun className="text-yellow-500 mx-auto my-auto" size={14} />
          )}
        </div>
      </div>
    </div>
  );
};

export default DarkToggle;
