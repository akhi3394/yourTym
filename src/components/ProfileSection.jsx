import React from 'react';
import { LogOut, Handshake } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/slices/authSlice';
import { persistor } from '../store/store';

const ProfileSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
   const handleLogout = async () => {
    try {
      console.log('Initiating logout');
      dispatch(logout());
      await persistor.purge(); // Clear persisted state
      console.log('Persisted state cleared');
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  return (
    <div className="max-w-md mx-auto space-y-4">
      {/* Profile Heading - Completely Outside */}
      <div className=" py-3 px-4">
        <h2 className="text-lg font-semibold text-gray-800">Profile</h2>
      </div>

      {/* Main Profile Card */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        {/* Profile Completion */}
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <span className="bg-[#FF5534] text-white text-sm font-semibold px-2 py-1 rounded">
              56%
            </span>
            <span className="text-gray-600 text-sm">Completed</span>
          </div>
        </div>

        {/* Profile Image and Form Container */}
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          {/* Profile Image with Partial Orange Border */}
          <div className="flex flex-col items-center flex-shrink-0">
            <div className="relative mb-3">
              {/* Partial orange border - only showing 56% */}
              <div className="w-20 h-20 rounded-full relative">
                {/* Gray background circle */}
                <div className="w-full h-full rounded-full border-4 border-gray-200"></div>
                {/* Orange partial border for 56% */}
                <div
                  className="absolute inset-0 w-full h-full rounded-full border-4 border-transparent"
                  style={{
                    borderTopColor: '#FF5534',
                    borderRightColor: '#FF5534',
                    borderBottomColor: 'transparent',
                    borderLeftColor: 'transparent',
                    transform: 'rotate(-90deg)'
                  }}
                ></div>
                {/* Profile Image */}
                <div className="absolute inset-2 rounded-full overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop&crop=face"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            <button className="text-[#FF5534] text-sm font-medium underline hover:no-underline transition-all">
              Change Profile
            </button>
          </div>

          {/* Form Fields */}
          <div className="flex-1 space-y-4">
            <div>
              <label className="block text-gray-600 text-sm mb-1">Name</label>
              <input
                type="text"
                defaultValue="Sam Sunder"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5534] focus:border-[#FF5534] text-gray-700"
              />
            </div>

            <div>
              <label className="block text-gray-600 text-sm mb-1">Mail</label>
              <input
                type="email"
                defaultValue="emailid@gmail.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5534] focus:border-[#FF5534] text-gray-700"
              />
            </div>

            <div>
              <label className="block text-gray-600 text-sm mb-1">Number</label>
              <input
                type="tel"
                defaultValue="+91 1234567890"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5534] focus:border-[#FF5534] text-gray-700"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center">
          <button className="bg-[#FF5534] text-white py-2 px-8 rounded-lg hover:bg-[#E04A2B] transition-colors font-medium">
            Save
          </button>
        </div>
      </div>

      {/* Logout Section - Separate Card */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <button className="flex items-center gap-3  w-full"   onClick={handleLogout}>
          <img src="/Logout.svg" alt="" />
          <span className="font-medium">Logout</span>
        </button>
      </div>

      {/* Join as Partner Section - Separate Card */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Join as a Partner</h3>
            <p className="text-sm text-gray-500">app.version.1.48.5</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;