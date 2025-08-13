import React, { useState, useEffect } from "react";
import PetCard from "./PetCard";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import LoadingCard from "../../Components/LoadingState/DefaultLoading";

const LIMIT = 6;

const ListedPets = () => {
  const axiosSecure = useAxiosSecure();
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const { ref, inView } = useInView();
  useEffect(() => {
    document.title = "Pets | Cuddly Paws"
  }, [])

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["pets", searchQuery, selectedCategory],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosSecure.get("/pets", {
        params: {
          page: pageParam,
          limit: LIMIT,
          search: searchQuery,
          category: selectedCategory,
        },
      });
      return res.data;
    },
    getNextPageParam: (lastPage, allPages) => {
      const totalLoaded = allPages.flatMap((p) => p.pets).length;
      return totalLoaded < lastPage.total ? allPages.length + 1 : undefined;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    refetch();
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    refetch();
  };

  if (isLoading) return <LoadingCard />;

  const pets = data?.pages.flatMap((page) => page.pets) || [];

  return (
    <div className="w-full bg-white dark:bg-gray-900 pb-10">
      <h2 className="text-center play font-bold tracking-tight text-blue-600 dark:text-sky-400 text-4xl md:text-6xl py-5">
        Listed pets for Adoption
      </h2>

      <div className="w-11/12 mx-auto flex flex-col md:flex-row gap-5 items-start md:items-center justify-between">
        {/* Search Box */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex-1 mb-4 flex flex-col md:flex-row items-start md:items-center gap-4"
        >
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search by pet name"
            className="px-4 py-2 rounded border max-w-sm w-full md:w-1/2 bg-white dark:bg-gray-800 dark:text-white"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Search
          </button>
        </form>

        {/* Category Dropdown */}
        <div className="mb-6">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="px-4 py-2 border rounded bg-white dark:bg-gray-800 dark:text-white"
          >
            <option value="">All Categories</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Rabbit">Rabbit</option>
            <option value="Bird">Bird</option>
            <option value="Hamster">Hamster</option>
            <option value="Guinea Pig">Guinea Pig</option>
            <option value="Ferret">Ferret</option>
            <option value="Reptile">Reptile</option>
            <option value="Snake">Snake</option>
            <option value="Lizard">Lizard</option>
            <option value="Turtle">Turtle</option>
            <option value="Fish">Fish</option>
            <option value="Insect">Insect</option>
            <option value="Spider">Spider</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {pets.length <= 0 ? (
        <div>
          <h2 className="text-center play font-bold tracking-tight text-blue-600 dark:text-sky-400 text-4xl md:text-6xl py-5">
            No pets Found!!!
          </h2>
        </div>
      ) : (
        <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {pets.map((pet) => (
            <PetCard key={pet._id} pet={pet} />
          ))}
        </div>
      )}

      {/* Intersection observer trigger */}
      <div ref={ref} className="h-10 col-span-full" />

      {isFetchingNextPage && (
        <div className="text-center text-gray-600 dark:text-gray-300 mt-4">
          Loading more pets...
        </div>
      )}

      {!hasNextPage && pets.length > 0 && (
        <p className="text-center text-gray-500 mt-4 dark:text-gray-300">
          🎉 You’ve reached the end!
        </p>
      )}
    </div>
  );
};

export default ListedPets;
