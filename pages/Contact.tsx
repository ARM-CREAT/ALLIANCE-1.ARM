import React from 'react';
import { Mail, MapPin, Phone, Video } from 'lucide-react';
import { ADDRESS, EMAIL } from '../constants';

export const Contact: React.FC = () => {
    
  const handleJoinMeeting = () => {
      // Simulation of a video conference link
      window.open('https://meet.google.com/', '_blank');
  };

  return (
    <div className="bg-white py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24">
      <div className="relative max-w-xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Contactez-nous</h2>
          <p className="mt-4 text-lg leading-6 text-gray-500">
            Une question ? Envie de participer ? Nous sommes à votre écoute.
          </p>
        </div>
        
        <div className="mt-12">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                 <div className="rounded-lg bg-gray-50 p-6 text-center">
                    <MapPin className="mx-auto h-8 w-8 text-arm-green" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">Siège Social</h3>
                    <p className="mt-2 text-base text-gray-500">{ADDRESS}</p>
                 </div>
                 <div className="rounded-lg bg-gray-50 p-6 text-center">
                    <Mail className="mx-auto h-8 w-8 text-arm-green" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">Email</h3>
                    <p className="mt-2 text-base text-gray-500">{EMAIL}</p>
                 </div>
                 <div className="rounded-lg bg-gray-50 p-6 text-center">
                    <Phone className="mx-auto h-8 w-8 text-arm-green" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">Téléphone</h3>
                    <p className="mt-2 text-base text-gray-500">00223 76 30 48 69</p>
                 </div>
                 <div className="rounded-lg bg-green-50 p-6 text-center border-2 border-arm-green cursor-pointer hover:bg-green-100" onClick={handleJoinMeeting}>
                    <Video className="mx-auto h-8 w-8 text-arm-green" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">Vidéoconférence</h3>
                    <p className="mt-2 text-xs text-arm-green font-bold">REJOINDRE LA RÉUNION</p>
                 </div>
            </div>
            
            <form action="#" method="POST" className="mt-12 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                <div className="sm:col-span-2">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                    <div className="mt-1">
                        <textarea id="message" name="message" rows={4} className="py-3 px-4 block w-full shadow-sm focus:ring-arm-green focus:border-arm-green border border-gray-300 rounded-md"></textarea>
                    </div>
                </div>
                <div className="sm:col-span-2">
                    <button type="button" onClick={()=>alert('Message envoyé !')} className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-arm-green hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-arm-green">
                        Envoyer
                    </button>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
};