import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { useAddDateAndTimeToCartMutation } from '../store/api/profileApi';
import CircularLoader from './CircularLoader';

const SlotModal = ({ isOpen, onClose, onSelect, selectedSlot }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [addDateAndTimeToCart] = useAddDateAndTimeToCartMutation();

  // Generate static dates for one week starting from today
  const getDynamicDates = () => {
    const now = new Date();
    now.setHours(now.getHours() + (5 * 60 + 30) / 60); // Adjust to IST (UTC+5:30)
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const nextDate = new Date(now);
      nextDate.setDate(now.getDate() + i);
      dates.push({
        day: nextDate.toLocaleDateString('en-US', { weekday: 'short' }),
        date: nextDate.getDate().toString().padStart(2, '0'),
        fullDate: nextDate.toISOString().split('T')[0], // YYYY-MM-DD format for API
      });
    }
    return dates;
  };

  // Generate static time slots from 7:00 AM to 8:00 PM in one-hour intervals
  const getTimeSlots = (selectedDate) => {
    const now = new Date();
    now.setHours(now.getHours() + (5 * 60 + 30) / 60); // Adjust to IST (UTC+5:30)
    const currentDate = now.toISOString().split('T')[0];
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    const slots = [];
    for (let hour = 7; hour <= 19; hour++) {
      const startTime = `${hour.toString().padStart(2, '0')}:00`;
      const endTime = `${(hour + 1).toString().padStart(2, '0')}:00`;
      // Disable slots for today if the end time has passed
      const isCompleted =
        selectedDate === currentDate &&
        (hour + 1 < currentHour || (hour + 1 === currentHour && currentMinute >= 0));
      slots.push({
        time: `${startTime}-${endTime}`,
        isCompleted,
      });
    }
    return slots;
  };

  // Convert 24-hour time to AM/PM format for display
  const formatToAMPM = (timeRange) => {
    const [start, end] = timeRange.split('-');
    const startTime = new Date(`2000-01-01 ${start}:00`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    const endTime = new Date(`2000-01-01 ${end}:00`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    return `${startTime} - ${endTime}`;
  };

  const dates = getDynamicDates();
  const timeSlots = getTimeSlots(selectedDate);

  // Set default selected date and time on mount or when modal opens
  useEffect(() => {
    if (isOpen) {
      if (selectedSlot && dates.some(d => d.fullDate === selectedSlot.date)) {
        setSelectedDate(selectedSlot.date);
        setSelectedTime(selectedSlot.time);
      } else if (dates.length > 0 && !selectedDate) {
        setSelectedDate(dates[0].fullDate); // Default to first date
      }
      if (timeSlots.length > 0 && !selectedTime) {
        const availableSlots = timeSlots.filter(slot => !slot.isCompleted);
        setSelectedTime(availableSlots.length > 0 ? availableSlots[0].time : timeSlots[0].time); // Default to first available slot
      }
    }
  }, [isOpen, selectedSlot, dates, timeSlots]);

  const handleProceed = async () => {
    if (!selectedDate || !selectedTime) {
      toast.error('Please select both date and time');
      return;
    }

    // Parse start and end times from the selected time slot (e.g., "08:00-09:00")
    const [startTime, endTime] = selectedTime.split('-');

    // Prepare payload for API in 24-hour format
    const payload = {
      date: selectedDate,
      startTime,
      endTime,
    };

    try {
      await addDateAndTimeToCart(payload).unwrap();
      toast.success('Slot added to cart successfully');
      onSelect({
        date: `${dates.find(d => d.fullDate === selectedDate).day} ${dates.find(d => d.fullDate === selectedDate).date}`,
        time: selectedTime,
      });
      onClose();
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to add slot to cart');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Select service date and time</h2>
            <p className="text-sm text-gray-600 mt-1">Your service will take approx. 2 hrs and 35 mins</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto flex-1">
          <>
            {/* Date Selection with Horizontal Scroll */}
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <Calendar size={20} className="text-[#FF5534] mr-2" />
                <h3 className="font-medium text-gray-900">Select service date</h3>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {dates.map((date) => (
                  <button
                    key={date.fullDate}
                    onClick={() => setSelectedDate(date.fullDate)}
                    className={`flex flex-col items-center py-3 px-6 rounded-lg border-2 transition-colors ${
                      selectedDate === date.fullDate
                        ? 'border-[#FF5534] bg-red-50'
                        : 'border-gray-200 hover:border-[#FF5534]'
                    } flex-shrink-0`}
                    style={{ minWidth: '100px' }} // Pixel-perfect width
                  >
                    <span className="text-sm text-gray-600">{date.day}</span>
                    <span
                      className={`text-xl font-semibold ${
                        selectedDate === date.fullDate ? 'text-[#FF5534]' : 'text-gray-900'
                      }`}
                    >
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
                {timeSlots.length > 0 ? (
                  timeSlots.map((slot, index) => (
                    <button
                      key={

index}
                      onClick={() => !slot.isCompleted && setSelectedTime(slot.time)}
                      disabled={slot.isCompleted}
                      className={`py-2 px-4 rounded-lg border text-sm font-medium transition-colors w-[170px] ${
                        selectedTime === slot.time && !slot.isCompleted
                          ? 'border-[#FF5534] bg-red-50 text-[#FF5534]'
                          : 'border-gray-200 text-gray-700 hover:border-[#FF5534]'
                      } ${slot.isCompleted ? 'opacity-50 bg-gray-100 cursor-not-allowed' : ''}`}
                      style={{ height: '40px' }} // Pixel-perfect height
                    >
                      {formatToAMPM(slot.time)}
                    </button>
                  ))
                ) : (
                  <div className="col-span-3 text-center text-gray-500">No slots available for the selected date.</div>
                )}
              </div>
            </div>
          </>
        </div>

        {/* Sticky Footer with Proceed Button */}
        <div className="p-6 bg-white border-t border-gray-200">
          <button
            onClick={handleProceed}
            className="w-full bg-[#FF5534] text-white py-3 rounded-lg font-medium hover:bg-red-600 transition-colors"
            style={{ height: '48px' }} // Pixel-perfect height
            disabled={!timeSlots.some(slot => !slot.isCompleted)}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default SlotModal;