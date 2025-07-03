import React, { useState, useEffect } from 'react';
import LocationAccess from '../assets/images/LocationAccess.png';
import LocationPin from '../assets/svgs/LocationPin.svg';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useGetAllCitiesQuery, useUpdateLocationMutation } from '../store/api/authApi';
import { setCityName } from '../store/slices/authSlice';

const LocationAccessModal = ({ isOpen, onAllow, onDeny, setLocationText }) => {
  const [isCitySelection, setIsCitySelection] = useState(false);
  const [isUpdatingLocation, setIsUpdatingLocation] = useState(false);
  const dispatch = useAppDispatch();
  
  const { data: citiesData, isLoading: isCitiesLoading } = useGetAllCitiesQuery(undefined, { skip: !isOpen });
  const [updateLocation] = useUpdateLocationMutation();

  const handleAllow = () => {
    setIsCitySelection(true);
  };

  const handleCitySelect = async (cityId) => {
    setIsUpdatingLocation(true);
    try {
      await updateLocation({
        currentLat: 28.7041,
        currentLong: 77.1025,
        city: cityId,
      }).unwrap();
      const city = citiesData?.data?.find(c => c._id === cityId);
      if (city) {
        dispatch(setCityName(city.name));
        setLocationText(city.name);
      }
      setIsCitySelection(false);
      onDeny();
    } catch (error) {
      console.error("Update location error:", error);
      setLocationText("Failed to update location");
    } finally {
      setIsUpdatingLocation(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-xl w-[320px] shadow-xl overflow-hidden text-center">
        {isCitySelection ? (
          <>
            <div className="pt-6">
              <div className="flex justify-center mb-3">
                <div className="p-3 rounded-full">
                  <img src={LocationPin} alt="Location Pin" className='w-[33px] h-[37px]'/>
                </div>
              </div>
              <p className="text-[15px] px-6 font-normal text-[#333]">
                Select your city
              </p>
            </div>
            <div className="mt-6 border-t border-[#ddd] max-h-[300px] overflow-y-auto">
              {isCitiesLoading ? (
                <p className="py-3 text-[14px] text-[#333]">Loading cities...</p>
              ) : isUpdatingLocation ? (
                <p className="py-3 text-[14px] text-[#333]">Updating location...</p>
              ) : (
                citiesData?.data?.map((city) => (
                  <div key={city._id}>
                    <button
                      onClick={() => handleCitySelect(city._id)}
                      className="w-full py-3 text-[14px] font-semibold text-[#333] hover:bg-gray-100"
                      disabled={isUpdatingLocation}
                    >
                      {city.name}
                    </button>
                    <div className="border-t border-[#ddd]" />
                  </div>
                ))
              )}
            </div>
          </>
        ) : (
          <>
            <div className="pt-6">
              <div className="flex justify-center mb-3">
                <div className="p-3 rounded-full">
                  <img src={LocationPin} alt="Location Pin" className='w-[33px] h-[37px]'/>
                </div>
              </div>
              <p className="text-[15px] px-6 font-normal text-[#333]">
                Allow <span className="font-semibold">YTYM</span> to access this device’s approximate location?
              </p>
            </div>
            <div className="mt-6 border-t border-[#ddd]">
              <div className="w-[146px] h-[146px] mx-auto">
                <img src={LocationAccess} alt="LocationAccess" />
              </div>
              <div className="border-t border-[#ddd]"></div>
              <button
                onClick={() => handleAllow('app')}
                className="w-full py-3 text-[14px] font-semibold text-[#333] hover:bg-gray-100"
              >
                WHILE USING THE APP
              </button>
              <div className="border-t border-[#ddd]" />
              <button
                onClick={() => handleAllow('once')}
                className="w-full py-3 text-[14px] font-semibold text-[#333] hover:bg-gray-100"
              >
                ONLY THIS TIME
              </button>
              <div className="border-t border-[#ddd]" />
              <button
                onClick={onDeny}
                className="w-full py-3 text-[14px] font-semibold text-[#FF5534] hover:bg-gray-100"
              >
                DON’T ALLOW
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LocationAccessModal;