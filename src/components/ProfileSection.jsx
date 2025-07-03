import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, setMobile } from '../store/slices/authSlice';
import { persistor } from '../store/store';
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from '../store/api/profileApi';
import { Toaster } from 'sonner';

const ProfileSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: profileData, isLoading, error } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating, error: updateError }] =
    useUpdateProfileMutation();
  console.log(profileData?.data?.phone,'profile')
  dispatch(setMobile(profileData?.data?.phone))
  const { token } = useSelector((state) => state.auth) || {};
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    phone: '',
    image: '',
  });
  const [file, setFile] = useState(null);
  const [profileCompletion, setProfileCompletion] = useState(0);
  const initialProfile = useRef(null);

  const FALLBACK_IMAGE = "" 

  useEffect(() => {
    if (profileData?.status === 200 && profileData.data) {
      const data = profileData.data;
      const updatedProfile = {
        fullName: data.fullName || '',
        email: data.email || '',
        phone: data.phone || '',
        image: data.image,
      };
      setProfile(updatedProfile);
      initialProfile.current = updatedProfile;
      const fields = ['fullName', 'email', 'phone', 'image'];
      const filledFields = fields.filter((key) => updatedProfile[key] && updatedProfile[key] !== FALLBACK_IMAGE).length;
      setProfileCompletion(Math.round((filledFields / fields.length) * 100));
    }
  }, [profileData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = () => {
        setProfile((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      let hasChanges = false;

      const fields = ['fullName', 'email', 'phone'];
      fields.forEach((key) => {
        if (profile[key] !== initialProfile.current?.[key]) {
          formData.append(key, profile[key]);
          hasChanges = true;
        }
      });

      if (file) {
        formData.append('image', file);
        hasChanges = true;
      }

      if (!hasChanges) {
        Toaster.info('No changes to save.');
        return;
      }

      const response = await updateProfile(formData).unwrap();
      if (response.status === 200) {
        Toaster.success('Profile updated successfully!');
        initialProfile.current = { ...profile, image: file ? profile.image : initialProfile.current.image };
        setFile(null);
      }
    } catch (err) {
      console.error('Update failed:', err);
      toast.error(err?.data?.message || 'Failed to update profile.');
    }
  };

  const handleLogout = async () => {
    try {
      dispatch(logout());
      await persistor.purge();
      toast.success('Logged out successfully!');
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Logout failed. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      {/* Profile Heading */}
      <div className="py-3 px-4">
        <h2 className="text-lg font-semibold text-gray-800">Profile</h2>
      </div>

      {/* Main Profile Card */}
      <div className="bg-white rounded-lg shadow-sm border p-6 min-h-[300px] flex items-center justify-center">
        {(isLoading || isUpdating || error || updateError) ? (
          <div className="text-center">
            {isLoading || isUpdating ? (
              <div className="flex flex-col items-center">
                <svg
                  className="animate-spin h-8 w-8 text-[#FF5534]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <p className="text-gray-600 mt-2">Loading...</p>
              </div>
            ) : (
              <p className="text-red-500 text-sm">
                {error?.data?.message || updateError?.data?.message || 'An error occurred'}
              </p>
            )}
          </div>
        ) : (
          <div className="w-full">
            {/* Profile Completion */}
            <div className="mb-6">
              <div className="flex items-center gap-2">
                <span className="bg-[#FF5534] text-white text-sm font-semibold px-2 py-1 rounded">
                  {profileCompletion}%
                </span>
                <span className="text-gray-600 text-sm">Completed</span>
              </div>
            </div>

            {/* Profile Image and Form Container */}
            <div className="flex flex-col md:flex-row gap-6 mb-6">
              {/* Profile Image */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="relative mb-3">
                  <div className="w-20 h-20 rounded-full relative">
                    <div className="w-full h-full rounded-full border-4 border-gray-200"></div>
                    <div
                      className="absolute inset-0 w-full h-full rounded-full border-4 border-transparent"
                      style={{
                        borderTopColor: '#FF5534',
                        borderRightColor: profileCompletion > 25 ? '#FF5534' : 'transparent',
                        borderBottomColor: profileCompletion > 50 ? '#FF5534' : 'transparent',
                        borderLeftColor: profileCompletion > 75 ? '#FF5534' : 'transparent',
                        transform: 'rotate(-90deg)',
                      }}
                    ></div>
                    <div className="absolute inset-2 rounded-full overflow-hidden">
                      <img
                        src={profile.image || FALLBACK_IMAGE}
                        alt="Profile"
                        className="w-full h-full object-cover"
                        onError={(e) => (e.target.src = FALLBACK_IMAGE)}
                      />
                    </div>
                  </div>
                </div>
                <label className="text-[#FF5534] text-sm font-medium underline hover:no-underline transition-all cursor-pointer">
                  Change Profile
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                    disabled={isUpdating}
                  />
                </label>
              </div>

              {/* Form Fields */}
              <div className="flex-1 space-y-4">
                <div>
                  <label className="block text-gray-600 text-sm mb-1">Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={profile.fullName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5534] focus:border-[#FF5534] text-gray-700"
                    disabled={isLoading || isUpdating}
                  />
                </div>
                <div>
                  <label className="block text-gray-600 text-sm mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5534] focus:border-[#FF5534] text-gray-700"
                    disabled={isLoading || isUpdating}
                  />
                </div>
                <div>
                  <label className="block text-gray-600 text-sm mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={profile.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5534] focus:border-[#FF5534] text-gray-700"
                    disabled={isLoading || isUpdating}
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-center">
              <button
                onClick={handleSave}
                disabled={isLoading || isUpdating}
                className={`bg-[#FF5534] text-white py-2 px-8 rounded-lg hover:bg-[#E04A2B] transition-colors font-medium ${
                  isLoading || isUpdating ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isUpdating ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Logout Section */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <button
          className="flex items-center gap-3 w-full"
          onClick={handleLogout}
          disabled={isLoading || isUpdating}
        >
          <img src="/Logout.svg" alt="Logout" className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>

      {/* Join as Partner Section */}
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