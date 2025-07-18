import React from "react";
import { Search, Calendar, Globe, ShoppingCart, User } from "lucide-react";

const FavoriteBooking = () => {
  const services = [
    {
      id: 1,
      title: "Most Demanded",
      duration: "2 hrs 35 min",
      clock: "/clock.svg",
      price: "₹899",
      originalPrice: "₹999",
      discount: "10% off",
      image: "/seller.svg",
      checkboxes: [
        "Express Manicure(20 mins)",
        "Face Neck Detan",
        "Face Neck Bleach",
        "Hot Oil Head Massage",
        "Foot Massage",
      ],
    },
    {
      id: 2,
      title: "Most Demanded",
      duration: "2 hrs 35 min",
      clock: "/clock.svg",
      price: "₹899",
      originalPrice: "₹999",
      discount: "10% off",
      image: "/seller.svg",
      checkboxes: [
        "Express Manicure(20 mins)",
        "Face Neck Detan",
        "Face Neck Bleach",
        "Hot Oil Head Massage",
        "Foot Massage",
      ],
    },
    {
      id: 3,
      title: "Most Demanded",
      duration: "2 hrs 35 min",
      clock: "/clock.svg",
      price: "₹899",
      originalPrice: "₹999",
      discount: "10% off",
      image: "/seller.svg",
      checkboxes: [
        "Express Manicure(30 mins)",
        "Face Neck Detan",
        "Face Neck Bleach",
        "Hot Oil Head Massage",
        "Foot Massage",
      ],
    },
    {
      id: 4,
      title: "Most Demanded",
      duration: "2 hrs 35 min",
      clock: "/clock.svg",
      price: "₹899",
      originalPrice: "₹999",
      discount: "10% off",
      image: "/seller.svg",
      checkboxes: [
        "Express Manicure(20 mins)",
        "Face Neck Detan",
        "Face Neck Bleach",
        "Hot Oil Head Massage",
        "Foot Massage",
      ],
    },
    {
      id: 5,
      title: "Most Demanded",
      duration: "2 hrs 35 min",
      clock: "/clock.svg",
      price: "₹899",
      originalPrice: "₹999",
      discount: "10% off",
      image: "/seller.svg",
      checkboxes: [
        "Express Manicure(20 mins)",
        "Face Neck Detan",
        "Face Neck Bleach",
        "Hot Oil Head Massage",
        "Foot Massage",
      ],
    },
    {
      id: 6,
      title: "Most Demanded",
      duration: "2 hrs 35 min",
      clock: "/clock.svg",
      price: "₹899",
      originalPrice: "₹999",
      discount: "10% off",
      image: "/seller.svg",
      checkboxes: [
        "Express Manicure(30 mins)",
        "Face Neck Detan",
        "Face Neck Bleach",
        "Hot Oil Head Massage",
        "Foot Massage",
      ],
    },
  ];

  return (
    <div className="bg-[#F5F5F5] pt-[100px] pb-[80px] px-4 sm:px-6 lg:px-8 min-h-screen">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-20">
          Favorite Booking
        </h2>
        <h2 className="text-[#000] text-[20px] text-center font-extrabold" >No favourites found </h2>
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className=" text-gray-900 text-[16px] font-bold">
                    {service.title}
                  </h3>
                  <span className="text-sm font-semibold text-[#FF5534] cursor-pointer flex items-center gap-1">
                    Share Now
                    <img
                      src="/share.svg"
                      alt="Arrow"
                      className="w-3 h-3 font-semibold"
                    />
                  </span>
                </div>
                <div className="flex items-center space-x-1 font-semibold text-sm text-gray-600">
                  <img
                    src={service.clock}
                    alt="Clock Icon"
                    className="w-4 h-4"
                  />
                  <span>{service.duration}</span>
                </div>

                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-lg font-bold text-gray-900">
                    {service.price}
                  </span>
                  <span className="text-sm text-gray-500 ">
                    {service.discount}
                  </span>
                  <span className="text-sm text-gray-500 font-semibold line-through">
                    {service.originalPrice}
                  </span>
                </div>
              </div>

              <div className="flex p-4">
                <div className="flex-1 pr-4">
                  <div className="space-y-2">
                    {service.checkboxes.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`${service.id}-${index}`}
                          className="h-[13.28px] w-[13.28px] border border-[#000000] text-[#FF5534] focus:ring-[#FF5534] rounded"
                        />

                        <label
                          htmlFor={`${service.id}-${index}`}
                          className="text-sm text-[#000000] font-semibold"
                        >
                          {item}
                        </label>
                      </div>
                    ))}

                    <div className="text-sm font-bold pl-4 text-[#FF5534] cursor-pointer mt-2">
                      9 More+
                    </div>
                  </div>
                </div>

                <div className="w-24 flex flex-col items-end justify-between">
                  <div className="relative w-24 h-24">
                    <img
                      src={service.image}
                      alt="Service"
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute bottom-0 left-0 w-full bg-[#FF5534] text-white text-xs text-center px-1 py-0.5 rounded-b-lg">
                      Best Seller
                    </div>
                  </div>

                  <div className="text-[12px] font-semibold text-[#FF5534] cursor-pointer flex items-center mt-2">
                    View Details
                    <img
                      src="/arrow.svg"
                      alt="Arrow"
                      className="w-2 h-2 ml-1"
                    />
                    <img src="/arrow.svg" alt="Arrow" className="w-2 h-2 " />
                  </div>
                </div>
              </div>

              <div className="p-0 pt-0">
                <button className="w-full  bg-[#FF5534] hover:bg-[#cd4c32] text-white h-[38px] rounded-b text-sm font-bold">
                  ADD TO CART
                </button>
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default FavoriteBooking;
