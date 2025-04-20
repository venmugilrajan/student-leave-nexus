
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-school-primary rounded-md w-8 h-8 flex items-center justify-center">
            <span className="text-white font-bold">LN</span>
          </div>
          <span className="font-bold text-xl">Leave Nexus</span>
        </Link>
        
        {user ? (
          <div className="flex items-center space-x-4">
            <div className="hidden md:block text-sm text-right">
              <div className="font-medium">{user.name}</div>
              <div className="text-muted-foreground">{user.role}</div>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarFallback className="bg-school-primary text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="px-2 py-1.5 text-sm md:hidden">
                  <div className="font-medium">{user.name}</div>
                  <div className="text-muted-foreground">{user.role}</div>
                </div>
                <DropdownMenuSeparator className="md:hidden" />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                {user.role === 'student' && (
                  <DropdownMenuItem asChild>
                    <Link to="/apply-leave">Apply for Leave</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <Button
            onClick={() => navigate('/login')}
            className="bg-school-primary"
          >
            Login
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
