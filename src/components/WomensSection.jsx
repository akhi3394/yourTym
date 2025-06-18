import React, { useEffect, useState } from 'react'
import { Star, Calendar } from 'lucide-react'
import { Link } from 'react-router-dom'

import Banner1 from '../assets/images/womenBanner/Banner1.png'
import Banner2 from '../assets/images/womenBanner/Banner2.png'
import Banner3 from '../assets/images/womenBanner/Banner3.png'
import Banner4 from '../assets/images/womenBanner/Banner4.png'

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

const WomensSection = ({ showBannerText = false }) => {
    const banners = [Banner1, Banner2, Banner3, Banner4]
    const [currentBanner, setCurrentBanner] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBanner((prev) => (prev + 1) % banners.length)
        }, 2000)

        return () => clearInterval(interval)
    }, [banners.length])

    const brands = [Lotus, Herbs, kama, Forest, Bloom, Himalaya, plom, Biotique, Jovees]

    return (
        <div className="bg-[#F4F4F4] w-full">
            {/* Banner */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm mb-5 relative">
                {banners.map((banner, index) => (
                    <img
                        key={index}
                        src={banner}
                        alt={`Women's Banner ${index + 1}`}
                        className={`w-full h-auto object-cover absolute top-0 left-0 transition-opacity duration-500 ${index === currentBanner ? 'opacity-100' : 'opacity-0'
                            }`}
                    />
                ))}
                <div className="relative w-full h-[150px] sm:h-[300px] md:h-[400px]">
                    {showBannerText && (
                        <div className="absolute bottom-6 right-6 z-10 text-right">
                            <h2 className="text-white text-[32px] sm:text-[48px] md:text-[96px] leading-none font-light">
                                Salon For Women’s
                            </h2>
                            <div className="mt-3 bg-[#FF5534] rounded-full px-10 py-2 inline-flex items-center gap-10 text-white text-xs sm:text-sm md:text-base font-medium">
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 fill-white text-white" />
                                    4.78 <span className="text-white/80">(355k)</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    847 bookings this year in Wagholi
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>

            {/* Salon for Women */}
            <div className="bg-[#FFE8CF] rounded-xl p-6 shadow-sm mb-5">
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
                        <Link key={index} className="bg-white rounded-xl flex flex-col items-center p-2" to="/women/products">
                            <img src={img} alt={label} className="rounded-lg w-full h-auto object-cover" />
                            <span className="mt-2 text-sm font-medium text-center text-[#1D1D1D]">{label}</span>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Women's Product Brands */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-center text-[16px] font-semibold text-[#1D1D1D] mb-4">Women’s Product Brands we use</h2>
                <div className="overflow-hidden bg-[#F5F6FB] rounded-lg">
                    <div className="flex animate-infinite-scroll">
                        {[...brands, ...brands].map((brand, index) => (
                            <div key={index} className="flex-shrink-0 p-3 flex items-center justify-center">
                                <img
                                    src={brand}
                                    alt={`brand-${index}`}
                                    className="w-[98.6px] h-[100.5px] object-contain"
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
