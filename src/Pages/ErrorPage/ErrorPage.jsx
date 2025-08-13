import { Navbar } from "flowbite-react";
import React, { useEffect } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import errorImg from "../../assets/error-404.jpg";
import { Link } from "react-router";

const ErrorPage = () => {
  useEffect(() => {
      document.title = "Error | Cuddly Paws"
    }, [])
  return (
    <div className="w-full h-screen bg-gray-50 dark:bg-gray-900">
      <NavBar></NavBar>
      <div className="bg-gray-50 dark:bg-gray-900 flex flex-col justify-center items-center py-5 gap-5">
        <div className="w-10/12 mx-auto lg:w-5/12 rounded-md">
          <img
            className="rounded-lg"
            src={errorImg}
            alt="Error Image"
          />
        </div>
        <div>
          <Link to={"/"}>
            <button className="px-16 py-3 bg-blue-600 dark:bg-blue-700 text-white dark:text-gray-200 font-medium text-xl rounded-full cursor-pointer">
              Go Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
