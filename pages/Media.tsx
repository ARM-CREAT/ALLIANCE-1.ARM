import React, { useEffect, useState } from 'react';
import { StorageService } from '../services/storage';
import { MediaItem } from '../types';
import { Image as ImageIcon } from 'lucide-react';

export const Media: React.FC = () => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [selectedImage, setSelectedImage] = useState<MediaItem | null>(null);

  useEffect(() => {
    setMedia(StorageService.getMedia());
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Médiathèque
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Retour en images sur les moments forts de l'A.R.M.
          </p>
        </div>

        {media.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg shadow">
            <ImageIcon className="mx-auto h-12 w-12 text-gray-300" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune photo</h3>
            <p className="mt-1 text-sm text-gray-500">La galerie est vide pour le moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {media.map((item) => (
              <div 
                key={item.id} 
                className="group relative cursor-pointer break-inside-avoid"
                onClick={() => setSelectedImage(item)}
              >
                <div className="aspect-w-4 aspect-h-3 w-full overflow-hidden rounded-lg bg-gray-200 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="h-64 w-full object-cover object-center group-hover:opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 text-white">
                      <p className="font-bold text-lg">{item.title}</p>
                      <p className="text-sm opacity-80">{new Date(item.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedImage(null)}
        >
            <div className="relative max-w-4xl w-full max-h-screen p-2" onClick={(e) => e.stopPropagation()}>
                <img 
                    src={selectedImage.url} 
                    alt={selectedImage.title} 
                    className="w-full h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl"
                />
                <button 
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-4 right-4 text-white hover:text-gray-300 bg-black/50 rounded-full p-2"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
                <div className="absolute bottom-4 left-4 text-white bg-black/50 px-4 py-2 rounded">
                    <h3 className="text-xl font-bold">{selectedImage.title}</h3>
                    <p className="text-sm">{new Date(selectedImage.date).toLocaleDateString()}</p>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};