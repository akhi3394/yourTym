import React, { useState } from 'react';
import { X, Calendar, Clock } from 'lucide-react';

const SlotModal = ({ isOpen, onClose, onSelect, selectedSlot }) => {
  const [selectedDate, setSelectedDate] = useState('05');
  const [selectedTime, setSelectedTime] = useState('8:30-9:00 AM');

  const dates = [
    { day: 'Thu', date: '04' },
    { day: 'Fri', date: '05' },
    { day: 'Sat', date: '06' }
  ];

  const timeSlots = [
    '8:30-9:00 AM',
    '8:30-9:00 AM',
    '8:30-9:00 AM',
    '8:30-9:00 AM',
    '8:30-9:00 AM',
    '8:30-9:00 AM',
    '8:30-9:00 AM',
    '8:30-9:00 AM',
    '8:30-9:00 AM'
  ];

  const handleProceed = () => {
    const selectedDateObj = dates.find(d => d.date === selectedDate);
    onSelect({
      date: `${selectedDateObj?.day} ${selectedDate}`,
      time: selectedTime
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Select service date and time</h2>
            <p className="text-sm text-gray-600 mt-1">Your service will take approx. 2 hrs and 35 mins</p>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        <div className="p-6">
          {/* Date Selection */}
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <Calendar size={20} className="text-[#FF5534] mr-2" />
              <h3 className="font-medium text-gray-900">Select service date</h3>
            </div>
            
            <div className="flex gap-3">
              {dates.map((date) => (
                <button
                  key={date.date}
                  onClick={() => setSelectedDate(date.date)}
                  className={`flex flex-col items-center py-3 px-6 rounded-lg border-2 transition-colors ${
                    selectedDate === date.date
                      ? 'border-[#FF5534] bg-red-50'
                      : 'border-gray-200 hover:border-[#FF5534]'
                  }`}
                >
                  <span className="text-sm text-gray-600">{date.day}</span>
                  <span className={`text-xl font-semibold ${
                    selectedDate === date.date ? 'text-[#FF5534]' : 'text-gray-900'
                  }`}>
                    {date.date}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <Clock size={20} className="text-[#FF5534] mr-2" />
              <h3 className="font-medium text-gray-900">Select service time slot</h3>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              {timeSlots.map((time, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedTime(time)}
                  className={`py-3 px-4 rounded-lg border text-sm font-medium transition-colors ${
                    selectedTime === time
                      ? 'border-[#FF5534] bg-red-50 text-[#FF5534]'
                      : 'border-gray-200 text-gray-700 hover:border-[#FF5534]'
                  } ${index === 2 ? 'relative' : ''}`}
                >
                  {time}
                  {index === 2 && (
                    <span className="absolute -top-2 -right-2 bg-[#FF5534] text-white text-xs px-2 py-1 rounded">
                      ₹100
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Proceed Button */}
          <button
            onClick={handleProceed}
            className="w-full bg-[#FF5534] text-white py-3 rounded-lg font-medium hover:bg-red-600 transition-colors"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default SlotModal;