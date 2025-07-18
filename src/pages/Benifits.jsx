// import { useState } from 'react';
// import BenifitsServiceCard from '../components/BenifitsServiceCard';
// import BenifitsServiceModal from '../components/BenifitsServiceModal';
// import RewardCard from '../components/RewardCard';
// import ScratchCardModal from '../components/ScratchCardModal';

// function Benifits() {
//     const [selectedReward, setSelectedReward] = useState(null);
//     const [selectedService, setSelectedService] = useState(null);
//     const [showScratchModal, setShowScratchModal] = useState(false);
//     const [showServiceModal, setShowServiceModal] = useState(false);

//     const rewards = [
//         {
//             id: 1,
//             type: 'cashback',
//             title: 'Flat ₹500',
//             description: 'Bonus cash on your YITM wallet',
//             coupon: 'SAVE500',
//             expiryDays: null
//         },
//         {
//             id: 2,
//             type: 'service',
//             title: 'Free Service',
//             description: 'Free Bleach - Complexion ✓ 0.00:00:30 ₹0',
//             expiryDays: 14
//         },
//         {
//             id: 3,
//             type: 'cashback',
//             title: 'Flat ₹500',
//             description: 'Bonus cash on your YITM wallet',
//             coupon: 'CASH500',
//             expiryDays: null
//         },
//         {
//             id: 4,
//             type: 'cashback',
//             title: 'Flat ₹500',
//             description: 'Bonus cash on your YITM wallet',
//             coupon: 'BONUS500',
//             expiryDays: 7
//         }
//     ];

//     const services = [
//         {
//             id: 1,
//             name: 'Most Demanded',
//             image: 'https://images.pexels.com/photos/3985163/pexels-photo-3985163.jpeg?auto=compress&cs=tinysrgb&w=300',
//             duration: '00:00:30',
//             description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//             originalPrice: '999',
//             discountPrice: '0',
//             discount: '100',
//             badge: 'Best seller'
//         },
//         {
//             id: 2,
//             name: 'Most Demanded',
//             image: 'https://images.pexels.com/photos/3985163/pexels-photo-3985163.jpeg?auto=compress&cs=tinysrgb&w=300',
//             duration: '00:00:30',
//             description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//             originalPrice: '999',
//             discountPrice: '0',
//             discount: '100',
//             badge: 'Best seller'
//         },
//         {
//             id: 3,
//             name: 'Most Demanded',
//             image: 'https://images.pexels.com/photos/3985163/pexels-photo-3985163.jpeg?auto=compress&cs=tinysrgb&w=300',
//             duration: '00:00:30',
//             description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//             originalPrice: '999',
//             discountPrice: '0',
//             discount: '100',
//             badge: 'Best seller'
//         },
//         {
//             id: 4,
//             name: 'Most Demanded',
//             image: 'https://images.pexels.com/photos/3985163/pexels-photo-3985163.jpeg?auto=compress&cs=tinysrgb&w=300',
//             duration: '00:00:30',
//             description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//             originalPrice: '999',
//             discountPrice: '0',
//             discount: '100',
//             badge: 'Best seller'
//         }
//     ];

//     const handleRewardClick = (reward) => {
//         setSelectedReward(reward);
//         setShowScratchModal(true);
//     };

//     const handleServiceClick = (service) => {
//         setSelectedService(service);
//         setShowServiceModal(true);
//     };

//     const closeScratchModal = () => {
//         setShowScratchModal(false);
//         setSelectedReward(null);
//     };

//     const closeServiceModal = () => {
//         setShowServiceModal(false);
//         setSelectedService(null);
//     };

//     return (
//         <div className="min-h-screen bg-gray-50 py-8 mt-[120px]">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 {/* Header */}
//                 <div className="mb-8">
//                     <h1 className="text-2xl font-bold text-gray-900 mb-4">My Benefits</h1>

//                 </div>

//                 {/* Rewards Section */}
//                 <div className="mb-12">
//                     <span className='flex justify-start items-center gap-4 mb-5'>
//                         <h2 className="text-[16px] font-medium text-[#979797]">Rewards</h2>
//                         <div className="border-b border-[#979797] w-full"></div>
//                     </span>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//                         {rewards.map((reward) => (
//                             <RewardCard
//                                 key={reward.id}
//                                 reward={reward}
//                                 onClick={handleRewardClick}
//                             />
//                         ))}
//                     </div>
//                 </div>

//                 {/* Free Services Section */}
//                 <div>
//                     <span className='flex justify-start items-center gap-4 mb-5'>
//                         <h2 className="text-[16px] font-medium text-[#979797] w-[10%]">Free Services</h2>
//                         <div className="border-b border-[#979797] w-full"></div>
//                     </span>          
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         {services.map((service) => (
//                             <BenifitsServiceCard
//                                 key={service.id}
//                                 service={service}
//                                 onClick={handleServiceClick}
//                             />
//                         ))}
//                     </div>
//                 </div>
//             </div>

//             {/* Modals */}
//             <ScratchCardModal
//                 isOpen={showScratchModal}
//                 onClose={closeScratchModal}
//                 reward={selectedReward}
//             />

//             <BenifitsServiceModal
//                 isOpen={showServiceModal}
//                 onClose={closeServiceModal}
//                 service={selectedService}
//             />
//         </div>
//     );
// }

// export default Benifits;


import React from 'react'

const Benifits = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-8 mt-[120px]">
               <div className="mb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                   <h1 className="text-2xl font-bold text-gray-900 mb-4 ">My Benefits</h1>
                </div>
            <p className='text-center text-[#000] text-[20px]'>      Coming Soon
            </p>    
            </div>
    )
}

export default Benifits
