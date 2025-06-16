import React from 'react';
import OnTime from '../assets/images/ytpromise/ontime.png';
import SingleKit from '../assets/images/ytpromise/singlekit.png';
import Safety from '../assets/images/ytpromise/sefty.png';
import Hygiene from '../assets/images/ytpromise/hygene.png';
import Transparent from '../assets/images/ytpromise/transperent.png';
import Package from '../assets/images/ytpromise/note.png';

const YTPromise = () => {
    const cards = [
        {
            icon: OnTime,
            title: 'On time & Trained Expert',
            desc: 'Our Experts are well trained & will reach on time on your service. (On time, every time).'
        },
        {
            icon: SingleKit,
            title: 'Single Kit & Branded Products',
            desc: 'All our experts use only Branded & single time use Sachet Packets.'
        },
        {
            icon: Safety,
            title: 'Safety Assured',
            desc: 'Your Safety is utmost important for us. Expert will sanitized tools & equipments before and after Service.'
        },
        {
            icon: Hygiene,
            title: 'Hygiene & mess dree service',
            desc: 'Your House will be left with no mess at all after services.'
        },
        {
            icon: Transparent,
            title: 'Transparent Pricing',
            desc: 'Our Experts are well trained & will reach on time on your service. (On time, every time).'
        },
        {
            icon: Package,
            title: 'Package Customizations',
            desc: 'Freedom to customize your own Package.'
        }
    ];

    return (
        <section className="bg-[#FFFFFF] py-10 px-4">
            <div className="max-w-[1280px] mx-auto w-full">
                <h2 className="text-center text-[#444444] text-[24px] font-semibold mb-10">YT Promise</h2>

                {/* Responsive Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
                    {cards.map((item, index) => (
                        <div
                            key={index}
                            className="bg-[#F5F6FB] rounded-[12px] px-4 py-6 flex flex-col items-center text-center h-[322px] shadow-sm"
                        >
                            <img src={item.icon} alt={item.title} className="w-[64px] h-[64px] mb-12" />
                            <h3 className="text-[16px] text-black font-semibold mb-2 leading-[22px]">{item.title}</h3>
                            <p className="text-[14px] text-[#333333] leading-[20px]">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

    );
};

export default YTPromise;
