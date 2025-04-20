
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth, User } from './AuthContext';
import { toast } from 'sonner';

// Define types
export type LeaveStatus = 'pending' | 'approved' | 'rejected';

export interface LeaveApplication {
  id: string;
  studentId: string;
  studentName: string;
  class: string;
  registrationNumber: string;
  reason: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  status: LeaveStatus;
  appliedOn: string;
  updatedOn?: string;
  updatedBy?: string;
  teacherComment?: string;
}

// Define context type
interface LeaveContextType {
  leaves: LeaveApplication[];
  applyForLeave: (leaveData: Omit<LeaveApplication, 'id' | 'status' | 'appliedOn' | 'studentName' | 'class' | 'registrationNumber'>) => Promise<boolean>;
  updateLeaveStatus: (leaveId: string, status: LeaveStatus, comment?: string) => Promise<boolean>;
  getStudentLeaves: (studentId: string) => LeaveApplication[];
  getPendingLeaves: () => LeaveApplication[];
  getAllLeaves: () => LeaveApplication[];
  getLeaveById: (id: string) => LeaveApplication | undefined;
  sendNotification: (recipientRole: 'student' | 'teacher' | 'parent', recipientId: string, message: string) => void;
}

// Create the context
const LeaveContext = createContext<LeaveContextType | undefined>(undefined);

// Sample data
const initialLeaves: LeaveApplication[] = [
  {
    id: 'leave1',
    studentId: '1',
    studentName: 'John Doe',
    class: '10-A',
    registrationNumber: 'S12345',
    reason: 'Family function',
    startDate: '2025-04-22',
    endDate: '2025-04-23',
    startTime: '09:00',
    endTime: '15:00',
    status: 'pending',
    appliedOn: '2025-04-20T10:30:00',
  }
];

export const LeaveProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [leaves, setLeaves] = useState<LeaveApplication[]>(initialLeaves);
  const { user } = useAuth();

  // Load leaves from localStorage on mount
  useEffect(() => {
    const savedLeaves = localStorage.getItem('leaveApplications');
    if (savedLeaves) {
      setLeaves(JSON.parse(savedLeaves));
    }
  }, []);

  // Save leaves to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('leaveApplications', JSON.stringify(leaves));
  }, [leaves]);

  // Apply for leave
  const applyForLeave = async (
    leaveData: Omit<LeaveApplication, 'id' | 'status' | 'appliedOn' | 'studentName' | 'class' | 'registrationNumber'>
  ): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!user || user.role !== 'student') {
          toast.error('Only students can apply for leave');
          resolve(false);
          return;
        }

        const newLeave: LeaveApplication = {
          id: `leave_${Date.now()}`,
          studentId: user.id,
          studentName: user.name,
          class: user.class || 'Unknown',
          registrationNumber: user.registrationNumber || 'Unknown',
          status: 'pending',
          appliedOn: new Date().toISOString(),
          ...leaveData,
        };

        setLeaves((prevLeaves) => [...prevLeaves, newLeave]);
        
        // Simulate sending notification to teacher
        sendNotification('teacher', '2', `Student ${user.name} has applied for leave from ${leaveData.startDate} to ${leaveData.endDate}`);
        
        // Simulate sending notification to parent
        if (user.id === '1') { // Only for our mock data
          sendNotification('parent', '3', `Your child ${user.name} has applied for leave from ${leaveData.startDate} to ${leaveData.endDate}`);
        }
        
        toast.success('Leave application submitted successfully');
        resolve(true);
      }, 1000);
    });
  };

  // Update leave status (approve/reject)
  const updateLeaveStatus = async (
    leaveId: string, 
    status: LeaveStatus, 
    comment?: string
  ): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!user || user.role !== 'teacher') {
          toast.error('Only teachers can update leave status');
          resolve(false);
          return;
        }

        setLeaves((prevLeaves) => 
          prevLeaves.map((leave) => {
            if (leave.id === leaveId) {
              const updatedLeave = {
                ...leave,
                status,
                updatedOn: new Date().toISOString(),
                updatedBy: user.name,
                teacherComment: comment || leave.teacherComment
              };
              
              // Send notification to student
              sendNotification(
                'student', 
                leave.studentId, 
                `Your leave application has been ${status}. ${comment ? `Comment: ${comment}` : ''}`
              );
              
              return updatedLeave;
            }
            return leave;
          })
        );

        toast.success(`Leave has been ${status}`);
        resolve(true);
      }, 1000);
    });
  };

  // Get leaves for a specific student
  const getStudentLeaves = (studentId: string): LeaveApplication[] => {
    return leaves.filter(leave => leave.studentId === studentId);
  };

  // Get all pending leaves (for teachers)
  const getPendingLeaves = (): LeaveApplication[] => {
    return leaves.filter(leave => leave.status === 'pending');
  };

  // Get all leaves
  const getAllLeaves = (): LeaveApplication[] => {
    return leaves;
  };

  // Get a specific leave by ID
  const getLeaveById = (id: string): LeaveApplication | undefined => {
    return leaves.find(leave => leave.id === id);
  };

  // Simulated notification system
  const sendNotification = (
    recipientRole: 'student' | 'teacher' | 'parent', 
    recipientId: string, 
    message: string
  ) => {
    console.log(`Notification to ${recipientRole} (${recipientId}): ${message}`);
    // In a real app, this would send an actual notification
  };

  return (
    <LeaveContext.Provider value={{ 
      leaves, 
      applyForLeave, 
      updateLeaveStatus, 
      getStudentLeaves, 
      getPendingLeaves, 
      getAllLeaves,
      getLeaveById,
      sendNotification
    }}>
      {children}
    </LeaveContext.Provider>
  );
};

export const useLeave = (): LeaveContextType => {
  const context = useContext(LeaveContext);
  if (context === undefined) {
    throw new Error('useLeave must be used within a LeaveProvider');
  }
  return context;
};
