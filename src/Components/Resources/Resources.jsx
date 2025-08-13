import { Tabs, TabItem } from "flowbite-react";
import { FaBook, FaLightbulb, FaDog } from "react-icons/fa";
import VideoCard from "./VideoCard";
import ResourceCard from "./ResourceCard";
import TipCard from "./TipsCard";
import {
  FaUtensils,
  FaShower,
  FaStethoscope,
  FaSyringe,
  FaPaw,
} from "react-icons/fa";
import { FaHeartbeat, FaShieldAlt, FaUserShield, FaVial } from "react-icons/fa";
import { BiSolidVideos } from "react-icons/bi";

const guidesData = [
  {
    id: 1,
    image: "https://i.ibb.co/m5hHyxYN/feeding2.jpg",
    icon: <FaUtensils className="text-2xl text-blue-500" />,
    heading: "Feeding & Nutrition",
    description:
      "Discover essential tips on how to provide a balanced diet for your pet, including choosing the right food, establishing feeding routines, and understanding nutritional requirements.",
  },
  {
    id: 2,
    image: "https://i.ibb.co/fVd2XnZR/grooming.webp",
    icon: <FaShower className="text-2xl text-green-500" />,
    heading: "Grooming & Hygiene",
    description:
      "Learn effective grooming techniques, including bathing, brushing, and maintaining your pet’s coat and skin health, ensuring they stay clean, healthy, comfortable, and happy.",
  },
  {
    id: 3,
    image: "https://i.ibb.co/RTCxB7xB/vetCare.png",
    icon: <FaStethoscope className="text-2xl text-purple-500" />,
    heading: "Health & Vet Care",
    description:
      "Get insights into common health concerns, vaccination schedules, and how to monitor your pet’s well-being, so you can take proactive steps to ensure a long, healthy life for your companion.",
  },
  {
    id: 4,
    image: "https://i.ibb.co/8LZskKwc/pet-training.jpg",
    icon: <FaDog className="text-2xl text-yellow-500" />,
    heading: "Training & Behavior",
    description:
      "Explore positive reinforcement techniques and behavioral training tips to nurture a well-behaved pet, manage common issues, and strengthen your bond.",
  },
  {
    id: 5,
    image: "https://i.ibb.co/BKP12yS1/pet-aid.webp",
    icon: <FaSyringe className="text-2xl text-red-500" />,
    heading: "Emergency & First Aid",
    description:
      "Learn vital first aid skills, how to handle pet emergencies, and when to seek immediate veterinary attention to keep your pet safe in unforeseen situations.",
  },
  {
    id: 6,
    image: "https://i.ibb.co/fzn5sCyv/pet-safety.jpg",
    icon: <FaPaw className="text-2xl text-pink-500" />,
    heading: "Pet Safety Tips",
    description:
      "Discover practical safety guidelines to protect your pet at home and outdoors, preventing accidents and keeping your furry friend secure and happy.",
  },
];

const videosData = [
  { ytId: "jFMA5ggFsXU", title: "Basic Obedience Training", id: 1 },
  { ytId: "LVmxn4nlfmk", title: "Grooming Tips for Pets", id: 2 },
  { ytId: "AvCvrwl4N5E", title: "Veterinary Health Advice", id: 3 },
  { ytId: "Z-VJXzde4Os", title: "Adoption Success Stories", id: 4 },
  { ytId: "dtaytJV2Njo", title: "Pet First Aid Basics", id: 5 },
  { ytId: "vqP453qscMg", title: "Understanding Pet Behavior", id: 6 },
];

const petTipsData = [
  {
    id: 1,
    icon: <FaLightbulb className="text-xl text-yellow-500" />,
    heading: "Healthy Feeding Habits",
    tips: [
      "Provide fresh water daily to keep your pet hydrated.",
      "Feed your pet at regular intervals to establish routine.",
      "Choose high-quality, balanced nutrition suited to your pet’s age.",
      "Avoid giving human food that can be harmful to pets.",
    ],
  },
  {
    id: 2,
    icon: <FaHeartbeat className="text-xl text-red-500" />,
    heading: "Exercise & Activity",
    tips: [
      "Ensure daily exercise to maintain a healthy weight.",
      "Play interactive games to stimulate your pet mentally.",
      "Provide toys that encourage physical activity.",
      "Monitor activity levels to prevent overexertion.",
    ],
  },
  {
    id: 3,
    icon: <FaShieldAlt className="text-xl text-green-500" />,
    heading: "Vaccination & Preventive Care",
    tips: [
      "Keep up with your pet’s vaccination schedule.",
      "Regularly check for fleas and ticks from the vet doctor.",
      "Schedule annual health check-ups with your veterinarian.",
      "Use preventative medications as recommended.",
    ],
  },
  {
    id: 4,
    icon: <FaPaw className="text-xl text-purple-500" />,
    heading: "Grooming & Hygiene",
    tips: [
      "Brush your pet regularly to reduce shedding.",
      "Bathtime should be done with suitable pet shampoos.",
      "Trim nails to prevent discomfort or injury.",
      "Check ears and teeth frequently for signs of infection.",
    ],
  },
  {
    id: 5,
    icon: <FaUserShield className="text-xl text-blue-500" />,
    heading: "Safety Tips",
    tips: [
      "Secure your home to prevent escapes.",
      "Keep hazardous substances out of reach.",
      "Use appropriate collars and ID tags.",
      "Supervise outdoor activities to avoid accidents.",
    ],
  },
  {
    id: 6,
    icon: <FaVial className="text-xl text-pink-500" />,
    heading: "First Aid & Emergency",
    tips: [
      "Learn basic pet first aid procedures.",
      "Keep emergency contact numbers handy.",
      "Have a pet first aid kit prepared at home.",
      "Recognize signs of poisoning or distress.",
    ],
  },
];

const PetCareResources = () => {

  return (
    <div
      className="bg-white w-full dark:bg-gray-900"
    >
      <section className="w-11/12 bg-white dark:bg-gray-900 mx-auto pb-10 pt-8 md:pt-16">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="play text-4xl md:text-6xl font-bold text-blue-600 dark:text-sky-400 mb-4">
            Pet Care Hub
          </h2>
          <p className="text-gray-800 dark:text-gray-200 text-xl max-w-4xl mx-auto">
            Everything you need to be the best pet parent - from expert guides
            to practical tips.
          </p>
        </div>

        {/* Tabs Section */}
        <Tabs>
          {/* Guides Tab */}
          <TabItem title="Guides" icon={FaBook}>
            <p className="text-blue-600 dark:text-sky-400 leading-[120%] text-xl md:text-2xl play font-bold leading mb-6 text-center">
              Comprehensive guides covering all aspects of pet care.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Guide Cards */}
              {guidesData.map((guide) => (
                <ResourceCard key={guide.id} guide={guide}></ResourceCard>
              ))}
            </div>
          </TabItem>

          {/* Videos Tab */}
          <TabItem title="Videos" icon={BiSolidVideos}>
            <p className="text-blue-600 dark:text-sky-400 leading-[120%] text-xl md:text-2xl play font-bold leading mb-6 text-center">
              Watch helpful pet care videos from experts.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {videosData.map((video) => (
                <VideoCard key={video.id} video={video}></VideoCard>
              ))}
            </div>
          </TabItem>

          {/* Tips Tab */}
          <TabItem title="Tips" icon={FaLightbulb}>
            <p className="text-blue-600 dark:text-sky-400 leading-[120%] text-xl md:text-2xl play font-bold leading mb-6 text-center">
              Practical advice for new pet owners.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {petTipsData.map((tip) => (
                <TipCard key={tip.id} tip={tip}></TipCard>
              ))}
            </div>
          </TabItem>
        </Tabs>
      </section>
    </div>
  );
};

// Simple Resource Card Component

// Simple Video Card Component

// Simple Tip Card Component

export default PetCareResources;
