import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Heart, Phone, Shield, Image as ImageIcon, Briefcase, ChevronRight, Share2, RefreshCw, LogIn, Download } from 'lucide-react';
import { APP_NAME } from '../constants';
import { useToast, useInstall } from '../App';

export const MobileMenu: React.FC = () => {
    const { showToast } = useToast();
    const { deferredPrompt, installApp, isInstalled } = useInstall();
    
    const menuItems = [
        { name: 'Connexion', path: '/login', icon: LogIn, color: 'text-gray-700', bg: 'bg-gray-100' },
        { name: 'Le Bureau', path: '/equipe', icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-100' },
        { name: 'Médiathèque', path: '/mediatheque', icon: ImageIcon, color: 'text-purple-600', bg: 'bg-purple-100' },
        { name: 'Adhérer au Parti', path: '/adhesion', icon: Users, color: 'text-arm-green', bg: 'bg-green-100' },
        { name: 'Faire un don', path: '/faire-un-don', icon: Heart, color: 'text-arm-red', bg: 'bg-red-100' },
        { name: 'Nous contacter', path: '/contact', icon: Phone, color: 'text-orange-600', bg: 'bg-orange-100' },
        { name: 'Administration', path: '/admin', icon: Shield, color: 'text-gray-600', bg: 'bg-gray-200' },
    ];

    const handleShareApp = async () => {
        const shareData = {
            title: APP_NAME,
            text: `Découvrez l'application officielle de l'${APP_NAME}`,
            url: window.location.origin
        };
        if (navigator.share) {
            try { await navigator.share(shareData); } catch(e) {}
        } else {
            navigator.clipboard.writeText(window.location.origin);
            showToast('Lien copié !', 'success');
        }
    };

    return (
        <div className="p-4 min-h-screen bg-gray-50 pb-24 animate-fade-in">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-6 px-2 tracking-tight">Menu</h1>
            
            {/* Banner Installation App */}
            {deferredPrompt && !isInstalled && (
                <div className="mb-8 p-4 bg-gradient-to-r from-arm-green to-green-700 rounded-2xl shadow-lg text-white">
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                            <h3 className="font-bold text-lg">Installer l'Application</h3>
                            <p className="text-green-100 text-xs mt-1">Accédez à l'A.R.M plus rapidement depuis votre écran d'accueil.</p>
                        </div>
                        <div className="bg-white/20 p-2 rounded-lg">
                            <Download className="w-6 h-6 text-white" />
                        </div>
                    </div>
                    <button 
                        onClick={installApp}
                        className="w-full py-2.5 bg-white text-arm-green font-bold rounded-xl text-sm hover:bg-gray-50 transition-colors shadow-sm"
                    >
                        Installer Maintenant
                    </button>
                </div>
            )}

            <div className="space-y-3 mb-8">
                {menuItems.map((item) => (
                    <Link 
                        key={item.name} 
                        to={item.path} 
                        className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm active:scale-95 transition-transform border border-gray-100 group hover:border-arm-green"
                    >
                        <div className="flex items-center space-x-4">
                            <div className={`p-3 rounded-full transition-colors ${item.bg} group-hover:bg-opacity-80`}>
                                <item.icon className={`w-6 h-6 ${item.color}`} />
                            </div>
                            <span className="font-semibold text-gray-800 text-lg">{item.name}</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-arm-green" />
                    </Link>
                ))}
            </div>

            <h2 className="text-sm font-bold text-gray-400 uppercase mb-4 px-2">Options</h2>
            <div className="space-y-3">
                 <button 
                    onClick={handleShareApp}
                    className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-sm active:scale-95 transition-transform border border-gray-100"
                >
                    <div className="flex items-center space-x-4">
                        <div className="p-3 rounded-full bg-indigo-50">
                            <Share2 className="w-6 h-6 text-indigo-600" />
                        </div>
                        <span className="font-semibold text-gray-800">Partager l'application</span>
                    </div>
                </button>
                <button 
                    onClick={() => window.location.reload()}
                    className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-sm active:scale-95 transition-transform border border-gray-100"
                >
                    <div className="flex items-center space-x-4">
                        <div className="p-3 rounded-full bg-gray-50">
                            <RefreshCw className="w-6 h-6 text-gray-600" />
                        </div>
                        <span className="font-semibold text-gray-800">Recharger (Mise à jour)</span>
                    </div>
                </button>
            </div>

            <div className="mt-8 text-center pb-4">
                <p className="text-xs text-gray-400">A.R.M Mobile v1.1.0 (Web/Android)</p>
                <p className="text-[10px] text-gray-300 mt-1">© 2025 Tous droits réservés</p>
            </div>
        </div>
    );
};