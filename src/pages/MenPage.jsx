import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, Calendar } from 'lucide-react';
import Navbar from '../components/Navbar';
import Banner1 from '../assets/images/menBanner/MenBanner1.png';
import Banner2 from '../assets/images/menBanner/MenBanner2.png';
import Banner3 from '../assets/images/menBanner/MenBanner3.png';
import Banner4 from '../assets/images/menBanner/MenBanner4.png';
import HairCut from '../assets/images/salonForMen/haircut.png';
import Massage from '../assets/images/salonForWomen/massage.png';
import HairColor from '../assets/images/salonForMen/hairColor.png';
import Pedicure from '../assets/images/salonForMen/pedicure.png';
import CleanUP from '../assets/images/salonForMen/cleanup.png';
import DTan from '../assets/images/salonForMen/D-tan.png';
import Lotus from '../assets/images/WomenBrands/Lotus.png';
import Herbs from '../assets/images/WomenBrands/Herbs.png';
import kama from '../assets/images/WomenBrands/Kama.png';
import Forest from '../assets/images/WomenBrands/Forest.png';
import Bloom from '../assets/images/WomenBrands/Bloom.png';
import Himalaya from '../assets/images/WomenBrands/Himalaya.png';
import plom from '../assets/images/WomenBrands/Plum.png';
import Biotique from '../assets/images/WomenBrands/Biotique.png';
import Jovees from '../assets/images/WomenBrands/Jovees.png';
import YTPromise from '../components/ytPromise';
import RatingsTestimonialsFaq from '../components/RatingsTestimonialsFaq';

const MenPage = () => {
  const banners = [Banner1, Banner2, Banner3, Banner4];
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 2000); // Change banner every 2 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, [banners.length]);

  const brands = [
    Lotus, Herbs, kama, Forest, Bloom, Himalaya,
    plom, Biotique, Jovees
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 mt-[130px]">
        <div className="bg-[#F4F4F4] w-full">
          {/* Banner */}
          <div className="bg-white rounded-xl overflow-hidden shadow-sm mb-5 relative">
            {banners.map((banner, index) => (
              <img
                key={index}
                src={banner}
                alt={`Men's Banner ${index + 1}`}
                className={`w-full h-auto object-cover absolute top-0 left-0 transition-opacity duration-500 ${index === currentBanner ? 'opacity-100' : 'opacity-0'}`}
              />
            ))}
            <div className="relative w-full h-[150px] sm:h-[300px] md:h-[400px]">
              <div className="absolute bottom-6 right-6 z-10 text-right">
                <h2 className="text-white text-[32px] sm:text-[48px] md:text-[96px] leading-none font-light">
                  Men’s Salon
                </h2>
                <div className="mt-3 bg-[#FF5534] rounded-full px-10 py-2 inline-flex items-center gap-10 text-white text-xs sm:text-sm md:text-base font-medium">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-white text-white" />
                    4.78 <span className="text-white/80">(355k)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    847 bookings this year in Wagholi
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Salon for Men */}
          <div className="bg-[#DBE9FF] rounded-xl p-6 shadow-sm mb-5">
            <h2 className="text-center text-[20px] font-semibold text-[#1D1D1D] mb-4">Salon for Men</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {[
                { img: HairCut, label: 'Hair cut', to: '/men/classic' },
                { img: Massage, label: 'Massage', to: '/men/premium' },
                { img: HairColor, label: 'Hair color', to: '/men/classic' },
                { img: Pedicure, label: 'Pedicure', to: '/men/premium' },
                { img: CleanUP, label: 'Cleanup', to: '/men/classic' },
                { img: DTan, label: 'D-tan', to: '/men/premium' },
              ].map(({ img, label, to }, index) => (
                <Link key={index} className="bg-white rounded-xl flex flex-col items-center p-2" to={to}>
                  <img src={img} alt={label} className="rounded-lg w-full h-auto object-cover" />
                  <span className="mt-2 text-sm font-medium text-center text-[#1D1D1D]">{label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Men's Product Brands */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-5">
            <h2 className="text-center text-[16px] font-semibold text-[#1D1D1D] mb-4">
              Men’s Product Brands we use
            </h2>
            <div className="overflow-hidden bg-[#F5F6FB] rounded-lg">
              <div className="flex animate-infinite-scroll">
                {brands.map((brand, index) => (
                  <div key={`brand-${index}`} className="flex-shrink-0 p-3 flex items-center justify-center">
                    <img
                      src={brand}
                      alt={`brand-${index}`}
                      className="w-[98.6480484008789px] h-[100.45809936523438px] object-contain"
                    />
                  </div>
                ))}
                {brands.map((brand, index) => (
                  <div key={`brand-duplicate-${index}`} className="flex-shrink-0 p-3 flex items-center justify-center">
                    <img
                      src={brand}
                      alt={`brand-duplicate-${index}`}
                      className="w-[98.6480484008789px] h-[100.45809936523438px] object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mb-5"><YTPromise /></div>
        <div className="mb-5"><RatingsTestimonialsFaq /></div>
      </div>
    </div>
  );
};

export default MenPage;
