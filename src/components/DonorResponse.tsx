import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Heart, MapPin, CheckCircle, XCircle, Clock } from 'lucide-react';

const DonorResponse = () => {
  const [response, setResponse] = useState<'yes' | 'no' | null>(null);
  const [locationShared, setLocationShared] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleResponse = (answer: 'yes' | 'no') => {
    setResponse(answer);
    if (answer === 'no') {
      navigate('/success');
    }
  };

  const handleLocationShare = () => {
    setLoading(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLoading(false);
          setLocationShared(true);
          // In a real app, you would send this location to your server
          console.log('Location:', position.coords.latitude, position.coords.longitude);
          setTimeout(() => {
            navigate('/success');
          }, 2000);
        },
        (error) => {
          setLoading(false);
          console.error('Error getting location:', error);
          navigate('/error');
        }
      );
    } else {
      setLoading(false);
      navigate('/error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="bg-red-100 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <Heart className="h-10 w-10 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Blood Donation Request</h1>
          <p className="text-gray-600">City General Hospital needs your help</p>
        </div>

        <div className="bg-red-50 p-4 rounded-lg mb-6">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="h-5 w-5 text-red-600" />
            <span className="font-medium text-red-900">Urgent Request</span>
          </div>
          <p className="text-red-800 text-sm">
            We need <strong>O+ blood</strong> for an emergency surgery. Your donation could save a life.
          </p>
        </div>

        {!response && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 text-center">
              Are you willing to donate blood?
            </h2>
            
            <div className="flex space-x-4">
              <button
                onClick={() => handleResponse('yes')}
                className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2 font-medium"
              >
                <CheckCircle className="h-5 w-5" />
                <span>Yes, I can help</span>
              </button>
              
              <button
                onClick={() => handleResponse('no')}
                className="flex-1 bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2 font-medium"
              >
                <XCircle className="h-5 w-5" />
                <span>Not available</span>
              </button>
            </div>
          </div>
        )}

        {response === 'yes' && !locationShared && (
          <div className="space-y-6">
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Thank you!</h2>
              <p className="text-gray-600">
                To help us connect you with the hospital, please share your location.
              </p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-blue-900 font-medium text-sm">Location Access</p>
                  <p className="text-blue-800 text-xs">
                    We need your location to calculate distance and connect you with the nearest hospital.
                  </p>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleLocationShare}
              disabled={loading}
              className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2 font-medium disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>Getting location...</span>
                </>
              ) : (
                <>
                  <MapPin className="h-5 w-5" />
                  <span>Share Location</span>
                </>
              )}
            </button>
          </div>
        )}

        {locationShared && (
          <div className="text-center space-y-4">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
            <h2 className="text-xl font-semibold text-gray-900">Location Shared!</h2>
            <p className="text-gray-600">
              The hospital has been notified of your availability. They will contact you shortly.
            </p>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-green-800 text-sm">
                Your response has been recorded. Thank you for your willingness to help save lives!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonorResponse;