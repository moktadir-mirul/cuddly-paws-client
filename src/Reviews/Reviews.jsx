import React, { useRef } from 'react';
import { useScroll } from 'framer-motion';
import ReviewCard from './ReviewCard';

const testimonials = [
  {
    name: "Ayesha Rahman",
    designation: "Software Engineer at Brain Station 23",
    location: "Gulshan, Dhaka",
    review: "Adopting Mithu through Cuddly Paws was one of the best decisions I've made. As a busy professional, I appreciated how thorough the adoption process was - they matched me with a cat that fits perfectly with my work-from-home lifestyle. The follow-up care tips were incredibly helpful for a first-time pet owner like me.",
    photo: "https://i.ibb.co/PvpdB9py/maliha.jpg",
    bgLight: "bg-blue-100",
    bgDark: "bg-blue-900"
  },
  {
    name: "Tahmid Ahmed",
    designation: "Marketing Executive at Unilever",
    location: "Banani, Dhaka",
    review: "After moving to Dhaka for work, I felt quite lonely until I found Tommy through Cuddly Paws. The team conducted a proper home verification and gave me excellent advice about caring for a rescue dog in an apartment. A year later, Tommy has become my constant companion during both work-from-home days and weekend adventures around the city.",
    photo: "https://i.ibb.co/bjMc6YfK/image-2272-new.jpg",
    bgLight: "bg-red-100",
    bgDark: "bg-red-900"
  },
  {
    name: "Farhana & Rahim Islam",
    designation: "Banker & University Professor",
    location: "Dhanmondi, Dhaka",
    review: "We wanted to teach our children about compassion and responsibility, so we adopted sister cats Luna and Lina through Cuddly Paws. The organization's careful screening process ensured we got pets that would thrive in our busy household. Their 24/7 vet consultation service has been invaluable whenever we had questions about our pets' health.",
    photo: "https://i.ibb.co/rKjMNGRW/couple.jpg",
    bgLight: "bg-green-100",
    bgDark: "bg-green-900"
  },
  {
    name: "Dr. Arif Hussain",
    designation: "Pediatrician at Apollo Hospital",
    location: "Mohammadpur, Dhaka",
    review: "As a doctor with long shifts, I was hesitant about pet ownership until I found Cuddly Paws' senior cat adoption program. They matched me with 8-year-old Milo who prefers a calm environment. The team provided excellent resources about automatic feeders and litter boxes that make pet care manageable with my hospital schedule.",
    photo: "https://i.ibb.co/WLSHnVb/Asif.jpg",
    bgLight: "bg-purple-100",
    bgDark: "bg-purple-900"
  },
  {
    name: "Nusrat Jahan",
    designation: "Fashion Designer at Aarong",
    location: "Uttara, Dhaka",
    review: "I adopted Snowy during a particularly stressful period at work, and she's brought so much joy to my life. Cuddly Paws didn't just facilitate the adoption - they connected me with a community of pet owners in Uttara. We now have regular meetups at the park, and Snowy has made friends just like I have!",
    photo: "https://i.ibb.co/RfTm4Gj/64a3b8e2dea11461929584.jpg",
    bgLight: "bg-amber-100",
    bgDark: "bg-amber-900"
  }
];

const Reviews = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });

  return (
    <div className="bg-white relative bg-[url(./assets/diamonds.png)] dark:bg-[url(./assets/flowers.png)] dark:bg-gray-900 text-black dark:text-gray-200 pt-8 pb-10 md:pt-14" ref={containerRef}>
        <h1 className="pb-8 text-4xl md:text-6xl text-blue-600 dark:text-sky-400 play font-semibold text-center leading-[120%]">
          Happy Tails from Our Families
        </h1>
      <section className="bg-white relative bg-[url(./assets/diamonds.png)] dark:bg-[url(./assets/flowers.png)] dark:bg-gray-900 text-black dark:text-gray-200">
        {testimonials.map((project, i) => {
          const targetScale = 1 - (testimonials.length - i) * 0.05;
          return (
            <ReviewCard
              key={i}
              {...project}
              index={i}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </section>
    </div>
  );
};

export default Reviews;
