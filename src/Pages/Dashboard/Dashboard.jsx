import { useState, useEffect, useContext } from "react";
import { Outlet, NavLink, Link } from "react-router";
import {
  FaPlus,
  FaPaw,
  FaHeart,
  FaDonate,
  FaListUl,
  FaHandHoldingHeart,
  FaBars,
  FaTimes,
  FaUserCircle,
  FaHome,
  FaHandHoldingUsd,
} from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { FiLogOut } from "react-icons/fi";
import DarkToggle from "../../Components/DarkToggle/DarkToggle";
import CLogo from "../../assets/cuddly-logo.png";
import { AuthContext } from "../../AuthProvider/AuthContext";
import useUserRole from "../../Hooks/useUserRole";
import { IoPaw } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import LoadingCard from "../../Components/LoadingState/DefaultLoading";
import { toast } from "react-toastify";

const DashboardLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const { user, userLogOut } = useContext(AuthContext);
  const { role, roleBasedLoading } = useUserRole();
  useEffect(() => {
    document.title = "Dashboard | Cuddly Paws"
  }, [])


  // Check screen size and toggle mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if(roleBasedLoading) {
    return <LoadingCard></LoadingCard>
  }

  // Navigation links data
  const navLinks = (
    <>
      <Link
        to="/dashboard"
        className="flex items-center px-3 rounded-lg dark:text-gray-100"
      >
        <span className="mr-3">
          <FaHome />
        </span>
        <span>Dashboard Home</span>
      </Link>

      <NavLink
        to="/dashboard/addpet"
        className="flex items-center px-3 rounded-lg dark:text-gray-100"
      >
        <span className="mr-3">
          <FaPlus />
        </span>
        <span>Add a Pet</span>
      </NavLink>

      <NavLink
        to="/dashboard/mypets"
        className="flex items-center px-3 rounded-lg dark:text-gray-100"
      >
        <span className="mr-3">
          <FaPaw />
        </span>
        <span>My Added Pets</span>
      </NavLink>

      <NavLink
        to="/dashboard/adoptrequests"
        className="flex items-center px-3 rounded-lg dark:text-gray-100"
      >
        <span className="mr-3">
          <FaHeart />
        </span>
        <span>Adoption Requests</span>
      </NavLink>

      <NavLink
        to="/dashboard/createdonation"
        className="flex items-center px-3 rounded-lg dark:text-gray-100"
      >
        <span className="mr-3">
          <FaDonate />
        </span>
        <span>Create Donation Campaign</span>
      </NavLink>

      <NavLink
        to="/dashboard/mycampaigns"
        className="flex items-center px-3 rounded-lg dark:text-gray-100"
      >
        <span className="mr-3">
          <FaListUl />
        </span>
        <span>My Donation Campaigns</span>
      </NavLink>

      <NavLink
        to="/dashboard/mydonations"
        className="flex items-center px-3 rounded-lg dark:text-gray-100"
      >
        <span className="mr-3">
          <FaHandHoldingHeart />
        </span>
        <span>My Donations</span>
      </NavLink>

      {
        role == "admin" && <><NavLink
        to="/dashboard/allusers"
        className="flex items-center px-3 rounded-lg dark:text-gray-100"
      >
        <span className="mr-3">
          <GrUserAdmin />
        </span>
        <span>Make Admin</span>
      </NavLink>
      <NavLink
        to="/dashboard/allpets"
        className="flex items-center px-3 rounded-lg dark:text-gray-100"
      >
        <span className="mr-3">
          <GiHamburgerMenu />
        </span>
        <span>All Pets</span>
      </NavLink>

      <NavLink
        to="/dashboard/alldonations"
        className="flex items-center px-3 rounded-lg dark:text-gray-100"
      >
        <span className="mr-3">
          <FaHandHoldingUsd />
        </span>
        <span>All Donations Campaigns</span>
      </NavLink> </>
      }
    </>
  );

  const handleLogOut = () => {
    userLogOut()
    .then(() => {
      toast.success("User logged out successfully!")
    })
    .catch(err => toast.error(err.message))
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Top Navbar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-10 bg-blue-600 dark:bg-blue-700 text-white dark:text-gray-200 shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 dark:text-gray-300"
            >
              {isMobileMenuOpen ? (
                <FaTimes color="white" size={20} />
              ) : (
                <FaBars color="white" size={20} />
              )}
            </button>
            <Link to={"/"}>
              <div className="flex items-center gap-2">
                <img className="w-8 h-8" src={CLogo} alt="" />
                <span className="text-2xl font-bold text-white dark:text-gray-100 meri">
                  Cuddly Paws
                </span>
              </div>
            </Link>
          </div>
          <DarkToggle></DarkToggle>
        </div>
      </header>

      {/* Sidebar - Desktop */}
      <aside
        className={`hidden lg:flex flex-col w-64 border-r border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700`}
      >
        <Link to={"/"}>
          <div className=" flex items-center gap-2 px-2 py-4 border-b border-gray-200 dark:border-gray-600">
            <img className="w-8 h-8" src={CLogo} alt="" />
            <h1 className="text-2xl meri font-bold text-blue-600 dark:text-sky-400">
              Cuddly Paws
            </h1>
          </div>
        </Link>

        {/* User Profile */}
        <div className="flex items-center p-4 space-x-3 border-b border-gray-200 dark:border-gray-600">
          {user ? (
            <img
              src={user.photoURL}
              alt={user.displayName}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <FaUserCircle size={30} color="blue" />
          )}
          <span className="font-medium text-gray-700 dark:text-gray-200">
            {user ? user.displayName : "Name Loading"}
          </span>
          <DarkToggle></DarkToggle>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-3 p-2">{navLinks}</ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-600">
          <button onClick={handleLogOut} className="flex items-center w-full p-3 text-gray-600 bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors cursor-pointer">
            <FiLogOut className="mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && isMobileView && (
        <div
          className="fixed inset-0 z-20 backdrop-blur-xs backdrop-brightness-80 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-16 left-0 bottom-0 z-30 w-64 bg-white dark:bg-gray-700 shadow-lg transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* User Profile */}
        <div className="flex items-center p-4 space-x-3 border-b border-gray-200 dark:border-gray-600">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="User"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-medium text-gray-700 dark:text-gray-200">
            Sarah Johnson
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-1 p-2">{navLinks}</ul>
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-600">
          <button onClick={handleLogOut} className="flex items-center w-full p-3 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded-lg transition-colors cursor-pointer">
            <FiLogOut className="mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto pt-16 lg:pt-0">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
