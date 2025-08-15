import CountUp from "react-countup";

const WhyUs = () => {
  const stats = [
    { id: 1, label: "Cute Pets Available", value: 100, suffix: "+", color: "bg-pink-100 dark:bg-pink-700" },
    { id: 2, label: "Successful Adoptions", value: 150, suffix: "+", color: "bg-green-100 dark:bg-green-900" },
    { id: 3, label: "Donation Campaigns", value: 50, suffix: "+", color: "bg-yellow-100 dark:bg-yellow-900" },
    { id: 4, label: "Generous Donators", value: 100, suffix: "+", color: "bg-blue-100 dark:bg-blue-900" },
  ];

  return (
    <section className="py-8 md:py-16 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* Section Title */}
        <h2 className="play text-4xl md:text-6xl font-bold text-center pb-1 text-blue-600 dark:text-sky-400 ">
          Why Choose Cuddly Paws?
        </h2>
        {/* Paragraph */}
        <p className="pt-1 text-center text-gray-600 dark:text-gray-200 mb-12 max-w-2xl mx-auto">
          At Cuddly Paws, we believe every pet deserves a loving home.  
          Our growing community has helped hundreds of animals find families,  
          and your support keeps the mission alive.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className={`${stat.color} rounded-2xl p-6 shadow-md hover:shadow-lg transition`}
            >
              <h3 className="text-6xl font-bold text-gray-800 dark:text-white">
                <CountUp end={stat.value} duration={2} suffix={stat.suffix} enableScrollSpy={true}/>
              </h3>
              <p className="mt-2 text-gray-600 font-bold text-2xl dark:text-gray-300">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
