import React, { useState, useEffect } from 'react';
import { MapPin, Search, Calendar, Bookmark, ShoppingBag, User, Menu, X } from 'lucide-react';
import { useAppSelector } from '../hooks/useAppSelector';
import { useNavigate, useLocation } from 'react-router-dom';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import WomenPopup from './WomenPopup';
import Logo from "../../src/assets/images/yourtym_logo.png";
import LocationIcon from '../../src/assets/svgs/locationIcon.svg';
import Wallet from '../../src/assets/svgs/wallet.svg';
import Gift from '../../src/assets/svgs/Gift.svg';
import Cart from '../../src/assets/svgs/Cart.svg';
import Profile from '../../src/assets/svgs/profile.svg';
import LocationAccessModal from './LocationAccessModal';
import CircularLoader from './CircularLoader';
import SearchBar from './SearchBar';

const Navbar = ({ BannersData, bannerLoading }) => {
  const { isAuthenticated, cityName } = useAppSelector((state) => state.auth);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showWomenPopup, setShowWomenPopup] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [locationText, setLocationText] = useState(cityName || "Select Location");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const isMenRoute = location.pathname.startsWith('/men');
  const activeTab = location.pathname.includes('premium') ? 'premium' : 'classic';

  useEffect(() => {
    if (cityName) {
      setLocationText(cityName);
    } else {
      setLocationText("Select Location");
    }
  }, [cityName]);

  const handleWomenClick = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
    } else {
      setShowWomenPopup(true);
    }
    setIsMobileMenuOpen(false);
  };

  const handleMenClick = () => {
    if (!isAuthenticated) {
      const menSection = document.getElementById('men-section');
      if (menSection) {
        menSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        setShowLoginModal(true);
      }
    } else {
      navigate('/men');
    }
    setIsMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const handleProfileClick = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
    } else {
      navigate("/profile");
    }
    setIsMobileMenuOpen(false);
  };

  const handleCheckoutClick = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
    } else {
      navigate("/checkout");
    }
    setIsMobileMenuOpen(false);
  };

  const handleWalletClick = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
    } else {
      navigate("/wallet");
    }
    setIsMobileMenuOpen(false);
  };

  const handleBenifitsClick = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
    } else {
      navigate("/benifits");
    }
    setIsMobileMenuOpen(false);
  };

  const handleLocationClick = () => {
    if (isAuthenticated) {
      setShowLocationModal(true);
    } else {
      setShowLoginModal(true);
    }
    setIsMobileMenuOpen(false);
  };

  const handleTabChange = (tab) => {
    navigate(`/men/${tab}`);
    setIsMobileMenuOpen(false);
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          const address = data?.display_name || 'Location not found';
          setLocationText(address);
        } catch (error) {
          console.error("Geocoding error:", error);
          setLocationText("Unable to fetch location");
        }
      },
      (error) => {
        console.error("Location Error:", error);
        setLocationText("Location access denied");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  };

  const handleAllow = () => {
    setShowLocationModal(false);
    getLocation();
  };

  const handleDeny = () => {
    setShowLocationModal(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 ${isMenRoute && activeTab === 'premium' ? 'bg-[#FFA500]' : 'bg-white'} shadow-sm z-50 border-b border-gray-200`}>
        <div className="w-full h-[80px] md:h-[120px] flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-[1280px] flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0">
              <div className="cursor-pointer" onClick={handleLogoClick}>
                {bannerLoading ? (
                  <CircularLoader size={20} />
                ) : (
                  <img
                    src={BannersData?.data[0]?.image ?? ""}
                    alt="logo"
                    className="h-[60px] w-[114px] md:h-[80px] md:w-[152px] bg-cover"
                  />
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                {isMobileMenuOpen ? <X size={24} className="text-[#333333]" /> : <Menu size={24} className="text-[#333333]" />}
              </button>
            </div>

            {/* Desktop Location, Search, and Navigation */}
            <div className="hidden md:flex items-center gap-4 flex-1 max-w-[600px]">
              <div className="relative inline-block">
                <div
                  className="flex items-center min-w-[200px] h-[40px] border border-[#E5E5E5] rounded-[8px] px-3 bg-white cursor-pointer"
                  onClick={handleLocationClick}
                >
                  <img
                    src={LocationIcon}
                    alt="LocationIcon"
                    className="w-[16px] h-[16px] mr-2 flex-shrink-0"
                  />
                  <p
                    className="text-[#333333] text-[14px] font-normal truncate max-w-[150px]"
                    title={locationText}
                  >
                    {locationText}
                  </p>
                </div>
              </div>
              <SearchBar setShowLogin={setShowLoginModal} />
            </div>

            {/* Desktop Navigation Items */}
            <div className="hidden md:flex items-center gap-6 flex-shrink-0">
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
                  {isMenRoute ? (
                    <div className="flex items-center space-x-6">
                      <button
                        onClick={() => handleTabChange('classic')}
                        className={`px-4 py-2 relative transition-colors text-[16px] font-medium ${activeTab === 'classic'
                            ? 'text-[#FF5534] after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#FF5534]'
                            : 'text-[#333333] hover:text-[#FF5534]'
                          }`}
                      >
                        Classic
                      </button>
                      <button
                        onClick={() => handleTabChange('premium')}
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
                  <img
                    src={Wallet}
                    alt="Wallet"
                    className="w-[24px] h-[24px] mr-2 flex-shrink-0 cursor-pointer"
                    onClick={handleWalletClick}
                  />
                  <img
                    src={Gift}
                    alt="Benefits"
                    className="w-[24px] h-[24px] mr-2 flex-shrink-0 cursor-pointer"
                    onClick={handleBenifitsClick}
                  />
                  <img
                    src={Cart}
                    alt="Cart"
                    className="w-[24px] h-[24px] mr-2 flex-shrink-0 cursor-pointer"
                    onClick={handleCheckoutClick}
                  />
                  <img
                    src={Profile}
                    alt="Profile"
                    className="w-[24px] h-[24px] mr-2 flex-shrink-0 cursor-pointer"
                    onClick={handleProfileClick}
                  />
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex">
              <div
                className="w-[75%] max-w-[300px] h-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out translate-x-0"
              >
                <div className="flex flex-col h-full pt-6 px-4">
                  <div className="flex justify-between items-center mb-6">
                    <div className="cursor-pointer" onClick={handleLogoClick}>
                      <img
                        src={BannersData?.data[0]?.image ?? ""}
                        alt="logo"
                        className="h-[50px] w-[95px] bg-cover"
                      />
                    </div>
                    <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <X size={24} className="text-[#333333]" />
                    </button>
                  </div>

                  <div className="flex flex-col space-y-4">
                    <div
                      className="flex items-center w-full h-[48px] border border-[#E5E5E5] rounded-[8px] px-3 bg-white cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={handleLocationClick}
                    >
                      <img
                        src={LocationIcon}
                        alt="LocationIcon"
                        className="w-[20px] h-[20px] mr-3 flex-shrink-0"
                      />
                      <p
                        className="text-[#333333] text-[16px] font-medium truncate max-w-[200px]"
                        title={locationText}
                      >
                        {locationText}
                      </p>
                    </div>

                    {!isAuthenticated ? (
                      <>
                        <button
                          onClick={handleMenClick}
                          className="flex items-center w-full h-[48px] px-4 rounded-[8px] text-[#333333] text-[16px] font-medium hover:bg-[#FF5534] hover:text-white transition-colors"
                        >
                          <User size={20} className="mr-3" />
                          Men
                        </button>
                        <button
                          onClick={handleWomenClick}
                          className="flex items-center w-full h-[48px] px-4 rounded-[8px] text-[#333333] text-[16px] font-medium hover:bg-[#FF5534] hover:text-white transition-colors"
                        >
                          <User size={20} className="mr-3" />
                          Women
                        </button>
                        <button
                          onClick={() => setShowLoginModal(true)}
                          className="flex items-center justify-center w-full h-[48px] bg-[#FF5534] text-white rounded-[8px] text-[16px] font-medium hover:bg-[#E54728] transition-colors"
                        >
                          <User size={20} className="mr-3" />
                          Login/Signup
                        </button>
                      </>
                    ) : (
                      <>
                        {isMenRoute ? (
                          <div className="flex flex-col space-y-4">
                            <button
                              onClick={() => handleTabChange('classic')}
                              className={`flex items-center w-full h-[48px] px-4 rounded-[8px] text-[16px] font-medium ${
                                activeTab === 'classic'
                                  ? 'bg-[#FF5534] text-white'
                                  : 'text-[#333333] hover:bg-[#FF5534] hover:text-white'
                              } transition-colors`}
                            >
                              <Bookmark size={20} className="mr-3" />
                              Classic
                            </button>
                            <button
                              onClick={() => handleTabChange('premium')}
                              className={`flex items-center w-full h-[48px] px-4 rounded-[8px] text-[16px] font-medium ${
                                activeTab === 'premium'
                                  ? 'bg-[#FF5534] text-white'
                                  : 'text-[#333333] hover:bg-[#FF5534] hover:text-white'
                              } transition-colors`}
                            >
                              <Bookmark size={20} className="mr-3" />
                              Premium
                            </button>
                          </div>
                        ) : (
                          <>
                            <button
                              onClick={handleMenClick}
                              className="flex items-center w-full h-[48px] px-4 rounded-[8px] text-[#333333] text-[16px] font-medium hover:bg-[#FF5534] hover:text-white transition-colors"
                            >
                              <User size={20} className="mr-3" />
                              Men
                            </button>
                            <button
                              onClick={handleWomenClick}
                              className="flex items-center w-full h-[48px] px-4 rounded-[8px] text-[#333333] text-[16px] font-medium hover:bg-[#FF5534] hover:text-white transition-colors"
                            >
                              <User size={20} className="mr-3" />
                              Women
                            </button>
                          </>
                        )}
                        <div className="flex flex-col space-y-4 mt-4">
                          <button
                            onClick={handleWalletClick}
                            className="flex items-center w-full h-[48px] px-4 rounded-[8px] text-[#333333] text-[16px] font-medium hover:bg-[#FF5534] hover:text-white transition-colors"
                          >
                            <img src={Wallet} alt="Wallet" className="w-[20px] h-[20px] mr-3" />
                            Wallet
                          </button>
                          <button
                            onClick={handleBenifitsClick}
                            className="flex items-center w-full h-[48px] px-4 rounded-[8px] text-[#333333] text-[16px] font-medium hover:bg-[#FF5534] hover:text-white transition-colors"
                          >
                            <img src={Gift} alt="Benefits" className="w-[20px] h-[20px] mr-3" />
                            Benefits
                          </button>
                          <button
                            onClick={handleCheckoutClick}
                            className="flex items-center w-full h-[48px] px-4 rounded-[8px] text-[#333333] text-[16px] font-medium hover:bg-[#FF5534] hover:text-white transition-colors"
                          >
                            <img src={Cart} alt="Cart" className="w-[20px] h-[20px] mr-3" />
                            Cart
                          </button>
                          <button
                            onClick={handleProfileClick}
                            className="flex items-center w-full h-[48px] px-4 rounded-[8px] text-[#333333] text-[16px] font-medium hover:bg-[#FF5534] hover:text-white transition-colors"
                          >
                            <img src={Profile} alt="Profile" className="w-[20px] h-[20px] mr-3" />
                            Profile
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div
                className="flex-1"
                onClick={() => setIsMobileMenuOpen(false)}
              />
            </div>
          )}
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
      <LocationAccessModal
        isOpen={showLocationModal}
        onAllow={handleAllow}
        onDeny={handleDeny}
        setLocationText={setLocationText}
      />
    </>
  );
};

export default Navbar;