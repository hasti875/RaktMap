import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginForm from './components/Shared/LoginForm';
import RegisterForm from './components/Shared/RegisterForm';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { HospitalDashboard } from './components/Hospital/HospitalDashboard';
import MainLayout from './components/Layout/MainLayout';
import Loader from './components/Shared/Loader';
import { useAuth } from './contexts/AuthContext';

const GoodbyeLoader = ({ name }: { name: string }) => (
  <div>
    <Loader />
    <div style={{
      position: 'fixed',
      top: '60%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 10000,
      color: '#ff4d4f',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      textAlign: 'center',
      width: '100vw',
    }}>
      Goodbye, {name}!
    </div>
  </div>
);

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

const App: React.FC = () => {
  const { loadingLogout, userName, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loadingLogout && userName) {
      // After loader, redirect to login
      navigate('/login', { replace: true });
      // No need to call logout again here
    }
  }, [loadingLogout, userName, navigate]);

  if (loadingLogout && userName) {
    return <GoodbyeLoader name={userName} />;
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={
        user
          ? <Navigate to={user.role === 'admin' ? '/admin-dashboard' : '/hospital-dashboard'} replace />
          : <RegisterForm />
      } />
      <Route
        path="/hospital-dashboard"
        element={<MainLayout />}
      />
      <Route
        path="/admin-dashboard"
        element={<MainLayout />}
      />
      {/* Redirect root to login */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      {/* Optionally, handle 404 */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
    </>
  );
};

export default App;