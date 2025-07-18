import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Users, 
  History, 
  MessageSquare, 
  Settings, 
  LogOut,
  Heart,
  Plus,
  Search,
  Filter,
  Download,
  Upload
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('hospitals');
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const mockHospitals = [
    { id: 1, name: 'City General Hospital', email: 'admin@citygeneral.com', status: 'Active', requests: 23 },
    { id: 2, name: 'Metro Medical Center', email: 'contact@metromedical.com', status: 'Pending', requests: 8 },
    { id: 3, name: 'Regional Healthcare', email: 'info@regionalhc.com', status: 'Active', requests: 15 }
  ];

  const mockDonors = [
    { id: 1, name: 'John Doe', email: 'john@email.com', bloodType: 'O+', lastDonation: '2024-01-15', phone: '+1234567890' },
    { id: 2, name: 'Jane Smith', email: 'jane@email.com', bloodType: 'A+', lastDonation: '2024-02-20', phone: '+1234567891' },
    { id: 3, name: 'Mike Johnson', email: 'mike@email.com', bloodType: 'B-', lastDonation: '2024-01-08', phone: '+1234567892' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-red-100 p-2 rounded-lg">
                <Heart className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Manage blood donation network</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white shadow-sm h-screen">
          <div className="p-4">
            <div className="space-y-2">
              <button
                onClick={() => setActiveTab('hospitals')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === 'hospitals' 
                    ? 'bg-red-50 text-red-600 border-r-2 border-red-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Building2 className="h-5 w-5" />
                <span>Manage Hospitals</span>
              </button>
              <button
                onClick={() => setActiveTab('donors')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === 'donors' 
                    ? 'bg-red-50 text-red-600 border-r-2 border-red-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Users className="h-5 w-5" />
                <span>Manage Donors</span>
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === 'history' 
                    ? 'bg-red-50 text-red-600 border-r-2 border-red-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <History className="h-5 w-5" />
                <span>Donation History</span>
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === 'notifications' 
                    ? 'bg-red-50 text-red-600 border-r-2 border-red-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <MessageSquare className="h-5 w-5" />
                <span>Send Notifications</span>
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === 'settings' 
                    ? 'bg-red-50 text-red-600 border-r-2 border-red-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'hospitals' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Manage Hospitals</h2>
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2">
                  <Plus className="h-5 w-5" />
                  <span>Add Hospital</span>
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search hospitals..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Filter className="h-5 w-5" />
                      <span>Filter</span>
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Hospital Name</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Email</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Area</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Requests</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockHospitals.map((hospital) => (
                        <tr key={hospital.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium text-gray-900">{hospital.name}</td>
                          <td className="py-3 px-4 text-gray-600">{hospital.email}</td>
                          <td className="py-3 px-4 text-gray-600">Downtown</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              hospital.status === 'Active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {hospital.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-600">{hospital.requests}</td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-800">Edit</button>
                              <button className="text-red-600 hover:text-red-800">Delete</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'donors' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Manage Donors</h2>
                <div className="flex space-x-3">
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
                    <Upload className="h-5 w-5" />
                    <span>Import CSV</span>
                  </button>
                  <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2">
                    <Plus className="h-5 w-5" />
                    <span>Add Donor</span>
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Email</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Blood Type</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Last Donation</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Phone</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockDonors.map((donor) => (
                        <tr key={donor.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium text-gray-900">{donor.name}</td>
                          <td className="py-3 px-4 text-gray-600">{donor.email}</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                              {donor.bloodType}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-600">{donor.lastDonation}</td>
                          <td className="py-3 px-4 text-gray-600">{donor.phone}</td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-800">Edit</button>
                              <button className="text-red-600 hover:text-red-800">Delete</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">All Hospital Activities</h2>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">System-wide Donation History</h3>
                  <p className="text-sm text-gray-600 mb-4">View all blood requests and donations across all hospitals</p>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Hospital</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Area</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Blood Type</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Donor</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-900">City General Hospital</td>
                        <td className="py-3 px-4 text-gray-600">Downtown</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">O+</span>
                        </td>
                        <td className="py-3 px-4 text-gray-600">John Doe</td>
                        <td className="py-3 px-4 text-gray-600">2024-01-15</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Completed</span>
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-900">Metro Medical Center</td>
                        <td className="py-3 px-4 text-gray-600">Midtown</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">A+</span>
                        </td>
                        <td className="py-3 px-4 text-gray-600">Jane Smith</td>
                        <td className="py-3 px-4 text-gray-600">2024-02-20</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Completed</span>
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-900">Regional Healthcare</td>
                        <td className="py-3 px-4 text-gray-600">Uptown</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">B-</span>
                        </td>
                        <td className="py-3 px-4 text-gray-600">Mike Johnson</td>
                        <td className="py-3 px-4 text-gray-600">2024-01-08</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">Pending</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Send Manual Notifications</h2>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Blood Type Required
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                      <option>O+</option>
                      <option>O-</option>
                      <option>A+</option>
                      <option>A-</option>
                      <option>B+</option>
                      <option>B-</option>
                      <option>AB+</option>
                      <option>AB-</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter your message to donors..."
                    />
                  </div>
                  
                  <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors">
                    Send Notification
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">System Settings</h2>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      SMS API Key
                    </label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter SMS API key..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Default Location Radius (km)
                    </label>
                    <input
                      type="number"
                      defaultValue="10"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  
                  <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors">
                    Save Settings
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;