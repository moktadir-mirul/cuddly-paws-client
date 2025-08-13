import { Link } from "react-router";
import { FaPaw } from "react-icons/fa";
import NavBar from "../../Components/NavBar/NavBar";
import { useEffect } from "react";

const Forbidden = () => {
  useEffect(() => {
      document.title = "Forbidden | Cuddly Paws"
    }, [])
  return (
    <div>
        <NavBar></NavBar>
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-800 px-4 text-center">
      <div className="max-w-md">
        <FaPaw className="text-6xl text-red-500 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
          403 - Forbidden
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Uh-oh! Looks like you don’t have permission to access this page. 🐾
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
        >
          Return Home
        </Link>
      </div>
    </div>
    </div>
  );
};

export default Forbidden;
