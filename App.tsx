
import React, { useState, createContext, useContext, useCallback } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Program } from './pages/Program';
import { Team } from './pages/Team';
import { News } from './pages/News';
import { Donate } from './pages/Donate';
import { Join } from './pages/Join';
import { Contact } from './pages/Contact';
import { Admin } from './pages/Admin';
import { Media } from './pages/Media';
import { Chat } from './pages/Chat';
import { MobileMenu } from './pages/MobileMenu'; 
import { FloatingCallButton } from './components/FloatingCallButton';
import { ToastContainer, ToastMessage, ToastType, OfflineBanner } from './components/UI';
import { ErrorBoundary } from './components/ErrorBoundary';

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}
const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

// Wrapper pour les transitions de page
const PageTransition: React.FC<{children: React.ReactNode}> = ({children}) => (
    <div className="animate-fade-in w-full min-h-full">
        {children}
    </div>
);

const App: React.FC = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <ErrorBoundary>
      <ToastContext.Provider value={{ showToast }}>
        <Router>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen relative bg-gray-50">
            <ToastContainer toasts={toasts} removeToast={removeToast} />
            <OfflineBanner />
            
            <Navbar />
            
            <div className="flex-grow pb-16 lg:pb-0"> 
              <Routes>
                <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                <Route path="/programme" element={<PageTransition><Program /></PageTransition>} />
                <Route path="/equipe" element={<PageTransition><Team /></PageTransition>} />
                <Route path="/mediatheque" element={<PageTransition><Media /></PageTransition>} />
                <Route path="/actualites" element={<PageTransition><News /></PageTransition>} />
                <Route path="/faire-un-don" element={<PageTransition><Donate /></PageTransition>} />
                <Route path="/adhesion" element={<PageTransition><Join /></PageTransition>} />
                <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
                <Route path="/chat" element={<PageTransition><Chat /></PageTransition>} />
                <Route path="/admin" element={<PageTransition><Admin /></PageTransition>} />
                <Route path="/menu" element={<PageTransition><MobileMenu /></PageTransition>} />
              </Routes>
            </div>
            
            <FloatingCallButton />
            <div className="hidden lg:block">
              <Footer />
            </div>
          </div>
        </Router>
      </ToastContext.Provider>
    </ErrorBoundary>
  );
};

export default App;
