import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FB] py-10 px-4 mt-[130px]">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">About Us</h1>

        {/* Card */}
        <div className="bg-white rounded-xl shadow p-6 space-y-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <p key={index} className="text-gray-700 text-sm leading-relaxed">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
              tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos
              et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet.
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
