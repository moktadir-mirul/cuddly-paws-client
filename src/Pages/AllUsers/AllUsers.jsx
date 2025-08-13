import { useQuery } from "@tanstack/react-query";

import { FaUserShield, FaUser } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useEffect } from "react";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
      document.title = "All Users | Cuddly Paws"
    }, [])

  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleToggleRole = async (user) => {
    const newRole = user.role === "admin" ? "user" : "admin";

    const confirm = await Swal.fire({
      title: `Change role to ${newRole}?`,
      text: `Are you sure you want to make ${user.name} an ${newRole}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, change it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.put(`/users/role/${user._id}`, {
          role: newRole,
        });

        if (res.data.modifiedCount > 0) {
          Swal.fire("Success!", `User is now ${newRole}.`, "success");
          refetch(); // 🔄 Refresh the user list
        }
      } catch (error) {
        Swal.fire("Error", error.message, "error");
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
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-blue-600 dark:text-sky-400 play mb-6">
        Manage Users
      </h2>

      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-blue-100 dark:bg-blue-700">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-200 uppercase tracking-wider">#</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-200 uppercase tracking-wider">Photo</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-200 uppercase tracking-wider">Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-200 uppercase tracking-wider">Email</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-200 uppercase tracking-wider">Role</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-200 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {users.map((user, index) => (
              <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{index + 1}</td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <img
                    src={user.photoURL}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                  {user.name}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                  {user.email}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 capitalize">
                  {user.role}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleToggleRole(user)}
                    className="cursor-pointer flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-800 transition-all"
                  >
                    {user.role === "admin" ? <FaUser /> : <FaUserShield />}
                    {user.role === "admin" ? "Make User" : "Make Admin"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {users.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-300">
          No users found.
        </div>
      )}
    </div>
  );
};

export default AllUsers;
