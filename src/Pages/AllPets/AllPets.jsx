import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FaEdit, FaTrash, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useEffect } from "react";

const AllPets = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  useEffect(() => {
      document.title = "All Pets | Cuddly Paws"
    }, [])

  const { data: pets = [], isLoading } = useQuery({
    queryKey: ["pets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allpets");
      return res.data;
    },
  });

  const handleToggleAdopted = async (id, currentStatus) => {
    try {
      const result = await Swal.fire({
        title: `Mark as ${!currentStatus ? "Adopted" : "Not Adopted"}?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
      });
      if (result.isConfirmed) {
        await axiosSecure.patch(`/pets/${id}/status`, {
          adopted: !currentStatus,
        });
        queryClient.invalidateQueries(["pets"]);
        Swal.fire("Updated!", "", "success");
      }
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/pets/${id}`);
        queryClient.invalidateQueries(["pets"]);
        Swal.fire("Deleted!", "Pet has been deleted.", "success");
      } catch (err) {
        Swal.fire("Error", err.message, "error");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          <Skeleton width={250} />
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                {["Campaign", "Target", "Days Left", "Status"].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    <Skeleton width={80} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {[...Array(3)].map((_, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Skeleton circle width={40} height={40} />
                      <div className="ml-4">
                        <Skeleton width={100} height={20} />
                        <Skeleton width={150} height={16} className="mt-1" />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Skeleton width={80} height={20} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Skeleton width={60} height={20} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Skeleton width={60} height={20} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-4 pb-8">
      <h2 className="text-3xl font-bold text-blue-600 dark:text-sky-400 play mb-6">
        All Pets
      </h2>

      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-blue-100 dark:bg-blue-700">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-200 uppercase">
                #
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-200 uppercase">
                Pet
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-200 uppercase">
                Category
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-200 uppercase">
                Status
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-200 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {pets?.map((pet, index) => (
              <tr
                key={pet._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  {index + 1}
                </td>
                <td className="px-4 py-4 whitespace-nowrap flex items-center gap-2">
                  <img
                    src={pet.image}
                    alt={pet.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="text-gray-800 dark:text-white font-medium">
                    {pet.name}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">
                  {pet.category}
                </td>
                <td className="px-4 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {pet.adopted ? (
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Adopted
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                      Not Adopted
                    </span>
                  )}
                </td>
                <td className="px-4 py-7 whitespace-nowrap space-x-2 text-sm text-gray-700 dark:text-gray-300">
                  <Link
                    to={`/dashboard/updatepet/${pet.petId}`}
                    className="cursor-pointer px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    <FaEdit className="inline mr-1" /> Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(pet._id)}
                    className="cursor-pointer px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    <FaTrash className="inline mr-1" /> Delete
                  </button>
                  <button
                    onClick={() => handleToggleAdopted(pet._id, pet.adopted)}
                    className={`cursor-pointer px-2 py-1 rounded ${
                      pet.adopted
                        ? "bg-yellow-500 hover:bg-yellow-600"
                        : "bg-green-600 hover:bg-green-700"
                    } text-white`}
                  >
                    {pet.adopted ? (
                      <>
                        <FaTimesCircle className="inline mr-1" /> Mark as Not
                        Adopted
                      </>
                    ) : (
                      <>
                        <FaCheckCircle className="inline mr-1" /> Mark as
                        Adopted
                      </>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {pets.length === 0 && (
          <div className="text-center py-6 text-gray-500 dark:text-gray-300">
            You haven’t added any pets yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPets;
