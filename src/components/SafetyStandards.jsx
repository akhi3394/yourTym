import React from "react";
import Girl from "@/assets/images/Girl.png";
import Sanitized from "@/assets/images/Sanitized.png";
import Temperature from "@/assets/images/Temperature.png";
import Vaccinated from "@/assets/images/Vaccinated.png";
import Monodose from "@/assets/images/Monodose.png";
import TickMark from "@/assets/images/TickMark.png";

const SafetyStandards = () => {
  return (
    <div className="max-w-[1270px] mx-auto bg-white border border-[#FF5534] rounded-[8px] px-6 py-8 relative">
      {/* YTYM Safe top-right badge */}
      <div className="absolute top-4 right-4 flex items-center border border-[#FF5534] rounded px-2 py-1 gap-1">
        <img src={TickMark} alt="Tick" className="w-[14px] h-[14px]" />
        <span className="text-sm font-medium text-[#FF5534]">YourTym Safe</span>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-start gap-10">
        {/* Left - Girl Image */}
        <div className="flex flex-col items-center text-center">
          <div className="w-[180px] h-[180px] rounded-full bg-[#FF5534] flex items-center justify-center">
            <img
              src={Girl}
              alt="Certified Girl"
              className="w-[140px] h-[160px] object-contain"
            />
          </div>
          <p className="text-[#FF5534] font-semibold mt-3 text-base leading-[22px]">
            Certified & Trained <br /> Professionals
          </p>
        </div>

        {/* Right Section */}
        <div className="flex-1">
          {/* Heading */}
          <h2 className="text-[#FF5534] ml-auto text-[24px] md:text-[28px] lg:text-[32px] font-semibold mb-6 text-center lg:text-left">
            YourTym Safety Standerds
          </h2>

          {/* Safety Items */}
          <div className="flex flex-wrap justify-between gap-y-6">
            {/* Item */}
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full flex items-center justify-center mb-2">
                <img src={Sanitized} alt="Sanitized" className="w-[173px] h-[173px]" />
              </div>
              <p className="text-sm text-[#000000] leading-[20px]">
                Sanitized Kits <br /> and Tools
              </p>
            </div>

            {/* Item */}
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full flex items-center justify-center mb-2">
                <img src={Temperature} alt="Temperature" className="w-[173px] h-[173px]" />
              </div>
              <p className="text-sm text-[#000000] leading-[20px]">
                Temperature <br /> Record
              </p>
            </div>

            {/* Item */}
            <div className="flex flex-col items-center text-center ">
              <div className="rounded-full flex items-center justify-center mb-2">
                <img src={Vaccinated} alt="Vaccinated" className="w-[173px] h-[173px]" />
              </div>
              <p className="text-sm text-[#000000] leading-[20px]">
                Vaccinated <br /> Professionals
              </p>
            </div>

            {/* Item */}
            <div className="flex flex-col items-center text-center ">
              <div className="rounded-full flex items-center justify-center mb-2">
                <img src={Monodose} alt="Monodose" className="w-[173px] h-[173px]" />
              </div>
              <p className="text-sm text-[#000000] leading-[20px]">
                Monodose <br /> Products
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyStandards;
