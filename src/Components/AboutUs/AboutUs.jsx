import { Card } from "flowbite-react";
import React from "react";
import AbtImg from "../../assets/about-us-image.jpg";
import {
  FaPaw,
  FaSearch,
  FaDonate,
  FaFileAlt,
  FaUserShield,
} from "react-icons/fa";
import { GiSittingDog } from "react-icons/gi";
import { GoCodeOfConduct } from "react-icons/go";
import { FaUserGear } from "react-icons/fa6";


const AboutUs = () => {


  return (
    <div

      className="w-full bg-white dark:bg-gray-900"
    >
      <section className="pt-8 md:pt-16 pb-10 mx-auto w-11/12">
        <h2 className="play text-4xl md:text-6xl font-bold text-center pb-1 text-blue-600 dark:text-sky-400 ">
          About Us
        </h2>
        <p className="pt-1 text-center text-xl text-gray-800 dark:text-gray-200 mb-12 max-w-2xl mx-auto">
          Connecting loving pets with caring owners since 2023
        </p>

        <div className="flex flex-col lg:flex-row gap-5">
          {/* Left Side - Founder Info */}
          <div className="lg:w-1/2">
            <Card
              className="h-full bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 rounded-xl shadow-lg p-0"
              imgAlt="Cuddly Paws"
              imgSrc={AbtImg}
            >
              {/* <div className="w-full">
                <img
                src={AbtImg}
                alt="Cuddly Paws"
                className="h-64 w-full object-cover rounded-t-xl"
              />
              </div> */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-center text-blue-600 dark:text-sky-400 play">
                  Why We Created Cuddly Paws
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Every pet deserves a loving home, and every home deserves the
                  joy a pet brings. We created Cuddly Paws to bridge the gap
                  between abandoned pets and caring owners.
                </p>

                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-inner border border-blue-100 dark:border-blue-900">
                  <div className="flex items-center gap-3 mb-2">
                    <FaUserGear className="text-2xl text-blue-600 dark:text-sky-400" />
                    <h4 className="text-xl meri font-semibold text-blue-600 dark:text-sky-400">
                      Mirul Moktadir Khan
                    </h4>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200 font-light text-sm play mb-2">
                    <GoCodeOfConduct className="text-red-500 font-light" />
                    <p>"Paws make the world a better place"</p>
                  </div>
                  <p className="text-gray-600 font-light dark:text-gray-200 text-sm italic">
                    As a lifelong pet lover and advocate for animal welfare, I
                    established{" "}
                    <span className="text-blue-600 dark:text-sky-400 font-medium">
                      Cuddly Paws
                    </span>{" "}
                    to create a platform where pets find their forever homes.
                    After witnessing too many pets in shelters, I wanted to make
                    the adoption process easier and more accessible for
                    everyone.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Side - How It Works */}
          <div className="lg:w-1/2">
            <Card className="h-full bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="h-full flex flex-col justify-between gap-7 lg:gap-0">
                <h3 className="play text-center text-2xl font-bold text-blue-600 dark:text-sky-400 mb-2 lg:mb-4">
                  How Cuddly Paws Works
                </h3>

                {/* <div className="space-y-6"> */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                    <FaPaw className="w-6 h-6 text-blue-600 dark:text-sky-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      List Pets for Adoption
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Upload your pet's details and images to help them find a
                      new loving home.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                    <FaSearch className="w-6 h-6 text-blue-600 dark:text-sky-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      Browse & Adopt
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Explore our collection of adorable pets waiting for their
                      forever homes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                    <FaDonate className="w-6 h-6 text-blue-600 dark:text-sky-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      Donate & Support
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Contribute to pets in need or request refunds if needed -
                      all transactions are secure.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                    <FaFileAlt className="w-6 h-6 text-blue-600 dark:text-sky-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      Dashboard
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Manage your adoptions, donations, and pet listings all in
                      one convenient place.
                    </p>
                  </div>
                </div>

                {/* New Feature 1 */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                    <FaUserShield className="w-6 h-6 text-blue-600 dark:text-sky-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      Verified Profiles
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      All pets and adopters go through a verification process to
                      ensure safe and genuine adoptions.
                    </p>
                  </div>
                </div>

                {/* New Feature 2 */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                    <GiSittingDog className="w-6 h-6 text-blue-600 dark:text-sky-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      Post-Adoption Support
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Get guidance and resources to help your new pet adjust to
                      their forever home.
                    </p>
                  </div>
                </div>
              </div>
              {/* </div> */}
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
