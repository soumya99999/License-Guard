// src/types/DepartmentJoinRequest.ts

import type { User } from './User';
import type { Department } from './Department';

export interface DepartmentJoinRequest {
  id: number;
  user: User;
  name:string;
  department: Department;
  email: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  requestedAt: string; // Use string to represent ISO datetime
}
