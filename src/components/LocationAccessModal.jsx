import React from 'react';
import LocationAccess from '../assets/images/LocationAccess.png'
import LocationPin from '../assets/svgs/LocationPin.svg'


const LocationAccessModal = ({ isOpen, onAllow, onDeny }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-xl w-[320px] shadow-xl overflow-hidden text-center">
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
            <div className="w-[146px] h-[146px]  mx-auto">
                <img src={LocationAccess} alt="LocationAccess" />
            </div>
        <div className=" border-t border-[#ddd]"></div>
          <button
            onClick={() => onAllow('app')}
            className="w-full py-3 text-[14px] font-semibold text-[#333] hover:bg-gray-100"
          >
            WHILE USING THE APP
          </button>
          <div className="border-t border-[#ddd]" />
          <button
            onClick={() => onAllow('once')}
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
      </div>
    </div>
  );
};

export default LocationAccessModal;
