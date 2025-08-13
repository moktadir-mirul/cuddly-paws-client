import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { useNavigate, useParams } from "react-router";
import { FileInput, HelperText, Label } from "flowbite-react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import TipTapEditor from "../../Components/TipTapEditor/TiptapEditor";
import Swal from "sweetalert2";
import LoadingCard from "../../Components/LoadingState/DefaultLoading";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

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

const UpdatePet = () => {
  const { petId } = useParams();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [imageURL, setImageURL] = useState("");
  const [upLoading, setUploading] = useState(false);
  useEffect(() => {
      document.title = "Update Pet | Cuddly Paws"
    }, [])

  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm();

  // Get existing pet data
  const { data: petData, isLoading } = useQuery({
    queryKey: ["pet", petId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/pets/${petId}`);
      return res.data;
    },
    enabled: !!petId,
  });

  const mutation = useMutation({
    mutationFn: async (updatedData) => {
      const res = await axiosSecure.put(`/pets/${petId}`, updatedData);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Pet updated successfully!");
      queryClient.invalidateQueries(["pet", petId]);
    },
    onError: (err) => {
      toast.error("Update failed: " + err.message);
    },
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
    const finalImage = imageURL || petData.image;
    if (!finalImage) {
      return setError("image", { message: "Pet image is required." });
    }

    const updatedPet = {
      ...data,
      age: parseInt(data.age),
      image: finalImage,
      category: data.category.value,
      location: data.location.value,
      longDescription: data.longDescription,
      petId: petData.petId,
      createdAt: petData.createdAt,
      adopted: petData.adopted,
      addedBy: petData.addedBy,
      email: petData.email,
      userPhoto: petData.userPhoto,
    };

    // Ask for confirmation before update
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update this pet information?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    });

    if (result.isConfirmed) {
      mutation.mutate(updatedPet, {
        onSuccess: () => {
          Swal.fire("Updated!", "Pet information has been updated.", "success");
          navigate("/dashboard/mypets")
        },
        onError: (err) => {
          Swal.fire("Error!", err.message, "error");
        },
      });
    }
  } catch (err) {
    Swal.fire("Error!", err.message, "error");
  }
};

  if (isLoading || !petData) return <LoadingCard />;

  const initCategory = { value: petData.category, label: petData.category };
  const initLocation = { value: petData.location, label: petData.location };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-700 shadow-md rounded-md">
      <h2 className="play text-2xl font-bold text-center text-blue-600 dark:text-sky-400 mb-6">
        Update the Pet
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pet Image */}
        <div className="md:col-span-2">
          <img className="w-20 h-20 mb-2" src={imageURL || petData.image} alt="Pet" />
          <Label htmlFor="petImage" className="block mb-1 font-medium text-gray-900 dark:text-gray-200">
            Pet Image
          </Label>
          <FileInput
            id="petImage"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files[0];
              if (file) {
                const url = await handleImageUpload(file);
                if (url) setImageURL(url);
              }
            }}
          />
          {!imageURL && (
            <HelperText className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Choose a file to update image
            </HelperText>
          )}
        </div>

        {/* Pet Name */}
        <div>
          <label className="block mb-1 font-medium text-gray-900 dark:text-gray-200">
            Pet Name
          </label>
          <input
            {...register("name", { required: "Pet name is required" })}
            defaultValue={petData.name}
            className="w-full border p-2 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        {/* Pet Age */}
        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
            Pet Age (1 - 60)
          </label>
          <input
            type="number"
            {...register("age", {
              required: "Pet age is required",
              valueAsNumber: true,
              min: { value: 1, message: "Age must be at least 1" },
              max: { value: 60, message: "Age can't exceed 60" },
            })}
            defaultValue={petData.age}
            className="w-full border p-2 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
          />
          {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
        </div>

        {/* Category */}
        <div className="md:col-span-2">
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
            Pet Category
          </label>
          <Controller
            name="category"
            control={control}
            defaultValue={initCategory}
            rules={{ required: "Pet category is required" }}
            render={({ field }) => <Select {...field} options={petCategories} />}
          />
          {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
        </div>

        {/* Location */}
        <div className="md:col-span-2">
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
            Pickup Location (Dhaka only)
          </label>
          <Controller
            name="location"
            control={control}
            defaultValue={initLocation}
            rules={{ required: "Location is required" }}
            render={({ field }) => <Select {...field} options={dhakaLocations} />}
          />
          {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
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
            defaultValue={petData.shortDescription}
            className="w-full border p-2 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
          />
          {errors.shortDescription && (
            <p className="text-red-500 text-sm">{errors.shortDescription.message}</p>
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
            defaultValue={petData.longDescription}
            rules={{ required: "Long description is required" }}
            render={({ field }) => (
              <TipTapEditor value={field.value} onChange={field.onChange} />
            )}
          />
          {errors.longDescription && (
            <p className="text-red-500 text-sm">{errors.longDescription.message}</p>
          )}
        </div>

        {/* Submit */}
        <div className="md:col-span-2 text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-800 disabled:opacity-50"
            disabled={mutation.isPending || upLoading}
          >
            {mutation.isPending ? "Updating..." : "Update Pet"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePet;
