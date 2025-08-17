import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { FaUser, FaCalendarAlt, FaPaw } from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../AuthProvider/AuthContext";


const MyProfile = () => {
    const {user} = useContext(AuthContext);
    useEffect(() => {
        document.title = "My Profile | Cuddly Paws"
    }, []);

    const axiosSecure = useAxiosSecure()

    const {data: profiles = [], isLoading} = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        }
    })

    const userNow = profiles?.filter(profile => profile.email === user.email);

  // Format the creation date
  const formattedDate = new Date(user?.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  if(isLoading) {
    return <p>Loading ...</p>
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">

      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6">
        {/* Profile Picture (Centered & Round) */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <img
              src={userNow?.photoURL}
              alt={userNow?.name}
              className="w-32 h-32 rounded-full border-4 border-blue-500 dark:border-blue-400 object-cover"
            />
            <div className="absolute -bottom-2 -right-2 bg-blue-500 dark:bg-blue-600 rounded-full p-2">
              <FaPaw className="text-white text-lg" />
            </div>
          </div>
        </div>

        {/* User Information (Centered) */}
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            {userNow.name}
          </h1>

          <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-300">
            <FaUser className="text-blue-500 dark:text-blue-400" />
            <span>{userNow?.role?.charAt(0).toUpperCase() + userNow?.role?.slice(1)}</span>
          </div>

          <p className="text-gray-600 dark:text-gray-300 break-all">
            {userNow?.email}
          </p>

          <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-300">
            <FaCalendarAlt className="text-blue-500 dark:text-blue-400" />
            <span>Joined: {formattedDate}</span>
          </div>
        </div>

        {/* Cuddly Paws Branding (Optional) */}
        <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Member of <span className="text-blue-500 font-semibold">Cuddly Paws</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;