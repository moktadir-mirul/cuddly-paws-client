import { Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaHome } from "react-icons/fa";
import {
  FaPaw,
  FaMapMarkerAlt,
  FaHeart,
  FaCheck,
  FaDog,
  FaCat,
  FaFish,
  FaSpider
} from "react-icons/fa";
import {
  GiHummingbird,
  GiEgyptianBird,
  GiSeatedMouse,
  GiSandSnake,
  GiSittingDog,
  GiSpiderAlt
} from "react-icons/gi";
import { SiAnimalplanet } from "react-icons/si";
import { IoBug, IoBugSharp } from "react-icons/io5";
import { GiRabbit, GiSnake, GiTurtle, GiMonkey } from "react-icons/gi";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Navigate, useLocation, useNavigate, useParams } from "react-router";
import LoadingCard from "../../Components/LoadingState/DefaultLoading";
import { AuthContext } from "../../AuthProvider/AuthContext";
import { useQuery } from "@tanstack/react-query";
import ReadOnlyEditor from "../../Components/TipTapEditor/ReadOnlyEditor";
import Swal from "sweetalert2";

const PetDetailsCard = () => {
  const { user } = useContext(AuthContext);
  const [showAdoptModal, setShowAdoptModal] = useState(false);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
      document.title = "Pet Details | Cuddly Paws"
    }, [])

  const {
    data: singlePet = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["pets", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/pets/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const petIcons = {
    dog: { icon: FaDog, bigIcon: GiSittingDog },
    cat: { icon: FaCat, bigIcon: FaCat },
    rabbit: { icon: GiRabbit, bigIcon: GiRabbit },
    bird: { icon: GiHummingbird, bigIcon: GiEgyptianBird },
    hamster: { icon: GiSeatedMouse, bigIcon: GiSeatedMouse },
    guinea_Pig: { icon: GiSeatedMouse, bigIcon: GiSeatedMouse}, 
    ferret: { icon: GiMonkey, bigIcon: GiMonkey },
    reptile: { icon: GiSnake, bigIcon: GiSnake },
    snake: { icon: GiSnake, bigIcon: GiSnake },
    lizard: { icon: GiSandSnake, bigIcon: GiSandSnake },
    turtle: { icon: GiTurtle, bigIcon: GiTurtle },
    fish: { icon: FaFish, bigIcon: FaFish },
    insect: { icon: IoBug, bigIcon: IoBugSharp},
    spider: { icon: FaSpider, bigIcon: GiSpiderAlt },
    other: { icon: SiAnimalplanet, bigIcon: SiAnimalplanet },
  };
  const categoryKey = singlePet?.category?.toLowerCase();
  const PetIcon = petIcons[categoryKey]?.icon || SiAnimalplanet;
  const BigPetIcon = petIcons[categoryKey]?.bigIcon || SiAnimalplanet;

  const handlePetModalOpen = () => {
    if (!user) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
    setShowAdoptModal(true);
  };

  const handleAdoptionSubmit = async () => {
    if (!user) {
      return <Navigate state={location?.pathname} to={"/login"}></Navigate>;
    }
    // Validate phone number (Bangladeshi format)
    if (!/^01[3-9]\d{8}$/.test(phone)) {
      setError("Please enter a valid 11-digit Bangladeshi phone number");
      return;
    }
    if (!address.trim()) {
      setError("Please enter your address");
      return;
    }

    // Prepare adoption data
    const adoptionData = {
      petId: singlePet.petId,
      petName: singlePet.name,
      petOwnerEmail: singlePet.email,
      petImage: singlePet.image,
      adoptedReqBy: user.displayName,
      adoptedReqByEmail: user.email,
      Phone: phone,
      address: address,
      reqStatus: "pending",
      createdAt: new Date().toISOString(),
    };

    await axiosSecure
      .post("/adoption-requests", adoptionData)
      .then(() => {
        console.log(adoptionData);
        Swal.fire({
          title: "Request Done!",
          text: `Adoption request submitted for ${singlePet.name}!`,
          icon: "success",
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Duplicate Request or Bad Request!",
          text: err?.response?.data?.message || "Something went wrong!",
          icon: "error",
        });
      });

    console.log("Adoption Data:", adoptionData);

    setShowAdoptModal(false);
  };

  if (isLoading) {
    return <LoadingCard></LoadingCard>;
  }

  if (isError) {
    return (
      <div>
        <h2 className="text-center play font-bold tracking-tight text-blue-600 dark:text-sky-400 text-4xl md:text-6xl py-5">
          No pet Found!!!
        </h2>
      </div>
    );
  }

  return (
    <div className="w-full py-5 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        {/* Header with image */}
        <div className="relative">
          <img
            src={singlePet.image}
            alt={singlePet.name}
            className="w-full h-96 object-cover object-center"
          />
        </div>
        <div className="text-gray-700 dark:text-gray-100 p-6 md:p-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/90 rounded-full ">
              <PetIcon color="white" className="text-4xl" />
            </div>
            <div className="space-y-3">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                <h1 className="text-3xl font-bold text-blue-600 dark:text-sky-400">
                  {singlePet.name}
                </h1>
                <h1>-{singlePet.shortDescription}</h1>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center">
                  <FaPaw className="mr-1" />
                  {singlePet.age}
                </span>
                <span className="flex items-center">
                  <FaMapMarkerAlt className="mr-1" />
                  {singlePet.location}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Main content */}
        <div className="px-6 md:px-8 py-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left column - Pet icon and status */}
          <div className="flex flex-col items-center md:items-start">
            <div className="text-blue-500 dark:text-blue-400 mb-4">
              <BigPetIcon className="text-7xl" />
            </div>
            <div
              className={`px-4 py-2 rounded-full font-medium ${
                singlePet.adopted
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
              }`}
            >
              {singlePet.adopted ? "Already Adopted" : "Available for Adoption"}
            </div>
          </div>

          {/* Middle column - Description */}
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
              About {singlePet.name}
            </h2>
            <div className="text-gray-700 dark:text-gray-300 mb-6">
              <ReadOnlyEditor contentJSON={singlePet.longDescription} />
            </div>

            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
              Quick Facts
            </h3>
            <ul className="grid grid-cols-2 gap-2 mb-6">
              <li className="flex items-center text-gray-600 dark:text-gray-400">
                <FaPaw className="mr-2 text-blue-500" /> {singlePet.age} years
                old
              </li>
              <li className="flex items-center text-gray-600 dark:text-gray-400">
                <FaMapMarkerAlt className="mr-2 text-blue-500" />{" "}
                {singlePet.location}
              </li>
              <li className="flex items-center text-gray-600 dark:text-gray-400">
                <PetIcon className="mr-2 text-blue-500" /> {singlePet.category}
              </li>
              <li className="flex items-center text-gray-600 dark:text-gray-400">
                <FaHeart className="mr-2 text-blue-500" /> Good with kids
              </li>
            </ul>
          </div>
        </div>

        {/* Footer with action button */}
        <div className="px-6 pb-6 md:px-8 md:pb-8 border-t border-gray-200 dark:border-gray-700">
          <button
            disabled={singlePet.adopted}
            onClick={handlePetModalOpen}
            className={`w-full py-3 rounded-lg font-bold text-white transition-colors cursor-pointer ${
              singlePet.adopted
                ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-800 dark:bg-blue-700 dark:hover:bg-blue-900"
            } flex items-center justify-center gap-2`}
          >
            {singlePet.adopted ? (
              <>
                <FaCheck /> Already Adopted
              </>
            ) : (
              <>
                <FaHeart /> Adopt {singlePet.name}
              </>
            )}
          </button>
        </div>
        {/* Adoption Modal */}
        <Modal
          show={showAdoptModal}
          onClose={() => setShowAdoptModal(false)}
          size="md"
        >
          <ModalHeader>Adopt {singlePet.name}</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              {/* Pet Info (display only) */}
              <div className="flex items-center gap-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <img
                  src={singlePet.image}
                  alt={singlePet.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white">
                    {singlePet.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    ID: PET-{singlePet.petId}
                  </p>
                </div>
              </div>

              {/* User Info (auto-filled) */}
              <div>
                <label className=" mb-1 text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                  <FaUser className="mr-2 text-blue-500" /> Name
                </label>
                <input
                  type="text"
                  value={user?.displayName}
                  disabled
                  className="w-full p-2 bg-gray-100 dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
                />
              </div>

              <div>
                <label className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                  <FaEnvelope className="mr-2 text-blue-500" /> Email
                </label>
                <input
                  type="email"
                  value={user?.email}
                  disabled
                  className="w-full p-2 bg-gray-100 dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
                />
              </div>

              {/* Phone (editable) */}
              <div>
                <label className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                  <FaPhone className="mr-2 text-blue-500" /> Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setError("");
                  }}
                  placeholder="01XXXXXXXXX"
                  className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                  maxLength={11}
                />
              </div>
              {error && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {error}
                </p>
              )}

              {/* Address (editable) */}
              <div>
                <label className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                  <FaHome className="mr-2 text-blue-500" /> Your Address
                </label>
                <textarea
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    setError("");
                  }}
                  rows={3}
                  className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                  placeholder="Full address where the pet will live"
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              onClick={handleAdoptionSubmit}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-lg font-medium cursor-pointer"
            >
              Submit Adoption Request
            </button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
    // <div className="max-w-2xl mx-auto rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
    //   {/* Pet Image - Full width */}
    //   <img
    //     src={pet.petImage}
    //     alt={pet.petName}
    //     className="w-full h-64 object-cover"
    //   />

    //   {/* Content below image */}
    //   <div className="p-6">
    //     {/* Pet name and basic info */}
    //     <div className="flex items-center gap-3 mb-3">
    //       <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full text-blue-600 dark:text-blue-300">
    //         <PetIcon />
    //       </div>
    //       <div>
    //         <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{pet.petName}</h1>
    //         <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-300">
    //           <span className="flex items-center">
    //             <FaPaw className="mr-1" /> {pet.petAge}
    //           </span>
    //           <span className="flex items-center">
    //             <FaMapMarkerAlt className="mr-1" /> {pet.petLocation}
    //           </span>
    //         </div>
    //       </div>
    //     </div>

    //     {/* Short description */}
    //     <p className="text-gray-700 dark:text-gray-300 mb-4">
    //       {pet.shortDescription}
    //     </p>

    //     {/* Long description */}
    //     <p className="text-gray-600 dark:text-gray-400 mb-6">
    //       {pet.longDescription}
    //     </p>

    //     {/* Adoption status and button */}
    //     <div className="flex items-center justify-between">
    //       <span className={`px-3 py-1 rounded-full text-sm font-medium ${
    //         pet.adopted
    //           ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    //           : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    //       }`}>
    //         {pet.adopted ? 'Already Adopted' : 'Available'}
    //       </span>

    //       <button
    //         disabled={pet.adopted}
    //         className={`px-4 py-2 rounded-lg font-medium ${
    //           pet.adopted
    //             ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-300 cursor-not-allowed'
    //             : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-900 text-white'
    //         } flex items-center gap-2`}
    //       >
    //         {pet.adopted ? (
    //           <>
    //             <FaCheck /> Adopted
    //           </>
    //         ) : (
    //           <>
    //             <FaHeart /> Adopt Now
    //           </>
    //         )}
    //       </button>
    //     </div>
    //   </div>
    // </div>
    // <div className="max-w-2xl mx-auto rounded-xl overflow-hidden shadow-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
    //   {/* Hero Image */}
    //   <div className="relative">
    //     <img
    //       src={pet.petImage}
    //       alt={pet.petName}
    //       className="w-full h-80 object-cover"
    //     />
    //   </div>

    //   {/* Content below image */}
    //   <div className="p-6">
    //     {/* Pet name and category */}
    //     <div className="flex items-start justify-between mb-4">
    //       <div>
    //         <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{pet.petName}</h1>
    //         <div className="flex items-center mt-1 text-blue-600 dark:text-blue-400">
    //           <PetIcon className="mr-2" />
    //           <span>{pet.petCategory}</span>
    //         </div>
    //       </div>
    //       <div className={`px-3 py-1 rounded-full text-sm font-medium ${
    //         pet.adopted
    //           ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    //           : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    //       }`}>
    //         {pet.adopted ? 'Adopted' : 'Available'}
    //       </div>
    //     </div>

    //     {/* Short description - prominent */}
    //     <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 font-medium">
    //       {pet.shortDescription}
    //     </p>

    //     {/* Age and location */}
    //     <div className="flex gap-4 mb-6">
    //       <div className="flex items-center text-gray-600 dark:text-gray-400">
    //         <FaPaw className="mr-2 text-blue-500" />
    //         <span>{pet.petAge}</span>
    //       </div>
    //       <div className="flex items-center text-gray-600 dark:text-gray-400">
    //         <FaMapMarkerAlt className="mr-2 text-blue-500" />
    //         <span>{pet.petLocation}</span>
    //       </div>
    //     </div>

    //     {/* Long description */}
    //     <div className="mb-8">
    //       <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">About Me</h2>
    //       <p className="text-gray-600 dark:text-gray-400">
    //         {pet.longDescription}
    //       </p>
    //     </div>

    //     {/* Adoption button */}
    //     <button
    //       disabled={pet.adopted}
    //       className={`w-full py-3 rounded-lg font-bold ${
    //         pet.adopted
    //           ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-300 cursor-not-allowed'
    //           : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-900 text-white'
    //       } flex items-center justify-center gap-2`}
    //     >
    //       {pet.adopted ? (
    //         <>
    //           <FaCheck /> Successfully Adopted
    //         </>
    //       ) : (
    //         <>
    //           <FaHeart /> Adopt {pet.petName}
    //         </>
    //       )}
    //     </button>
    //   </div>
    // </div>
  );
};

export default PetDetailsCard;
