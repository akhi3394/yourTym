import React, { useEffect, useState } from 'react';
import { Star, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

import Banner1 from '../assets/images/womenBanner/Banner1.png';
import Banner2 from '../assets/images/womenBanner/Banner2.png';
import Banner3 from '../assets/images/womenBanner/Banner3.png';
import Banner4 from '../assets/images/womenBanner/Banner4.png';
import CleanUP from '../assets/images/salonForWomen/cleanUp.png';
import Waxing from '../assets/images/salonForWomen/waxing.png';
import Bleach from '../assets/images/salonForWomen/bleach.png';
import Massage from '../assets/images/salonForWomen/massage.png';
import Pedicure from '../assets/images/salonForWomen/pedicure.png';
import Manicure from '../assets/images/salonForWomen/manicure.png';
import Lotus from '../assets/images/WomenBrands/Lotus.png';
import Herbs from '../assets/images/WomenBrands/Herbs.png';
import kama from '../assets/images/WomenBrands/Kama.png';
import Forest from '../assets/images/WomenBrands/Forest.png';
import Bloom from '../assets/images/WomenBrands/Bloom.png';
import Himalaya from '../assets/images/WomenBrands/Himalaya.png';
import plom from '../assets/images/WomenBrands/Plum.png';
import Biotique from '../assets/images/WomenBrands/Biotique.png';
import Jovees from '../assets/images/WomenBrands/Jovees.png';

const WomensSection = ({ showBannerText = false }) => {
  const banners = [Banner1, Banner2, Banner3, Banner4];
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const brands = [Lotus, Herbs, kama, Forest, Bloom, Himalaya, plom, Biotique, Jovees];

  return (
    <div className="bg-[#F4F4F4] w-full">
      {/* Banner */}
      <div className="bg-white rounded-xl overflow-hidden shadow-sm mb-4 sm:mb-5 relative">
        {banners.map((banner, index) => (
          <img
            key={index}
            src={banner}
            alt={`Women's Banner ${index + 1}`}
            className={`w-full h-auto object-cover absolute top-0 left-0 transition-opacity duration-500 ${index === currentBanner ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
        <div className="relative w-full h-[100px] xs:h-[150px] sm:h-[200px] md:h-[300px] lg:h-[400px]">
          {showBannerText && (
            <div className="absolute bottom-4 xs:bottom-6 right-4 xs:right-6 z-10 text-right">
              <h2 className="text-white text-[18px] xs:text-[24px] sm:text-[32px] md:text-[64px] lg:text-[96px] leading-none font-light">
                Salon For Women’s
              </h2>
              <div className="mt-2 xs:mt-3 bg-[#FF5534] rounded-full px-3 xs:px-4 sm:px-6 lg:px-10 py-1 xs:py-1.5 sm:py-2 inline-flex items-center gap-2 xs:gap-3 sm:gap-4 lg:gap-10 text-white text-[9px] xs:text-[10px] sm:text-xs lg:text-base font-medium whitespace-nowrap">
                <div className="flex items-center gap-1">
                  <Star className="w-3 xs:w-3.5 sm:w-4 h-3 xs:h-3.5 sm:h-4 fill-white text-white" />
                  4.78 <span className="text-white/80">(355k)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 xs:w-3.5 sm:w-4 h-3 xs:h-3.5 sm:h-4" />
                  <span>847 bookings in Wagholi</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Salon for Women */}
      <div className="bg-[#FFE8CF] rounded-xl p-4 xs:p-6 shadow-sm mb-4 sm:mb-5">
        <h2 className="text-center text-[16px] xs:text-[18px] sm:text-[20px] font-semibold text-[#1D1D1D] mb-3 sm:mb-4">Salon for Women</h2>
        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 xs:gap-4">
          {[
            { img: CleanUP, label: 'Cleanup & Facials' },
            { img: Waxing, label: 'Waxing' },
            { img: Bleach, label: 'Bleach & Detain' },
            { img: Massage, label: 'Massage' },
            { img: Pedicure, label: 'Pedicure' },
            { img: Manicure, label: 'Manicure' },
          ].map(({ img, label }, index) => (
            <Link key={index} className="bg-white rounded-xl flex flex-col items-center p-2 xs:p-3" to="/women/products">
              <img src={img} alt={label} className="rounded-lg w-full h-auto object-cover aspect-square" />
              <span className="mt-1 xs:mt-2 text-xs xs:text-sm font-medium text-center text-[#1D1D1D]">{label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Women's Product Brands */}
      <div className="bg-white rounded-xl p-4 xs:p-6 shadow-sm">
        <h2 className="text-center text-[14px] xs:text-[16px] sm:text-[18px] font-semibold text-[#1D1D1D] mb-3 sm:mb-4">Women’s Product Brands we use</h2>
        <div className="overflow-hidden bg-[#F5F6FB] rounded-lg">
          <div className="flex animate-infinite-scroll">
            {[...brands, ...brands].map((brand, index) => (
              <div key={index} className="flex-shrink-0 p-2 xs:p-3 flex items-center justify-center">
                <img
                  src={brand}
                  alt={`brand-${index}`}
                  className="w-[60px] xs:w-[80px] sm:w-[98.6px] h-[60px] xs:h-[80px] sm:h-[100.5px] object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WomensSection;