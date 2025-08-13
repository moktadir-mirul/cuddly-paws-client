import React, { useEffect } from "react";
import App from "../../App";
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";

const Home = () => {
    useEffect(() => {
        document.title = "Home | Cuddly Paws"
    }, [])
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        <NavBar></NavBar>
        <Outlet></Outlet>
        <ToastContainer></ToastContainer>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Home;
