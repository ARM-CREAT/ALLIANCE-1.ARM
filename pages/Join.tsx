import React, { useState } from 'react';
import { StorageService } from '../services/storage';

export const Join: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    region: 'Bamako'
  });
  const [submitted, setSubmitted] = useState(false);

  const regions = ['Bamako', 'Kayes', 'Koulikoro', 'Sikasso', 'Ségou', 'Mopti', 'Tombouctou', 'Gao', 'Kidal', 'Taoudénit', 'Ménaka', 'Diaspora'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    StorageService.addJoinRequest({
        ...formData,
        id: Date.now().toString(),
        date: new Date().toISOString()
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md bg-white p-8 rounded-lg shadow text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="mt-4 text-2xl font-bold text-gray-900">Demande envoyée !</h2>
                <p className="mt-2 text-gray-600">Bienvenue futur membre. Le secrétariat administratif vous contactera très bientôt.</p>
                <button onClick={() => setSubmitted(false)} className="mt-6 text-arm-green font-medium hover:underline">Retour</button>
            </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Devenir Membre
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Rejoignez l'A.R.M et participez à la construction du Mali.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Prénom</label>
                    <div className="mt-1">
                        <input id="firstName" name="firstName" type="text" required value={formData.firstName} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-arm-green focus:border-arm-green sm:text-sm" />
                    </div>
                </div>
                <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Nom</label>
                    <div className="mt-1">
                        <input id="lastName" name="lastName" type="text" required value={formData.lastName} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-arm-green focus:border-arm-green sm:text-sm" />
                    </div>
                </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <div className="mt-1">
                <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-arm-green focus:border-arm-green sm:text-sm" />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Téléphone</label>
              <div className="mt-1">
                <input id="phone" name="phone" type="tel" required value={formData.phone} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-arm-green focus:border-arm-green sm:text-sm" />
              </div>
            </div>

            <div>
              <label htmlFor="region" className="block text-sm font-medium text-gray-700">Région</label>
              <div className="mt-1">
                <select id="region" name="region" value={formData.region} onChange={handleChange} className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-arm-green focus:border-arm-green sm:text-sm">
                    {regions.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">Ville / Commune / Cercle</label>
              <div className="mt-1">
                <input id="city" name="city" type="text" required value={formData.city} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-arm-green focus:border-arm-green sm:text-sm" />
              </div>
            </div>

            <div>
              <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-arm-green hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-arm-green">
                Envoyer ma demande
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};