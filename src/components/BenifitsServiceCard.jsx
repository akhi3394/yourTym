const BenifitsServiceCard = ({ service, onClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="flex p-4 gap-4">
        <div className="relative">
          <img
            src={service.image}
            alt={service.name}
            className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
          />
          <span className="absolute -top-1 -right-1 bg-[#FF5534] text-white text-xs px-2 py-0.5 rounded-full font-medium text-[10px]">
            {service.badge}
          </span>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-gray-900 text-sm leading-tight">
              {service.name}
            </h3>
          </div>
          
          <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            {service.duration}
          </div>
          
          <p className="text-xs text-gray-600 mb-3 leading-relaxed line-clamp-2">
            {service.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-900">₹{service.discountPrice}</span>
              <span className="text-xs text-gray-500 line-through">₹{service.originalPrice}</span>
              <span className="text-xs text-green-600 font-medium">{service.discount}% off</span>
            </div>
            
            <button
              onClick={() => onClick(service)}
              className="bg-[#FF5534] text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-[#E64A19] transition-colors"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenifitsServiceCard;