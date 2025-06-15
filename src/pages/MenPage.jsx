import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MenPage = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('classic');

  useEffect(() => {
    const type = searchParams.get('type');
    if (type) {
      setActiveTab(type);
    }
  }, [searchParams]);

  const services = [
    { title: 'Create a Custom Package', subtitle: 'Specifically for your needs', icon: '🎯', isCustom: true },
    { title: 'Hair cut', image: 'https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?w=200' },
    { title: 'Massage', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200' },
    { title: 'Hair color', image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=200' },
    { title: 'Pedicure', image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=200' },
    { title: 'Cleanup', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=200' }
  ];

  const promiseItems = [
    { icon: '👩‍💼', title: 'On time &', subtitle: 'Professional' },
    { icon: '🧪', title: 'Single Kit &', subtitle: 'High Quality' },
    { icon: '🔒', title: 'Safety Assured', subtitle: '& Sanitized' },
    { icon: '🛡️', title: 'Hygiene & mess', subtitle: 'free service' },
    { icon: '🔍', title: 'Transparent', subtitle: 'pricing' },
    { icon: '📦', title: 'Package', subtitle: 'Benefits' }
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <Navbar 
        showTabs={true} 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
      />
      
      <div className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="relative bg-gradient-to-r from-gray-700 to-black rounded-2xl overflow-hidden mb-8 h-64">
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="relative z-10 flex items-center justify-center h-full">
              <div className="text-center text-white">
                <h1 className="text-4xl font-bold mb-2">
                  {activeTab === 'premium' ? "Men's Premium Salon" : "Men's Classic Salon"}
                </h1>
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
            <div className="bg-[#E6F3FF] rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
                {activeTab === 'premium' ? 'Premium Salon' : 'Classic salon'}
              </h2>
              
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
          <div className="bg-white rounded-2xl p-6 mb-8">
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

          {/* YT Promise Section - Only show for Premium */}
          {activeTab === 'premium' && (
            <div className="bg-white rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-gray-800 text-center mb-6">YT Promise</h3>
              <div className="grid grid-cols-3 lg:grid-cols-6 gap-4">
                {promiseItems.map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-2xl">{item.icon}</span>
                    </div>
                    <h4 className="text-sm font-medium text-gray-800">{item.title}</h4>
                    <p className="text-xs text-gray-600">{item.subtitle}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default MenPage;