import React from 'react';
import { Link } from 'react-router-dom';
import { APP_NAME, ADDRESS, EMAIL } from '../constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <span className="text-2xl font-bold text-arm-gold">{APP_NAME}</span>
            <p className="mt-2 text-sm text-gray-400">
              Fraternité - Liberté - Égalité
            </p>
            <p className="mt-4 text-xs text-gray-500">
              © {new Date().getFullYear()} Alliance pour le Rassemblement Malien.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Navigation</h3>
            <ul className="mt-4 space-y-4">
              <li><Link to="/programme" className="text-base text-gray-300 hover:text-white">Programme</Link></li>
              <li><Link to="/equipe" className="text-base text-gray-300 hover:text-white">Le Bureau</Link></li>
              <li><Link to="/chat" className="text-base text-gray-300 hover:text-white">Chat Public</Link></li>
              <li><Link to="/mediatheque" className="text-base text-gray-300 hover:text-white">Médiathèque</Link></li>
              <li><Link to="/actualites" className="text-base text-gray-300 hover:text-white">Actualités</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Engagement</h3>
            <ul className="mt-4 space-y-4">
              <li><Link to="/adhesion" className="text-base text-gray-300 hover:text-white">Adhérer</Link></li>
              <li><Link to="/faire-un-don" className="text-base text-gray-300 hover:text-white">Faire un don</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Contact</h3>
            <p className="mt-4 text-base text-gray-300">{ADDRESS}</p>
            <p className="mt-2 text-base text-gray-300">{EMAIL}</p>
            <Link to="/admin" className="mt-6 block text-xs text-gray-600 hover:text-gray-400">Connexion Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};