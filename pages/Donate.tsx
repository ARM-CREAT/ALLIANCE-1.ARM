import React, { useState } from 'react';
import { CreditCard, Lock } from 'lucide-react';

export const Donate: React.FC = () => {
  const [selectedAmount, setSelectedAmount] = useState<number>(10);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [step, setStep] = useState<1 | 2>(1);

  const amounts = [5, 10, 20, 50, 100];

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(0);
  };

  const finalAmount = selectedAmount || Number(customAmount);

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    // Simulation of payment processing
    setTimeout(() => {
        alert(`Merci pour votre don de ${finalAmount}€ ! Une confirmation a été envoyée par email.`);
        setStep(1);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="p-8 w-full">
            <div className="uppercase tracking-wide text-sm text-arm-green font-semibold">Soutenir le parti</div>
            <h2 className="block mt-1 text-lg leading-tight font-medium text-black">Faire un don sécurisé</h2>
            <p className="mt-2 text-gray-500">Votre contribution nous aide à organiser des événements, soutenir nos candidats et faire avancer le Mali.</p>

            {step === 1 ? (
                <form onSubmit={handleDonate} className="mt-6">
                <div className="grid grid-cols-3 gap-3 mb-4">
                    {amounts.map((amt) => (
                    <button
                        key={amt}
                        type="button"
                        onClick={() => { setSelectedAmount(amt); setCustomAmount(''); }}
                        className={`py-2 px-4 border rounded-md text-sm font-medium focus:outline-none ${
                        selectedAmount === amt
                            ? 'bg-arm-green text-white border-arm-green'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                        {amt}€
                    </button>
                    ))}
                </div>
                
                <div className="mb-6">
                    <label htmlFor="custom-amount" className="block text-sm font-medium text-gray-700">Autre montant (€)</label>
                    <input
                    type="number"
                    id="custom-amount"
                    value={customAmount}
                    onChange={handleCustomChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-arm-green focus:border-arm-green sm:text-sm"
                    placeholder="Ex: 150"
                    />
                </div>

                <div className="border-t border-gray-200 pt-4 mb-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Moyen de paiement</h3>
                    <div className="flex items-center space-x-4 text-gray-500">
                        <div className="flex items-center border p-2 rounded hover:border-arm-green cursor-pointer">
                            <CreditCard className="w-5 h-5 mr-2" />
                            <span>Carte Bancaire</span>
                        </div>
                        <div className="flex items-center border p-2 rounded hover:border-arm-green cursor-pointer">
                            <span className="font-bold mr-2">BMS</span>
                            <span>Virement</span>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-arm-gold hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-arm-gold"
                >
                    Faire un don de {finalAmount}€
                </button>
                
                <p className="mt-4 text-xs text-center text-gray-400 flex items-center justify-center">
                    <Lock className="w-3 h-3 mr-1" /> Paiement sécurisé SSL.
                </p>
                </form>
            ) : (
                <div className="flex flex-col items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-arm-green mb-4"></div>
                    <p className="text-gray-600">Traitement du paiement sécurisé...</p>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};