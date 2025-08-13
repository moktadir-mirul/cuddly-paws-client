import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthContext";

const axiosSecure = axios.create({
  baseURL: "https://cuddly-paws-server.vercel.app",
});

const useAxiosSecure = () => {
  const { user } = useContext(AuthContext);


  axiosSecure.interceptors.request.use(
    (config) => {
      if (user?.accessToken) {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
