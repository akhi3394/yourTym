import React, { useState } from 'react';
import { X } from 'lucide-react';
import { FaPhone, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import { useGetFaqsQuery } from '../store/api/staticApi';

const SupportFaqModal = ({ isOpen, onClose }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);
  const { data, error, isLoading } = useGetFaqsQuery();

  const toggleContactPopup = () => {
    setIsContactPopupOpen(!isContactPopupOpen);
  };

  if (!isOpen) return null;

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
        <div className="bg-white w-full max-w-xl rounded-xl shadow-lg p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-black"
          >
            <X size={24} />
          </button>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Support</h2>
          <h3 className="text-lg font-bold text-red-500 mb-4">FAQs</h3>
          <div className="space-y-3">
            <p>Loading FAQs...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
        <div className="bg-white w-full max-w-xl rounded-xl shadow-lg p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-black"
          >
            <X size={24} />
          </button>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Support</h2>
          <h3 className="text-lg font-bold text-red-500 mb-4">FAQs</h3>
          <div className="space-y-3">
            <p>Error loading FAQs. Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  const faqList = data?.data || [];

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
      <div className="bg-white w-full max-w-xl rounded-xl shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
        >
          <X size={24} />
        </button>

        <h2 className="text-lg font-semibold text-gray-800 mb-2">Support</h2>
        <h3 className="text-lg font-bold text-red-500 mb-4">FAQs</h3>

        <div className="space-y-3">
          {faqList.length > 0 ? (
            faqList.map((faq, idx) => (
              <div key={faq._id} className="border rounded-lg overflow-hidden">
                <button
                  onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                  className="w-full flex justify-between items-center px-4 py-3 text-left bg-gray-50 hover:bg-gray-100"
                >
                  <span className="text-sm font-medium text-gray-800">
                    Q: {faq.question}
                  </span>
                  <span className="text-xl text-gray-500">
                    {activeIndex === idx ? '−' : '+'}
                  </span>
                </button>
                {activeIndex === idx && (
                  <div className="px-4 py-2 text-sm text-gray-700 bg-white">
                    A: {faq.answer}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No FAQs available.</p>
          )}
        </div>

        <div className="mt-6 flex flex-col space-y-3">
          {/* <button className="bg-[#FF4F29] text-white font-semibold py-2 rounded-md text-center">
            Chat with us
          </button> */}
          <button
            onClick={toggleContactPopup}
            className="bg-[#FF4F29] text-white font-semibold py-2 rounded-md text-center"
          >
            Contact us
          </button>
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
    </div>
  );
};

export default SupportFaqModal;