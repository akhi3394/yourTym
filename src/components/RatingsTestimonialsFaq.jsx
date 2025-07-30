import React from 'react';
import { FaStar, FaPaperPlane } from 'react-icons/fa';
import Plus from '../assets/svgs/plus.svg';
import Reply from '../assets/svgs/reply.svg';

const RatingsTestimonialsFaq = () => {
  return (
    <div className="w-full bg-[#F5F6FB]">
      <div className="grid grid-cols-1 sm:grid-cols-5 xl:grid-cols-5 gap-3 sm:gap-4 xl:gap-4">
        {/* Ratings & Reviews */}
        <div className="col-span-1 sm:col-span-2 xl:col-span-2 xl:row-span-8 bg-white rounded-xl flex flex-col h-auto p-3 sm:p-4 xl:p-2">
          <h3 className="text-center font-semibold text-base sm:text-lg xl:text-lg text-[#333] mb-3 sm:mb-4 xl:mb-4">Ratings & Reviews</h3>
          <div className="flex items-start justify-between gap-3 sm:gap-4 xl:gap-4 p-2">
            <div className="flex flex-col gap-1 flex-1">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-2 sm:gap-4 xl:gap-4 text-xs sm:text-sm xl:text-sm py-1">
                  <span>{star}</span>
                  <div className="h-[14px] sm:h-[18.21px] xl:h-[18.21px] bg-[#F6F6F6] rounded-full flex-1 relative">
                    <div className="absolute left-0 top-0 h-full bg-[#FBBF24] rounded-full" style={{ width: `${star * 15}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col items-center text-center w-20 sm:w-24 xl:w-24">
              <span className="text-xl sm:text-2xl xl:text-2xl font-semibold text-[#333]">4.3</span>
              <div className="flex gap-0.5 text-[#FBBF24] my-1">
                {Array.from({ length: 4 }, (_, i) => <FaStar key={i} className="w-3 h-3 sm:w-4 xl:w-4 sm:h-4 xl:h-4" />)}
                <FaStar className="text-gray-300 w-3 h-3 sm:w-4 xl:w-4 sm:h-4 xl:h-4" />
              </div>
              <p className="text-xs sm:text-sm xl:text-sm text-[#888]">500 reviews</p>
            </div>
          </div>
          <div className="border border-[#FF5C5C] h-9 sm:h-[44px] xl:h-[44px] rounded-[10px] px-3 sm:px-4 xl:px-4 py-2 flex justify-between items-center text-[#FF5C5C] font-medium text-xs sm:text-sm xl:text-sm cursor-pointer w-[90%] mx-auto mt-4 sm:mt-5 xl:mt-5 mb-3 sm:mb-4 xl:mb-4">
            Write a Review 
            <img src={Plus} alt="plusicon" className="w-4 h-4 sm:w-5 xl:w-5 sm:h-5 xl:h-5" />
          </div>
          <div className="border-2 border-[#D9D9D9]"></div>
          <div className="mt-4 sm:mt-6 xl:mt-6 max-h-[300px] sm:max-h-[400px] xl:max-h-[400px] overflow-y-auto pr-1 custom-scrollbar p-2 sm:p-4 xl:p-4">
            {[1, 2, 3, 4, 5].map((_, idx) => (
              <div key={idx} className="p-2 sm:p-4 xl:p-4 rounded-lg">
                <div className="flex items-center gap-2 p-2 bg-[#F5F8FF] rounded-[10px]">
                  <img
                    src="https://via.placeholder.com/30"
                    alt="user"
                    className="w-5 h-5 sm:w-6 xl:w-6 sm:h-6 xl:h-6 rounded-full"
                  />
                  <div>
                    <p className="text-xs sm:text-sm xl:text-sm font-semibold text-[#333]">Lorem ipsum</p>
                    <div className="flex items-center gap-1 text-[#FBBF24] text-[10px] sm:text-xs xl:text-xs">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="w-3 h-3 sm:w-4 xl:w-4 sm:h-4 xl:h-4" />
                      ))}
                      <p className="text-[10px] sm:text-[11px] xl:text-[11px] text-gray-500">12, April 2023</p>
                    </div>
                  </div>
                </div>
                <p className="text-[11px] sm:text-[13px] xl:text-[13px] text-[#333] leading-snug bg-[#F5F8FF] p-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...
                </p>
                <div className="mt-2 sm:mt-3 xl:mt-3 flex items-center border rounded-[10px] px-2 sm:px-3 xl:px-3 py-1 bg-white">
                  <input
                    type="text"
                    placeholder="Reply..."
                    className="flex-1 text-xs sm:text-sm xl:text-sm text-[#333] outline-none bg-transparent rounded-[10px] h-8 sm:h-[44px] xl:h-[44px]"
                  />
                  <img src={Reply} alt="reply" className="w-4 h-4 sm:w-5 xl:w-5 sm:h-5 xl:h-5" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="col-span-1 sm:col-span-3 xl:col-span-3 xl:row-start-1 xl:row-span-3 bg-white rounded-xl p-3 sm:p-4 xl:p-4">
          <h3 className="text-center font-semibold text-base sm:text-lg xl:text-lg text-[#333] mb-3 sm:mb-4 xl:mb-4">Testimonials</h3>
          <div className="flex gap-3 sm:gap-4 xl:gap-4 overflow-x-auto">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="w-[180px] sm:w-[220px] xl:w-[220px] flex-shrink-0 rounded-xl overflow-hidden bg-white shadow">
                <div className="h-[120px] sm:h-[155px] xl:h-[155px] bg-[#FF5534]">
                  <p className="p-1 sm:p-2 xl:p-2 text-white text-xs sm:text-sm xl:text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, sunt.</p>
                </div>
                <div className="relative h-[60px] sm:h-[73px] xl:h-[73px] bg-[#D9D9D9]/70 pt-8 sm:pt-10 xl:pt-10 pb-3 sm:pb-4 xl:pb-4 px-3 sm:px-4 xl:px-4">
                  <div className="absolute -top-5 sm:-top-6 xl:-top-6 left-1/2 -translate-x-1/2">
                    <img
                      src="https://via.placeholder.com/60"
                      alt="user"
                      className="w-10 h-10 sm:w-12 xl:w-12 sm:h-12 xl:h-12 rounded-full border-4 border-white shadow"
                    />
                  </div>
                  <p className="text-xs sm:text-sm xl:text-sm text-center leading-snug mb-1 sm:mb-2 xl:mb-2 text-[#333]">
                    Lorem ipsum dolor sit amet,
                  </p>
                  <div className="text-center">
                    <p className="text-xs sm:text-sm xl:text-sm font-semibold text-[#333]">Lorem Ipsum</p>
                    <p className="text-[10px] sm:text-xs xl:text-xs text-[#555]">Designation</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="col-span-1 sm:col-span-3 xl:col-span-3 xl:row-start-4 xl:row-span-5 bg-white rounded-xl p-3 sm:p-4 xl:p-4 h-auto sm:h-[520px] xl:h-[520px] flex flex-col">
          <div className="text-center mb-3 sm:mb-4 xl:mb-4">
            <h3 className="text-[#333] font-semibold text-base sm:text-lg xl:text-lg mb-2">FAQs</h3>
            <div className="flex items-center justify-between px-3 sm:px-4 xl:px-4 text-[#FF5C5C] border border-[#FF5C5C] rounded-[10px] py-2 text-xs sm:text-sm xl:text-sm cursor-pointer w-full h-9 sm:h-[44px] xl:h-[44px]">
              <p>Ask a Question</p>
              <span>
                <img src={Plus} alt="plusicon" className="w-4 h-4 sm:w-5 xl:w-5 sm:h-5 xl:h-5" />
              </span>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto space-y-2 sm:space-y-3 xl:space-y-3 pr-1 custom-scrollbar">
            {[1, 2, 3, 4, 5].map((_, idx) => (
              <div key={idx} className="border border-[#E0E0E0] rounded-md p-2 sm:p-3 xl:p-3">
                <p className="text-xs sm:text-[14px] xl:text-[14px] font-medium text-[#333]">
                  Q: Lorem ipsum dolor sit amet, consectetur adipiscing?
                </p>
                <p className="text-[#3B82F6] text-xs sm:text-sm xl:text-sm mt-1 leading-snug">
                  A: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingsTestimonialsFaq;