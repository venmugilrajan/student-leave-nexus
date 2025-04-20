
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import Dashboard from '@/components/Dashboard';
import Header from '@/components/Header';
import { Navigate } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading...</div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <Dashboard />
    </div>
  );
};

export default DashboardPage;
