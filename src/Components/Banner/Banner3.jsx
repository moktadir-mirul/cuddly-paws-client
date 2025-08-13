import React from "react";
import BannerImg3 from "../../assets/banner3.jpg";
import { Link } from "react-router";

const Banner3 = () => {
  return (
    <div className="relative h-[450px] w-full">
      <div className="z-20 absolute w-full h-full flex justify-center items-center">
        <div className="text-white dark:text-gray-200 text-center w-11/12 mx-auto space-y-0 md:space-y-3">
          <h1 className="text-4xl md:text-6xl play font-bold">
            Find Your Furry Soulmate Today!
          </h1>
          <p className="text-lg font-normal">
            Bring joy and unconditional love into your life. At Cuddly Paws, we
            believe every wagging tail and gentle purr deserves a forever home.
          </p>
          <Link to={"/listedpets"}>
            <button className="cursor-pointer px-16 py-3 bg-blue-600 dark:bg-blue-700 text-white dark:text-gray-200 font-medium text-xl rounded-full">
              Show Pets
            </button>
          </Link>
        </div>
      </div>
      <div className="z-10 absolute w-full h-full">
        <img
          className="w-full h-full object-cover object-center"
          src={BannerImg3}
          alt=""
        />
      </div>
    </div>
  );
};

export default Banner3;
