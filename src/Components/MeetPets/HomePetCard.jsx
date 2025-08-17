
import React from 'react';
import { FaHeart, FaMapMarkerAlt, FaPaw } from 'react-icons/fa';
import ReadOnlyEditor from '../../Components/TipTapEditor/ReadOnlyEditor';
import { Link } from 'react-router';

const HomePetCard = ({pet}) => {
    return (
<div className="max-w-md rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      {/* Pet Image */}
      <div className="h-48 w-full relative">
        <img 
          src={pet.image} 
          alt={pet.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Card Content */}
      <div className="p-4 h-[200px] flex flex-col justify-between">
        {/* Pet Name */}
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
          {pet.name}
        </h3>

        {/* Age and Location */}
        <div className="flex flex-col gap-4 text-sm text-gray-600 dark:text-gray-300">
          <span className="flex items-center text-base gap-2">
            {pet.shortDescription}
          </span>
          <span className="flex items-center gap-2 text-lg">
            <FaMapMarkerAlt className="mr-1" />
            {pet.location}
          </span>
        </div>
        

        {/* View Details Button */}
        <Link to={`/listedPets/${pet.petId}`}>
        <button className="w-full py-2 cursor-pointer bg-blue-600 hover:bg-blue-900 dark:bg-blue-800 dark:hover:bg-blue-950 text-white rounded-lg transition-colors font-medium flex items-center justify-center">
          View Details
        </button>
        </Link>
      </div>
    </div>
    );
};

export default HomePetCard;