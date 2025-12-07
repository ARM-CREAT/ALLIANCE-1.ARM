
import React, { useEffect, useState } from 'react';
import { StorageService } from '../services/storage';
import { NewsItem } from '../types';
import { Calendar, Tag, Share2 } from 'lucide-react';

export const News: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    setNews(StorageService.getNews());
  }, []);

  const handleShare = async (item: NewsItem) => {
      const shareData = {
          title: item.title,
          text: item.content,
          url: window.location.href // Dans une vraie app, ce serait l'URL unique de l'article
      };

      if (navigator.share) {
          try {
              await navigator.share(shareData);
          } catch (err) {
              console.log('Share canceled');
          }
      } else {
          // Fallback copie
          navigator.clipboard.writeText(`${item.title}\n\n${item.content}`);
          alert('Lien copié dans le presse-papier !');
      }
  };

  return (
    <div className="bg-white pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
      <div className="relative max-w-lg mx-auto divide-y-2 divide-gray-200 lg:max-w-7xl">
        <div>
          <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
            Actualités & Événements
          </h2>
          <p className="mt-3 text-xl text-gray-500 sm:mt-4">
            Suivez toutes les actions du parti A.R.M au Mali et dans la diaspora.
          </p>
        </div>
        <div className="mt-12 grid gap-16 pt-12 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12">
          {news.map((item) => (
            <div key={item.id} className="flex flex-col rounded-lg shadow-lg overflow-hidden border border-gray-100">
              <div className="flex-shrink-0 relative">
                <img className="h-48 w-full object-cover" src={item.image} alt={item.title} />
                <span className="absolute top-2 right-2 bg-white/90 text-arm-green text-xs font-bold px-2 py-1 rounded">
                    {item.category}
                </span>
              </div>
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <a href="#" className="block mt-2">
                    <p className="text-xl font-semibold text-gray-900 group-hover:text-arm-green transition-colors">{item.title}</p>
                    <p className="mt-3 text-base text-gray-500 line-clamp-3">
                      {item.content}
                    </p>
                  </a>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                    <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        <time dateTime={item.date}>{new Date(item.date).toLocaleDateString()}</time>
                    </div>
                    <button 
                        onClick={() => handleShare(item)}
                        className="text-gray-400 hover:text-arm-green transition-colors p-2 rounded-full hover:bg-gray-50"
                        title="Partager"
                    >
                        <Share2 className="w-5 h-5" />
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
