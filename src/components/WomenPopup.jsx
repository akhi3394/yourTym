import React from 'react';
import { Dialog, DialogContent } from './ui/dialog';
import { Link, useNavigate } from 'react-router-dom';
import CleanUP from '../assets/images/salonForWomen/cleanUp.png'
import Waxing from '../assets/images/salonForWomen/waxing.png'
import Bleach from '../assets/images/salonForWomen/bleach.png'
import Massage from '../assets/images/salonForWomen/massage.png'
import Pedicure from '../assets/images/salonForWomen/pedicure.png'
import Manicure from '../assets/images/salonForWomen/manicure.png'
import Lotus from '../assets/images/WomenBrands/Lotus.png'
import Herbs from '../assets/images/WomenBrands/Herbs.png'
import kama from '../assets/images/WomenBrands/Kama.png'
import Forest from '../assets/images/WomenBrands/Forest.png'
import Bloom from '../assets/images/WomenBrands/Bloom.png'
import Himalaya from '../assets/images/WomenBrands/Himalaya.png'
import plom from '../assets/images/WomenBrands/Plum.png'
import Biotique from '../assets/images/WomenBrands/Biotique.png'
import Jovees from '../assets/images/WomenBrands/Jovees.png'

const WomenPopup = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const brands = [
    Lotus, Herbs, kama, Forest, Bloom, Himalaya,
    plom, Biotique, Jovees
  ];

  const handleServiceClick = () => {
    onClose();
    navigate('/women');
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-[90vw] sm:max-w-4xl p-4 sm:p-6 rounded-2xl max-h-[90vh] overflow-y-auto">
        <div className="bg-[#FFE8CF] rounded-xl p-4 sm:p-6 shadow-sm mb-5">
          <h2 className="text-center text-[18px] sm:text-[20px] font-semibold text-[#1D1D1D] mb-4">Salon for Women</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {[
              { img: CleanUP, label: 'Cleanup & Facials' },
              { img: Waxing, label: 'Waxing' },
              { img: Bleach, label: 'Bleach & Detain' },
              { img: Massage, label: 'Massage' },
              { img: Pedicure, label: 'Pedicure' },
              { img: Manicure, label: 'Manicure' },
            ].map(({ img, label }, index) => (
              <div key={index} className="bg-white rounded-xl flex flex-col items-center p-2 cursor-pointer" onClick={handleServiceClick}>
                <img src={img} alt={label} className="rounded-lg w-full h-auto object-cover" />
                <span className="mt-2 text-xs sm:text-sm font-medium text-center text-[#1D1D1D]">{label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
          <h2 className="text-center text-[14px] sm:text-[16px] font-semibold text-[#1D1D1D] mb-4">
            Women’s Product Brands we use
          </h2>
          <div className="overflow-hidden bg-[#F5F6FB] rounded-lg">
            <div className="flex animate-infinite-scroll">
              {brands.map((brand, index) => (
                <div key={`brand-${index}`} className="flex-shrink-0 p-2 sm:p-3 flex items-center justify-center">
                  <img
                    src={brand}
                    alt={`brand-${index}`}
                    className="w-[80px] h-[80px] sm:w-[98.6480484008789px] sm:h-[100.45809936523438px] object-contain"
                  />
                </div>
              ))}
              {brands.map((brand, index) => (
                <div key={`brand-duplicate-${index}`} className="flex-shrink-0 p-2 sm:p-3 flex items-center justify-center">
                  <img
                    src={brand}
                    alt={`brand-duplicate-${index}`}
                    className="w-[80px] h-[80px] sm:w-[98.6480484008789px] sm:h-[100.45809936523438px] object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WomenPopup;