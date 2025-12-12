
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { APP_NAME, LOGO_URL } from '../constants';
import { useToast } from '../App';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulation d'appel API
    setTimeout(() => {
        setIsLoading(false);
        if (email && password) {
            showToast('Connexion réussie', 'success');
            navigate('/');
        } else {
            showToast('Veuillez remplir tous les champs', 'error');
        }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex justify-center">
            <img className="h-24 w-24 rounded-full border-4 border-white shadow-lg object-contain bg-white" src={LOGO_URL} alt={APP_NAME} />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 leading-9">
          Connexion
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
            Accédez à votre espace membre {APP_NAME}
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="bg-white px-6 py-10 shadow-xl rounded-2xl sm:px-10 border border-gray-100">
            <form className="space-y-6" onSubmit={handleLogin}>
            <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email ou Téléphone
                </label>
                <div className="mt-2 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    id="email"
                    name="email"
                    type="text"
                    autoComplete="username"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-xl border-0 py-3 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-arm-green sm:text-sm sm:leading-6 transition-all"
                    placeholder="Ex: membre@arm.ml"
                />
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Mot de passe
                </label>
                <div className="text-sm">
                    <a href="#" className="font-semibold text-arm-green hover:text-green-700">
                    Oublié ?
                    </a>
                </div>
                </div>
                <div className="mt-2 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-xl border-0 py-3 pl-10 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-arm-green sm:text-sm sm:leading-6 transition-all"
                    placeholder="••••••••"
                />
                <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                    >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            <div>
                <button
                type="submit"
                disabled={isLoading}
                className="flex w-full justify-center items-center rounded-xl bg-arm-green px-3 py-3.5 text-sm font-bold leading-6 text-white shadow-lg hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-arm-green transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                {isLoading ? (
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                    <>Se connecter <ArrowRight className="ml-2 h-4 w-4" /></>
                )}
                </button>
            </div>
            </form>

            <div className="mt-8">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Ou continuer avec</span>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                    <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-colors">
                        <svg className="h-5 w-5" viewBox="0 0 24 24"><path d="M12.0003 20.45c-4.6667 0-8.4503-3.7836-8.4503-8.4503C3.55 7.333 7.3336 3.5494 12.0003 3.5494c2.282 0 4.3486.8373 5.9556 2.2227l-1.802 1.802c-1.0773-.9183-2.483-1.4746-4.1536-1.4746-3.3767 0-6.1167 2.6223-6.1167 5.9003 0 3.278 2.74 5.9003 6.1167 5.9003 3.0673 0 5.6173-2.193 6.0643-5.074h-6.0643V9.829h8.5636c.084.4533.129.9236.129 1.42 0 4.8876-3.2683 9.201-9.7126 9.201z" fill="#009739"/></svg>
                        <span className="hidden sm:inline">Google</span>
                    </button>
                    <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#1877F2] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#1864D2] transition-colors">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.148 0-2.797 1.603-2.797 2.87v1.12h5.3l-.666 3.668h-4.634v7.979h-4.929z" /></svg>
                        <span className="hidden sm:inline">Facebook</span>
                    </button>
                </div>
            </div>

            <p className="mt-10 text-center text-sm text-gray-500">
            Pas encore membre ?{' '}
            <Link to="/adhesion" className="font-semibold leading-6 text-arm-green hover:text-green-700">
                Créer un compte
            </Link>
            </p>
        </div>
      </div>
    </div>
  );
};
