import { useState, useRef, useEffect } from 'react';

const ScratchCard = ({ reward, onScratch }) => {
  const canvasRef = useRef(null);
  const [isScratching, setIsScratching] = useState(false);
  const [scratchedArea, setScratchedArea] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = 300;
    canvas.height = 200;
    
    // Draw scratch surface with #FF5534 background
    ctx.fillStyle = '#FF5534';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add floral pattern
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1.5;
    
    // Draw flower patterns
    for (let i = 20; i < canvas.width - 20; i += 40) {
      for (let j = 20; j < canvas.height - 20; j += 40) {
        // Flower center
        ctx.beginPath();
        ctx.arc(i, j, 3, 0, 2 * Math.PI);
        ctx.fill();
        
        // Flower petals
        for (let k = 0; k < 6; k++) {
          const angle = (k * Math.PI) / 3;
          const x1 = i + Math.cos(angle) * 8;
          const y1 = j + Math.sin(angle) * 8;
          const x2 = i + Math.cos(angle) * 12;
          const y2 = j + Math.sin(angle) * 12;
          
          ctx.beginPath();
          ctx.moveTo(i, j);
          ctx.lineTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      }
    }
    
    // Add decorative elements
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    for (let i = 0; i < canvas.width; i += 30) {
      for (let j = 0; j < canvas.height; j += 30) {
        ctx.beginPath();
        ctx.arc(i + 15, j + 15, 2, 0, 2 * Math.PI);
        ctx.stroke();
      }
    }
    
    // Set composite operation for scratching
    ctx.globalCompositeOperation = 'destination-out';
  }, []);

  const getEventPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    if (e.touches) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    }
    
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const startScratch = (e) => {
    e.preventDefault();
    setIsScratching(true);
    scratch(e);
  };

  const scratch = (e) => {
    if (!isScratching) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const pos = getEventPos(e);
    
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 25, 0, 2 * Math.PI);
    ctx.fill();
    
    // Calculate scratched area
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparent = 0;
    
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparent++;
    }
    
    const percentage = (transparent / (canvas.width * canvas.height)) * 100;
    setScratchedArea(percentage);
    
    if (percentage > 30 && onScratch) {
      onScratch(reward);
    }
  };

  const endScratch = () => {
    setIsScratching(false);
  };

  return (
    <div className="relative w-[300px] h-[200px] bg-white rounded-lg overflow-hidden shadow-lg">
      {/* Background reward content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-white">
        {reward.type === 'cashback' ? (
          <>
            <div className="text-2xl font-bold text-[#FF5534] mb-2">{reward.title}</div>
            <div className="text-sm text-gray-600 mb-3">{reward.description}</div>
            {reward.coupon && (
              <div className="bg-[#FF5534] text-white px-3 py-1 rounded text-xs font-medium">
                Code: {reward.coupon}
              </div>
            )}
          </>
        ) : (
          <>
            <div className="text-xl font-bold text-[#FF5534] mb-2">{reward.title}</div>
            <div className="text-sm text-gray-600">{reward.description}</div>
          </>
        )}
      </div>
      
      {/* Scratch surface */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 cursor-crosshair"
        onMouseDown={startScratch}
        onMouseMove={scratch}
        onMouseUp={endScratch}
        onMouseLeave={endScratch}
        onTouchStart={startScratch}
        onTouchMove={scratch}
        onTouchEnd={endScratch}
      />
      
      {/* Scratch instruction */}
      {scratchedArea < 5 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black bg-opacity-50 text-white px-4 py-2 rounded-full text-sm font-medium">
            Scratch here!
          </div>
        </div>
      )}
    </div>
  );
};

export default ScratchCard;