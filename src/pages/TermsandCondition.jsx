import React from 'react';
import { useGetTermsQuery } from '../store/api/staticApi';

const TermsandConditions = () => {
  const { data, error, isLoading } = useGetTermsQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8F9FB] py-10 px-4 mt-[130px]">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Terms and Conditions</h1>
          <div className="bg-white rounded-xl shadow p-6">
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F8F9FB] py-10 px-4 mt-[130px]">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Terms and Conditions</h1>
          <div className="bg-white rounded-xl shadow p-6">
            <p>Error loading content. Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  const termsContent = data?.data?.map(item => item.terms || item.privacy).join('<br><hr><br>') || '';

  return (
    <div className="min-h-screen bg-[#F8F9FB] py-10 px-4 mt-[130px]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Terms and Conditions</h1>
        <div className="bg-white rounded-xl shadow p-6 space-y-4">
          <div
            className="text-gray-700 text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: termsContent }}
          />
        </div>
      </div>
    </div>
  );
};

export default TermsandConditions;