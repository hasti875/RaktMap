import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, 
  LogOut, 
  Plus, 
  MapPin, 
  Phone, 
  Filter,
  Clock,
  User,
  Calendar,
  Search,
  Activity,
  Users,
  History,
  Settings,
  Bell,
  Map,
  Target,
  AlertCircle,
  CheckCircle,
  TrendingUp
} from 'lucide-react';

const HospitalDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedBloodType, setSelectedBloodType] = useState('');
  const [urgency, setUrgency] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [distanceFilter, setDistanceFilter] = useState('10');
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const mockAvailableDonors = [
    { id: 1, name: 'John Doe', bloodType: 'O+', distance: '2.3 km', phone: '+1234567890', lastDonation: '2024-01-15', area: 'Downtown' },
    { id: 2, name: 'Jane Smith', bloodType: 'O+', distance: '3.7 km', phone: '+1234567891', lastDonation: '2024-02-20', area: 'Midtown' },
    { id: 3, name: 'Mike Johnson', bloodType: 'O+', distance: '5.1 km', phone: '+1234567892', lastDonation: '2024-01-08', area: 'Uptown' }
  ];

  const mockDonationHistory = [
    { id: 1, donor: 'John Doe', bloodType: 'O+', date: '2024-01-15', status: 'Completed', area: 'Downtown' },
    { id: 2, donor: 'Jane Smith', bloodType: 'A+', date: '2024-02-20', status: 'Completed', area: 'Midtown' },
    { id: 3, donor: 'Mike Johnson', bloodType: 'B-', date: '2024-01-08', status: 'Completed', area: 'Uptown' }
  ];

  const mockStats = {
    totalRequests: 45,
    activeRequests: 8,
    completedDonations: 37,
    availableDonors: 156
  };

  const areas = ['Downtown', 'Midtown', 'Uptown', 'Suburbs', 'Industrial District'];

  const handleBloodRequest = () => {
    if (selectedBloodType && urgency && selectedArea) {
      alert(`Blood request sent to ${selectedArea} area! Donors will be notified via SMS.`);
    } else {
      alert('Please fill in all required fields including the target area.');
    }
  };

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'request', label: 'Request Blood', icon: Plus },
    { id: 'donors', label: 'Available Donors', icon: Users },
    { id: 'map', label: 'Live Map', icon: Map },
    { id: 'history', label: 'Donation History', icon: History },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-red-100">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-red-500 to-red-600 p-3 rounded-xl shadow-lg">
                <Heart className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                  Hospital Dashboard
                </h1>
                <p className="text-sm text-gray-600 font-medium">City General Hospital</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-red-50 px-4 py-2 rounded-lg border border-red-200">
                <span className="text-red-700 font-medium text-sm">Emergency Contact: +1-800-BLOOD</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-red-600 transition-all duration-200 hover:bg-red-50 rounded-lg"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-72 bg-white shadow-xl h-screen border-r border-red-100">
          <div className="p-6">
            <div className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      activeTab === item.id 
                        ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg transform scale-105' 
                        : 'text-gray-600 hover:bg-red-50 hover:text-red-600'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Quick Stats in Sidebar */}
          <div className="px-6 pb-6">
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 border border-red-200">
              <h3 className="text-sm font-semibold text-red-800 mb-3">Quick Stats</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-red-700">Active Requests</span>
                  <span className="text-sm font-bold text-red-800">{mockStats.activeRequests}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-red-700">Available Donors</span>
                  <span className="text-sm font-bold text-red-800">{mockStats.availableDonors}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-red-700">This Month</span>
                  <span className="text-sm font-bold text-red-800">{mockStats.completedDonations}</span>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h2>
                <p className="text-gray-600">Monitor your blood donation activities and requests</p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-red-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Requests</p>
                      <p className="text-3xl font-bold text-gray-900">{mockStats.totalRequests}</p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-xl">
                      <TrendingUp className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 border border-red-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Requests</p>
                      <p className="text-3xl font-bold text-orange-600">{mockStats.activeRequests}</p>
                    </div>
                    <div className="bg-orange-100 p-3 rounded-xl">
                      <Clock className="h-6 w-6 text-orange-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 border border-red-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Completed</p>
                      <p className="text-3xl font-bold text-green-600">{mockStats.completedDonations}</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-xl">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 border border-red-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Available Donors</p>
                      <p className="text-3xl font-bold text-red-600">{mockStats.availableDonors}</p>
                    </div>
                    <div className="bg-red-100 p-3 rounded-xl">
                      <Users className="h-6 w-6 text-red-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-red-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-xl border border-green-200">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-900">Blood donation completed</p>
                      <p className="text-sm text-gray-600">John Doe donated O+ blood - Downtown area</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <Bell className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">New donor response</p>
                      <p className="text-sm text-gray-600">3 donors responded to urgent A+ request</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-orange-50 rounded-xl border border-orange-200">
                    <AlertCircle className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="font-medium text-gray-900">Urgent request pending</p>
                      <p className="text-sm text-gray-600">B- blood needed in Midtown area</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Request Blood Tab */}
          {activeTab === 'request' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Request Blood Donation</h2>
                <p className="text-gray-600">Send targeted requests to donors in specific areas</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8 border border-red-100">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Blood Type Required *
                    </label>
                    <select
                      value={selectedBloodType}
                      onChange={(e) => setSelectedBloodType(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select blood type</option>
                      <option value="O+">O+ (Universal Donor)</option>
                      <option value="O-">O- (Universal Donor)</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+ (Universal Recipient)</option>
                      <option value="AB-">AB-</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Target Area *
                    </label>
                    <select
                      value={selectedArea}
                      onChange={(e) => setSelectedArea(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select target area</option>
                      {areas.map((area) => (
                        <option key={area} value={area}>{area}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Urgency Level *
                    </label>
                    <select
                      value={urgency}
                      onChange={(e) => setUrgency(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select urgency</option>
                      <option value="low">Low Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="high">High Priority</option>
                      <option value="critical">🚨 Critical Emergency</option>
                    </select>
                  </div>

                  <div className="md:col-span-2 lg:col-span-3">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Additional Notes
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                      placeholder="Provide additional context for donors (e.g., patient condition, specific requirements, contact information)..."
                    />
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Target className="h-4 w-4" />
                    <span>Request will be sent to donors in the selected area</span>
                  </div>
                  <button
                    onClick={handleBloodRequest}
                    className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-3 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <Plus className="h-5 w-5" />
                    <span>Send Request</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Available Donors Tab */}
          {activeTab === 'donors' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Available Donors</h2>
                  <p className="text-gray-600">View and contact donors who have responded to requests</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Filter className="h-5 w-5 text-gray-400" />
                    <select
                      value={distanceFilter}
                      onChange={(e) => setDistanceFilter(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="5">Within 5 km</option>
                      <option value="10">Within 10 km</option>
                      <option value="15">Within 15 km</option>
                      <option value="20">Within 20 km</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Donors Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockAvailableDonors.map((donor) => (
                  <div key={donor.id} className="bg-white rounded-2xl shadow-lg p-6 border border-red-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="bg-red-100 p-3 rounded-full">
                        <User className="h-6 w-6 text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{donor.name}</h3>
                        <p className="text-sm text-gray-600">{donor.area}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Blood Type</span>
                        <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                          {donor.bloodType}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Distance</span>
                        <span className="text-sm font-medium text-gray-900">{donor.distance}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Last Donation</span>
                        <span className="text-sm font-medium text-gray-900">{donor.lastDonation}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition-colors">
                        <Phone className="h-4 w-4" />
                        <span>Call</span>
                      </button>
                      <button className="flex-1 px-4 py-2 bg-green-100 text-green-700 rounded-xl hover:bg-green-200 transition-colors">
                        Contact
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Live Map Tab */}
          {activeTab === 'map' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Live Donor Map</h2>
                <p className="text-gray-600">Interactive map showing real-time donor locations</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8 border border-red-100">
                <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-12 text-center border-2 border-dashed border-red-300">
                  <MapPin className="h-16 w-16 text-red-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-red-800 mb-2">Interactive Donor Map</h3>
                  <p className="text-red-600 mb-4">Real-time visualization of available donors in your area</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white p-4 rounded-lg border border-red-200">
                      <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
                      <p className="font-medium">Available Now</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-red-200">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full mx-auto mb-2"></div>
                      <p className="font-medium">Responding</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-red-200">
                      <div className="w-3 h-3 bg-red-500 rounded-full mx-auto mb-2"></div>
                      <p className="font-medium">Unavailable</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Donation History</h2>
                  <p className="text-gray-600">Track all completed and pending donations</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search donations..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-red-100">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-red-50">
                      <tr>
                        <th className="text-left py-4 px-6 font-semibold text-gray-700">Donor</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-700">Blood Type</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-700">Area</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-700">Date</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockDonationHistory.map((donation) => (
                        <tr key={donation.id} className="border-b border-gray-100 hover:bg-red-50 transition-colors">
                          <td className="py-4 px-6 font-medium text-gray-900">{donation.donor}</td>
                          <td className="py-4 px-6">
                            <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                              {donation.bloodType}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-gray-600">{donation.area}</td>
                          <td className="py-4 px-6 text-gray-600">{donation.date}</td>
                          <td className="py-4 px-6">
                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                              {donation.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h2>
                <p className="text-gray-600">Manage your notification preferences and history</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8 border border-red-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <Bell className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Blood request sent successfully</p>
                      <p className="text-sm text-gray-600">O+ blood request sent to 15 donors in Downtown area</p>
                      <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-xl border border-green-200">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Donor confirmed availability</p>
                      <p className="text-sm text-gray-600">John Doe confirmed for O+ donation</p>
                      <p className="text-xs text-gray-500 mt-1">4 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Settings</h2>
                <p className="text-gray-600">Configure your hospital preferences and notifications</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8 border border-red-100">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Hospital Name
                    </label>
                    <input
                      type="text"
                      defaultValue="City General Hospital"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Default Search Radius (km)
                    </label>
                    <input
                      type="number"
                      defaultValue="10"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Emergency Contact Number
                    </label>
                    <input
                      type="tel"
                      defaultValue="+1-800-BLOOD"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  
                  <button className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-3 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl">
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

export default HospitalDashboard;