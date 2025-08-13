import { useContext, useEffect, useState } from "react";
import { FaDonate, FaCalendarAlt, FaTint, FaShieldAlt } from "react-icons/fa";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingCard from "../../Components/LoadingState/DefaultLoading";
import ReadOnlyEditor from "../../Components/TipTapEditor/ReadOnlyEditor";
import StripeElement from "../../StripePayment/StripeElement";
import { AuthContext } from "../../AuthProvider/AuthContext";
import { MdDoNotDisturbOn } from "react-icons/md";

const DonationDetailsCard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
      document.title = "Details | Cuddly Paws"
    }, [])

  const {
    data: donation = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["donations", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations/${id}`);
      return res.data;
    },
    enabled: !!id, // Only run if ID exists
  });

  const { data: donations = [], isLoading: donationLoading } = useQuery({
    queryKey: ["donations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donations");
      return res.data.filter((donation) => donation.donationStatus === true);
    },
  });

  console.log(donations);

  const handleDonationModal = () => {
    if (!user) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
    setShowModal(true);
  };

  if (isLoading) return <LoadingCard></LoadingCard>;
  if (isError) return <p>Failed to load donation data.</p>;
  if (donationLoading) {
    return <LoadingCard />;
  }

  return (
    <div className="py-8 w-full bg-gray-50 dark:bg-gray-900">
      {/* Donation Card */}
      <div className="max-w-2xl mx-auto rounded-xl h-auto pb-6 shadow-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        {/* Header with image */}
        <div className="relative">
          <img
            src={donation.image}
            alt={donation.name}
            className="w-full h-80 lg:h-96 object-cover rounded-t-md"
          />
        </div>
        <div className="px-6 py-3">
          <h1 className="text-3xl font-bold text-blue-600 dark:text-sky-400 ">
            Donate with Love for {donation.name}
          </h1>
        </div>
        {/* Content */}
        <div className="px-6">
          {/* Short description */}
          <p className="text-xl text-gray-800 dark:text-gray-200 font-medium mb-6">
            {donation.shortDescription}
          </p>

          {/* Donation info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-full text-blue-600 dark:text-sky-400">
                  <FaDonate />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Highest Amount
                </h3>
              </div>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {donation.maxAmount}৳
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-full text-blue-600 dark:text-sky-400">
                  <FaCalendarAlt />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Last Donation Date
                </h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                {new Date(donation.deadline).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Long description */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
              <FaTint className="text-blue-500" />
              About {donation.name}'s Needs
            </h2>
            <div className="text-gray-600 dark:text-gray-400">
              <ReadOnlyEditor contentJSON={donation.longDescription} />
            </div>
          </div>

          {/* Donate button */}
          {donation.donationStatus ? (
            <button
              onClick={handleDonationModal}
              className="w-full cursor-pointer py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-lg font-bold text-lg flex items-center justify-center gap-2"
            >
              <FaDonate /> Give Donation
            </button>
          ) : (
            <button className="w-full cursor-not-allowed py-3 bg-blue-300 dark:bg-blue-400 text-white rounded-lg font-bold text-lg flex items-center justify-center gap-2">
              <MdDoNotDisturbOn /> Donation Paused
            </button>
          )}
        </div>
      </div>

      {/* Donation Modal */}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ModalHeader>Help {donation.name}</ModalHeader>
        <StripeElement></StripeElement>
      </Modal>

      <div className="max-w-2xl my-5 mx-auto rounded-xl h-auto pb-6 shadow-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <h1 className="text-xl mx-2 text-left font-bold py-5 text-blue-600 dark:text-sky-400">
          More Campaigns for you to donate...
        </h1>
        <div className="flex flex-col gap-5">
          {donations.slice(0, 3).map((don) => (
            <div className="max-w-2xl p-5 mx-2 rounded-2xl bg-gray-100 dark:bg-gray-700 flex flex-col md:flex-row items-center justify-center md:justify-between">
              <div>
                <img
                  className="h-14 w-14 rounded-xl "
                  src={don.image}
                  alt={don.name}
                />
              </div>
              <h1 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                {don.name} needs help
              </h1>
              <Link to={`/donations/${don._id}`}>
                <div>
                  <button className="cursor-pointer px-4 py-1 rounded-sm font-bold text-white bg-blue-600 dark:bg-blue-700 hover:bg-blue-800 duration-200 ">
                    Donate
                  </button>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonationDetailsCard;
