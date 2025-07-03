import OrderSection from "../components/OrderSection";
import WalletSection from "../components/WalletSection";


function Wallet() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 mt-[120px]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Wallet & Transactions */}
          <div className=" w-full">
            <WalletSection />
          </div>
          
          {/* Right Column - Order Details & Payment */}
          <div className=" w-full">
            <OrderSection />
          </div>
        </div>
      </div>
    </div>
  );  
}

export default Wallet;