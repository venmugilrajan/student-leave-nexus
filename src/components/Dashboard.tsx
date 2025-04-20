
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import StudentLeaveList from './StudentLeaveList';
import LeaveApprovalList from './LeaveApprovalList';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const ParentDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Children's Leave Applications</h2>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>John Doe's Leave Applications</CardTitle>
          <CardDescription>
            Recent leave applications for your child
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-md">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Family function</h3>
                <span className="text-sm bg-amber-500 text-white px-2 py-1 rounded-full">Pending</span>
              </div>
              <p className="text-sm text-muted-foreground">
                From: Apr 22, 2025 09:00<br />
                To: Apr 23, 2025 15:00
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  if (!user) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">You need to log in</h2>
          <Button onClick={() => navigate('/login')} className="bg-school-primary">
            Go to Login
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Welcome, {user.name}</h1>
      
      {user.role === 'student' && <StudentLeaveList />}
      {user.role === 'teacher' && <LeaveApprovalList />}
      {user.role === 'parent' && <ParentDashboard />}
    </div>
  );
};

export default Dashboard;
