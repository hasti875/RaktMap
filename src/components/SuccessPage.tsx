import React from 'react';
import { CheckCircle, Heart, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="mb-8">
          <div className="bg-green-100 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h1>
          <p className="text-gray-600">Your response has been recorded successfully.</p>
        </div>

        <div className="bg-green-50 p-6 rounded-lg mb-6">
          <Heart className="h-8 w-8 text-red-600 mx-auto mb-3" />
          <p className="text-green-800 font-medium mb-2">You're a Hero!</p>
          <p className="text-green-700 text-sm">
            Every donation can save up to 3 lives. Thank you for being part of our life-saving community.
          </p>
        </div>

        <div className="space-y-4">
          <div className="text-sm text-gray-600 space-y-2">
            <p>• You will be contacted if your donation is needed</p>
            <p>• Please ensure you're available for the next 24 hours</p>
            <p>• Remember to stay hydrated and eat well</p>
          </div>

          <button
            onClick={() => navigate('/')}
            className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2 font-medium"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            For questions, contact us at{' '}
            <a href="mailto:support@blooddonation.com" className="text-red-600 hover:text-red-700">
              support@blooddonation.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;