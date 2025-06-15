import React, { useState } from 'react';
import ServiceCard from './ServiceCard';
import OfferCard from './OfferCard';
import MenPopup from './MenPopup';

const AfterLoginContent = () => {
  const [showMenPopup, setShowMenPopup] = useState(false);

  const services = [
    { title: "Women's", image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600' },
    { title: "Men's", image: 'https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?w=600' },
  ];

  const offers = [
    {
      title: 'Flat 25% off on Face Bleach',
      subtitle: 'Face upgrade deals',
      description: '',
      image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=200',
      buttonText: 'Explore Now'
    },
    {
      title: 'Flat 25% off on Face Bleach',
      subtitle: 'Face upgrade deals',
      description: '',
      image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=200',
      buttonText: 'Explore Now'
    }
  ];

  const handleServiceClick = (title) => {
    if (title === "Men's") {
      setShowMenPopup(true);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#F5F5F5] pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Services Grid - Simplified for logged in users */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {services.map((service, index) => (
              <div key={index} onClick={() => handleServiceClick(service.title)}>
                <ServiceCard
                  title={service.title}
                  image={service.image}
                  className="h-80"
                />
              </div>
            ))}
          </div>

          {/* Offers Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <h2 className="text-4xl font-light text-gray-800 mb-4">
                Offers<br />
                For<br />
                You
              </h2>
            </div>
            
            <div className="lg:col-span-2 space-y-4">
              {offers.map((offer, index) => (
                <OfferCard
                  key={index}
                  title={offer.title}
                  subtitle={offer.subtitle}
                  description={offer.description}
                  image={offer.image}
                  buttonText={offer.buttonText}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <MenPopup 
        isOpen={showMenPopup}
        onClose={() => setShowMenPopup(false)}
      />
    </>
  );
};

export default AfterLoginContent;