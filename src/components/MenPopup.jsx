import React from 'react';
import { Dialog, DialogContent } from './ui/dialog';
import { useNavigate } from 'react-router-dom';
import classic from '../assets/images/menBanner/ClassicMen.png'
import premium from '../assets/images/menBanner/Premium.png'

const MenPopup = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const services = [
    { title: 'Hair cut', image: 'https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?w=200' },
    { title: 'Massage', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200' },
    { title: 'Hair color', image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=200' },
    { title: 'Pedicure', image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=200' },
    { title: 'Cleanup', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=200' },
    { title: 'D-tan', image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=200' }
  ];

  const handleOptionClick = (type) => {
    onClose();
    navigate(`/men?type=${type}`);
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl  bg-white rounded-2xl">
        <div className="text-center mb-8">
          <h2 className="text-[20px] font-semibold text-[#000000]">Men's Salon</h2>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <img src={classic} alt="classic" onClick={() => handleOptionClick('classic')} className='cursor-pointer'
          />
          <img src={premium} alt="premium" onClick={() => handleOptionClick('premium')} className='cursor-pointer'
          />
        </div>
        {/* <div className="grid grid-cols-2 gap-8">
          <div 
            onClick={() => handleOptionClick('classic')}
            className="bg-gray-100 rounded-2xl p-6 cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center mb-4">
              <div className="w-32 h-32 bg-gray-300 rounded-lg mr-6 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?w=200"
                  alt="Classic Salon"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Salon Classic</h3>
                <div className="flex space-x-2 mb-2">
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded">₹₹₹</span>
                  <span className="px-3 py-1 bg-gray-200 text-gray-600 text-sm rounded">Gold Package</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">BOMBAY SHAVING COMPANY</span>
                <span className="text-lg font-bold">L'OREAL</span>
              </div>
              <span className="text-2xl">→</span>
            </div>
          </div>

          <div 
            onClick={() => handleOptionClick('premium')}
            className="bg-[#FFA500] rounded-2xl p-6 cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center mb-4">
              <div className="w-32 h-32 bg-gray-300 rounded-lg mr-6 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=200"
                  alt="Premium Salon"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Salon Premium</h3>
                <div className="flex space-x-2 mb-2">
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded">₹₹₹</span>
                  <span className="px-3 py-1 bg-white text-gray-600 text-sm rounded">Gold Package</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-white">BOMBAY SHAVING COMPANY</span>
                <span className="text-lg font-bold text-white">L'OREAL</span>
              </div>
              <span className="text-2xl text-white">→</span>
            </div>
          </div>
        </div> */}

        {/* <div className="text-center mt-8">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Men's Product Brands we use</h3>
          <div className="flex justify-center items-center space-x-8 text-sm text-gray-600">
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
        </div> */}
      </DialogContent>
    </Dialog>
  );
};

export default MenPopup;