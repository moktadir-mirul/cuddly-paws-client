import { useForm, Controller } from "react-hook-form";
import { FileInput, Label } from "flowbite-react";
import axios from "axios";

import { useEffect, useState } from "react";
import TipTapEditor from "../../Components/TipTapEditor/TiptapEditor";
import { toast } from "react-toastify";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import LoadingCard from "../../Components/LoadingState/DefaultLoading";
import Swal from "sweetalert2";

const UpdateDonationCampaign = () => {
  const {
    register,
    handleSubmit,
    control,
    setError,
    // reset,
    formState: { errors },
  } = useForm();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  useEffect(() => {
      document.title = "Update Campaign | Cuddly Paws"
    }, [])

  const { id } = useParams();
  const axiosSecure = useAxiosSecure();


  const [imageURL, setImageURL] = useState("");
  const [uploading, setUploading] = useState(false);

  const { data: donation = {}, isLoading } = useQuery({
    queryKey: ["donation", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations/${id}`);
      return res.data;
    },
    enabled: !!id,
  });


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
      toast.error("Image upload failed.", err.message);
      return null;
    }
  };

  const onSubmit = async (data) => {
    try {
      const finalImage = imageURL || donation.image;
    if (!finalImage) {
      return setError("image", { message: "Pet image is required." });
    }
      const updateDonationData = {
      ...data,
      donId: donation.donId,
      image: finalImage,
      maxAmount: Number(data.maxAmount),
      createdAt: donation.createdAt,
      addedBy: donation.addedBy,
      donationStatus: donation.donationStatus,
      email: donation.email,
      userPhoto: donation.userPhoto,
    };

   const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update this donation campaign?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    });

    if (result.isConfirmed) {
      const res = await axiosSecure.put(`/donations/${donation._id}`, updateDonationData);

      if (res.data.modifiedCount > 0) {
        Swal.fire("Updated!", "Donation campaign has been updated.", "success");
        // optionally invalidate or refetch queries manually if needed
        await queryClient.invalidateQueries(["donation", donation._id]);
        navigate("/dashboard/mycampaigns")
      } else {
        Swal.fire("No changes made", "Nothing was updated.", "info");
      }
    }
  } catch (err) {
    Swal.fire("Error!", err.message || "Failed to update donation.", "error");
  }
};

  if (isLoading) {
    return <LoadingCard></LoadingCard>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-md shadow">
      <h2 className="text-3xl play font-bold mb-6 text-center text-blue-600 dark:text-sky-400">
        Update Donation Campaign
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Image Upload */}
        <div className="md:col-span-2">
          <img
            className="w-20 h-20 mb-2"
            src={imageURL || donation.image}
            alt="Pet"
          />
          <Label htmlFor="image">Pet Picture</Label>
          <FileInput id="image" onChange={async (e) => {
              const file = e.target.files[0];
              if (file) {
                const url = await handleImageUpload(file);
                if (url) setImageURL(url);
              }
            }} />
          {!imageURL && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Choose a file to update image
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-900 dark:text-gray-200">
            Pet Name
          </label>
          <input
            {...register("name", { required: "Pet name is required" })}
            defaultValue={donation.name}
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
            defaultValue={donation.maxAmount}
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
            defaultValue={donation.deadline}
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
            defaultValue={donation.shortDescription}
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
            defaultValue={donation.longDescription}
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
            {uploading ? "Submitting..." : "Update Campaign"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateDonationCampaign;
