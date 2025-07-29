// src/types/Department.ts

import type { User } from './User';

export interface Department {
  id: number;
  name: string;
  headUser: User;
  members: User[];
}
