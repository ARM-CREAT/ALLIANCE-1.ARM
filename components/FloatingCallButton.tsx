import React from 'react';
import { Phone } from 'lucide-react';

export const FloatingCallButton: React.FC = () => {
  const phoneNumber = "0022376304869"; // Numéro principal

  return (
    <a
      href={`tel:${phoneNumber}`}
      className="fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110 animate-bounce-slow"
      aria-label="Appeler le parti"
      style={{ animationDuration: '3s' }}
    >
      <Phone className="w-6 h-6" />
    </a>
  );
};