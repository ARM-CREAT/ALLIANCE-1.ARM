import React, { useEffect, useState } from 'react';
import { StorageService } from '../services/storage';
import { Member } from '../types';
import { MapPin, Phone } from 'lucide-react';

export const Team: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    setMembers(StorageService.getMembers());
  }, []);

  return (
    <div className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Bureau Exécutif
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
            Les hommes et les femmes engagés pour servir le parti et le Mali.
          </p>
        </div>
        <ul role="list" className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {members.map((person) => (
            <li key={person.id}>
              <div className="group relative block bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md hover:border-arm-green transition-all">
                <img 
                    className="mx-auto h-32 w-32 rounded-full object-cover border-4 border-gray-100" 
                    src={person.image} 
                    alt={person.name} 
                />
                <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900 text-center">
                    {person.name}
                </h3>
                <p className="text-sm leading-6 text-arm-green font-bold text-center">{person.role}</p>
                
                <div className="mt-4 space-y-2 text-sm text-gray-500">
                    <div className="flex items-center justify-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>{person.location}</span>
                    </div>
                    {person.phone && (
                        <div className="flex items-center justify-center gap-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <a href={`tel:${person.phone}`} className="hover:text-arm-green">{person.phone}</a>
                        </div>
                    )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};