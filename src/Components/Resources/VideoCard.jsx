import { FaPlayCircle } from "react-icons/fa";

const VideoCard = ({ video }) => {
  return (
    <div
      key={video.ytId}
      className="bg-blue-50 dark:bg-gray-700 rounded-lg shadow-md overflow-hidden"
    >
      <div className="relative pt-[56.25%]">
        {" "}
        <iframe
          src={`https://www.youtube.com/embed/${video.ytId}`}
          className="absolute top-0 left-0 w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={video.title}
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-blue-600 dark:text-sky-400">
          {video.title}
        </h3>
      </div>
    </div>
  );
};
export default VideoCard;
