
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import LeaveApplicationForm from '@/components/LeaveApplicationForm';
import Header from '@/components/Header';
import { Navigate } from 'react-router-dom';

const LeaveApplicationPage: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (user.role !== 'student') {
    return <Navigate to="/dashboard" replace />;
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8 flex-1">
        <LeaveApplicationForm />
      </div>
    </div>
  );
};

export default LeaveApplicationPage;
