import React from 'react';
import { AlertCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="mb-8">
          <div className="bg-red-100 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <AlertCircle className="h-10 w-10 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h1>
          <p className="text-gray-600">We encountered an error processing your request.</p>
        </div>

        <div className="bg-red-50 p-6 rounded-lg mb-6">
          <p className="text-red-800 font-medium mb-2">Common issues:</p>
          <ul className="text-red-700 text-sm text-left space-y-1">
            <li>• Location access was denied</li>
            <li>• Link has expired</li>
            <li>• Network connectivity issues</li>
            <li>• Invalid request ID</li>
          </ul>
        </div>

        <div className="space-y-4">
          <div className="flex space-x-3">
            <button
              onClick={handleRetry}
              className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2 font-medium"
            >
              <RefreshCw className="h-5 w-5" />
              <span>Try Again</span>
            </button>
            
            <button
              onClick={() => navigate('/')}
              className="flex-1 bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2 font-medium"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Go Home</span>
            </button>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            If the problem persists, please contact support at{' '}
            <a href="mailto:support@blooddonation.com" className="text-red-600 hover:text-red-700">
              support@blooddonation.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;