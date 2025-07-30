import React from 'react';
import ServiceCard from './ServiceGrid';
import OfferCard from './OfferCard';
import SalonForWomen from '../assets/images/landingPage/SalonForWomen.png';
import WomenSkin from '../assets/images/landingPage/WomenSkin.png';
import SpaforMen from '../assets/images/landingPage/SpaforMen.png';
import SpaforWomen from '../assets/images/landingPage/SpaforWomen.png';
import SalonForMen from '../assets/images/landingPage/SalonforMen.png';
import MensSkin from '../assets/images/landingPage/MensSkinandHair.png';

import faceUpgrade1 from '../assets/images/offersforyou/faceUpgrade1.png';
import offers1 from '../assets/images/offersforyou/offersForYou2.png';
import offers2 from '../assets/images/offersforyou/offersForYou3.png';
import faceUpgrade2 from '../assets/images/offersforyou/faceUpgrade2.png';



import satisfaction from '../assets/images/landingPage/100.png'
import Refer from '../assets/images/refer/refer.png'
import HairDryer from '../assets/images/refer/HairDryer.png'
import YTTM from '../assets/images/landingPage/YTYMSafe.png'
import ServiceGrid from './ServiceGrid';
import WomenPageBeforeLogin from '../pages/WomenPageBeforeLogin';
import MenPageBeforeLogin from '../pages/MenPageBeforeLogin';
const BeforeLoginContent = () => {
  const services = [
    { image: SalonForWomen, size: 'salonWomen' },
    { image: WomenSkin, size: 'womenSkin' },
    { image: SpaforMen, size: 'spaForMen' },
    { image: SpaforWomen, size: 'spaForWomen' },
    { image: SalonForMen, size: 'salonForMen' },
    { image: MensSkin, size: 'mensSkin' },
  ];

  const offers = [
    { image: faceUpgrade1, size: 'large' },
    { image: offers1, size: 'small' },
    { image: offers2, size: 'small' },
    { image: faceUpgrade2, size: 'large' },
  ];

  return (
    <div>
    <div className="w-full pt-[150px] pb-8">
      <div className="w-full">
        {/* Services Masonry */}
        <ServiceGrid/>
      </div>
    </div>
    <div className="px-1">
      <OfferCard/>
    </div>
{/* womens section */}
    <div className="">
     <WomenPageBeforeLogin/>
    </div>

    {/* Mens section */}
    <div className="">
      <MenPageBeforeLogin/>
    </div>

    <div className="mb-5">
      <img src={satisfaction} alt="" className='w-full  object-fill' />
    </div>

    <div className="flex mb-5">
      <img src={Refer} alt="" className='w-[60%] object-fill' />
      <img src={HairDryer} alt="" className='w-[40%] object-fill'/>
    </div>


    <div className="mb-5 ">
      <img src={YTTM} alt="" className='w-full xl:max-w-7xl object-fill px-4 mx-auto'/>
    </div>

      </div>
  );
};

export default BeforeLoginContent;
