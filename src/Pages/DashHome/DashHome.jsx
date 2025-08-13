import { FaPaw, FaDonate, FaRegClock } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useEffect } from "react";

const DashHome = () => {
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
      document.title = "Dashboard | Cuddly Paws"
    }, [])

  // Fetch pets data
  const { data: pets = [], isLoading: petsLoading } = useQuery({
    queryKey: ["pets"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/allpets");
      return data;
    },
  });

  // Fetch donations data
  const { data: donations = [], isLoading: donationsLoading } = useQuery({
    queryKey: ["donations"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/donations");
      return data;
    },
  });

  // Calculate stats
  const totalPets = pets.length;
  const totalCampaigns = donations.length;
  const ongoingCampaigns = donations.filter(
    (donation) => donation.donationStatus
  ).length;

  // ... (other imports remain the same)

  if (petsLoading || donationsLoading) {
    return (
      <div className="dark:bg-gray-900 min-h-screen p-4 md:p-8">

        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6">
          <Skeleton width={200} />
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Pets Card Skeleton */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <Skeleton width={100} height={20} />
                <Skeleton width={80} height={30} className="mt-2" />
              </div>
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                <Skeleton circle width={24} height={24} />
              </div>
            </div>
          </div>

          {/* Total Donation Campaigns Card Skeleton */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <Skeleton width={150} height={20} />
                <Skeleton width={80} height={30} className="mt-2" />
              </div>
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                <Skeleton circle width={24} height={24} />
              </div>
            </div>
          </div>

          {/* Ongoing Campaigns Card Skeleton */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <Skeleton width={150} height={20} />
                <Skeleton width={80} height={30} className="mt-2" />
              </div>
              <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-full">
                <Skeleton circle width={24} height={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Pets Section Skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            <Skeleton width={200} />
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="border rounded-lg overflow-hidden dark:border-gray-700"
              >
                <Skeleton height={160} />
                <div className="p-3">
                  <Skeleton width={100} height={20} />
                  <Skeleton count={2} className="mt-1" />
                  <div className="flex justify-between items-center mt-2">
                    <Skeleton width={60} height={20} />
                    <Skeleton width={80} height={20} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Campaigns Section Skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            <Skeleton width={250} />
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  {["Campaign", "Target", "Days Left", "Status"].map(
                    (header) => (
                      <th
                        key={header}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        <Skeleton width={80} />
                      </th>
                    )
                  )}
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
      </div>
    );
  }

  return (
    <div className="dark:bg-gray-900 min-h-screen p-4 md:p-8">

      <h1 className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-sky-400 mb-6">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Pets Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-500 dark:text-gray-300 text-sm font-medium">
                Total Pets
              </h3>
              <p className="text-2xl font-bold text-gray-800 dark:text-white mt-2">
                {totalPets}
              </p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
              <FaPaw className="text-blue-500 dark:text-blue-300 text-xl" />
            </div>
          </div>
        </div>

        {/* Total Donation Campaigns Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-500 dark:text-gray-300 text-sm font-medium">
                Total Campaigns
              </h3>
              <p className="text-2xl font-bold text-gray-800 dark:text-white mt-2">
                {totalCampaigns}
              </p>
            </div>
            <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
              <FaDonate className="text-green-500 dark:text-green-300 text-xl" />
            </div>
          </div>
        </div>

        {/* Ongoing Campaigns Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-500 dark:text-gray-300 text-sm font-medium">
                Ongoing Campaigns
              </h3>
              <p className="text-2xl font-bold text-gray-800 dark:text-white mt-2">
                {ongoingCampaigns}
              </p>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-full">
              <FaRegClock className="text-yellow-500 dark:text-yellow-300 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Pets Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          Recent Pets Added
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {pets.slice(0, 4).map((pet) => (
            <div
              key={pet._id}
              className="bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={pet.image}
                alt={pet.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-3">
                <h3 className="font-semibold text-gray-800 dark:text-white">
                  {pet.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {pet.shortDescription}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                    {pet.category}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(pet.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Campaigns Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          Active Donation Campaigns
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Campaign
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Target
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Days Left
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {donations
                .filter((donation) => donation.donationStatus)
                .slice(0, 5)
                .map((donation) => (
                  <tr
                    key={donation._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={donation.image}
                            alt={donation.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {donation.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {donation.shortDescription}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        ৳{donation.maxAmount}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {Math.ceil(
                          (new Date(donation.deadline) - new Date()) /
                            (1000 * 60 * 60 * 24)
                        )}{" "}
                        days
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          donation.donationStatus
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                        }`}
                      >
                        {donation.donationStatus ? "Active" : "Paused"}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashHome;
