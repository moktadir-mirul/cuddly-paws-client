import { useForm, Controller } from "react-hook-form";
import { FileInput, Label } from "flowbite-react";
import axios from "axios";

import { useContext, useEffect, useState } from "react";
import TipTapEditor from "../../Components/TipTapEditor/TiptapEditor";
import { toast } from "react-toastify";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { AuthContext } from "../../AuthProvider/AuthContext";

const CreateDonationCampaign = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    control,
    setError,
    reset,
    formState: { errors },
  } = useForm();

  const [uploading, setUploading] = useState(false);
  useEffect(() => {
      document.title = "Create Campaign | Cuddly Paws"
    }, [])

  const handleImageUpload = async (imageFile) => {
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
    }
  };

  const onSubmit = async (data) => {
    if (!data.image[0])
      return setError("image", { message: "Profile image is required" });

    const imgUrl = await handleImageUpload(data.image[0]);

    const donId = `don${Math.random().toString(36).substring(2, 10)}`;

    const donationData = {
      ...data,
      donId,
      image: imgUrl,
      maxAmount: Number(data.maxAmount),
      deadline: data.deadline,
      shortDescription: data.shortDescription,
      longDescription: data.longDescription,
      createdAt: new Date().toISOString(),
      donationStatus: true,
      addedBy: user.displayName,
      email: user.email,
      userPhoto: user.photoURL,
    };

    try {
      axiosSecure
        .post("/donations", donationData)
        .then((res) => {
          if (res.data.insertedId) {
            Swal.fire({
              icon: "success",
              title: "Donation Campaign added successfully!",
              text: "Would you like to add another campaign?",
              showCancelButton: true,
              confirmButtonText: "Add Another",
              cancelButtonText: "No, View My Campaigns",
            }).then((result) => {
              if (result.isConfirmed) {
                // Navigate to add pet page
                navigate("/dashboard/createdonation");
              } else {
                // Navigate to my pets page
                navigate("/dashboard/mycampaigns");
              }
            });
          }
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Failed!!!",
            text: err.message,
            showConfirmButton: true,
          });
        });
      console.log("Donation Campaign:", donationData);

        reset();
    } catch (err) {
      console.error("Submission failed", err);
      toast(err.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-md shadow">
      <h2 className="text-3xl play font-bold mb-6 text-center text-blue-600 dark:text-sky-400">
        Create Donation Campaign
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Image Upload */}
        <div className="md:col-span-2">
          <Label htmlFor="image">Pet Picture</Label>
          <FileInput
            id="file"
            {...register("image", { required: true })}
            onChange={handleImageUpload}
          />
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image.message}</p>
          )}
        </div>

        {/* Pet Name */}
        <div>
          <label className="block mb-1 font-medium text-gray-900 dark:text-gray-200">
            Pet Name
          </label>
          <input
            {...register("name", { required: "Pet name is required" })}
            className="w-full border p-2 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Max Amount */}
        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
            Maximum Donation Amount (BDT)
          </label>
          <input
            type="number"
            {...register("maxAmount", {
              required: "Amount is required",
              min: { value: 20, message: "Minimum 20 Taka" },
              max: { value: 500000, message: "Maximum 500000 Taka" },
            })}
            className="w-full border p-2 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
          />
          {errors.maxAmount && (
            <p className="text-red-500 text-sm">{errors.maxAmount.message}</p>
          )}
        </div>

        {/* Deadline */}
        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
            Last Date of Donation
          </label>
          <input
            type="date"
            {...register("deadline", { required: "Deadline is required" })}
            className="w-full border p-2 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
          />
          {errors.deadline && (
            <p className="text-red-500 text-sm">{errors.deadline.message}</p>
          )}
        </div>

        {/* Short Description */}
        <div className="md:col-span-2">
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
            Short Description
          </label>
          <input
            {...register("shortDescription", {
              required: "Short description is required",
            })}
            className="w-full border p-2 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
          />
          {errors.shortDescription && (
            <p className="text-red-500 text-sm">
              {errors.shortDescription.message}
            </p>
          )}
        </div>

        {/* Long Description */}
        <div className="md:col-span-2">
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
            Long Description
          </label>
          <Controller
            name="longDescription"
            control={control}
            defaultValue=""
            rules={{ required: "Long description is required" }}
            render={({ field }) => (
              <TipTapEditor value={field.value} onChange={field.onChange} />
            )}
          />
          {errors.longDescription && (
            <p className="text-red-500 text-sm">
              {errors.longDescription.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <div className="md:col-span-2 text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-800 disabled:opacity-50 cursor-pointer"
            disabled={uploading}
          >
            {uploading ? "Submitting..." : "Create Campaign"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateDonationCampaign;
