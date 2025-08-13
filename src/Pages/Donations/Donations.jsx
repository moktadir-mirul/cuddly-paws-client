import React, { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import DonationCard from "./DonationCard";
import LoadingCard from "../../Components/LoadingState/DefaultLoading";

const Donations = () => {
  const axiosSecure = useAxiosSecure();
  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["donationsInfinite"],
      queryFn: async ({ pageParam = 1 }) => {
        const res = await axiosSecure.get(
          `/donations/infinite?page=${pageParam}&limit=6`
        );
        return res.data;
      },
      getNextPageParam: (lastPage, pages) => {
        return lastPage.hasMore ? pages.length + 1 : undefined;
      },
    });

  useEffect(() => {
    document.title = "Campaigns | Cuddly Paws";
  }, []);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) return <LoadingCard />;

  const allDonations = data?.pages.flatMap((page) => page.donations) || [];

  if (allDonations.length <= 0) {
    return (
      <div className="py-10">
        <h2 className="text-center play font-bold tracking-tight text-blue-600 dark:text-sky-400 text-4xl md:text-6xl py-5">
          No Donation Campaigns Found!!!
        </h2>
      </div>
    );
  }

  return (
    <div className="w-full bg-white dark:bg-gray-900 pb-10">
      <h2 className="text-center play font-bold tracking-tight text-blue-600 dark:text-sky-400 text-4xl md:text-6xl py-8">
        Ongoing Donation Campaigns
      </h2>
      <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {allDonations.map((campaign) => (
          <DonationCard key={campaign._id} campaign={campaign} />
        ))}
      </div>

      <div ref={ref} className="py-6 text-center">
        {isFetchingNextPage && <p className="text-blue-500">Loading more...</p>}
        {!hasNextPage && (
          <p className="text-gray-500">You've reached the end 🎉</p>
        )}
      </div>
    </div>
  );
};

export default Donations;
