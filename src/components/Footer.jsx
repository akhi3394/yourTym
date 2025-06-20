import React from 'react';
import Logo from "../../src/assets/images/yourtym_logo.png";
import Facebook from '../assets/images/footer/facebook.png';
import Instagram from '../assets/images/footer/Instagram.png';
import GooglePlay from '../assets/images/footer/GooglePlay.png';
import AppStore from '../assets/images/footer/AppStore.png';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start px-5">
          
          {/* Company (with logo on top) */}
          <div>
            <img src={Logo} alt="logo" className="h-[53px] w-[152px] mb-5"/>
            <div>
              <h3 className="font-semibold text-[#000000] text-[24px] mb-4">Company</h3>
              <ul className="space-y-2 text-[#000000] text-[16px]">
                <li><a href="#" className="hover:text-[#FF5534] transition-colors">About us</a></li>
                <li><a href="#" className="hover:text-[#FF5534] transition-colors">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-[#FF5534] transition-colors">Privacy policy</a></li>
                <li><a href="#" className="hover:text-[#FF5534] transition-colors">Careers</a></li>
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
              <li><a href="#" className="hover:text-[#FF5534] transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-[#FF5534] transition-colors">Contact us</a></li>
            </ul>
          </div>

          {/* Partners */}
          <div className="mt-[53px]">
            <div className="mb-5"></div>
            <h3 className="font-semibold text-[#000000] text-[24px] mb-4">Partners</h3>
            <ul className="space-y-2 text-[#000000] text-[16px]">
              <li><a href="#" className="hover:text-[#FF5534] transition-colors">Register as a professional</a></li>
            </ul>
          </div>

          {/* Follow us on */}
          <div className="mt-[53px]">
            <div className="mb-5"></div>
            <h3 className="font-semibold text-[#000000] text-[24px] mb-4">Follow us on</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#"><img src={Facebook} alt="Facebook" className="w-[24px] h-[24px]" /></a>
              <a href="#"><img src={Instagram} alt="Instagram" className="w-[24px] h-[24px]" /></a>
            </div>
            <div className="space-y-2">
              <img src={GooglePlay} alt="Google Play" className="w-[124px] h-[37px]" />
              <img src={AppStore} alt="App Store" className="w-[118px] h-[42px]" />
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
