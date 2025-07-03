import React from "react";
import { Search, Calendar, Globe, ShoppingCart, User } from "lucide-react";
import { useGetOngoingOrdersQuery } from "../store/api/profileApi";
import { format } from 'date-fns';
import { useNavigate } from "react-router-dom";
import CircularLoader from "../components/CircularLoader";

const MyBookings = () => {
  const { data: onGoingOrders, isLoading: ongoingLoading } = useGetOngoingOrdersQuery()
  const navigate=useNavigate()

  const historyBookings = [
    {
      orderId: "1659297452",
      service: "Salon at Home",
      date: "08-May, 2023 Mon,",
      time: "16:30-17:00",
      status: "Cancelled",
    },
    {
      orderId: "1659297452",
      service: "Salon at Home",
      date: "08-May, 2023 Mon,",
      time: "16:30-17:00",
      status: "Cancelled",
    },
    {
      orderId: "1659297452",
      service: "Salon at Home",
      date: "08-May, 2023 Mon,",
      time: "16:30-17:00",
      status: "Cancelled",
    },
    {
      orderId: "1659297452",
      service: "Salon at Home",
      date: "08-May, 2023 Mon,",
      time: "16:30-17:00",
      status: "Cancelled",
    },
  ];



  const handleViewDetails = (orderId) => {
    console.log(orderId, "_udd")
    navigate(`/my-booking/${orderId}`);
  };
  return (
    <div className="bg-gray-50 pt-[100px] pb-[80px] px-4 sm:px-6 lg:px-8 min-h-screen">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">
          My Bookings
        </h1>

        {/* Ongoing Section */}
        <div className="mb-12">
          <div className="bg-[#F6DDD8] rounded-lg p-6">
            <div className="flex items-center justify-center mb-6">
              <span className="text-lg font-medium text-[#444444]">
                Ongoing
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {onGoingOrders?.data?.map((booking, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg border border-[#B4B4B4] p-6"
                >
                  {/* Order Id centered and bold */}
                  <div className="text-center font-bold text-[#444444] mb-2">
                    Order Id : {booking.orderId}
                  </div>

                  {/* Dotted border */}
                  <div className="border-t border-dotted border-black mb-4"></div>

                  {/* Service/Date/Time left, Status right */}
                  <div className="flex justify-between mb-4">
                    <div className="text-md  text-[#444444] space-y-1">
                      <div>Salon at Home</div>

                      <div>
                        {format(new Date(booking.Date), 'dd-MMM, yyyy EEE,')}
                      </div>
                      <div>{booking.startTime} - {booking.endTime}</div>
                    </div>
                    <span className="px-3 py-1 text-[#FF5534] text-sm font-medium rounded self-start">
                      {booking.orderStatus}
                    </span>
                  </div>

                  {/* Location and SP Assigned row */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <img src="/mapicon.svg" alt="Dot" className="w-3 h-3" />

                      <span className="text-[#444444] underline">
                        Track Partner location
                      </span>
                    </div>
                    {booking.spAssigned && (
                      <div className="text-sm text-[#444444] font-medium">
                        SP Assigned
                      </div>
                    )}
                  </div>

                  {/* Another dotted border */}
                  <div className="border-t border-dotted border-black mb-4"></div>

                  {/* View Details button centered, bold, black */}
                  <div className="text-center" >
                    <button className="text-sm font-bold text-[#444444] hover:underline"
                      onClick={() => handleViewDetails(booking._id)}>
                      View details
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {ongoingLoading && <div className="flex justify-center items-center">
              <CircularLoader size={30}/>
              </div>}
            <div className="text-center mt-6">
              <span className="text-sm text-gray-500">No more Orders</span>
            </div>
          </div>
        </div>

        {/* History Section */}
        <div>
          <div className="bg-[#E8E8E8] rounded-lg p-6">
            <div className="flex items-center justify-center mb-6">
              <span className="text-lg font-medium text-[#444444]">
                History
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {historyBookings.map((booking, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg border border-[#B4B4B4] p-6"
                >
                  {/* Order ID */}
                  <div className="text-center font-bold text-[#444444] mb-2">
                    Order Id : {booking.orderId}
                  </div>

                  {/* Dotted black border */}
                  <div className="border-t border-dotted border-black mb-4"></div>

                  {/* Info Row */}
                  <div className="flex justify-between mb-4">
                    <div className="text-sm text-[#444444] font-medium space-y-1">
                      <div>{booking.service}</div>
                      <div>{booking.date}</div>
                      <div>{booking.time}</div>
                    </div>
                    <span className="px-3 py-1  text-[#FF5534] text-sm font-medium rounded self-center">
                      {booking.status}
                    </span>
                  </div>

                  {/* Dotted black divider again */}
                  <div className="border-t border-dotted border-black mb-4"></div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between space-x-4">
                    <button className="w-[170px] h-[40px] bg-[#F5F6FB] text-[#444444] hover:bg-gray-200 px-4 rounded-lg text-sm font-medium">
                      Write Review
                    </button>
                    <button className="w-[170px] h-[40px] bg-[#FF5534] hover:bg-[#e04a2e] text-white px-4 rounded-lg text-sm font-medium">
                      Repeat Order
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-6">
              <span className="text-sm text-gray-500">No more Orders</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
