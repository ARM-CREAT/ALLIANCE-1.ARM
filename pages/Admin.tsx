
import React, { useState, useEffect } from 'react';
import { StorageService } from '../services/storage';
import { NewsItem, JoinRequest, Member, ProgramPoint, MediaItem, ChatMessage, Poll } from '../types';
import { LOGO_URL } from '../constants';
import { MaliMap } from '../components/MaliMap';
import { Trash2, Plus, Users, Newspaper, LogOut, Briefcase, BookOpen, Lock, Image as ImageIcon, BarChart3, TrendingUp, MessageSquare, PieChart, Shield } from 'lucide-react';
import { useToast } from '../App';

export const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'news' | 'members' | 'team' | 'program' | 'media' | 'chat' | 'polls'>('dashboard');
  const { showToast } = useToast();
  
  // Data State
  const [news, setNews] = useState<NewsItem[]>([]);
  const [requests, setRequests] = useState<JoinRequest[]>([]);
  const [team, setTeam] = useState<Member[]>([]);
  const [program, setProgram] = useState<ProgramPoint[]>([]);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [polls, setPolls] = useState<Poll[]>([]);
  
  // Forms Inputs (Simplified)
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState('Politique');
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('');
  const [newProgramTitle, setNewProgramTitle] = useState('');
  const [newProgramDesc, setNewProgramDesc] = useState('');
  const [newMediaTitle, setNewMediaTitle] = useState('');
  const [newMediaUrl, setNewMediaUrl] = useState('');
  const [newPollQuestion, setNewPollQuestion] = useState('');

  useEffect(() => {
    if (StorageService.isAdmin()) {
      setIsAuthenticated(true);
      loadData();
    }
  }, []);

  const loadData = () => {
    setNews(StorageService.getNews());
    setRequests(StorageService.getJoinRequests());
    setTeam(StorageService.getMembers());
    setProgram(StorageService.getProgram());
    setMedia(StorageService.getMedia());
    setChatMessages(StorageService.getChatMessages());
    setPolls(StorageService.getPolls());
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'ARM2025') {
      StorageService.setAdmin(true);
      setIsAuthenticated(true);
      showToast('Connexion réussie', 'success');
      loadData();
    } else {
      showToast("Mot de passe incorrect", 'error');
    }
  };

  const handleLogout = () => {
    StorageService.setAdmin(false);
    setIsAuthenticated(false);
    setPassword('');
    showToast('Déconnecté', 'info');
  };

  // Actions
  const handleAddNews = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = StorageService.addNews({
      id: Date.now().toString(),
      title: newTitle,
      content: newContent,
      date: new Date().toISOString().split('T')[0],
      category: newCategory as any,
      image: LOGO_URL 
    });
    setNews(updated);
    setNewTitle(''); setNewContent('');
    showToast("Article publié", 'success');
  };

  const handleDeleteNews = (id: string) => {
     if(confirm('Supprimer ?')) {
        setNews(StorageService.deleteNews(id));
        showToast("Article supprimé", 'info');
     }
  };

  const handleAddPoll = (e: React.FormEvent) => {
      e.preventDefault();
      const updated = StorageService.addPoll({
          id: Date.now().toString(),
          question: newPollQuestion,
          isActive: true,
          totalVotes: 0,
          options: [{ id: 'opt-1', text: "Oui", votes: 0 }, { id: 'opt-2', text: "Non", votes: 0 }]
      });
      setPolls(updated);
      setNewPollQuestion('');
      showToast("Sondage créé", 'success');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8">
            <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                    <Lock className="w-8 h-8 text-gray-500" />
                </div>
            </div>
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Administration</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-arm-green outline-none"
                placeholder="Code d'accès..."
            />
            <button type="submit" className="w-full py-3 bg-arm-green text-white rounded-lg font-bold hover:bg-green-700 transition-colors">
              Accéder
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      {/* Header Admin */}
      <div className="bg-white shadow px-4 py-4 flex justify-between items-center sticky top-0 z-20">
        <h1 className="font-bold text-xl text-gray-800 flex items-center">
            <Shield className="w-6 h-6 mr-2 text-arm-green" />
            Dashboard
        </h1>
        <button onClick={handleLogout} className="bg-red-50 text-red-600 px-3 py-1 rounded-md text-sm font-medium hover:bg-red-100">
            Déconnexion
        </button>
      </div>

      {/* Navigation Tabs (Scrollable on mobile) */}
      <div className="bg-white border-b overflow-x-auto hide-scrollbar">
          <div className="flex space-x-6 px-4 min-w-max">
            {[
                {id: 'dashboard', icon: BarChart3, label: 'Vue Global'},
                {id: 'news', icon: Newspaper, label: 'Actus'},
                {id: 'polls', icon: PieChart, label: 'Sondages'},
                {id: 'chat', icon: MessageSquare, label: 'Chat'},
                {id: 'members', icon: Users, label: 'Adhésions'},
            ].map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center py-4 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab.id ? 'border-arm-green text-arm-green' : 'border-transparent text-gray-500'
                    }`}
                >
                    <tab.icon className="w-4 h-4 mr-2" />
                    {tab.label}
                </button>
            ))}
          </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        
        {/* --- DASHBOARD --- */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <p className="text-gray-500 text-xs uppercase">Membres</p>
                  <p className="text-2xl font-bold text-gray-900">{2450 + requests.length}</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <p className="text-gray-500 text-xs uppercase">En attente</p>
                  <p className="text-2xl font-bold text-orange-500">{requests.length}</p>
              </div>
               <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <p className="text-gray-500 text-xs uppercase">Messages</p>
                  <p className="text-2xl font-bold text-blue-500">{chatMessages.length}</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-bold mb-4">Aperçu Géographique</h3>
                <MaliMap className="w-full h-48 md:h-64" />
            </div>
          </div>
        )}

        {/* --- NEWS --- */}
        {activeTab === 'news' && (
             <div className="grid lg:grid-cols-3 gap-6 animate-fade-in">
                 <div className="bg-white p-6 rounded-xl shadow-sm h-fit">
                    <h3 className="font-bold mb-4">Nouvel Article</h3>
                    <form onSubmit={handleAddNews} className="space-y-3">
                        <input className="w-full p-2 border rounded" placeholder="Titre" value={newTitle} onChange={e=>setNewTitle(e.target.value)} required />
                        <select className="w-full p-2 border rounded" value={newCategory} onChange={e=>setNewCategory(e.target.value)}>
                            <option>Politique</option><option>Social</option>
                        </select>
                        <textarea className="w-full p-2 border rounded" rows={3} placeholder="Contenu..." value={newContent} onChange={e=>setNewContent(e.target.value)} required />
                        <button className="w-full bg-arm-green text-white py-2 rounded hover:bg-green-700">Publier</button>
                    </form>
                 </div>
                 <div className="lg:col-span-2 space-y-3">
                     {news.map(n => (
                         <div key={n.id} className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center">
                             <div>
                                 <h4 className="font-bold">{n.title}</h4>
                                 <p className="text-xs text-gray-500">{n.date}</p>
                             </div>
                             <button onClick={()=>handleDeleteNews(n.id)} className="text-red-500 bg-red-50 p-2 rounded"><Trash2 className="w-4 h-4"/></button>
                         </div>
                     ))}
                 </div>
             </div>
        )}
        
        {/* --- POLLS --- */}
        {activeTab === 'polls' && (
            <div className="grid lg:grid-cols-3 gap-6 animate-fade-in">
                <div className="bg-white p-6 rounded-xl shadow-sm h-fit">
                    <h3 className="font-bold mb-4">Nouveau Sondage</h3>
                    <form onSubmit={handleAddPoll} className="space-y-3">
                        <input className="w-full p-2 border rounded" placeholder="Question ?" value={newPollQuestion} onChange={e=>setNewPollQuestion(e.target.value)} required />
                        <button className="w-full bg-arm-green text-white py-2 rounded hover:bg-green-700">Lancer</button>
                    </form>
                </div>
                 <div className="lg:col-span-2 space-y-3">
                     {polls.map(p => (
                         <div key={p.id} className="bg-white p-4 rounded-xl shadow-sm">
                             <div className="flex justify-between">
                                 <h4 className="font-bold text-arm-green">{p.question}</h4>
                                 <button onClick={()=>{
                                     setPolls(StorageService.deletePoll(p.id));
                                     showToast("Sondage supprimé", 'info');
                                 }} className="text-red-400"><Trash2 className="w-4 h-4"/></button>
                             </div>
                             <div className="mt-2 space-y-1">
                                 {p.options.map(o => (
                                     <div key={o.id} className="flex justify-between text-sm bg-gray-50 p-2 rounded">
                                         <span>{o.text}</span>
                                         <span className="font-bold">{o.votes}</span>
                                     </div>
                                 ))}
                             </div>
                         </div>
                     ))}
                 </div>
            </div>
        )}

        {/* --- CHAT MODERATION --- */}
        {activeTab === 'chat' && (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden animate-fade-in">
                <div className="p-4 border-b bg-gray-50">
                    <h3 className="font-bold">Modération ({chatMessages.length} messages)</h3>
                </div>
                <div className="max-h-[60vh] overflow-y-auto p-2">
                    {chatMessages.slice().reverse().map(msg => (
                        <div key={msg.id} className="flex justify-between items-start p-3 hover:bg-gray-50 border-b border-gray-100 last:border-0">
                            <div>
                                <span className="font-bold text-sm">{msg.user}</span>
                                <span className="text-xs text-gray-400 ml-2">{new Date(msg.timestamp).toLocaleString()}</span>
                                <p className="text-sm text-gray-700 mt-1">{msg.text}</p>
                            </div>
                            <button onClick={()=>{
                                setChatMessages(StorageService.deleteChatMessage(msg.id));
                                showToast("Message supprimé", 'info');
                            }} className="text-red-500 hover:bg-red-50 p-1 rounded"><Trash2 className="w-4 h-4"/></button>
                        </div>
                    ))}
                </div>
            </div>
        )}
      </div>
    </div>
  );
};
