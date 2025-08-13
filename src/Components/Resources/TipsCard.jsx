const TipCard = ({tip}) => {
    const { icon, heading, tips } = tip;
  return (
    // <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
    //   <div className="flex items-center gap-3 mb-2">
    //     <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-sky-400">
    //       {icon}
    //     </div>
    //     <h3 className="font-bold text-gray-800 dark:text-white">{heading}</h3>
    //   </div>
    //   <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
    //     {tips.map((tip, index) => (
    //       <li key={index} className="flex items-start gap-1">
    //         <span>•</span>
    //         <span>{tip}</span>
    //       </li>
    //     ))}
    //   </ul>
    // </div>
    <div className="bg-blue-50 dark:bg-gray-700 rounded-xl shadow-md overflow-hidden flex flex-col h-full transition-all duration-300 p-5">
      <div className="flex gap-2 items-center">
        <div className="mb-3">{icon}</div>
      <h3 className="text-lg font-semibold text-blue-600 dark:text-sky-400 mb-3">
        {heading}
      </h3>
      </div>

      <ul className="list-disc list-inside space-y-2 text-gray-800 dark:text-gray-200 text-base leading-relaxed">
        {tips.map((tip, index) => (
          <li key={index}>{tip}</li>
        ))}
      </ul>
    </div>
  );
};
 export default TipCard;