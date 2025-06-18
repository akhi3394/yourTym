const BenifitsServiceModal = ({ isOpen, onClose, service }) => {
  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-sm w-full shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-[#FF5534]">Free Service</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            ×
          </button>
        </div>
        
        {/* Service Details */}
        <div className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <img
              src={service.image}
              alt={service.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-sm mb-1">{service.name}</h3>
              <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                {service.duration}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-gray-900">₹{service.discountPrice}</span>
                <span className="text-sm text-gray-500 line-through">₹{service.originalPrice}</span>
                <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded font-medium">
                  {service.discount}% off
                </span>
              </div>
            </div>
          </div>
          
          <button className="w-full bg-[#FF5534] text-white py-2.5 rounded-lg hover:bg-[#E64A19] transition-colors font-medium mb-4">
            Add to cart
          </button>
        </div>
        
        {/* Congratulations Section */}
        <div className="bg-gray-50 p-4 rounded-b-xl">
          <h4 className="font-semibold text-gray-900 mb-3">Congrats! Free Service</h4>
          <ul className="text-sm text-gray-600 space-y-2 mb-4">
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy
            </li>
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy
            </li>
          </ul>
          
          <button className="w-full bg-[#FF5534] text-white py-2.5 rounded-lg hover:bg-[#E64A19] transition-colors font-medium flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            Redeem Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default BenifitsServiceModal;