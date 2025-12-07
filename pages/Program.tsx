import React, { useEffect, useState } from 'react';
import { StorageService } from '../services/storage';
import { ProgramPoint } from '../types';
import { CheckCircle } from 'lucide-react';

export const Program: React.FC = () => {
  const [program, setProgram] = useState<ProgramPoint[]>([]);

  useEffect(() => {
    setProgram(StorageService.getProgram());
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Programme Politique
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Des solutions concrètes pour un Mali nouveau.
          </p>
        </div>

        <div className="space-y-8">
          {program.map((item, index) => (
            <div key={index} className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 bg-arm-green rounded-md p-3">
                    <span className="text-white font-bold text-xl">{index + 1}</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                </div>
                <div className="mt-4 border-t border-gray-100 pt-4">
                  <ul className="space-y-3">
                    {item.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="flex-shrink-0 h-5 w-5 text-arm-gold mt-0.5" />
                        <span className="ml-3 text-base text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};