import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { FaEdit, FaPause, FaPlay, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { AuthContext } from "../../AuthProvider/AuthContext";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { MdDeleteForever } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AllDonations = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  useEffect(() => {
      document.title = "All Donations | Cuddly Paws"
    }, [])

  const { data: donations = [], isLoading } = useQuery({
    queryKey: ["donations", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { data: allDonations = [] } = useQuery({
    queryKey: ["donation-payments"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/donation-payments`
      );
      return res.data;
    },
  });

  const handleStatusToggle = async (donation) => {
    const action = donation.donationStatus ? "pause" : "resume";
    const confirm = await Swal.fire({
      title: `Are you sure to ${action} this donation?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: `Yes, ${action}`,
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.patch(`/donations/${donation._id}`, {
          donationStatus: !donation.donationStatus,
        });
        queryClient.invalidateQueries(["donations", user?.email]);
        Swal.fire("Success", `Donation ${action}d successfully`, "success");
      } catch (err) {
        Swal.fire("Error", err.message, "error");
      }
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure to delete this donation?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/donations/${id}`);
        queryClient.invalidateQueries(["donations", user?.email]);
        Swal.fire("Deleted!", "Donation has been deleted.", "success");
      } catch (err) {
        Swal.fire("Error", err.message, "error");
      }
    }
  };

  const calculateDonationProgress = (raised, max) => {
    const total = parseFloat(max);
    const current = parseFloat(raised);
    const progress = Math.min((current / total) * 100, 100);
    return {
      raised,
      progress: isNaN(progress) ? 0 : progress.toFixed(2),
    };
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
      <h2 className="text-3xl play font-bold text-blue-600 dark:text-sky-400 mb-6">
        All Donation Campaigns
      </h2>

      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-blue-100 dark:bg-blue-700">
            <tr>
              <th className="px-4 py-3 text-left text-sm text-gray-900 dark:text-gray-200">
                #
              </th>
              <th className="px-4 py-3 text-left text-sm text-gray-900 dark:text-gray-200">
                Pet
              </th>
              <th className="px-4 py-3 text-left text-sm text-gray-900 dark:text-gray-200">
                Max Amount
              </th>
              <th className="px-4 py-3 text-left text-sm text-gray-900 dark:text-gray-200">
                Progress
              </th>
              <th className="px-4 py-3 text-left text-sm text-gray-900 dark:text-gray-200">
                Status
              </th>
              <th className="px-4 py-3 text-left text-sm text-gray-900 dark:text-gray-200">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {donations.map((donation, idx) => {
              const matchingDonations = allDonations.filter(
                (d) => d.donId === donation.donId
              );
              const totalRaised = matchingDonations.reduce(
                (sum, d) => sum + Number(d.amount),
                0
              );
              const { progress } = calculateDonationProgress(
                totalRaised,
                donation.maxAmount
              );
              const status = donation.donationStatus ? "Running" : "Paused";

              return (
                <tr
                  key={donation._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="px-4 py-3 text-gray-900 dark:text-white">
                    {idx + 1}
                  </td>
                  <td className="px-4 py-3 flex items-center gap-2">
                    <img
                      src={donation.image}
                      alt={donation.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <span className="text-sm text-gray-900 dark:text-white">
                      {donation.name}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                    {donation.maxAmount}৳
                  </td>
                  <td className="px-4 py-4">
                    <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-green-500 dark:bg-lime-400 h-full rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                      Raised: {totalRaised}৳ / {donation.maxAmount}৳
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Deadline:{" "}
                      {new Date(donation.deadline).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-green-600 dark:text-green-400">
                    {status}
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      onClick={() => handleStatusToggle(donation)}
                      className="cursor-pointer text-white bg-yellow-500 hover:bg-yellow-600 px-5 py-2 rounded"
                    >
                      {donation.donationStatus ? <FaPause /> : <FaPlay />}
                    </button>
                    <Link
                      to={`/dashboard/updatecampaign/${donation._id}`}
                      className="cursor-pointer text-white bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => handleDelete(donation._id)}
                      className="cursor-pointer text-white bg-red-600 hover:bg-red-700 px-5 py-2 rounded text-lg"
                    >
                      <MdDeleteForever />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {donations.length === 0 && (
        <p className="text-center py-6 text-gray-500 dark:text-gray-300">
          You haven't added any donation campaigns yet.
        </p>
      )}
    </div>
  );
};

export default AllDonations;
