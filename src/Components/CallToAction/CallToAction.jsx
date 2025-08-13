import React, { useState, useEffect } from "react";
import { FaChevronRight } from "react-icons/fa";
import Cta1 from "../../assets/CTA-1.webp";
import Cta2 from "../../assets/cta-2.jpg";
import Cta3 from "../../assets/cta-3.jpg";
import Cta4 from "../../assets/cta-4.jpg";
import Cta5 from "../../assets/cta-5.jpg";
import Cta6 from "../../assets/cta-6-1.jpg";
import { Button } from "flowbite-react";
import { Link } from "react-router";

const CallToAction = () => {
  const petImages = [Cta1, Cta2, Cta3, Cta4, Cta5, Cta6];

  const adoptionQuotes = [
    "Saving one animal won't change the world, but for that one animal, the world will change forever.",
    "The best things in life are rescued.",
    "A house is not a home without a pet.",
    "Until one has loved an animal, a part of one's soul remains unawakened.",
    "Adopting a pet may not change the world, but it will change their world.",
    "Every paw tells a story of hope.",
    "Adopt love. Change a life.",
    "They may be small, but their love is huge.",
    "Give them a home, get unconditional love.",
  ];

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentQuoteIndex(
          (prevIndex) => (prevIndex + 1) % adoptionQuotes.length
        );
        setIsFading(false);
      }, 500);
    }, 5000);

    return () => clearInterval(quoteInterval);
  }, [adoptionQuotes.length]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % petImages.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [petImages.length]);

  return (
    <div className="bg-white w-full dark:bg-gray-900">
      <section className="bg-white pb-8 w-11/12 mx-auto dark:bg-gray-900">
        <h2 className="text-center play font-bold tracking-tight text-blue-600 dark:text-sky-400 text-4xl md:text-6xl pt-8 md:pt-16 pb-8">
          Be Their Hero — Adopt Today!
        </h2>
        <div className="mx-auto w-full">
          {/* Rotating Quotes Box */}
          <div className="text-center mt-4 mb-8 lg:mb-12 p-4 bg-sky-100 dark:bg-gray-700 rounded-lg shadow-inner">
            <p
              className={`text-lg italic text-blue-600 dark:text-sky-400 transition-opacity duration-500 ${
                isFading ? "opacity-0" : "opacity-100"
              }`}
            >
              "{adoptionQuotes[currentQuoteIndex]}"
            </p>
          </div>

          <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-16">
            {/* Text Content Column */}
            <div className="text-gray-600 dark:text-gray-400 sm:text-lg lg:order-first">
              <p className="mb-6 font-light lg:text-xl">
                Every year, thousands of loving and healthy pets are waiting in
                shelters for a second chance. By choosing to adopt, you're not
                just getting a new best friend—you're saving a life and making
                space for another animal in need.
              </p>
              <p className="mb-6 font-light lg:text-xl">
                At{" "}
                <span className="text-blue-600 font-semibold dark:text-sky-400">
                  Cuddly Paws
                </span>
                , we connect you with wonderful companions who are ready to fill
                your life with joy, laughter, and unconditional love. Your
                journey to finding the perfect furry family member starts here.
              </p>
              <Link to={"/listedpets"}>
                <button className="cursor-pointer mt-8 px-8 py-2 rounded-4xl inline-flex items-center bg-blue-600 text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-800">
                  Browse Adoptable Pets
                  <FaChevronRight></FaChevronRight>
                </button>
              </Link>
            </div>

            {/* Images Area */}
            <div className="relative h-64 sm:h-80 md:h-96 lg:h-[30rem] w-full overflow-hidden rounded-xl shadow-lg">
              {petImages.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Pet ${index + 1}`}
                  className={`absolute top-0 left-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${
                    index === currentIndex
                      ? "opacity-100 z-10"
                      : "opacity-0 z-0"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CallToAction;
