
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, BookOpen, MessageSquare, Menu, Heart, Image as ImageIcon, Newspaper, LogIn } from 'lucide-react';
import { APP_NAME, LOGO_URL } from '../constants';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  // Configuration de la navigation mobile (Bottom Bar)
  const mobileNavItems = [
    { name: 'Accueil', path: '/', icon: Home },
    { name: 'Actus', path: '/actualites', icon: Newspaper },
    { name: 'Chat', path: '/chat', icon: MessageSquare },
    { name: 'Programme', path: '/programme', icon: BookOpen },
    { name: 'Menu', path: '/menu', icon: Menu }, // Page spéciale pour le reste des liens
  ];

  const desktopLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Programme', path: '/programme' },
    { name: 'Le Bureau', path: '/equipe' },
    { name: 'Chat', path: '/chat' },
    { name: 'Médiathèque', path: '/mediatheque' },
    { name: 'Actualités', path: '/actualites' },
    { name: 'Adhésion', path: '/adhesion' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* --- DESKTOP TOP BAR (Hidden on Mobile) --- */}
      <nav className="hidden lg:block bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <img className="h-10 w-10 rounded-full border-2 border-arm-gold" src={LOGO_URL} alt="Logo" />
                <span className="ml-2 font-bold text-xl text-arm-green tracking-tight">
                  {APP_NAME}
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              {desktopLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'text-arm-green bg-green-50'
                      : 'text-gray-600 hover:text-arm-green hover:bg-gray-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
               <Link
                to="/login"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
                    isActive('/login') ? 'text-arm-green bg-green-50' : 'text-gray-600 hover:text-arm-green'
                }`}
              >
                <LogIn className="w-4 h-4 mr-1.5" />
                Mon Espace
              </Link>

              <Link
                to="/faire-un-don"
                className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-arm-gold hover:bg-yellow-500 transition-transform hover:scale-105"
              >
                <Heart className="w-4 h-4 mr-2 text-arm-red" fill="currentColor" />
                Faire un don
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* --- MOBILE TOP BAR (Logo Only) --- */}
      <div className="lg:hidden bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 px-4 h-14 flex items-center justify-center">
          <Link to="/" className="flex items-center">
            <img className="h-8 w-8 rounded-full border border-arm-gold mr-2" src={LOGO_URL} alt="Logo" />
            <span className="font-bold text-lg text-arm-green">{APP_NAME}</span>
          </Link>
      </div>

      {/* --- MOBILE BOTTOM NAVIGATION BAR --- */}
      <div className="lg:hidden fixed bottom-0 w-full bg-white border-t border-gray-200 z-50 pb-safe">
        <div className="flex justify-around items-center h-16">
          {mobileNavItems.map((item) => {
             const active = isActive(item.path);
             return (
               <Link
                 key={item.name}
                 to={item.path}
                 className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
                   active ? 'text-arm-green' : 'text-gray-400 hover:text-gray-600'
                 }`}
               >
                 <item.icon className={`w-6 h-6 ${active ? 'fill-current bg-green-50 rounded-xl px-1 w-8 h-8' : ''}`} strokeWidth={active ? 2.5 : 2} />
                 <span className="text-[10px] font-medium">{item.name}</span>
               </Link>
             );
          })}
        </div>
      </div>
    </>
  );
};
