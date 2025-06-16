import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WomensSection from '../components/WomensSection';
import YTPromise from '../components/ytPromise';
import RatingsTestimonialsFaq from '../components/RatingsTestimonialsFaq';


const WomenPage = () => {

  return (
      <>
      <div className="min-h-screen bg-[#F5F5F5]">
      <div className="mt-[120px] bg-[#F5F5F5]">
        <div className="mb-5"><WomensSection /></div>
        <div className="mb-5"><YTPromise /></div>
        <div className="mb-5"><RatingsTestimonialsFaq/></div>
      </div>
    </div>
    </>
  );
};

export default WomenPage;