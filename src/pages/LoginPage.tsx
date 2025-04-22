
import React from 'react';
import LoginForm from '@/components/LoginForm';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';

const LoginPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-lg mx-auto text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 text-school-primary">Lambda</h1>
          <p className="text-gray-600">Streamlined leave management system for schools</p>
        </div>
        
        <div className="flex justify-center">
          <LoginForm />
        </div>
      </div>
      
      <footer className="py-4 text-center text-sm text-gray-500 border-t">
        &copy; {new Date().getFullYear()} Lambda. All rights reserved.
      </footer>
    </div>
  );
};

export default LoginPage;
