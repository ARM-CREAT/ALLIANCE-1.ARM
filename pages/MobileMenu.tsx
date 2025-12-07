
import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Heart, Phone, Shield, Image as ImageIcon, Briefcase, ChevronRight, Share2, RefreshCw } from 'lucide-react';
import { APP_NAME } from '../constants';
import { useToast } from '../App';

export const MobileMenu: React.FC = () => {
    const { showToast } = useToast();
    
    const menuItems = [
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
        <div className="p-4 min-h-screen bg-gray-50 pb-24">
            <h1 className="text-2xl font-bold text-gray-900 mb-6 px-2">Menu</h1>
            
            <div className="space-y-3 mb-8">
                {menuItems.map((item) => (
                    <Link 
                        key={item.name} 
                        to={item.path} 
                        className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm active:scale-95 transition-transform border border-gray-100"
                    >
                        <div className="flex items-center space-x-4">
                            <div className={`p-3 rounded-full ${item.bg}`}>
                                <item.icon className={`w-6 h-6 ${item.color}`} />
                            </div>
                            <span className="font-semibold text-gray-800 text-lg">{item.name}</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
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
                        <div className="p-3 rounded-full bg-indigo-100">
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
                        <div className="p-3 rounded-full bg-gray-100">
                            <RefreshCw className="w-6 h-6 text-gray-600" />
                        </div>
                        <span className="font-semibold text-gray-800">Recharger (Mise à jour)</span>
                    </div>
                </button>
            </div>

            <div className="mt-8 text-center">
                <p className="text-xs text-gray-400">A.R.M Mobile v1.0.5</p>
                <p className="text-[10px] text-gray-300 mt-1">© 2025 Tous droits réservés</p>
            </div>
        </div>
    );
};
