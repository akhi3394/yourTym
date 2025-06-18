import ReferBanner from '../assets/images/refer/referfriendbanner.png'
import Recieve from '../assets/svgs/receive.svg'
import SendTo from '../assets/svgs/sendto.svg'

export default function WalletSection() {
    const transactions = [
        {
            id: 1,
            type: 'received',
            from: 'GhaddeGhar',
            amount: '+₹1,499',
            time: '4 days ago',
            icon: Recieve
        },
        {
            id: 2,
            type: 'received',
            from: 'GhaddeGhar',
            amount: '+₹1,499',
            time: '4 days ago',
            icon: Recieve
        },
        {
            id: 3,
            type: 'sent',
            to: 'Jan Id: 19032701',
            amount: '-₹1,499',
            time: '4 days ago',
            icon: SendTo
        },
        {
            id: 4,
            type: 'sent',
            to: 'Jan Id: 19032701',
            amount: '-₹1,499',
            time: '4 days ago',
            icon: SendTo
        }
    ];

    return (
        <div className="space-y-6">
            {/* Wallet Header */}
             <h1 className="text-xl font-semibold text-gray-900">Wallet</h1>
            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center gap-5 space-x-4">
                    <div className="flex-shrink-0">
                        <div className="w-16 h-12 bg-gradient-to-r from-orange-400 to-red-400 rounded-lg flex items-center justify-center">
                            <div className="w-8 h-6 bg-white rounded opacity-80"></div>
                        </div>
                    </div>
                    <div>
                        <div className="font-bold text-[#FF5534] text-[13px]">Wallet Balance</div>
                        <div className="text-lg font-semibold text-gray-900 text-[13px]">₹0/-</div>
                        <div className="font-bold text-[#FF5534] text-[13px]">Expire Date</div>
                        <div className="text-black text-[13px]">18 Dec 2023</div>
                    </div>
                </div>
            </div>

            <div className="">
                <div className="flex items-center justify-end space-x-2 rounded-[10px] ">
                    <select className="text-sm border border-gray-300 rounded px-3 py-1 bg-white h-[39px]">
                        <option>Month</option>
                    </select> 
                    <select className="text-sm border border-gray-300 rounded px-3 py-1 bg-white h-[39px]">
                        <option className='' >Filters</option>
                    </select>
                </div>
            </div>

            {/* Transaction List */}
            <div className="bg-white rounded-lg shadow-sm">
                {transactions.map((transaction, index) => (
                    <div key={transaction.id} className={`p-4 flex items-center justify-between ${index !== transactions.length - 1 ? 'border-b border-gray-100' : ''}`}>
                        <div className="flex items-center space-x-3">
                            <div className={`w-[50px] h-[50px] rounded-[10px] flex items-center justify-center text-white text-sm bg-[#FF5534]
                                }`}>
                                <img src={transaction.icon} alt="" />
                            </div>
                            <div>
                                <div className="text-sm font-medium text-gray-900">
                                    {transaction.type === 'received' ? 'Received from' : 'Sent to'}
                                </div>
                                <div className="text-xs text-gray-500">
                                    {transaction.from || transaction.to}
                                </div>
                                <div className="text-xs text-gray-400">{transaction.time}</div>
                            </div>
                        </div>
                        <div className={`font-semibold ${transaction.type === 'received' ? 'text-green-600' : 'text-red-600'
                            }`}>
                            {transaction.amount}
                        </div>
                    </div>
                ))}
            </div>

            {/* Referral Banner */}
            <div className="">
                <img src={ReferBanner} alt="refer" />
            </div>
            {/* <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-white rounded-full opacity-80"></div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Refer your friend</h3>
              <p className="text-sm text-gray-600">and unlock your way to ₹100's lifetime</p>
              <p className="text-sm text-gray-600">Earning Program</p>
            </div>
          </div>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
            Refer Now
          </button>
        </div>
      </div> */}
        </div>
    );
}