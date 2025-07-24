import React, { createContext, useContext, useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';

// Update this URL to match your backend server
axios.defaults.baseURL = 'http://localhost:5000'; // Backend is running on port 5000
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

interface AuthContextType {
  user: {
    _id: string;
    email: string;
    name: string;
    role: string;
    location?: string;
  } | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
  loadingLogout?: boolean;
  userName?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing token and validate it
    const token = localStorage.getItem('token');
    if (token) {
      validateToken();
    } else {
      setLoading(false);
    }
  }, []);

  const validateToken = async () => {
    try {
      const response = await axios.get('/validate');
      setUser(response.data.user);
    } catch (error) {
      console.error('Token validation failed:', error);
      localStorage.removeItem('token');
      setUser(null);
      delete axios.defaults.headers.common['Authorization'];
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Clear any existing auth data before login attempt
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      
      const response = await axios.post('/login', { email, password });
      console.log('Login response:', response.data); // Debug log
      
      const { token, role, name } = response.data;
      if (!token) {
        console.error('No token received from server');
        return false;
      }

      const userData = { email, role, name };
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(userData);
      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Login failed:', {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message
        });
      } else {
        console.error('Login failed:', error);
      }
      return false;
    }
  };

  const logout = async () => {
    try {
      // First, try to invalidate the token on the server (optional, as JWT are stateless)
      const token = localStorage.getItem('token');
      if (token) {
        try {
          await axios.post('/logout', {}, {
            headers: { Authorization: `Bearer ${token}` }
          });
        } catch (error) {
          // Continue with logout even if server request fails
          console.warn('Server logout failed:', error);
        }
      }

      // Clear all local state
      localStorage.removeItem('token');
      sessionStorage.clear();
      setUser(null);
      
      // Reset axios configuration
      delete axios.defaults.headers.common['Authorization'];
      axios.defaults.baseURL = 'http://localhost:5000';

      // Use window.location.replace to prevent back navigation after logout
      window.location.replace('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Even if there's an error, try to force logout
      localStorage.removeItem('token');
      setUser(null);
      window.location.replace('/login');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};