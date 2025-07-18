import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import AdminDashboard from './components/AdminDashboard';
import HospitalDashboard from './components/HospitalDashboard';
import DonorResponse from './components/DonorResponse';
import SuccessPage from './components/SuccessPage';
import ErrorPage from './components/ErrorPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/hospital" element={<HospitalDashboard />} />
          <Route path="/donor-response/:id" element={<DonorResponse />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/error" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;