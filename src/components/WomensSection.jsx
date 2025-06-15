import React from 'react'
import Banner1 from '../assets/images/womenBanner/Banner1.png'

// salon for women
import CleanUP from '../assets/images/salonForWomen/cleanUp.png'
import Waxing from '../assets/images/salonForWomen/waxing.png'
import Bleach from '../assets/images/salonForWomen/bleach.png'
import Massage from '../assets/images/salonForWomen/massage.png'
import Pedicure from '../assets/images/salonForWomen/pedicure.png'
import Manicure from '../assets/images/salonForWomen/manicure.png'

// women's brands
import Lotus from '../assets/images/WomenBrands/Lotus.png'
import Herbs from '../assets/images/WomenBrands/Herbs.png'
import kama from '../assets/images/WomenBrands/Kama.png'
import Forest from '../assets/images/WomenBrands/Forest.png'
import Bloom from '../assets/images/WomenBrands/Bloom.png'
import Himalaya from '../assets/images/WomenBrands/Himalaya.png'
import plom from '../assets/images/WomenBrands/Plum.png'
import Biotique from '../assets/images/WomenBrands/Biotique.png'
import Jovees from '../assets/images/WomenBrands/Jovees.png'



const WomensSection = () => {
     const brands = [
        Lotus, Herbs, kama, Forest, Bloom, Himalaya,
        plom, Biotique, Jovees
    ];
    return (
        <div className="bg-[#F4F4F4] py-6 px-4 md:px-10 lg:px-20 space-y-6 w-full max-w-[1280px] mx-auto">
            {/* Banner */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                <img src={Banner1} alt="Women's Banner" className="w-full h-auto object-cover" />
            </div>

            {/* Salon for Women */}
            <div className="bg-[#FFE8CF] rounded-xl p-6 shadow-sm">
                <h2 className="text-center text-[20px] font-semibold text-[#1D1D1D] mb-4">Salon for Women</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                    {[
                        { img: CleanUP, label: 'Cleanup & Facials' },
                        { img: Waxing, label: 'Waxing' },
                        { img: Bleach, label: 'Bleach & Detain' },
                        { img: Massage, label: 'Massage' },
                        { img: Pedicure, label: 'Pedicure' },
                        { img: Manicure, label: 'Manicure' },
                    ].map(({ img, label }, index) => (
                        <div key={index} className="bg-white rounded-xl flex flex-col items-center p-2">
                            <img src={img} alt={label} className="rounded-lg w-full h-auto object-cover" />
                            <span className="mt-2 text-sm font-medium text-center text-[#1D1D1D]">{label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Women's Product Brands */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-center text-[16px] font-semibold text-[#1D1D1D] mb-4">
                    Women’s Product Brands we use
                </h2>
                <div className="overflow-hidden bg-[#F5F6FB] rounded-lg">
                    <div className="flex animate-infinite-scroll">
                        {/* Original brands */}
                        {brands.map((brand, index) => (
                            <div key={`brand-${index}`} className="flex-shrink-0 p-3 flex items-center justify-center">
                                <img
                                    src={brand}
                                    alt={`brand-${index}`}
                                    className="w-[98.6480484008789px] h-[100.45809936523438px] object-contain"
                                />
                            </div>
                        ))}
                        {/* Duplicated brands for seamless loop */}
                        {brands.map((brand, index) => (
                            <div key={`brand-duplicate-${index}`} className="flex-shrink-0 p-3 flex items-center justify-center">
                                <img
                                    src={brand}
                                    alt={`brand-duplicate-${index}`}
                                    className="w-[98.6480484008789px] h-[100.45809936523438px] object-contain"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WomensSection
