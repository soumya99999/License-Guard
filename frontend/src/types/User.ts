// src/types/User.ts

export interface User {
  id?: number;
  username: string;
  email?: string;
  password?: string;
  role?: 'ADMIN' | 'DEPT_HEAD' | 'USER';  // Optional enum-like typing
  departmentName?: string;
  isApproved?: boolean;
  departmentId?: number | null;
}
