import React from "react";
import BannerImg1 from "../../assets/banner2.jpg";
import { Link } from "react-router";

const Banner1 = () => {
  return (
    <div className="relative h-[450px] w-full">
      <div className="z-20 absolute w-full mx-auto  h-full flex justify-center items-center">
        <div className="text-white dark:text-gray-200 w-11/12 mx-auto text-center space-y-0 md:space-y-3">
          <h1 className="text-4xl md:text-6xl play font-bold">
            Beyond a Pet: Adopt a Heart, Discover Your Own.
          </h1>
          <p className="text-lg font-normal">
            Are you ready for a connection that truly changes everything? At
            Cuddly Paws, adopting isn't just about finding a companion; it's
            about embarking on a journey of mutual discovery.
          </p>
          <Link to={"/listedpets"}>
            <button className="cursor-pointer px-16 py-3 bg-blue-600 dark:bg-blue-700 text-white dark:text-gray-200 font-medium text-xl rounded-full">
              Explore More
            </button>
          </Link>
        </div>
      </div>
      <div className="z-10 absolute w-full h-full">
        <img
          className="w-full h-full object-cover object-center"
          src={BannerImg1}
          alt=""
        />
      </div>
    </div>
  );
};

export default Banner1;
