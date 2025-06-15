import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2 text-gray-600">
              <li><a href="#" className="hover:text-[#FF5534] transition-colors">About us</a></li>
              <li><a href="#" className="hover:text-[#FF5534] transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-[#FF5534] transition-colors">Privacy policy</a></li>
              <li><a href="#" className="hover:text-[#FF5534] transition-colors">Careers</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Customers</h3>
            <ul className="space-y-2 text-gray-600">
              <li><a href="#" className="hover:text-[#FF5534] transition-colors">YT Reviews</a></li>
              <li><a href="#" className="hover:text-[#FF5534] transition-colors">Categories near you</a></li>
              <li><a href="#" className="hover:text-[#FF5534] transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-[#FF5534] transition-colors">Contact us</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Partners</h3>
            <ul className="space-y-2 text-gray-600">
              <li><a href="#" className="hover:text-[#FF5534] transition-colors">Register as a professional</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Follow us on</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-600 hover:text-[#FF5534] transition-colors">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-sm">f</div>
              </a>
              <a href="#" className="text-gray-600 hover:text-[#FF5534] transition-colors">
                <div className="w-8 h-8 bg-pink-600 rounded flex items-center justify-center text-white text-sm">ig</div>
              </a>
            </div>
            <div className="space-y-2">
              <img src="/api/placeholder/120/40" alt="Google Play" className="h-10" />
              <img src="/api/placeholder/120/40" alt="App Store" className="h-10" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;