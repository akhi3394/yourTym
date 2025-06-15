import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const WomenPage = () => {
  const services = [
    { title: 'Create a Custom Package', subtitle: 'Specifically for your needs', icon: '🎯', isCustom: true },
    { title: 'Cleanup & Facials', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=200' },
    { title: 'Waxing', image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=200' },
    { title: 'Bleach & Detain', image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200' },
    { title: 'Massage', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=200' },
    { title: 'Hair Care', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=200' }
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <Navbar />
      
      <div className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="relative bg-gradient-to-r from-pink-300 to-orange-300 rounded-2xl overflow-hidden mb-8 h-64">
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="relative z-10 flex items-center justify-center h-full">
              <div className="text-center text-white">
                <h1 className="text-4xl font-bold mb-2">Salon For Women's</h1>
                <div className="flex items-center justify-center space-x-4 text-sm">
                  <span className="flex items-center">
                    <span className="text-yellow-400 mr-1">★</span>
                    4.78 (355k)
                  </span>
                  <span className="bg-red-500 px-2 py-1 rounded text-xs">
                    847 bookings this year in Wagholi
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Services Section */}
          <div className="mb-8">
            <div className="bg-[#F0E6FF] rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Salon for Women</h2>
              
              <div className="grid grid-cols-3 lg:grid-cols-6 gap-4">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className={`${service.isCustom ? 'bg-[#FF5534]' : 'bg-white'} rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow`}
                  >
                    {service.isCustom ? (
                      <div className="text-center">
                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mx-auto mb-2">
                          <span className="text-2xl">{service.icon}</span>
                        </div>
                        <h3 className="text-sm font-medium text-white mb-1">{service.title}</h3>
                        <p className="text-xs text-white opacity-90">{service.subtitle}</p>
                      </div>
                    ) : (
                      <>
                        <div className="aspect-square bg-gray-200 rounded-lg mb-3 overflow-hidden">
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="text-sm font-medium text-gray-800 text-center">{service.title}</h3>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Brand Section */}
          <div className="bg-white rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-gray-800 text-center mb-6">Women's Product Brands we use</h3>
            <div className="flex justify-center items-center space-x-8 text-lg text-gray-600">
              <span className="font-bold text-pink-500">LOTUS</span>
              <span className="font-bold text-yellow-600">Joy</span>
              <span className="font-bold text-orange-600">KAMA</span>
              <span className="font-bold text-red-500">Lakme</span>
              <span className="font-bold text-pink-400">Blossom</span>
              <span className="font-bold text-green-600">Himalaya</span>
              <span className="font-bold text-purple-500">plum</span>
              <span className="font-bold text-green-500">BIOTIQUE</span>
              <span className="font-bold text-blue-500">JOYEES</span>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default WomenPage;