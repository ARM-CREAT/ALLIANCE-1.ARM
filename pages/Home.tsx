
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Shield, BookOpen, BarChart, Calendar, Newspaper } from 'lucide-react';
import { APP_FULL_NAME, MOTTO, PROGRAM, LOGO_URL } from '../constants';
import { MaliMap } from '../components/MaliMap';
import { StorageService } from '../services/storage';
import { Poll, NewsItem } from '../types';
import { useToast } from '../App';

export const Home: React.FC = () => {
  const [activePoll, setActivePoll] = useState<Poll | null>(null);
  const [recentNews, setRecentNews] = useState<NewsItem[]>([]);
  const [hasVoted, setHasVoted] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    // Charger le sondage actif
    const polls = StorageService.getPolls();
    if (polls.length > 0 && polls[0].isActive) {
        setActivePoll(polls[0]);
        setHasVoted(StorageService.hasVoted(polls[0].id));
    }

    // Charger les 2 dernières actualités
    const news = StorageService.getNews();
    setRecentNews(news.slice(0, 2));
  }, []);

  const handleVote = (optionId: string) => {
      if (!activePoll) return;
      StorageService.votePoll(activePoll.id, optionId);
      StorageService.markAsVoted(activePoll.id);
      
      const updatedPolls = StorageService.getPolls();
      const updatedCurrent = updatedPolls.find(p => p.id === activePoll.id);
      if (updatedCurrent) setActivePoll(updatedCurrent);
      setHasVoted(true);
      showToast("Merci pour votre vote !", 'success');
  };

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Modern Hero Section */}
      <div className="relative bg-gradient-to-br from-arm-green to-green-900 overflow-hidden text-white rounded-b-[40px] shadow-2xl mb-8">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-arm-gold/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-6 pt-12 pb-24 relative z-10 text-center lg:text-left">
             <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-1">
                    <span className="inline-block py-1 px-3 rounded-full bg-white/20 text-green-50 text-xs font-bold mb-4 uppercase tracking-wider border border-white/30">
                        {MOTTO}
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-4 drop-shadow-lg">
                        Un Mali Nouveau <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">Commence Ici.</span>
                    </h1>
                    <p className="text-green-100 text-lg mb-8 max-w-xl mx-auto lg:mx-0 font-medium">
                        Rejoignez l'Alliance pour le Rassemblement Malien. Ensemble, bâtissons un avenir de paix et de prospérité.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <Link to="/adhesion" className="bg-white text-arm-green font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transform transition hover:scale-105">
                            Adhérer maintenant
                        </Link>
                        <Link to="/programme" className="bg-arm-gold text-gray-900 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-yellow-400 transform transition hover:scale-105">
                            Notre Vision
                        </Link>
                    </div>
                </div>
                <div className="w-48 h-48 lg:w-80 lg:h-80 relative animate-slide-up hidden md:block">
                     <div className="absolute inset-0 bg-white rounded-full opacity-20 animate-pulse"></div>
                     <img src={LOGO_URL} alt="Logo" className="relative w-full h-full object-contain drop-shadow-2xl" />
                </div>
             </div>
        </div>
      </div>

      {/* Stats / Quick Info */}
      <div className="max-w-7xl mx-auto px-4 -mt-20 relative z-20 w-full mb-12">
         <div className="bg-white rounded-2xl shadow-xl p-6 grid grid-cols-3 divide-x divide-gray-100">
             <div className="text-center">
                 <p className="text-2xl font-bold text-gray-900">10k+</p>
                 <p className="text-xs text-gray-500 uppercase font-semibold">Membres</p>
             </div>
             <div className="text-center">
                 <p className="text-2xl font-bold text-gray-900">8</p>
                 <p className="text-xs text-gray-500 uppercase font-semibold">Régions</p>
             </div>
             <div className="text-center">
                 <p className="text-2xl font-bold text-gray-900">2025</p>
                 <p className="text-xs text-gray-500 uppercase font-semibold">Objectif</p>
             </div>
         </div>
      </div>

      {/* Actualités Récentes (Preview) */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Newspaper className="w-6 h-6 mr-2 text-arm-green" />
                À la une
            </h2>
            <Link to="/actualites" className="text-sm font-semibold text-arm-green hover:underline">
                Voir tout
            </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
            {recentNews.map(item => (
                <Link key={item.id} to="/actualites" className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all flex">
                    <div className="w-1/3 bg-gray-200 relative">
                        <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
                    </div>
                    <div className="w-2/3 p-4">
                        <span className="text-xs font-bold text-arm-green uppercase mb-1 block">{item.category}</span>
                        <h3 className="font-bold text-gray-900 mb-2 leading-tight group-hover:text-arm-green transition-colors line-clamp-2">
                            {item.title}
                        </h3>
                        <div className="flex items-center text-xs text-gray-400 mt-auto">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(item.date).toLocaleDateString()}
                        </div>
                    </div>
                </Link>
            ))}
        </div>
      </div>

      {/* SONDAGE CARD */}
      {activePoll && (
          <div className="px-4 mb-12 max-w-lg mx-auto w-full animate-fade-in">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center">
                       <BarChart className="w-5 h-5 text-arm-green mr-2" />
                       <h2 className="font-bold text-gray-800">Sondage Express</h2>
                  </div>
                  <div className="p-6">
                      <p className="text-lg font-medium text-gray-800 mb-6">{activePoll.question}</p>
                      <div className="space-y-3">
                          {activePoll.options.map(option => {
                              const percent = activePoll.totalVotes > 0 
                                ? Math.round((option.votes / activePoll.totalVotes) * 100) 
                                : 0;
                              return (
                                  <button
                                    key={option.id}
                                    onClick={() => !hasVoted && handleVote(option.id)}
                                    disabled={hasVoted}
                                    className={`relative w-full h-12 rounded-lg overflow-hidden border transition-all ${
                                        hasVoted ? 'border-transparent bg-gray-100' : 'border-gray-200 hover:border-arm-green hover:bg-green-50'
                                    }`}
                                  >
                                      {hasVoted && (
                                          <div className="absolute top-0 left-0 h-full bg-green-200 transition-all duration-1000" style={{width: `${percent}%`}}></div>
                                      )}
                                      <div className="absolute inset-0 flex items-center justify-between px-4 z-10">
                                          <span className={`font-medium ${hasVoted ? 'text-gray-900' : 'text-gray-600'}`}>{option.text}</span>
                                          {hasVoted && <span className="font-bold text-arm-green">{percent}%</span>}
                                      </div>
                                  </button>
                              );
                          })}
                      </div>
                      <p className="text-xs text-gray-400 mt-4 text-center">
                          {activePoll.totalVotes} participations • {hasVoted ? 'Merci !' : 'Votez pour voir les résultats'}
                      </p>
                  </div>
              </div>
          </div>
      )}

      {/* Features Grid */}
      <div className="py-12 bg-gray-50 mt-auto">
          <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-10">
                  <h2 className="text-3xl font-bold text-gray-900">Nos Priorités</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                  {PROGRAM.slice(0, 3).map((p, idx) => (
                      <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 text-arm-green">
                                {p.iconName === 'Shield' && <Shield />}
                                {p.iconName === 'BookOpen' && <BookOpen />}
                                {p.iconName === 'Users' && <Users />}
                          </div>
                          <h3 className="font-bold text-xl mb-2">{p.title}</h3>
                          <p className="text-gray-600 text-sm">{p.description}</p>
                      </div>
                  ))}
              </div>
              <div className="text-center mt-8">
                  <Link to="/programme" className="text-arm-green font-bold flex items-center justify-center hover:underline">
                      Découvrir tout le programme <ArrowRight className="w-4 h-4 ml-1"/>
                  </Link>
              </div>
          </div>
      </div>
    </div>
  );
};
