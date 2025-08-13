import React, { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Banner1 from "./Banner1";
import Banner2 from "./Banner2";
import Banner3 from "./Banner3";


const Banner = () => {

  useEffect(() => {
    document.title = "Home | Cuddly Paws";
  }, []);
  let settings = {
    autoplay: true,
    autoplaySpeed: 3000,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="w-full bg-white dark:bg-gray-900 overflow-auto">
      <div className="w-full mx-auto">
        <Slider {...settings}>
          <div>
            <Banner1></Banner1>
          </div>
          <div>
            <Banner2></Banner2>
          </div>
          <div>
            <Banner3></Banner3>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Banner;
