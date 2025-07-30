import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WomensSection from '../components/WomensSection';
import RatingsTestimonialsFaq from '../components/RatingsTestimonialsFaq';
import YTPromise from '../components/ytPromise';

const WomenPage = () => {
  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-[80px] sm:mt-[100px] xl:mt-[130px] bg-[#F5F5F5]">
          <div className="mb-4 sm:mb-5"><WomensSection showBannerText={true} /></div>
          <div className="mb-4 sm:mb-5"><YTPromise /></div>
          <div className="mb-4 sm:mb-5"><RatingsTestimonialsFaq /></div>
        </div>
      </div>
    </div>
  );
};

export default WomenPage;