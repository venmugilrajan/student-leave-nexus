
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLeave } from '@/context/LeaveContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  switch (status) {
    case 'pending':
      return <Badge className="bg-amber-500">Pending</Badge>;
    case 'approved':
      return <Badge className="bg-school-success">Approved</Badge>;
    case 'rejected':
      return <Badge className="bg-school-danger">Rejected</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

const StudentLeaveList: React.FC = () => {
  const { user } = useAuth();
  const { getStudentLeaves } = useLeave();
  const navigate = useNavigate();
  
  if (!user) {
    return <div>Loading...</div>;
  }
  
  const leaves = getStudentLeaves(user.id);
  
  const handleNewLeave = () => {
    navigate('/apply-leave');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Leave Applications</h2>
        <Button 
          onClick={handleNewLeave}
          className="bg-school-primary"
        >
          Apply for Leave
        </Button>
      </div>
      
      {leaves.length === 0 ? (
        <Card>
          <CardContent className="py-8">
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">You haven't applied for any leaves yet.</p>
              <Button 
                onClick={handleNewLeave}
                className="bg-school-primary"
              >
                Apply Now
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {leaves.map((leave) => (
            <Card key={leave.id} className="w-full">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Leave Application</CardTitle>
                    <CardDescription>
                      Applied on: {new Date(leave.appliedOn).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <StatusBadge status={leave.status} />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium">Reason</h4>
                  <p className="text-sm text-muted-foreground mt-1">{leave.reason}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium">Duration</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      From: {leave.startDate} {leave.startTime}<br />
                      To: {leave.endDate} {leave.endTime}
                    </p>
                  </div>
                  
                  {leave.status !== 'pending' && (
                    <div>
                      <h4 className="font-medium">Review</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {leave.status === 'approved' 
                          ? 'Your leave has been approved.' 
                          : 'Your leave has been rejected.'}
                        {leave.teacherComment && (
                          <>
                            <br />
                            <span className="font-medium">Comment:</span> {leave.teacherComment}
                          </>
                        )}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentLeaveList;
