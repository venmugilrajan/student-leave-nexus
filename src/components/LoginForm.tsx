
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '@/context/AuthContext';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [loginMethod, setLoginMethod] = useState<'email' | 'registration'>('email');
  const [name, setName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [role, setRole] = useState<UserRole>('student');
  
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (loginMethod === 'email') {
      const success = await login(email, password);
      if (success) {
        navigate('/dashboard');
      }
    } else {
      // In a real app, you'd validate registration numbers differently
      const success = await login(registrationNumber + '@school.com', password);
      if (success) {
        navigate('/dashboard');
      }
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      return;
    }
    
    const success = await register(name, email, password, role, registrationNumber);
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <Card className="w-[350px] shadow-lg">
      <CardHeader>
        <CardTitle>{isRegistering ? 'Create an Account' : 'Login'}</CardTitle>
        <CardDescription>
          {isRegistering 
            ? 'Enter your details to create an account' 
            : 'Enter your credentials to access your account'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isRegistering ? (
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="register-email">Email</Label>
              <Input 
                id="register-email" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="register-password">Password</Label>
              <Input 
                id="register-password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="registration-number">Registration Number (For Students)</Label>
              <Input 
                id="registration-number" 
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label>I am a:</Label>
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    id="role-student" 
                    name="role"
                    checked={role === 'student'}
                    onChange={() => setRole('student')} 
                  />
                  <Label htmlFor="role-student">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    id="role-teacher" 
                    name="role"
                    checked={role === 'teacher'}
                    onChange={() => setRole('teacher')} 
                  />
                  <Label htmlFor="role-teacher">Teacher</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    id="role-parent" 
                    name="role"
                    checked={role === 'parent'}
                    onChange={() => setRole('parent')} 
                  />
                  <Label htmlFor="role-parent">Parent</Label>
                </div>
              </div>
            </div>
            
            <Button type="submit" className="w-full bg-school-primary">Register</Button>
          </form>
        ) : (
          <Tabs defaultValue="email" onValueChange={(v) => setLoginMethod(v as 'email' | 'registration')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="registration">Registration No</TabsTrigger>
            </TabsList>
            <TabsContent value="email">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                </div>
                <Button type="submit" className="w-full bg-school-primary">Login</Button>
              </form>
            </TabsContent>
            <TabsContent value="registration">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reg-number">Registration Number</Label>
                  <Input 
                    id="reg-number"
                    value={registrationNumber}
                    onChange={(e) => setRegistrationNumber(e.target.value)}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-password">Password</Label>
                  <Input 
                    id="reg-password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                </div>
                <Button type="submit" className="w-full bg-school-primary">Login</Button>
              </form>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button 
          variant="link" 
          onClick={() => setIsRegistering(!isRegistering)}
        >
          {isRegistering ? 'Already have an account? Login' : 'Don\'t have an account? Register'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
