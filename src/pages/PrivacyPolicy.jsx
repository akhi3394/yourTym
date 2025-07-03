import React from 'react';
import { useGetPrivacyQuery } from '../store/api/staticApi';

const PrivacyPolicy = () => {
  const { data, error, isLoading } = useGetPrivacyQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8F9FB] py-10 px-4 mt-[130px]">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Privacy Policy</h1>
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
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Privacy Policy</h1>
          <div className="bg-white rounded-xl shadow p-6">
            <p>Error loading content. Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  const privacyContent = data?.data?.[0]?.privacy || '';

  return (
    <div className="min-h-screen bg-[#F8F9FB] py-10 px-4 mt-[130px]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Privacy Policy</h1>
        <div className="bg-white rounded-xl shadow p-6 space-y-4">
          <div
            className="text-gray-700 text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: privacyContent }}
          />
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;