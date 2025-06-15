import React from 'react';
import { Dialog, DialogContent } from './ui/dialog';
import { useNavigate } from 'react-router-dom';

const WomenPopup = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const services = [
    { title: 'Cleanup & Facials', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=200' },
    { title: 'Waxing', image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=200' },
    { title: 'Bleach & Detain', image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200' },
    { title: 'Massage', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=200' },
    { title: 'Pedicure', image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=200' },
    { title: 'Manicure', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=200' }
  ];

  const handleServiceClick = () => {
    onClose();
    navigate('/women');
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-6 bg-[#F5E6D3] rounded-2xl">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Salon for Women</h2>
        </div>
        
        <div className="grid grid-cols-3 gap-6 mb-8">
          {services.map((service, index) => (
            <div
              key={index}
              onClick={handleServiceClick}
              className="bg-white rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="aspect-square bg-gray-200 rounded-lg mb-3 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-sm font-medium text-gray-800 text-center">{service.title}</h3>
            </div>
          ))}
        </div>

        <div className="text-center mb-4">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Women's Product Brands we use</h3>
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WomenPopup;