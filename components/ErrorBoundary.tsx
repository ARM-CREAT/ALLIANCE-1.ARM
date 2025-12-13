import React, { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <AlertTriangle className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Oups, une erreur est survenue</h1>
          <p className="text-gray-500 mb-6 max-w-sm">
            L'application a rencontré un problème inattendu. Nous avons été notifiés.
          </p>
          <div className="bg-white p-4 rounded-lg shadow-inner mb-6 w-full max-w-sm overflow-hidden text-left">
             <p className="text-xs text-red-500 font-mono break-all">
                {this.state.error?.toString()}
             </p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center px-6 py-3 bg-[#009739] text-white rounded-xl font-bold hover:bg-green-700 transition-colors shadow-lg active:scale-95"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Relancer l'application
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}