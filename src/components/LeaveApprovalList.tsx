
import React, { useState } from 'react';
import { useLeave, LeaveApplication } from '@/context/LeaveContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const LeaveApprovalList: React.FC = () => {
  const { getPendingLeaves, updateLeaveStatus } = useLeave();
  const pendingLeaves = getPendingLeaves();
  
  const [comments, setComments] = useState<Record<string, string>>({});
  
  const handleCommentChange = (leaveId: string, comment: string) => {
    setComments(prev => ({
      ...prev,
      [leaveId]: comment
    }));
  };
  
  const handleApprove = async (leave: LeaveApplication) => {
    await updateLeaveStatus(leave.id, 'approved', comments[leave.id]);
  };
  
  const handleReject = async (leave: LeaveApplication) => {
    await updateLeaveStatus(leave.id, 'rejected', comments[leave.id]);
  };
  
  if (pendingLeaves.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Leave Approval</CardTitle>
          <CardDescription>No pending leave applications</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-8">
            There are no leave applications pending for approval at this time.
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Pending Leave Applications</h2>
      
      {pendingLeaves.map((leave) => (
        <Card key={leave.id} className="w-full">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{leave.studentName}</CardTitle>
                <CardDescription>
                  Class: {leave.class} | Reg. No: {leave.registrationNumber}
                </CardDescription>
              </div>
              <Badge>Pending</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium">Reason for Leave</h4>
                <p className="text-sm text-muted-foreground mt-1">{leave.reason}</p>
              </div>
              <div>
                <h4 className="font-medium">Duration</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  From: {leave.startDate} {leave.startTime}<br />
                  To: {leave.endDate} {leave.endTime}
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor={`comment-${leave.id}`}>Comment (optional)</Label>
              <Textarea 
                id={`comment-${leave.id}`}
                placeholder="Add comment for student"
                value={comments[leave.id] || ''}
                onChange={(e) => handleCommentChange(leave.id, e.target.value)}
                className="min-h-[80px]"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button 
              variant="outline" 
              onClick={() => handleReject(leave)}
              className="border-school-danger text-school-danger hover:bg-school-danger/10"
            >
              Reject
            </Button>
            <Button 
              onClick={() => handleApprove(leave)}
              className="bg-school-success text-white hover:bg-school-success/90"
            >
              Approve
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default LeaveApprovalList;
