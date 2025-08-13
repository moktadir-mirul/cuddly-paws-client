const ResourceCard = ({ guide }) => {
  const { image, icon, heading, description } = guide;
  return (
    <div className="bg-blue-50 dark:bg-gray-700 rounded-xl shadow-md overflow-hidden flex flex-col h-full transition-all duration-300">
      {/* Image Top */}
      <div className="w-full h-48 md:h-56">
        <img
          src={image}
          alt={heading}
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Text Content Bottom */}
      <div className="space-y-3 p-4">
        <div className="flex items-center gap-2">
            <div className="mb-2">{icon}</div>
        <h3 className="text-lg font-semibold text-blue-600 dark:text-sky-400 mb-2">
          {heading}
        </h3>
        </div>
        <p className="text-base text-gray-800 dark:text-gray-200 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ResourceCard;
