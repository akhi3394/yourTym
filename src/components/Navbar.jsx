import React, { useState } from 'react';
import { MapPin, Search, Calendar, Bookmark, ShoppingBag, User } from 'lucide-react';
import { useAppSelector } from '../hooks/useAppSelector';
import { useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import WomenPopup from './WomenPopup';
import Logo from "../../src/assets/images/yourtym_logo.png";
import LocationIcon from '../../src/assets/svgs/locationIcon.svg';
import SearchIcon from '../../src/assets/svgs/searchIcon.svg';
import Wallet from '../../src/assets/svgs/wallet.svg';
import Gift from '../../src/assets/svgs/Gift.svg';
import Cart from '../../src/assets/svgs/Cart.svg';
import Profile from '../../src/assets/svgs/profile.svg';


const Navbar = ({ showTabs = false, activeTab = 'classic', onTabChange }) => {
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(false);
    const [showWomenPopup, setShowWomenPopup] = useState(false);
    const navigate = useNavigate();

    const handleWomenClick = () => {
        if (isAuthenticated) {
            setShowWomenPopup(true);
        }
    };

    const handleMenClick = () => {
        if (isAuthenticated) {
            navigate('/men');
        }
    };

    const handleLogoClick = () => {
        navigate('/');
    };

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 ${showTabs && activeTab === 'premium' ? 'bg-[#FFA500]' : 'bg-white'} shadow-sm z-50 border-b border-gray-200`}>
                <div className="w-full h-[120px] flex items-center justify-center px-4 sm:px-6 lg:px-8">
                    <div className="w-full max-w-[1280px] flex items-center justify-between">

                        {/* Logo */}
                        <div className="flex items-center flex-shrink-0">
                            <div
                                className="cursor-pointer"
                                onClick={handleLogoClick}
                            >
                                <img src={Logo} alt="logo" className="h-[53px] w-[152px]" />
                            </div>
                        </div>

                        {/* Location and Search */}
                        <div className="flex items-center gap-4 flex-1 max-w-[600px] mx-8">
                            {/* Location Dropdown */}
                            <div className="flex items-center min-w-[180px] h-[40px] border border-[#E5E5E5] rounded-[8px] px-3 bg-white">
                                <img src={LocationIcon} alt="LocationIcon" className="w-[16px] h-[16px] mr-2 flex-shrink-0" />
                                <select className="bg-transparent border-none outline-none text-[#333333] text-[14px] font-normal flex-1 cursor-pointer">
                                    <option>Noida, Sector 145</option>
                                </select>
                            </div>

                            {/* Search Bar */}
                            <div className="flex-1 relative">
                                <img src={SearchIcon} alt="searchIcon" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-[16px] h-[16px]" />
                                <input
                                    type="text"
                                    placeholder="Search for ..."
                                    className="w-full h-[40px] border border-[#E5E5E5] rounded-[8px] pl-10 pr-4 text-[14px] focus:outline-none focus:ring-1 focus:ring-[#FF5534] focus:border-[#FF5534] placeholder-[#999999]"
                                />
                            </div>
                        </div>

                        {/* Navigation Items */}
                        <div className="flex items-center gap-6 flex-shrink-0">
                            {!isAuthenticated ? (
                                <>
                                    <button
                                        onClick={handleMenClick}
                                        className="text-[#333333] text-[16px] font-medium hover:text-[#FF5534] transition-colors"
                                    >
                                        Men
                                    </button>
                                    <button
                                        onClick={handleWomenClick}
                                        className="text-[#333333] text-[16px] font-medium hover:text-[#FF5534] transition-colors"
                                    >
                                        Women
                                    </button>

                                    <button
                                        onClick={() => setShowLoginModal(true)}
                                        className="bg-[#FF5534] text-white px-6 py-2 rounded-[8px] h-[40px] text-[14px] font-medium hover:bg-[#E54728] transition-colors whitespace-nowrap"
                                    >
                                        Login/Signup
                                    </button>
                                </>
                            ) : (
                                <>
                                    {showTabs ? (
                                        <div className="flex items-center space-x-6">
                                            <button
                                                onClick={() => onTabChange('classic')}
                                                className={`px-4 py-2 relative transition-colors text-[16px] font-medium ${activeTab === 'classic'
                                                    ? 'text-[#FF5534] after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#FF5534]'
                                                    : 'text-[#333333] hover:text-[#FF5534]'
                                                    }`}
                                            >
                                                Classic
                                            </button>
                                            <button
                                                onClick={() => onTabChange('premium')}
                                                className={`px-4 py-2 relative transition-colors text-[16px] font-medium ${activeTab === 'premium'
                                                    ? 'text-[#FF5534] after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#FF5534]'
                                                    : 'text-[#333333] hover:text-[#FF5534]'
                                                    }`}
                                            >
                                                Premium
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <button
                                                onClick={handleMenClick}
                                                className="text-[#333333] text-[16px] font-medium hover:text-[#FF5534] transition-colors"
                                            >
                                                Men
                                            </button>
                                            <button
                                                onClick={handleWomenClick}
                                                className="text-[#333333] text-[16px] font-medium hover:text-[#FF5534] transition-colors"
                                            >
                                                Women
                                            </button>
                                        </>
                                    )}
                                    <img src={Wallet} alt="LocationIcon" className="w-[24px] h-[24px] mr-2 flex-shrink-0" />
                                    <img src={Gift} alt="LocationIcon" className="w-[24px] h-[24px] mr-2 flex-shrink-0" />
                                    <img src={Cart} alt="LocationIcon" className="w-[24px] h-[24px] mr-2 flex-shrink-0" />
                                    <img src={Profile} alt="LocationIcon" className="w-[24px] h-[24px] mr-2 flex-shrink-0" />

                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <LoginModal
                isOpen={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                onSwitchToSignup={() => {
                    setShowLoginModal(false);
                    setShowSignupModal(true);
                }}
            />

            <SignupModal
                isOpen={showSignupModal}
                onClose={() => setShowSignupModal(false)}
                onSwitchToLogin={() => {
                    setShowSignupModal(false);
                    setShowLoginModal(true);
                }}
            />

            <WomenPopup
                isOpen={showWomenPopup}
                onClose={() => setShowWomenPopup(false)}
            />
        </>
    );
};

export default Navbar;