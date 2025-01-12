import React from 'react';
import { useStore } from '../../store/useStore';
import { Receipt, CreditCard, DollarSign } from 'lucide-react';

export const AccountingAgent: React.FC = () => {
  const orders = useStore(state => state.orders);
  const totalRevenue = useStore(state => state.totalRevenue);
  
  // Calculate completed orders (delivered or completed)
  const completedOrders = orders.filter(order => 
    order.status === 'delivered' || 
    order.status === 'completed'
  );

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900/80 p-2 rounded-xl shadow-lg border border-amber-500/20 h-[120px]">
      <div className="flex items-center gap-2 mb-3">
        <Receipt className="w-4 h-4 text-amber-500" />
        <h2 className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-yellow-500">
          Accounting Agent
        </h2>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {/* Total Orders */}
        <div className="bg-gray-800/50 backdrop-blur-sm p-3 rounded-lg border border-amber-500/20">
          <div className="flex items-center gap-2 mb-1">
            <CreditCard className="w-4 h-4 text-amber-400" />
            <span className="text-[10px] text-amber-300">Total Orders</span>
          </div>
          <div className="text-lg font-bold text-amber-400 tabular-nums">
            {completedOrders.length}
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-gray-800/50 backdrop-blur-sm p-3 rounded-lg border border-amber-500/20">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-4 h-4 text-amber-400" />
            <span className="text-[10px] text-amber-300">Total Revenue</span>
          </div>
          <div className="text-lg font-bold text-amber-400 tabular-nums">
            ${totalRevenue.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};