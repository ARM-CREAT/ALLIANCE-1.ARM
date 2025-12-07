
import React, { useEffect, useState } from 'react';
import { WifiOff, X, CheckCircle, AlertCircle, Info } from 'lucide-react';

// --- Types ---
export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}

// --- Offline Banner ---
export const OfflineBanner: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="bg-gray-900 text-white px-4 py-2 text-sm text-center flex items-center justify-center animate-slide-up fixed bottom-[60px] lg:bottom-0 left-0 right-0 z-[60]">
      <WifiOff className="w-4 h-4 mr-2" />
      Mode hors-ligne. Vérifiez votre connexion.
    </div>
  );
};

// --- Toast Notification Component ---
export const ToastContainer: React.FC<{ toasts: ToastMessage[]; removeToast: (id: string) => void }> = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-4 left-0 right-0 z-[100] flex flex-col items-center space-y-2 pointer-events-none px-4">
      {toasts.map((t) => (
        <div 
          key={t.id} 
          className={`
            pointer-events-auto flex items-center w-full max-w-sm p-4 rounded-lg shadow-xl transform transition-all duration-300 animate-slide-up
            ${t.type === 'success' ? 'bg-white border-l-4 border-arm-green text-gray-800' : ''}
            ${t.type === 'error' ? 'bg-white border-l-4 border-red-500 text-gray-800' : ''}
            ${t.type === 'info' ? 'bg-white border-l-4 border-blue-500 text-gray-800' : ''}
          `}
        >
          <div className="flex-shrink-0">
             {t.type === 'success' && <CheckCircle className="w-5 h-5 text-arm-green" />}
             {t.type === 'error' && <AlertCircle className="w-5 h-5 text-red-500" />}
             {t.type === 'info' && <Info className="w-5 h-5 text-blue-500" />}
          </div>
          <div className="ml-3 flex-1">
             <p className="text-sm font-medium">{t.message}</p>
          </div>
          <button onClick={() => removeToast(t.id)} className="ml-2 text-gray-400 hover:text-gray-600">
             <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

// --- Loading Skeleton ---
export const SkeletonCard: React.FC = () => (
    <div className="bg-white rounded-lg shadow p-4 animate-pulse">
        <div className="h-48 bg-gray-200 rounded-md mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
);
