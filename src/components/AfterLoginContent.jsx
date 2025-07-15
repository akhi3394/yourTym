import React, { useState } from 'react';
import MenPopup from './MenPopup';
import Women from '../assets/images/afterLogin/Womens.png';
import Men from '../assets/images/afterLogin/Mens.png';
import OfferCard from './OfferCard';
import YTTM from '../assets/images/landingPage/YTYMSafe.png'
import { useNavigate } from 'react-router-dom';

const AfterLoginContent = () => {
  const [showMenPopup, setShowMenPopup] = useState(false);
  const navigate=useNavigate()
  const handleServiceClick = (title) => {
    if (title === "Men's") {
      setShowMenPopup(true);
    }else{
      navigate('/women')
    }
  };

  return (
    <>
      <div className="w-full max-w-[1280px] mx-auto px-4 py-6 mt-[120px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          {[
            { title: "Women's", img: Women },
            { title: "Men's", img: Men }
          ].map((item, index) => (
            <div
              key={index}
              onClick={() => handleServiceClick(item.title)}
              className="relative rounded-xl overflow-hidden cursor-pointer group"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-[550px] object-fill"
              />
              {/* <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent text-white text-center py-4">
                <p className="text-lg font-semibold">{item.title}</p>
              </div> */}
            </div>
          ))}
        </div>
      </div>
      <div className="mb-5">
        <OfferCard />
      </div>

      <div className="mb-5">
        <img src={YTTM} alt="" className='max-w-7xl object-fill px-4 mx-auto'/>
      </div>

      <MenPopup
        isOpen={showMenPopup}
        onClose={() => setShowMenPopup(false)}
      />
    </>
  );
};

export default AfterLoginContent;
