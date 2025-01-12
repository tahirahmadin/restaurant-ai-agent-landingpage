import React from 'react';
import { Wallet } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';

export const WalletButton: React.FC = () => {
  const { account, error, connectWallet, disconnectWallet } = useWallet();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="relative">
      {error && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 p-2 bg-red-500 text-white text-xs rounded whitespace-nowrap">
          {error}
        </div>
      )}
      <button
        onClick={account ? disconnectWallet : connectWallet}
        className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-3 py-1.5 rounded-lg hover:from-purple-600 hover:to-indigo-600 transition-all duration-200 shadow-sm hover:shadow-md text-xs"
      >
        <Wallet className="w-4 h-4" />
        <span>{account ? formatAddress(account) : 'Connect Wallet'}</span>
      </button>
    </div>
  );
};