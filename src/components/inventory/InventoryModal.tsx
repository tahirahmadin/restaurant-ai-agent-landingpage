import React from 'react';
import { X } from 'lucide-react';
import { useStore } from '../../store/useStore';

interface InventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InventoryModal: React.FC<InventoryModalProps> = ({ isOpen, onClose }) => {
  const { inventory, refillInventory } = useStore();
  
  if (!isOpen) return null;

  const handleRefill = () => {
    refillInventory();
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-96 h-[400px] flex flex-col">
        <div className="p-3 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-600">
            Inventory Status
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handleRefill}
              className="px-2 py-1 text-xs bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              Refill All
            </button>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="flex-1 p-2 overflow-y-auto">
          <div className="grid grid-cols-2 gap-2">
            {inventory.map((item, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg border ${
                  item.quantity < 3
                    ? 'border-red-200 bg-red-50'
                    : 'border-emerald-100 bg-emerald-50'
                }`}
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-start justify-between">
                    <span className="text-[11px] font-medium text-gray-900 leading-tight">{item.name}</span>
                    <span className={`px-1.5 py-0.5 rounded ${
                      item.quantity < 3
                        ? 'bg-red-100 text-red-800'
                        : 'bg-emerald-100 text-emerald-800'
                    } text-[10px]`}>
                      Stock: {item.quantity}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-gray-500">
                    <span>${item.price}</span>
                    <span>•</span>
                    <span>{item.size}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};