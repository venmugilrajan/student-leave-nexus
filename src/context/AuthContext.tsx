
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'sonner';

// Define user types
export type UserRole = 'student' | 'teacher' | 'parent';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  registrationNumber?: string;
  associatedStudents?: string[]; // For parents - IDs of their children
  class?: string; // For students and teachers
}

// Define context type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string, role: UserRole, registrationNumber?: string) => Promise<boolean>;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'student@example.com',
    role: 'student',
    registrationNumber: 'S12345',
    class: '10-A'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'teacher@example.com',
    role: 'teacher',
    class: '10-A'
  },
  {
    id: '3',
    name: 'Parent User',
    email: 'parent@example.com',
    role: 'parent',
    associatedStudents: ['1']
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const foundUser = mockUsers.find(u => u.email === email);
        
        if (foundUser) {
          setUser(foundUser);
          localStorage.setItem('user', JSON.stringify(foundUser));
          toast.success('Logged in successfully');
          resolve(true);
        } else {
          toast.error('Invalid email or password');
          resolve(false);
        }
        
        setLoading(false);
      }, 1000);
    });
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.info('Logged out successfully');
  };

  // Register function (simulated)
  const register = async (
    name: string, 
    email: string, 
    password: string, 
    role: UserRole,
    registrationNumber?: string
  ): Promise<boolean> => {
    setLoading(true);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        // Check if user already exists
        const existingUser = mockUsers.find(u => u.email === email);
        
        if (existingUser) {
          toast.error('Email already in use');
          setLoading(false);
          resolve(false);
          return;
        }
        
        // Create new user
        const newUser: User = {
          id: `user_${Date.now().toString()}`,
          name,
          email,
          role,
          registrationNumber: registrationNumber || undefined,
          class: role === 'student' ? '10-A' : undefined
        };
        
        // In a real app, we'd save this to a database
        mockUsers.push(newUser);
        
        // Log the user in
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        
        toast.success('Registration successful');
        setLoading(false);
        resolve(true);
      }, 1500);
    });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
