import React from 'react';
import { Dialog, DialogContent } from './ui/dialog';
import { useNavigate } from 'react-router-dom';
import classic from '../assets/images/menBanner/ClassicMen.png';
import premium from '../assets/images/menBanner/Premium.png';

const MenPopup = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleOptionClick = (type) => {
    onClose();
    navigate(`/men?type=${type}`);
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[90vw] md:max-w-4xl bg-white rounded-2xl p-4 md:p-6">
        <div className="text-center mb-4 md:mb-8">
          <h2 className="text-[16px] md:text-[20px] font-semibold text-[#000000]">Men's Salon</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
          <img
            src={classic}
            alt="classic"
            onClick={() => handleOptionClick('classic')}
            className="w-full h-auto md:h-[300px] object-cover rounded-lg cursor-pointer active:scale-95 md:hover:scale-105 transition-transform duration-200"
          />
          <img
            src={premium}
            alt="premium"
            onClick={() => handleOptionClick('premium')}
            className="w-full h-auto md:h-[300px] object-cover rounded-lg cursor-pointer active:scale-95 md:hover:scale-105 transition-transform duration-200"
          />
        </div>

        {/* Uncomment if brands or detailed cards are needed */}
        {/*
        <div className="text-center mt-4 md:mt-8">
          <h3 className="text-base md:text-lg font-medium text-gray-800 mb-2 md:mb-4">Men's Product Brands we use</h3>
          <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-600">
            <span>LOTUS</span>
            <span>Joy</span>
            <span>KAMA</span>
            <span>Lakme</span>
            <span>Blossom</span>
            <span>Himalaya</span>
            <span>plum</span>
            <span>BIOTIQUE</span>
            <span>JOYEES</span>
          </div>
        </div>
        */}
      </DialogContent>
    </Dialog>
  );
};

export default MenPopup;