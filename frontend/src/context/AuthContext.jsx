import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { getApiUrl } from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserProfile(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserProfile = async (token) => {
    try {
      const response = await axios.get(getApiUrl('users/profile'), {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
    } catch (error) {
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(getApiUrl('users/login'), {
        email,
        password
      });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      toast.success('Login realizado com sucesso!');
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erro ao fazer login');
      throw error;
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await axios.post(getApiUrl('users/register'), {
        name,
        email,
        password
      });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      toast.success('Cadastro realizado com sucesso!');
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erro ao cadastrar');
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast.success('Logout realizado com sucesso!');
  };

  const updateProfile = async (name, email) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        getApiUrl('users/profile'),
        { name, email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(response.data);
      toast.success('Perfil atualizado com sucesso!');
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erro ao atualizar perfil');
      throw error;
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user,
    isAdmin: user?.type === 'admin'
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

