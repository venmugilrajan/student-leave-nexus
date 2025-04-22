
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-school-primary rounded-md w-8 h-8 flex items-center justify-center">
              <span className="text-white font-bold">λ</span>
            </div>
            <span className="font-bold text-xl">Lambda</span>
          </div>
          
          <div>
            {user ? (
              <Button 
                onClick={() => navigate('/dashboard')}
                className="bg-school-primary"
              >
                Dashboard
              </Button>
            ) : (
              <Button 
                onClick={() => navigate('/login')}
                className="bg-school-primary"
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-school-primary/10 to-white py-16 md:py-24 flex-grow">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Student Leave Management <span className="text-school-primary">Simplified</span>
              </h1>
              <p className="text-lg text-gray-700 leading-relaxed">
                Efficient leave application process for students, with instant notifications 
                for teachers and parents. Stay informed and connected.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => navigate('/login')}
                  className="bg-school-primary text-white px-8 py-6 text-lg"
                  size="lg"
                >
                  Get Started
                </Button>
              </div>
            </div>
            
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3R1ZGVudHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=80" 
                alt="Students" 
                className="rounded-lg shadow-xl w-full object-cover aspect-video"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-school-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                <span className="text-school-primary font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Student Application</h3>
              <p className="text-gray-600">
                Students apply for leave with reason, duration, start and end times through their portal.
              </p>
            </div>
            
            <div className="p-6 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-school-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                <span className="text-school-primary font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Notification</h3>
              <p className="text-gray-600">
                Parents and teachers receive immediate notifications about the leave application.
              </p>
            </div>
            
            <div className="p-6 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-school-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                <span className="text-school-primary font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Teacher Review</h3>
              <p className="text-gray-600">
                Teachers can approve or reject leave applications with comments for students.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-school-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to streamline your leave management?</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Join schools already using Lambda to simplify administrative tasks.
          </p>
          <Button 
            onClick={() => navigate('/login')} 
            variant="outline"
            className="bg-white text-school-primary hover:bg-white/90 hover:text-school-primary px-8"
            size="lg"
          >
            Get Started Today
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center space-x-2">
                <div className="bg-white rounded-md w-8 h-8 flex items-center justify-center">
                  <span className="text-school-primary font-bold">λ</span>
                </div>
                <span className="font-bold text-xl">Lambda</span>
              </div>
              <p className="text-gray-400 mt-2">Streamlining school leave management</p>
            </div>
            
            <div className="text-center md:text-right">
              <p>&copy; {new Date().getFullYear()} Lambda. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
