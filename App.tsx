import React, { useState, createContext, useContext, useCallback, useEffect } from 'react';
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
import { Login } from './pages/Login';
import { MobileMenu } from './pages/MobileMenu'; 
import { FloatingCallButton } from './components/FloatingCallButton';
import { ToastContainer, ToastMessage, ToastType, OfflineBanner } from './components/UI';
import { ErrorBoundary } from './components/ErrorBoundary';

// --- Gestion du Context pour les Notifications (Toasts) ---

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}
const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
};

// --- Gestion du Context pour l'Installation PWA ---

interface InstallContextType {
  deferredPrompt: any;
  isInstalled: boolean;
  installApp: () => void;
}
const InstallContext = createContext<InstallContextType | undefined>(undefined);

export const useInstall = () => {
    const context = useContext(InstallContext);
    if (!context) throw new Error("useInstall must be used within InstallProvider");
    return context;
};

// --- Composants Utilitaires ---

// Remonte en haut de page à chaque changement de route
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

// Wrapper pour animer l'apparition des pages (effet fade-in)
const PageTransition: React.FC<{children: React.ReactNode}> = ({children}) => (
    <div className="animate-fade-in w-full min-h-full">
        {children}
    </div>
);

// --- Composant Principal App ---

const App: React.FC = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  // Gestion PWA Install
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e);
        console.log("Install prompt captured");
    };
    
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
    // Vérifier si déjà installé (Standalone mode)
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone) {
        setIsInstalled(true);
    }
    
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
        setDeferredPrompt(null);
        // On ne met pas forcément isInstalled à true tout de suite car l'app ne redémarre pas immédiatement en standalone
    }
  };

  // Fonction pour afficher une notification temporaire
  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    // Suppression automatique après 4 secondes
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
        <InstallContext.Provider value={{ deferredPrompt, isInstalled, installApp }}>
            <Router>
              <ScrollToTop />
              <div className="flex flex-col min-h-screen relative bg-gray-50 text-gray-900 font-sans">
                
                {/* --- Éléments UI Globaux (Overlay) --- */}
                <ToastContainer toasts={toasts} removeToast={removeToast} />
                <OfflineBanner />
                
                {/* --- Barre de Navigation --- */}
                <Navbar />
                
                {/* --- Contenu Principal --- */}
                {/* pb-16 laisse de la place pour la BottomBar sur mobile */}
                {/* lg:pb-0 retire cet espace sur desktop */}
                <main className="flex-grow pb-16 lg:pb-0 relative z-0"> 
                  <Routes>
                    <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                    <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
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
                </main>
                
                {/* --- Boutons Flottants --- */}
                <FloatingCallButton />

                {/* --- Footer (Masqué sur mobile pour effet "App Native") --- */}
                <div className="hidden lg:block">
                  <Footer />
                </div>
                
              </div>
            </Router>
        </InstallContext.Provider>
      </ToastContext.Provider>
    </ErrorBoundary>
  );
};

export default App;