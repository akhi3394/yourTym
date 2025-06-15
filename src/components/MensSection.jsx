import React from 'react'
import Banner1 from '../assets/images/menBanner/MenBanner1.png'
// import Banner2 from '../assets/images/womenBanner/MenBanner2.png'
// import Banner3 from '../assets/images/womenBanner/MenBanner3.png'
// import Banner4 from '../assets/images/womenBanner/MenBanner4.png'

// salon for women
import HairCut from '../assets/images/salonForMen/haircut.png'
import Massage from '../assets/images/salonForWomen/massage.png'
import HairColor from '../assets/images/salonForMen/hairColor.png'
import Pedicure from '../assets/images/salonForMen/pedicure.png'
import CleanUP from '../assets/images/salonForMen/cleanup.png'
import DTan from '../assets/images/salonForMen/D-tan.png'

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



const MensSection = () => {
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
                <h2 className="text-center text-[20px] font-semibold text-[#1D1D1D] mb-4">Salon for Mens</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                    {[
                        { img: HairCut, label: 'Hair cut' },
                        { img: Massage, label: 'Massage' },
                        { img: HairColor, label: 'Hair color' },
                        { img: Pedicure, label: 'Pedicure' },
                        { img: CleanUP, label: 'Cleanup' },
                        { img: DTan, label: 'D-tan' },
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
                    Men’s Product Brands we use
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

export default MensSection
