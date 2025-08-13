import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useContext, useEffect } from "react";
import Swal from "sweetalert2";
import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { AuthContext } from "../../AuthProvider/AuthContext";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaEdit, FaPause, FaPlay, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MyCampaigns = () => {
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);
  const [donators, setDonators] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  useEffect(() => {
      document.title = "My Campaigns | Cuddly Paws"
    }, [])

  const { data: donations = [], isLoading } = useQuery({
    queryKey: ["donations", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { data: allDonations = [] } = useQuery({
    queryKey: ["donation-payments"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation-payments`);
      return res.data;
    },
  });

  const { mutate: toggleStatus } = useMutation({
    mutationFn: async (donation) => {
      return axiosSecure.patch(`/donations/${donation._id}`, {
        donationStatus: !donation.donationStatus,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["donations", user?.email]);
    },
  });

  const handleToggleStatus = (donation) => {
    Swal.fire({
      title: `Are you sure you want to ${
        donation.donationStatus ? "pause" : "resume"
      } this donation?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        toggleStatus(donation);
      }
    });
  };

  const handleViewDonators = async (donId) => {
    const res = await axiosSecure.get(`/donation-payments?donId=${donId}`);
    setDonators(res.data);
    setOpenModal(true);
  };

  const handleEdit = (id) => {
    navigate(`/dashboard/updatecampaign/${id}`);
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
      <h2 className="text-3xl font-bold text-blue-600 dark:text-sky-400 play mb-6">
        My Donations
      </h2>

      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-blue-100 dark:bg-blue-700">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-200 uppercase tracking-wider">
                #
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-200 uppercase tracking-wider">
                Pet
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-200 uppercase tracking-wider">
                Max Amount
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-200 uppercase tracking-wider">
                Progress
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-200 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-200 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {donations.map((donation, index) => {
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
              return (
                <tr
                  key={donation._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">
                    {index + 1}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col items-center">
                      <img
                        src={donation.image}
                        alt={donation.name}
                        className="w-14 h-14 rounded-full object-cover"
                      />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {donation.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">
                    {donation.maxAmount}৳
                  </td>
                  {/* Progress */}
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
                  <td className="px-4 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {donation.donationStatus ? (
                      <span className="text-green-600">Running</span>
                    ) : (
                      <span className="text-red-500">Paused</span>
                    )}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap space-x-2">
                    <button
                      onClick={() => handleToggleStatus(donation)}
                      className={`cursor-pointer px-3 py-1 rounded-md text-white text-sm font-medium ${
                        donation.donationStatus
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      {donation.donationStatus ? "Pause" : "Resume"}
                    </button>

                    <button
                      onClick={() => handleEdit(donation._id)}
                      className="cursor-pointer px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleViewDonators(donation.donId)}
                      className="cursor-pointer px-3 py-1 rounded-md bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium"
                    >
                      View Donators
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader>Donators</ModalHeader>
        <ModalBody>
          {donators.length === 0 ? (
            <p>No one has donated yet.</p>
          ) : (
            <ul className="space-y-2">
              {donators.map((don) => (
                <div className="flex gap-1 items-center border-b py-2 dark:text-gray-100">
                  <li
                    key={don._id}
                    className="py-2 dark:text-gray-100"
                  >
                    <strong>{don.donatedBy}</strong> donated {don.amount}৳ to
                  </li>
                  <img className="w-10 h-10" src={don.image} alt="" />
                </div>
              ))}
            </ul>
          )}
        </ModalBody>
      </Modal>
    </div>
  );
};

export default MyCampaigns;
