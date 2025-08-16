import React, { useContext, useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import { ThemeContext } from "../../ThemeProvider/ThemeContext";
import { AuthContext } from "../../AuthProvider/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";
import Swal from "sweetalert2";

const Login = () => {
  const { darkMode } = useContext(ThemeContext);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
      document.title = "Login | Cuddly Paws"
    }, [])

  const {googleSignIn,
    emailSignIn,
    githubSignIn,
} =useContext(AuthContext);

const handleGoogleLogIn = () => {
    googleSignIn()
      .then((res) => {
        const userDataG = {
          name: res.user.displayName,
          email: res.user.email,
          photoURL: res.user.photoURL,
          role: "user",
          createdAt: new Date().toISOString(),
        };

        axios
          .post("https://cuddly-paws-server.vercel.app/users", userDataG)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Success!",
              text: "Logged in successfully!",
            });
            navigate(location?.state || "/");
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Failed to save data",
              text: error.response?.data?.message || "Something went wrong",
            });
            
          });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Google Log-In Failed",
          text: error.message || "Could not sign in with Google",
        });
      });
  };

const handleGithubLogin = () => {
    githubSignIn()
      .then((res) => {
        const userDataGt = {
          name: res.user.displayName,
          email: res.user.email,
          photoURL: res.user.photoURL,
          role: "user",
          createdAt: new Date().toISOString(),
        };

        // Post user data to server
        axios
          .post("https://cuddly-paws-server.vercel.app/users", userDataGt)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Success!",
              text: "Logged in with GitHub!",
            });
            navigate(location?.state || "/");
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Failed to Log In",
              text: error.response?.data?.message || "Server error",
            });
          });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "GitHub Log in Failed",
          text: error.message || "Could not log in with GitHub",
        });
      });
  };

const handleEmailLogin = (e) => {
  e.preventDefault();
  setPasswordError("");
  const email = e.target.email.value;
  const password = e.target.password.value;
  const passReg = /(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passReg.test(password)) {
      return setPasswordError(
        "Password must contain one uppercase letter, one lower case letter and needs to be minimum six character long."
      );
    }
  emailSignIn(email, password)
   .then(() => {
    toast.success("Sign In with Email Successful");
    navigate(location?.state || "/");
  })
  .catch((err) => {
    toast.error(err.message);
  })
}

  return (
    <div className="w-full bg-[url(./assets/pet-login.jpg)] dark:bg-[url(./assets/pet-loginD.jpg)] bg-no-repeat bg-cover flex justify-center items-center py-5">
      <div
        className={`${
          darkMode ? "form-bg-d" : "form-bg"
        } w-11/12 max-w-md p-4 rounded-md shadow px-5 py-4 text-gray-900`}
      >
        <h2 className="mb-3 text-3xl font-bold text-blue-600 dark:text-sky-400 text-center play">
          Login to your account
        </h2>
        <p className="text-lg text-center text-gray-900 dark:text-gray-100">
          Dont have an account?{" "}
          <Link to={"/register"} className="text-blue-600 dark:text-sky-400 font-bold hover:underline">
            Register!
          </Link>
        </p>
        <div className="my-6 space-y-4">
          <button
            aria-label="Login with Google"
            type="button"
            onClick={handleGoogleLogIn}
            className="flex items-center justify-center gap-4 w-full p-4 text-lg font-medium rounded-md bg-blue-600 text-white hover:bg-blue-800 dark:bg-blue-700 dark:hover:bg-blue-800  cursor-pointer"
          >
            <div className="p-0.5 rounded-full bg-gray-50 dark:bg-gray-100">
              <FcGoogle size={30} />
            </div>
            <p>Login with Google</p>
          </button>
          <button
            aria-label="Login with GitHub"
            role="button"
            onClick={handleGithubLogin}
            className="flex items-center justify-center gap-4 w-full p-4 text-lg font-medium rounded-md bg-blue-600 text-white hover:bg-blue-800 dark:bg-blue-700 dark:hover:bg-blue-800 cursor-pointer"
          >
            <FaGithub size={30} />
            <p>Login with GitHub</p>
          </button>
        </div>
        <div className="flex items-center w-full my-4">
          <hr className="w-full text-blue-600 dark:text-sky-400" />
          <p className="px-3 text-blue-600 dark:text-sky-400">OR</p>
          <hr className="w-full text-blue-600 dark:text-sky-400" />
        </div>
        <form onSubmit={handleEmailLogin} className="space-y-8">
          <div className="space-y-4 text-gay-900 dark:text-gray-100">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-lg font-medium">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Your email"
                required
                className="w-full px-3 py-2 border rounded-md border-gray-300 dark:border-gray-600 bg-gray-50 text-gray-800 dark:bg-gray-700 dark:text-gray-100 focus:border-sky-600"
              />
            </div>
            <div className="relative space-y-2">
              <div className="flex justify-between">
                <label htmlFor="password" className="text-lg font-medium">
                  Password
                </label>
              </div>
              <input
                type={`${showPassword ? "text" : "password"}`}
                onClick={() => setPasswordError("")}
                name="password"
                id="password"
                required
                placeholder="Your Password"
                className="w-full px-3 py-2 border rounded-md border-gray-300 dark:border-gray-600 bg-gray-50 text-gray-800 dark:bg-gray-700 dark:text-gray-100"
              />
              <p
                onClick={() => setShowPassword(!showPassword)}
                className="px-2 py-1 cursor-pointer bg-gray-100 dark:bg-gray-800 absolute right-6 top-10 z-20 rounded-sm"
              >
                {showPassword ? (
                  <FaEye size={25} className="papayawhip dark:moccasine" />
                ) : (
                  <FaEyeSlash size={25} className="papayawhip dark:moccasine" />
                )}
              </p>
              <p className="text-red-700 dark:text-red-300">{passwordError}</p>
              <Link className="hover:text-blue-600 hover:underline">Forgot Password?</Link>
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-8 py-3 text-lg font-semibold rounded-md bg-blue-600 text-white hover:bg-blue-800  dark:bg-blue-700 dark:hover:bg-blue-800 cursor-pointer"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
