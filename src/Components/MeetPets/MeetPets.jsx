import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import PetsLoading from "../LoadingState/PetsLoading";
import PetCard from "../../Pages/ListedPets/PetCard";

const MeetPets = () => {
  const axiosSecure = useAxiosSecure();
  const { data: pets = [], isLoading } = useQuery({
    queryKey: ["pets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/pets");
      return res.data;
    },
  });

  return (
    <div className="w-full bg-white dark:bg-gray-900">
      <section className="pt-8 md:pt-16 pb-10 mx-auto w-11/12">
        <h2 className="play text-4xl md:text-6xl font-bold text-center pb-1 text-blue-600 dark:text-sky-400 ">
          Meet Our Lovely Pets
        </h2>
        <p className="pt-1 text-center text-xl text-gray-800 dark:text-gray-200 mb-12 max-w-2xl mx-auto">
          Every pet has a unique story and endless love to give. Discover your
          new furry (or fluffy) best friend today.
        </p>
        {isLoading && <PetsLoading></PetsLoading>}
        {pets?.pets?.length <= 0 ? (
          <div>
            <h2 className="text-center play font-bold tracking-tight text-blue-600 dark:text-sky-400 text-4xl md:text-6xl py-5">
              No pets Found!!!
            </h2>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pets?.pets?.map((pet) => (
              <PetCard key={pet._id} pet={pet} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default MeetPets;
