import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import Logo from "../../src/assets/images/yourtym_logo.png";
import Facebook from '../assets/images/footer/facebook.png';
import Instagram from '../assets/images/footer/Instagram.png';
import GooglePlay from '../assets/images/footer/GooglePlay.png';
import AppStore from '../assets/images/footer/AppStore.png';
import CircularLoader from './CircularLoader';

const Footer = ({ BannersData,bannerLoading }) => {
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);

  const toggleContactPopup = () => {
    setIsContactPopupOpen(!isContactPopupOpen);
  };

  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start px-5">

          {/* Company (with logo on top) */}
          <div>
            {bannerLoading ? (
              <CircularLoader size={20} />
            ) : (
              <img
                src={BannersData?.data[0]?.image ?? ""}
                alt="logo"
                className="h-[80px] w-[152px] bg-cover"
              />
            )}         <div>
              <h3 className="font-semibold text-[#000000] text-[24px] mb-4">Company</h3>
              <ul className="space-y-2 text-[#000000] text-[16px]">
                <li><a href="/about-us" className="hover:text-[#FF5534] transition-colors">About us</a></li>
                <li><a href="/terms-and-conditions" className="hover:text-[#FF5534] transition-colors">Terms & Conditions</a></li>
                <li><a href="/privacy-policy" className="hover:text-[#FF5534] transition-colors">Privacy policy</a></li>
                {/* <li><a href="#" className="hover:text-[#FF5534] transition-colors">Careers</a></li> */}
              </ul>
            </div>
          </div>

          {/* Customers */}
          <div className="mt-[53px]">
            <div className="mb-5"></div>
            <h3 className="font-semibold text-[#000000] text-[24px] mb-4">Customers</h3>
            <ul className="space-y-2 text-[#000000] text-[16px]">
              <li><a href="#" className="hover:text-[#FF5534] transition-colors">YT Reviews</a></li>
              <li><a href="#" className="hover:text-[#FF5534] transition-colors">Categories near you</a></li>
              {/* <li><a href="#" className="hover:text-[#FF5534] transition-colors">Blog</a></li> */}
              <li>
                <button
                  onClick={toggleContactPopup}
                  className="hover:text-[#FF5534] transition-colors text-left"
                >
                  Contact us
                </button>
              </li>
            </ul>
          </div>

          {/* Partners */}
          <div className="mt-[53px]">
            <div className="mb-5"></div>
            <h3 className="font-semibold text-[#000000] text-[24px] mb-4">Partners</h3>
            <ul className="space-y-2 text-[#000000] text-[16px]">
              <li><a href="https://play.google.com/store/apps/details?id=com.yourtym_user" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF5534] transition-colors">Register as a professional</a></li>
            </ul>
          </div>

          {/* Follow us on */}
          <div className="mt-[53px]">
            <div className="mb-5"></div>
            <h3 className="font-semibold text-[#000000] text-[24px] mb-4">Follow us on</h3>
            {/* <div className="flex space-x-4 mb-4">
              <a href="#"><img src={Facebook} alt="Facebook" className="w-[24px] h-[24px]" /></a>
              <a href="#"><img src={Instagram} alt="Instagram" className="w-[24px] h-[24px]" /></a>
            </div> */}
            <div className="space-y-2">
              <a href="https://play.google.com/store/apps/details?id=com.yourtym_user" target="_blank" rel="noopener noreferrer">
                <img src={GooglePlay} alt="Google Play" className="w-[124px] h-[37px]" />
              </a>
              {/* <img src={AppStore} alt="App Store" className="w-[118px] h-[42px]" /> */}
            </div>
          </div>

        </div>

        {/* Contact Us Popup */}
        {isContactPopupOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
              <h3 className="text-[24px] font-semibold text-[#000000] mb-4">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <FaPhone className="w-[24px] h-[24px] mr-2 text-[#000000]" />
                  <a href="tel:8299847641" target='_blank' className="text-[#000000] hover:text-[#FF5534] transition-colors">
                    Call: 8299847641
                  </a>
                </li>
                <li className="flex items-center">
                  <FaEnvelope className="w-[24px] h-[24px] mr-2 text-[#000000]" />
                  <a href="mailto:Brijesh@yourtym.com" className="text-[#000000] hover:text-[#FF5534] transition-colors">
                    Email: Brijesh@yourtym.com
                  </a>
                </li>
                <li className="flex items-center">
                  <FaWhatsapp className="w-[24px] h-[24px] mr-2 text-[#000000]" />
                  <a
                    href="https://wa.me/8299847641"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#000000] hover:text-[#FF5534] transition-colors"
                  >
                    WhatsApp: 8299847641
                  </a>
                </li>
              </ul>
              <button
                onClick={toggleContactPopup}
                className="mt-6 bg-[#FF5534] text-white px-4 py-2 rounded hover:bg-[#e04a2f] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;