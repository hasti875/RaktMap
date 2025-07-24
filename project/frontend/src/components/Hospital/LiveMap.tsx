import React, { useState } from 'react';
import { Map, MapPin, Users, Filter, Layers } from 'lucide-react';

export function LiveMap() {
  const [radiusFilter, setRadiusFilter] = useState(10);
  const [selectedStatus, setSelectedStatus] = useState('all');

  const donors = [
    { id: '1', name: 'John Doe', bloodGroup: 'O-', distance: 2.3, status: 'available', lat: 40.7128, lng: -74.0060 },
    { id: '2', name: 'Jane Smith', bloodGroup: 'A+', distance: 1.8, status: 'responded', lat: 40.7589, lng: -73.9851 },
    { id: '3', name: 'Mike Johnson', bloodGroup: 'B+', distance: 3.1, status: 'declined', lat: 40.7505, lng: -73.9934 },
    { id: '4', name: 'Sarah Wilson', bloodGroup: 'AB+', distance: 4.2, status: 'available', lat: 40.7282, lng: -73.7949 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-500';
      case 'responded':
        return 'bg-blue-500';
      case 'declined':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'available':
        return 'Available';
      case 'responded':
        return 'Responded';
      case 'declined':
        return 'Declined';
      default:
        return 'Unknown';
    }
  };

  const filteredDonors = donors.filter(donor => {
    const withinRadius = donor.distance <= radiusFilter;
    const matchesStatus = selectedStatus === 'all' || donor.status === selectedStatus;
    return withinRadius && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Live Donor Map</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <MapPin className="h-4 w-4" />
          <span>{filteredDonors.length} donors in range</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Map Area */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Map Controls */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Filter className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Radius:</span>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      value={radiusFilter}
                      onChange={(e) => setRadiusFilter(parseInt(e.target.value))}
                      className="w-24"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{radiusFilter}km</span>
                  </div>
                  
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="all">All Status</option>
                    <option value="available">Available</option>
                    <option value="responded">Responded</option>
                    <option value="declined">Declined</option>
                  </select>
                </div>

                {/* Legend */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">Available</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">Responded</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">Declined</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="h-96 bg-gray-100 dark:bg-gray-700 relative flex items-center justify-center">
              <div className="text-center">
                <Map className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 dark:text-gray-400">Interactive Map View</p>
                <p className="text-sm text-gray-400 dark:text-gray-500">Google Maps integration would be implemented here</p>
              </div>
              
              {/* Simulated Map Pins */}
              {filteredDonors.map((donor, index) => (
                <div
                  key={donor.id}
                  className={`absolute w-4 h-4 rounded-full ${getStatusColor(donor.status)} border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform`}
                  style={{
                    left: `${20 + index * 15}%`,
                    top: `${30 + index * 10}%`
                  }}
                  title={`${donor.name} - ${donor.bloodGroup} - ${donor.distance}km`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Donor List Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-red-600" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Nearby Donors</h3>
              </div>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              {filteredDonors.map((donor) => (
                <div key={donor.id} className="p-4 border-b border-gray-100 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900 dark:text-white">{donor.name}</span>
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(donor.status)}`}></div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium text-red-600 dark:text-red-400">{donor.bloodGroup}</span>
                    <span>{donor.distance}km</span>
                  </div>
                  <div className="mt-1">
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300">
                      {getStatusLabel(donor.status)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Map Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Donors</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{filteredDonors.length}</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Available</p>
              <p className="text-2xl font-bold text-green-600">{filteredDonors.filter(d => d.status === 'available').length}</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-green-500"></div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Responded</p>
              <p className="text-2xl font-bold text-blue-600">{filteredDonors.filter(d => d.status === 'responded').length}</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-blue-500"></div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Avg Distance</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {filteredDonors.length > 0 ? (filteredDonors.reduce((sum, d) => sum + d.distance, 0) / filteredDonors.length).toFixed(1) : 0}km
              </p>
            </div>
            <MapPin className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
      </div>
    </div>
  );
}