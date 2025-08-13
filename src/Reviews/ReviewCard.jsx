import React, { useContext, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ThemeContext } from "../ThemeProvider/ThemeContext";
import { FaQuoteLeft, FaPaw } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";

const ReviewCard = ({
  name,
  location,
  review,
  designation,
  photo,
  bgLight,
  bgDark,
  index,
  progress,
  range,
  targetScale,
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });
  const { darkMode } = useContext(ThemeContext);

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);
  const bgColor = darkMode ? bgDark : bgLight;
  return (
    <div
      ref={ref}
      className="h-auto flex items-center justify-center sticky top-0 pb-10"
    >
      <motion.div
        style={{
          backgroundColor: bgColor,
          scale,
          top: `calc(-5vh + ${index * 25}px)`,
        }}
        className={`flex flex-col relative -top-[25%] h-auto w-9/12 mx-auto rounded-md p-10 origin-top`}
      >
        <div
          className={`${
            darkMode ? `${bgDark}` : `${bgLight}`
          } p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col`}
        >
          <FaQuoteLeft
            className="text-blue-600 dark:text-sky-400 text-2xl mb-4"
            size={40}
          />
          <p className="text-gray-800 dark:text-gray-200 w-11/12 lg:w-9/12 text-center mx-auto mb-6 flex-grow">
            "{review}"
          </p>
          <div className="flex flex-col justify-center items-center gap-4">
            <img
              src={photo}
              alt={name}
              style={{ scale: imageScale }}
              className="w-24 h-24 rounded-full object-cover border-2 border-white dark:border-gray-200 shadow-sm"
            />
            <div className="flex flex-col items-center justify-center">
              <h4 className="font-bold play text-xl text-gray-800 dark:text-gray-200">
                {name}
              </h4>
              <div className="flex items-center gap-1 text-sm text-gray-800 dark:text-gray-200">
                <FaPaw className="text-xs" />
                <span>{designation}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-800 dark:text-gray-200 mt-1">
                <IoLocationOutline />
                <span>{location}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ReviewCard;
