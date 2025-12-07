
import React, { useState, useEffect, useRef } from 'react';
import { StorageService } from '../services/storage';
import { ChatMessage } from '../types';
import { Send, User, MoreVertical } from 'lucide-react';
import { useToast } from '../App';

export const Chat: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [hasJoined, setHasJoined] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { showToast } = useToast();

  useEffect(() => {
    const savedUser = sessionStorage.getItem('arm_chat_username');
    if (savedUser) {
      setUsername(savedUser);
      setHasJoined(true);
    }
    setMessages(StorageService.getChatMessages());
    const interval = setInterval(() => {
      setMessages(StorageService.getChatMessages());
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      sessionStorage.setItem('arm_chat_username', username);
      setHasJoined(true);
      showToast(`Bienvenue ${username} !`, 'success');
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        user: username,
        text: inputText,
        timestamp: new Date().toISOString(),
        isAdmin: StorageService.isAdmin()
      };
      
      StorageService.addChatMessage(newMessage);
      setMessages(StorageService.getChatMessages());
      setInputText('');
    }
  };

  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!hasJoined) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 bg-gray-50">
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8 transform transition-all">
          <div className="text-center mb-8">
            <div className="mx-auto bg-green-50 w-20 h-20 rounded-full flex items-center justify-center mb-4 border-2 border-arm-green">
              <User className="w-10 h-10 text-arm-green" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Espace Citoyen</h2>
            <p className="text-gray-500 mt-2 text-sm">Discutez librement avec les membres.</p>
          </div>
          <form onSubmit={handleJoin} className="space-y-4">
            <div>
              <input
                type="text"
                required
                className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-arm-green focus:border-transparent outline-none transition-all bg-gray-50"
                placeholder="Votre pseudo..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-arm-green text-white py-3 rounded-xl font-bold hover:bg-green-700 active:scale-95 transition-all shadow-lg shadow-green-200"
            >
              Rejoindre
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] lg:h-[calc(100vh-80px)] bg-[#efeae2]"> {/* Style WhatsApp Background */}
      
      {/* Header Chat */}
      <div className="bg-arm-green text-white px-4 py-3 flex justify-between items-center shadow-md z-10">
        <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <User className="w-6 h-6 text-white" />
            </div>
            <div>
                <h2 className="font-bold text-sm">Forum Public</h2>
                <div className="flex items-center space-x-1">
                    <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
                    <span className="text-xs text-green-100">{username}</span>
                </div>
            </div>
        </div>
        <button 
            onClick={() => {
                sessionStorage.removeItem('arm_chat_username');
                setHasJoined(false);
                setUsername('');
            }}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
            <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[url('https://i.pinimg.com/originals/97/c0/07/97c00759d90d786d9b6096d274ad3e07.png')] bg-opacity-10">
        {messages.map((msg) => {
          const isMe = msg.user === username;
          const isAdmin = msg.isAdmin;
          return (
            <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} animate-fade-in`}>
               <div 
                className={`max-w-[85%] rounded-2xl px-4 py-2 shadow-sm relative text-sm ${
                    isMe 
                    ? 'bg-[#d9fdd3] text-gray-900 rounded-tr-none' 
                    : isAdmin 
                        ? 'bg-yellow-50 border border-yellow-200 text-gray-900 rounded-tl-none'
                        : 'bg-white text-gray-900 rounded-tl-none'
                }`}
               >
                 {!isMe && (
                     <p className={`text-[10px] font-bold mb-0.5 ${isAdmin ? 'text-red-500' : 'text-orange-600'}`}>
                         {msg.user} {isAdmin && '★'}
                     </p>
                 )}
                 <p className="whitespace-pre-wrap leading-snug">{msg.text}</p>
                 <span className="text-[10px] text-gray-400 block text-right mt-1 -mb-1">
                    {formatTime(msg.timestamp)}
                 </span>
               </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-gray-100 p-2 lg:p-4">
        <form onSubmit={handleSend} className="flex gap-2 items-end max-w-4xl mx-auto">
          <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-200 flex items-center">
            <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Message..."
                className="w-full px-4 py-3 bg-transparent outline-none text-sm resize-none max-h-24"
                rows={1}
                onKeyDown={(e) => {
                    if(e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend(e);
                    }
                }}
            />
          </div>
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="bg-arm-green disabled:bg-gray-400 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition-all active:scale-90 flex-shrink-0"
          >
            <Send className="w-5 h-5 ml-0.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
