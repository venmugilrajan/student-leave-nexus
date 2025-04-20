
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
  
  const { login, loginWithGoogle, register } = useAuth();
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

  const handleGoogleLogin = async () => {
    const success = await loginWithGoogle();
    if (success) {
      navigate('/dashboard');
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
        
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or</span>
          </div>
        </div>
        
        <Button 
          type="button" 
          variant="outline" 
          className="w-full"
          onClick={handleGoogleLogin}
        >
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Login with Google
        </Button>
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
