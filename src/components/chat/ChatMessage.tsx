import React from 'react';
import { MessageSquare, Bot } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  isBot: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isBot }) => {
  return (
    <div className={`flex gap-2 ${isBot ? 'justify-start' : 'justify-end'}`}>
      {isBot && <Bot className="w-4 h-4 text-purple-500" />}
      <div className={`rounded-lg p-1.5 max-w-[80%] text-xs ${
        isBot ? 'bg-gray-700 text-white' : 'bg-purple-500 text-white'
      }`}>
        {message}
      </div>
      {!isBot && <MessageSquare className="w-4 h-4 text-purple-500" />}
    </div>
  );
};