import React from 'react';
import { FaStar, FaPaperPlane } from 'react-icons/fa';
import { IoIosAdd } from 'react-icons/io';
import Plus from '../assets/svgs/plus.svg'
import Reply from '../assets/svgs/reply.svg'

const RatingsTestimonialsFaq = () => {
    return (
        <div className="w-full bg-[#F5F6FB]">
            <div className=" grid grid-cols-5 grid-rows-8 gap-4">
                {/* Ratings & Reviews */}
                <div className="col-span-2 row-span-8 bg-white rounded-xl flex flex-col h-auto">
                    <h3 className="text-center font-semibold text-lg text-[#333] mb-4 p-2">Ratings & Reviews</h3>

                    {/* Rating Bars + Overall */}
                    <div className="flex items-start justify-between gap-4 p-2">
                        <div className="flex flex-col gap-1 flex-1">
                            {[5, 4, 3, 2, 1].map((star) => (
                                <div key={star} className="flex items-center gap-4 text-sm py-1">
                                    <span>{star}</span>
                                    <div className="h-[18.21px] bg-[#F6F6F6] rounded-full flex-1 relative">
                                        <div className="absolute left-0 top-0 h-2 bg-[#FBBF24] rounded-full" style={{ width: `${star * 15}%`, height: '18.21px' }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col items-center text-center w-24">
                            <span className="text-2xl font-semibold text-[#333]">4.3</span>
                            <div className="flex gap-0.5 text-[#FBBF24] my-1">
                                {Array.from({ length: 4 }, (_, i) => <FaStar key={i} />)}
                                <FaStar className="text-gray-300" />
                            </div>
                            <p className="text-sm text-[#888]">500 reviews</p>
                        </div>
                    </div>

                    {/* Write Review Button */}
                    <div className="border border-[#FF5C5C] h-[44px] rounded-[10px] px-4 py-2 flex justify-between items-center text-[#FF5C5C] font-medium text-sm cursor-pointer w-[90%] mx-auto mt-5 mb-4">
                        Write a Review 
                        <img src={Plus} alt="plusicon" />
                    </div>

                    <div className=" border-2 border-[#D9D9D9] "></div>

                    {/* Review List */}
                    <div className="mt-6  max-h-[400px] overflow-y-auto pr-1 custom-scrollbar p-4">
                        {[1, 2, 3, 4, 5].map((_, idx) => (
                            <div key={idx} className=" p-4 rounded-lg">
                                <div className="flex items-center gap-2 p-2 bg-[#F5F8FF] rounded-[10px]">
                                    <img
                                        src="https://via.placeholder.com/30"
                                        alt="user"
                                        className="w-6 h-6 rounded-full"
                                    />
                                    <div>
                                        <p className="text-sm font-semibold text-[#333]">Lorem ipsum</p>
                                        <div className="flex items-center gap-1 text-[#FBBF24] text-xs">
                                            {[...Array(5)].map((_, i) => (
                                                <FaStar key={i} />
                                            ))}
                                        <p className="text-[11px] text-gray-500">12, April 2023</p>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-[13px] text-[#333] leading-snug bg-[#F5F8FF] p-2">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...
                                </p>
                                <div className="mt-3 flex items-center border rounded-[10px] px-3 py-1 bg-white">
                                    <input
                                        type="text"
                                        placeholder="Reply..."
                                        className="flex-1 text-sm text-[#333] outline-none bg-transparent rounded-[10px] h-[44px]"
                                    />
                                    <img src={Reply} alt="reply" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Testimonials */}
                <div className="col-span-3 row-span-3 col-start-3 bg-white rounded-xl p-4">
                    <h3 className="text-center font-semibold text-lg text-[#333] mb-4">Testimonials</h3>
                    <div className="flex gap-4 overflow-x-auto">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="w-[220px] flex-shrink-0 rounded-xl overflow-hidden bg-white shadow">
                                <div className="h-[155px] bg-[#FF5534]">
                                    <p className='p-1 text-white'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, sunt.</p>
                                </div>
                                <div className="relative h-[73px] bg-[#D9D9D9]/70 pt-10 pb-4 px-4">
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                                        <img
                                            src="https://via.placeholder.com/60"
                                            alt="user"
                                            className="w-12 h-12 rounded-full border-4 border-white shadow"
                                        />
                                    </div>
                                    <p className="text-sm text-center leading-snug mb-2 text-[#333]">
                                        Lorem ipsum dolor sit amet,
                                    </p>
                                    <div className="text-center">
                                        <p className="text-sm font-semibold text-[#333]">Lorem Ipsum</p>
                                        <p className="text-xs text-[#555]">Designation</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* FAQs */}
                <div className="col-span-3 row-span-5 col-start-3 row-start-4 bg-white rounded-xl p-4 h-[520px] flex flex-col">
                    <div className="text-center mb-4">
                        <h3 className="text-[#333] font-semibold text-lg mb-2">FAQs</h3>
                        <div className="flex items-center justify-between px-4 text-[#FF5C5C] border border-[#FF5C5C] rounded-[10px]  py-2 text-sm cursor-pointer w-full h-[44px] ">
                            <p>Ask a Question</p>
                            <span>
                                <img src={Plus} alt="plusicon" />
                            </span>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
                        {[1, 2, 3, 4, 5].map((_, idx) => (
                            <div key={idx} className="border border-[#E0E0E0] rounded-md p-3">
                                <p className="text-[14px] font-medium text-[#333]">
                                    Q: Lorem ipsum dolor sit amet, consectetur adipiscing?
                                </p>
                                <p className="text-[#3B82F6] text-sm mt-1 leading-snug">
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
