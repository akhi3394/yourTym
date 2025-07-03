import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useGetFaqsQuery } from '../store/api/staticApi';

const SupportFaqModal = ({ isOpen, onClose }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const { data, error, isLoading } = useGetFaqsQuery();

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
          <button className="bg-[#FF4F29] text-white font-semibold py-2 rounded-md text-center">
            Chat with us
          </button>
          <button className="bg-[#FF4F29] text-white font-semibold py-2 rounded-md text-center">
            Contact us
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupportFaqModal;