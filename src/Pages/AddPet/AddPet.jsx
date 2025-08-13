import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import TipTapEditor from "../../Components/TipTapEditor/TiptapEditor";
import Swal from "sweetalert2";
import { FileInput, HelperText, Label } from "flowbite-react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../../AuthProvider/AuthContext";

const petCategories = [
  { value: "Dog", label: "Dog" },
  { value: "Cat", label: "Cat" },
  { value: "Rabbit", label: "Rabbit" },
  { value: "Bird", label: "Bird" },
  { value: "Hamster", label: "Hamster" },
  { value: "Guinea Pig", label: "Guinea Pig" },
  { value: "Ferret", label: "Ferret" },
  { value: "Reptile", label: "Reptile" },
  { value: "Snake", label: "Snake" },
  { value: "Lizard", label: "Lizard" },
  { value: "Turtle", label: "Turtle" },
  { value: "Fish", label: "Fish" },
  { value: "Insect", label: "Insect" },
  { value: "Spider", label: "Spider" },
  { value: "Other", label: "Other" },
];

const dhakaLocations = [
  "Uttara, Dhaka",
  "Mirpur, Dhaka",
  "Dhanmondi, Dhaka",
  "Banani, Dhaka",
  "Gulshan, Dhaka",
  "Mohammadpur, Dhaka",
  "Bashundhara, Dhaka",
  "Badda, Dhaka",
  "Tejgaon, Dhaka",
  "Uttar Khan, Dhaka",
  "Khilgaon, Dhaka",
  "Wari, Dhaka",
  "Romna, Dhaka",
  "Kochukhet, Dhaka",
  "Cantonment, Dhaka",
  "Lalbagh, Dhaka",
  "Nilkhet, Dhaka",
  "Gulishtan, Dhaka",
  "Jatrabari, Dhaka",
  "Motijheel, Dhaka",
  "Baridhara, Dhaka", 
  "Mohakhali, Dhaka",
  "Shyamoli, Dhaka",
  "Sayedabad, Dhaka",
  "Agargaon, Dhaka",
  "Gendaria, Dhaka",
  "Bangshal, Dhaka",
  "Nababpur, Dhaka",
  "Farmgate, Dhaka",
  "Shahbag, Dhaka",
  "Hatirpool, Dhaka",
  "MoghBazar, Dhaka",
  "Malibagh, Dhaka",
  "Azimpur, Dhaka",
  "Khilkhet, Dhaka",
  "Rampura, Dhaka"
].map((loc) => ({ label: loc, value: loc }));

const AddPet = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const [upLoading, setUploading] = useState(false);
  useEffect(() => {
    document.title = "Add a Pet | Cuddly Paws"
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
    try {
      if (!data.image[0])
        return setError("image", { message: "Profile image is required" });

      const imgUrl = await handleImageUpload(data.image[0]);

      const petId = `cpp${Math.random().toString(36).substring(2, 10)}`;
      const petData = {
        ...data,
        petId,
        category: data.category.label,
        location: data.location.label,
        image: imgUrl,
        longDescription: data.longDescription,
        createdAt: new Date().toISOString(),
        adopted: false,
        addedBy: user.displayName,
        email: user.email,
        userPhoto: user.photoURL,
      };

      axiosSecure
        .post("/pets", petData)
        .then((res) => {
          if (res.data.insertedId) {
            Swal.fire({
              icon: "success",
              title: "Pet added successfully!",
              text: "Would you like to add another pet?",
              showCancelButton: true,
              confirmButtonText: "Add Another",
              cancelButtonText: "No, View My Pets",
            }).then((result) => {
              if (result.isConfirmed) {
                navigate("/dashboard/addpet");
                reset();
              } else {
                navigate("/dashboard/mypets");
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
    } catch (err) {
      console.error("Error adding pet:", err);
      toast.error(err.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-700 shadow-md rounded-md transition duration-300">
      <h2 className="play text-2xl font-bold text-center text-blue-600 dark:text-sky-400 mb-6">
        Add a Pet for Adoption
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div id="fileUpload" className="max-w-md md:col-span-2">
          <Label
            className="mb-2 block text-lg text-gray-900 dark:text-gray-200"
            htmlFor="petImage"
          >
            Pet Image
          </Label>
          <FileInput
            id="file"
            {...register("image", { required: true })}
            onChange={handleImageUpload}
            className="w-full dark:border-2 dark:border-gray-200"
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

        {/* Pet Age */}
        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
            Pet Age (in years)
          </label>
          <input
            type="number"
            {...register("age", {
              required: "Pet age is required",
              valueAsNumber: true,
              min: { value: 1, message: "Age must be at least 1" },
              max: { value: 60, message: "Age can't exceed 60" },
            })}
            className="w-full border p-2 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
          />
          {errors.age && (
            <p className="text-red-500 text-sm">{errors.age.message}</p>
          )}
        </div>

        {/* Category */}
        <div className="md:col-span-2 cu">
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
            Pet Category
          </label>
          <Controller
            name="category"
            control={control}
            className="bg-white dark:bg-gray-800"
            rules={{ required: "Pet category is required" }}
            render={({ field }) => (
              <Select
                {...field}
                options={petCategories}
                placeholder="Select category"
              />
            )}
          />
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
        </div>

        {/* Locations */}
        <div className="md:col-span-2">
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
            Pickup Location (Dhaka only)
          </label>
          <Controller
            name="location"
            control={control}
            rules={{ required: "Location is required" }}
            render={({ field }) => (
              <Select
                {...field}
                options={dhakaLocations}
                placeholder="Select location"
                className="react-select-container"
                classNamePrefix="react-select"
              />
            )}
          />
          {errors.location && (
            <p className="text-red-500 text-sm">{errors.location.message}</p>
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
            disabled={upLoading}
          >
            {upLoading ? "Submitting..." : "Add Pet"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPet;
