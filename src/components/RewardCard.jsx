const RewardCard = ({ reward, onClick }) => {
  return (
    <div
      onClick={() => onClick(reward)}
      className="bg-[#FF5534] rounded-lg p-4 cursor-pointer hover:bg-[#E64A19] transition-all duration-200 transform hover:scale-105 relative overflow-hidden group min-h-[140px] flex flex-col justify-between"
    >
      {/* Floral background pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={`pattern-${reward.id}`} x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
              {/* Flower pattern */}
              <circle cx="12.5" cy="12.5" r="2" fill="white" opacity="0.3"/>
              <circle cx="12.5" cy="8" r="1.5" fill="white" opacity="0.2"/>
              <circle cx="12.5" cy="17" r="1.5" fill="white" opacity="0.2"/>
              <circle cx="8" cy="12.5" r="1.5" fill="white" opacity="0.2"/>
              <circle cx="17" cy="12.5" r="1.5" fill="white" opacity="0.2"/>
              <circle cx="9.5" cy="9.5" r="1" fill="white" opacity="0.15"/>
              <circle cx="15.5" cy="9.5" r="1" fill="white" opacity="0.15"/>
              <circle cx="9.5" cy="15.5" r="1" fill="white" opacity="0.15"/>
              <circle cx="15.5" cy="15.5" r="1" fill="white" opacity="0.15"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#pattern-${reward.id})`}/>
        </svg>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-white flex-1 flex flex-col justify-center">
        <div className="text-center">
          {reward.type === 'cashback' ? (
            <>
              <div className="text-xl font-bold mb-1">{reward.title}</div>
              <div className="text-xs opacity-90 leading-relaxed">
                {reward.description}
              </div>
            </>
          ) : (
            <>
              <div className="text-lg font-semibold mb-1">{reward.title}</div>
              <div className="text-xs opacity-90 leading-relaxed">
                {reward.description}
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Expiry strip at bottom */}
      {reward.expiryDays && (
        <div className="relative z-10 mt-3">
          <div className="bg-black bg-opacity-30 text-white text-xs px-2 py-1 rounded-full text-center font-medium">
            ⏰ Expires in {reward.expiryDays} days
          </div>
        </div>
      )}
      
      {/* Corner decoration */}
      <div className="absolute top-2 right-2 w-4 h-4 border border-white opacity-30 rounded transform rotate-45"></div>
    </div>
  );
};

export default RewardCard;