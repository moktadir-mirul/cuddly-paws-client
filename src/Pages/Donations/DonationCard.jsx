import { Card, Progress } from "flowbite-react";
import React from "react";
import { FaCalendarAlt, FaDonate } from "react-icons/fa";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { Link } from "react-router";

const DonationCard = ({ campaign }) => {
  const daysLeft = Math.floor(
    (new Date(campaign.deadline) - new Date()) / (1000 * 60 * 60 * 24)
  );
  const daysText = daysLeft > 2 ? `${daysLeft} days left` : "Urgent!";
  return (
    <div>
      <div className="max-w-sm rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        {/* Pet Image */}
        <img
          src={campaign.image}
          alt="Pet needing donations"
          className="w-full h-48 object-cover"
        />

        {/* Card Content */}
        <div className="h-[250px] flex flex-col justify-between p-4">
          {/* Days Left Indicator */}
          <div className="pb-2">
            <button
            className={`px-2 py-1 rounded-full text-xs font-semibold ${
              daysLeft > 7
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                : daysLeft > 0
                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
            }`}
          >
            {daysText}
          </button>
          </div>
          <div className="py-1 font-bold text-xl">{campaign.name}</div>
          <div className="flex justify-start items-center mb-3 gap-2">
            <span className="text-gray-700 dark:text-gray-100">Maximum Donation:</span>
            <span className="text-base font-bold text-blue-600 dark:text-blue-400 flex items-center">
              <FaBangladeshiTakaSign />{campaign.maxAmount}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
            Deadline: <strong>{campaign.deadline}</strong>
          </p>

          {/* Donation Button */}
          <Link to={`/donations/${campaign._id}`}>
            <button className="w-full py-2 cursor-pointer bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-md transition-colors font-medium">
            Show Details
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DonationCard;
