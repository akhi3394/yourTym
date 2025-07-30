import React from "react";
import SalonForWomen from '../assets/images/landingPage/SalonForWomen.png';
import WomenSkin from '../assets/images/landingPage/WomenSkin.png';
import SpaforMen from '../assets/images/landingPage/SpaforMen.png';
import SpaforWomen from '../assets/images/landingPage/SpaforWomen.png';
import SalonForMen from '../assets/images/landingPage/SalonforMen.png';
import MensSkin from '../assets/images/landingPage/MensSkinandHair.png';

const ServiceGrid = () => {
  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 py-6 md:h-[777px]">
      <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-5 gap-2 md:gap-4 h-full">
        {/* 1 - Salon For Women */}
        <div className="col-span-1 md:col-span-2 md:row-span-2 rounded-[10px] overflow-hidden active:scale-95 md:hover:scale-110 transition-transform duration-200">
          <img src={SalonForWomen} alt="Salon For Women" className="w-full h-auto md:h-full object-cover" />
        </div>

        {/* 2 - Women Skin & Hair Care */}
        <div className="col-span-1 md:col-span-2 md:row-span-3 md:col-start-3 rounded-[10px] overflow-hidden active:scale-95 md:hover:scale-110 transition-transform duration-200">
          <img src={WomenSkin} alt="Women Skin & Hair Care" className="w-full h-auto md:h-full object-cover" />
        </div>

        {/* 3 - Spa For Men */}
        <div className="col-span-1 md:col-span-2 md:row-span-3 md:col-start-5 rounded-[10px] overflow-hidden active:scale-95 md:hover:scale-110 transition-transform duration-200">
          <img src={SpaforMen} alt="Spa For Men" className="w-full h-auto md:h-full object-cover" />
        </div>

        {/* 4 - Spa For Women */}
        <div className="col-span-1 md:col-span-2 md:row-span-3 md:row-start-3 rounded-[10px] overflow-hidden active:scale-95 md:hover:scale-110 transition-transform duration-200">
          <img src={SpaforWomen} alt="Spa For Women" className="w-full h-auto md:h-full object-cover" />
        </div>

        {/* 5 - Salon For Men */}
        <div className="col-span-1 md:col-span-3 md:row-span-2 md:col-start-3 md:row-start-4 rounded-[10px] overflow-hidden active:scale-95 md:hover:scale-110 transition-transform duration-200">
          <img src={SalonForMen} alt="Salon For Men" className="w-full h-auto md:h-full object-cover" />
        </div>

        {/* 6 - Mens Skin & Hair Care */}
        <div className="col-span-1 md:row-span-2 md:col-start-6 md:row-start-4 rounded-[10px] overflow-hidden active:scale-95 md:hover:scale-110 transition-transform duration-200">
          <img src={MensSkin} alt="Mens Skin & Hair Care" className="w-full h-auto md:h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default ServiceGrid;