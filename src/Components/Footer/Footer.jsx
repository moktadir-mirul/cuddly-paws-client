import React from "react";
import FtImg from "../../assets/cuddly-logo.png";
import { Link, NavLink } from "react-router";
import { FaMobileRetro, FaXTwitter } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import { IoHome } from "react-icons/io5";
import {
  FaApple,
  FaFacebook,
  FaGooglePlay,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { CiYoutube } from "react-icons/ci";

const Footer = () => {
  return (
    <div className="w-full bg-blue-600 dark:bg-blue-700 text-white dark:text-gray-200">
      <div className="w-11/12 mx-auto pt-8 pb-5">
        {/* main footer area */}
        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-6 lg:gap-0">
          {/* Image area */}
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div>
              <img src={FtImg} alt="Cuddly paws" className="w-20 h-20" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold meri">Cuddly Paws</h1>
              <p className="text-justify text-base font-light">
                Redefining pet adoption through compassion and innovation.
                Cuddly Paws creates meaningful connections between pets and
                their perfect humans.
              </p>
            </div>
          </div>

          {/* Links area */}
          <div className="flex-1 flex flex-col items-center gap-5">
            <h1 className="text-2xl play font-bold">Pages</h1>
            <div className=" flex flex-col items-center gap-4">
              <NavLink to={"/"}>Home</NavLink>
              <NavLink to={"/listedPets"}>Listed Pets</NavLink>
              <NavLink to={"/donations"}>Donation Campaigns</NavLink>
            </div>
          </div>

          {/* Contacts Area */}
          <div className="flex-1 flex flex-col justify-center items-center text-center gap-5">
            <h1 className="text-2xl font-bold play">Contact Us</h1>
            <div className="space-y-2">
              <div className="flex gap-2 items-center">
                <HiOutlineMail size={20} />
                <h1>info@cuddlypaws.com</h1>
              </div>
              <div className="flex gap-2 items-center">
                <FaMobileRetro size={20} />
                <h1>+88-01711-140802</h1>
              </div>
              <div className="flex gap-2 items-center">
                <IoHome size={20} />
                <h1>Uttara, Dhaka</h1>
              </div>
            </div>
          </div>
          {/* Subscribe section */}
          <div className="flex-1 flex flex-col gap-3 items-center justify-center pb-5">
            <div className="space-y-3">
              <h1 className="play font-bold text-2xl text-center">
                Subscribe to our newsletter
              </h1>
              <p className="text-base font-light">
                Stay updated with heartwarming pet stories—subscribe to our
                newsletter!
              </p>
            </div>
            <div className="flex items-center w-full max-w-sm">
              <div className="relative flex-grow">
                <input
                  type="email"
                  placeholder="Your email"
                  required
                  className="block w-full pl-3 pr-3 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent
            bg-gray-50 dark:bg-gray-300 text-gray-900 dark:text-black"
                />
              </div>
              <button className="bg-gray-200 px-4 lg:px-2 py-2 md:px-8 md:py-2 dark:bg-gray-200 text-blue-600 hover:bg-blue-900 hover:text-white dark:text-blue-800 font-bold cursor-pointer rounded-r-lg">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Apps Area */}
      <div className="w-full bg-blue-700 dark:bg-blue-800">
        <div className="w-11/12 mx-auto pb-5">
          <div className="flex flex-col justify-center items-center gap-2">
            <h1 className="py-1 play font-bold text-2xl">Get Our App</h1>

            {/* Button Area */}
            <div className="flex flex-col md:flex-row gap-5 justify-center items-center">
              {/* Google Play Button */}
              <div>
                <Link
                  to="https://play.google.com/"
                  target="_blank"
                  className="flex items-center gap-2 bg-sky-600 dark:bg-sky-800 text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition"
                >
                  <FaGooglePlay size={50} color="saddlebrown dark:moccasin" />
                  <div className="text-left text-sm">
                    <p className="text-xs">Download on the</p>
                    <p className="font-semibold">Google Play</p>
                  </div>
                </Link>
              </div>

              {/* Apple Store Button */}
              <div>
                <Link
                  href="https://www.apple.com/app-store/"
                  target="_blank"
                  className="flex items-center gap-2 bg-sky-600 dark:bg-sky-800 text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition"
                >
                  <FaApple size={50} color="saddlebrown dark:moccasin" />
                  <div className="text-left text-sm">
                    <p className="text-xs">Download on the</p>
                    <p className="font-semibold">App Store</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright area */}
      <div className="w-full bg-blue-800 dark:bg-blue-900">
        <div className="w-11/12 mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <div className="flex justify-center items-center  gap-3 py-2">
                <Link to={"https://www.facebook.com/mirulkhan"} target="_blank">
                  <FaFacebook size={20} color="white" />
                </Link>
                <Link to={"https://x.com/MirulMoktadir"} target="_blank">
                  <FaXTwitter size={20} color="white" />
                </Link>
                <Link
                  to={"https://www.linkedin.com/in/mirulmoktadirkhan/"}
                  target="_blank"
                >
                  <FaLinkedin size={20} color="white" />
                </Link>
                <Link
                  to={"https://www.youtube.com/@mirulmoktadirkhan2127"}
                  target="_blank"
                >
                  <CiYoutube size={25} color="white" />
                </Link>
              </div>
            </div>
            <h1 className="text-center text-sm">
              © 2025 Cuddly Paws. All rights reserved.{" "}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
