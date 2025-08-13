import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";

import { FileInput, HelperText, Label } from "flowbite-react";

import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../AuthProvider/AuthContext";
import { ThemeContext } from "../../ThemeProvider/ThemeContext";
import Swal from "sweetalert2";

const Register = () => {
  const { darkMode } = useContext(ThemeContext);
  const { googleSignIn, emailSignUp, githubSignIn, updateUser } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [uploading, setUploading] = useState(false);
  useEffect(() => {
      document.title = "Register | Cuddly Paws"
    }, [])

  const uploadImageToImgbb = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);
    const apiKey = import.meta.env.VITE_ImgBB;
    const url = `https://api.imgbb.com/1/upload?key=${apiKey}`;

    try {
      setUploading(true);
      const res = await axios.post(url, formData);
      setUploading(false);
      return res.data.data.url;
    } catch (err) {
      setUploading(false);
      toast.error(err.message);
      throw new Error("Image upload failed");
    }
  };

  const onSubmit = async (data) => {
    try {
      if (!data.image[0]) {
        setError("image", { message: "Profile image is required" });
        return;
      }

      const imgUrl = await uploadImageToImgbb(data.image[0]);

      await emailSignUp(data.email, data.password);
      await updateUser(data.name, imgUrl);

      const userData = {
        name: data.name,
        email: data.email,
        photoURL: imgUrl,
        role: "user",
        createdAt: new Date().toISOString(),
      };
      await axios.post("https://cuddly-paws-server.vercel.app/users", userData);

      Swal.fire({
        title: "Registration Successful!",
        text: `Account created for ${data.email}`,
        icon: "success",
      });
      navigate("/");
    } catch (err) {
      let errorMessage = "Something went wrong!";

      if (err?.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }

      Swal.fire({
        title: "Registration Failed",
        text: errorMessage,
        icon: "error",
      });
    }
  };

  const handleGoogle = () => {
    googleSignIn()
      .then((res) => {
        const userDataG = {
          name: res.user.displayName,
          email: res.user.email,
          photoURL: res.user.photoURL,
          role: "user",
          createdAt: new Date().toISOString(),
        };

        // Post user data to server
        axios
          .post("https://cuddly-paws-server.vercel.app/users", userDataG)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Success!",
              text: "Signed in & data saved successfully!",
            });
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
          title: "Google Sign-In Failed",
          text: error.message || "Could not sign in with Google",
        });
      });
  };

  const handleGithub = () => {
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
              text: "Signed in with GitHub & data saved!",
            });
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Failed to save data",
              text: error.response?.data?.message || "Server error",
            });
          });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "GitHub Sign-In Failed",
          text: error.message || "Could not sign in with GitHub",
        });
      });
  };

  return (
    <div className="w-full bg-[url(./assets/reg.jpg)] dark:bg-[url(./assets/reg-d.jpg)] bg-no-repeat xl:h-screen bg-cover flex justify-center lg:justify-start items-center py-5 lg:pl-20">
      <div
        className={`${
          darkMode ? "form-bg-d" : "form-bg"
        } w-11/12 max-w-lg p-4 rounded-md shadow px-5 py-4 text-gray-900`}
      >
        <h2 className="mb-3 text-4xl font-bold text-blue-600 dark:text-sky-400 text-center play">
          Register Yourself!
        </h2>
        <p className="text-lg text-center text-gray-900 dark:text-gray-100">
          Already have an account?
          <Link
            to="/login"
            className="text-blue-600 dark:text-sky-400 font-bold hover:underline"
          >
            {" "}
            Login!{" "}
          </Link>
        </p>

        <div className="my-6 space-y-4">
          <button
            aria-label="Register with Google"
            type="button"
            onClick={handleGoogle}
            className="flex items-center justify-center gap-4 w-full p-4 text-lg font-medium rounded-md bg-blue-600 text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-800 cursor-pointer"
          >
            <div className="p-0.5 rounded-full bg-gray-50 dark:bg-gray-100">
              <FcGoogle size={30} />
            </div>
            <p>Register with Google</p>
          </button>
          <button
            onClick={handleGithub}
            aria-label="Register with GitHub"
            role="button"
            className="flex items-center justify-center gap-4 w-full p-4 text-lg font-medium rounded-md bg-blue-600 text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-800 cursor-pointer"
          >
            <FaGithub size={30} />
            <p>Register with GitHub</p>
          </button>
        </div>

        <div className="flex items-center w-full my-4">
          <hr className="w-full text-blue-600 dark:text-sky-400" />
          <p className="px-3 text-blue-600 dark:text-sky-400">OR</p>
          <hr className="w-full text-blue-600 dark:text-sky-400" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-lg font-medium dark:text-gray-200">
              Name
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              className="w-full px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-black dark:text-white"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="max-w-md">
            <Label className="mb-2 block text-lg" htmlFor="file">
              Upload Image
            </Label>
            <FileInput id="file" {...register("image", { required: true })} />
            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image.message}</p>
            )}
            <HelperText className="mt-1 font-light text-black dark:text-gray-100">
              A profile picture is useful to confirm that you are logged into
              your account
            </HelperText>
          </div>

          <div>
            <label className="block text-lg font-medium dark:text-gray-200">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-black dark:text-white"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="relative">
            <label className="block text-lg font-medium dark:text-gray-200">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "At least 6 characters" },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z]).+$/,
                  message: "Must include uppercase and lowercase letters",
                },
              })}
              className="w-full px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-black dark:text-white"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-9 right-6 px-2 py-1 rounded-md bg-gray-200 dark:bg-gray-400 cursor-pointer"
            >
              {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
            </span>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="w-full cursor-pointer px-4 py-3 font-semibold bg-blue-600 text-white rounded hover:bg-blue-800"
          >
            {uploading ? "Uploading..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
