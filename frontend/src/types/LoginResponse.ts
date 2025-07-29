// src/types/LoginResponse.ts
export interface LoginResponse {
  userId: number;
  username: string;
  role: 'ADMIN' | 'DEPT_HEAD' | 'USER';
  email: string;
  isApproved: boolean;
  departmentId: number | null;
  departmentName?: string;
}
