import React from 'react';
import faceUpgrade1 from '../assets/images/offersforyou/faceUpgrade1.png';
import offers1 from '../assets/images/offersforyou/offersForYou2.png';
import offers2 from '../assets/images/offersforyou/offersForYou3.png';
import faceUpgrade2 from '../assets/images/offersforyou/faceUpgrade2.png';

const OffersForYou = () => {
  return (
    <div className="bg-[#DFDFDF] h-[626px] flex items-center justify-center px-4">
      <div className="max-w-[1280px] w-full flex flex-col lg:flex-row  gap-10 items-center">
        {/* Left Title */}
        <div className="text-[#1D1D1D] text-[96px] font-normal leading-none whitespace-pre-line text-center lg:text-left min-w-[280px]">
          Offers{"\n"}For{"\n"}You
        </div>

        {/* Right Image Grid */}
        <div className="grid grid-cols-3 grid-rows-4 gap-4 w-full">
          <div className="col-span-2 row-span-2">
            <img src={faceUpgrade1} alt="Offer 1" className="w-full h-full object-fill rounded-lg" />
          </div>
          <div className="row-span-2 col-start-3">
            <img src={offers1} alt="Offer 2" className="w-full h-full object-fill rounded-lg" />
          </div>
          <div className="row-span-2 row-start-3">
            <img src={offers2} alt="Offer 3" className="w-full h-full object-fill rounded-lg" />
          </div>
          <div className="col-span-2 row-span-2 row-start-3">
            <img src={faceUpgrade2} alt="Offer 4" className="w-full h-full object-fill rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffersForYou;
