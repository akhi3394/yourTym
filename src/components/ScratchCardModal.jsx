import { useState } from 'react';
import ScratchCard from './ScratchCard';

const ScratchCardModal = ({ isOpen, onClose, reward }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  if (!isOpen || !reward) return null;

  const handleScratch = (scratchedReward) => {
    setIsRevealed(true);
  };

  const handleClose = () => {
    setIsRevealed(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800">Scratch Card</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            ×
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="flex justify-center mb-6">
            <ScratchCard reward={reward} onScratch={handleScratch} />
          </div>
          
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Scratch Card</h3>
            <p className="text-gray-600 mb-6 text-sm">
              Scratch the card above and you could earn rewards!
            </p>
            
            {isRevealed && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center mb-2">
                  <span className="text-2xl">🎉</span>
                </div>
                <h4 className="text-green-800 font-semibold mb-1">Congratulations!</h4>
                <p className="text-green-600 text-sm">You've won: {reward.title}</p>
                {reward.coupon && (
                  <div className="mt-2 bg-green-100 text-green-800 px-3 py-1 rounded text-xs font-medium inline-block">
                    Use Code: {reward.coupon}
                  </div>
                )}
              </div>
            )}
            
            <div className="flex gap-3">
              <button
                onClick={handleClose}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
              >
                Close
              </button>
              {isRevealed && (
                <button className="flex-1 px-4 py-2.5 bg-[#FF5534] text-white rounded-lg hover:bg-[#E64A19] transition-colors font-medium">
                  Claim Reward
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScratchCardModal;