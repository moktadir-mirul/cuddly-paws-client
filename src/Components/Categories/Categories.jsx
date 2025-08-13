import React, { useContext } from "react";
import { FaCat, FaDog, FaFish, FaEarlybirds, FaFrog } from "react-icons/fa";
import { GiRabbit } from "react-icons/gi";
import { GiSandSnake } from "react-icons/gi";
import { GiSeatedMouse } from "react-icons/gi";
import { ThemeContext } from "../../ThemeProvider/ThemeContext";


const petCategories = [
  {
    name: "Cats",
    image: "FaCat",
  },
  {
    name: "Dogs",
    image: "FaDog",
  },
  {
    name: "Rabbits",
    image: "GiRabbit",
  },
  {
    name: "Fish",
    image: "FaFish",
  },
  {
    name: "Birds",
    image: "FaEarlybirds",
  },
  {
    name: "Hamsters",
    image: "GiSeatedMouse",
  },
  {
    name: "Reptiles",
    image: "GiSandSnake",
  },
  {
    name: "Amphibians",
    image: "FaFrog",
  },
];
const IconMap = {
  FaCat,
  FaDog,
  GiRabbit,
  FaFish,
  FaEarlybirds,
  GiSeatedMouse,
  GiSandSnake,
  FaFrog,
};

const Categories = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div

      className="-mt-2 w-full bg-white dark:bg-gray-900"
    >
      <section className="w-11/12 mx-auto pt-8 md:pt-16 pb-8">
        {/* Section Heading */}
        <h2 className="text-4xl md:text-6xl play font-bold text-center mb-12 text-blue-600 dark:text-sky-400">
          Categories
        </h2>

        {/* Cards Area */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {petCategories.map((category, index) => {
            const IconComponent = IconMap[category.image];
            return (
              <div
                key={index} // Unique key for each mapped item
                className="group flex flex-col items-center p-6 bg-white dark:bg-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-600 dark:hover:border-blue-800 cursor-pointer transform hover:-translate-y-1"
              >
                {/* Pet Category Image */}
                <div className="w-24 h-24 mb-4 overflow-hidden rounded-full border border-blue-500 dark:border-sky-400 group-hover:border-blue-600 dark:group-hover:border-sky-400 transition-colors duration-300">
                  <IconComponent
                    className={`p-3 w-full h-full object-cover ${
                      darkMode ? "text-sky-400" : "text-blue-600"
                    }`}
                  />
                </div>

                {/* Pet Category Name */}
                <h3 className="text-2xl play font-bold text-gray-800 dark:text-white group-hover:text-blue-700 dark:group-hover:text-sky-400 transition-colors duration-300">
                  {category.name}
                </h3>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Categories;
