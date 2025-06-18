import React from "react";
import SalonForWomen from '../assets/images/landingPage/SalonForWomen.png';
import WomenSkin from '../assets/images/landingPage/WomenSkin.png';
import SpaforMen from '../assets/images/landingPage/SpaforMen.png';
import SpaforWomen from '../assets/images/landingPage/SpaforWomen.png';
import SalonForMen from '../assets/images/landingPage/SalonforMen.png';
import MensSkin from '../assets/images/landingPage/MensSkinandHair.png';

const ServiceGrid = () => {
  return (
<div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 h-[777px]">
      <div className="grid grid-cols-6 grid-rows-5 gap-4 h-full ">
        {/* 1 - Salon For Women */}
        <div className="col-span-2 row-span-2 rounded-[10px] overflow-hidden hover:scale-110">
          <img src={SalonForWomen} alt="Salon For Women" className="w-full h-full object-fill" />
        </div>

        {/* 2 - Women Skin & Hair Care */}
        <div className="col-span-2 row-span-3 col-start-3 rounded-[10px] overflow-hidden hover:scale-110">
          <img src={WomenSkin} alt="Women Skin & Hair Care" className="w-full h-full object-fill" />
        </div>

        {/* 3 - Spa For Men */}
        <div className="col-span-2 row-span-3 col-start-5 rounded-[10px] overflow-hidden hover:scale-110">
          <img src={SpaforMen} alt="Spa For Men" className="w-full h-full object-fill" />
        </div>

        {/* 4 - Spa For Women */}
        <div className="col-span-2 row-span-3 row-start-3 rounded-[10px] overflow-hidden hover:scale-110">
          <img src={SpaforWomen} alt="Spa For Women" className="w-full h-full object-fill" />
        </div>

        {/* 5 - Salon For Men */}
        <div className="col-span-3 row-span-2 col-start-3 row-start-4 rounded-[10px] overflow-hidden hover:scale-110">
          <img src={SalonForMen} alt="Salon For Men" className="w-full h-full object-fill" />
        </div>

        {/* 6 - Mens Skin & Hair Care */}
        <div className="row-span-2 col-start-6 row-start-4 rounded-[10px] overflow-hidden hover:scale-110">
          <img src={MensSkin} alt="Mens Skin & Hair Care" className="w-full h-full object-fill" />
        </div>
      </div>
    </div>
  );
};

export default ServiceGrid;
