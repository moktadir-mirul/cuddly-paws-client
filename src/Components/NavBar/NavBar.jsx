import React, { useContext } from "react";
import {
  Avatar,
  Button,
  DarkThemeToggle,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import cuddlyLogo from "../../assets/cuddly-logo.png";
import { Link, NavLink, useNavigate } from "react-router";
import DarkToggle from "../DarkToggle/DarkToggle";
import { AuthContext } from "../../AuthProvider/AuthContext";
import { toast } from "react-toastify";

const NavBar = () => {
  const { user, userLogOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    userLogOut()
      .then(() => {
        toast.info("User logged out!");
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  return (
    <div className="w-full bg-blue-600 dark:bg-blue-700 sticky top-0 z-50">
      <Navbar
        className="bg-blue-600 dark:bg-blue-700 w-11/12 px-0 mx-auto text-white dark:text-gray-200 py-3"
        fluid
        rounded
      >
        <div>
          <Link to={"/"}>
            <div className="flex items-center">
              <img
                src={cuddlyLogo}
                className="mr-3 h-6 sm:h-9"
                alt="Flowbite React Logo"
              />
              <h1 className="meri text-xl md:text-3xl font-bold">
                Cuddly Paws
              </h1>
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-2 md:order-2">
          {/* <DarkThemeToggle className="bg-gray-100"></DarkThemeToggle> */}
          <DarkToggle></DarkToggle>
          {user ? (
            <Dropdown
              className="bg-blue-600 dark:bg-blue-800 hover:text-white text-white dark:text-gray-200"
              arrowIcon={false}
              inline
              label={
                // <Avatar
                //   alt={user.displayName}
                //   img={user.photURL}
                //   rounded
                //   size="md"
                // />
                <img
                  src={user.photoURL}
                  className="w-14 h-14 rounded-full cursor-pointer"
                  alt={user.displayName}
                />
              }
            >
              <DropdownHeader className="bg-blue-600 dark:bg-blue-800 hover:text-white text-white dark:text-gray-200">
                <span className="block text-base font-medium">
                  {user.displayName}
                </span>
                <span className="block truncate text-sm font-medium">
                  {user.email}
                </span>
              </DropdownHeader>
              {/* <Link to={"/dashboard"}>
                <DropdownItem className="bg-blue-600 dark:bg-blue-800 hover:text-black text-white dark:text-gray-200">
                  Dashboard
                </DropdownItem>
              </Link> */}
              <DropdownDivider />
              <DropdownItem
                className="bg-blue-600 dark:bg-blue-800 hover:text-black text-white dark:text-gray-200"
                onClick={handleLogOut}
              >
                Sign out
              </DropdownItem>
            </Dropdown>
          ) : (
            <Link to={"/login"}>
              <button className="bg-white px-4 py-1 md:px-8 md:py-2 dark:bg-gray-200 text-blue-600 hover:bg-blue-900 hover:text-white dark:text-blue-800 font-bold cursor-pointer rounded-md">
                Log In
              </button>
            </Link>
          )}

          <NavbarToggle className="text-white dark:text-gray-200" />
        </div>

        <NavbarCollapse className="font-semibold md:flex text-center">
          <NavLink className="text-base" to={"/"}>
            Home
          </NavLink>
          <NavLink to={"/listedpets"} className="text-base">
            Listed Pets
          </NavLink>
          <NavLink to={"/donations"} className="text-base">
            Donation Campaigns
          </NavLink>
          {user && <>
          <NavLink to={"/dashboard"} className="text-base">
            Dashboard
          </NavLink>
          <NavLink to={"/dashboard/mypets"} className="text-base">
            My Pets
          </NavLink>
          </>}
        </NavbarCollapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
