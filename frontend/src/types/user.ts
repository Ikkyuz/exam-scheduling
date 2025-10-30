export type Role = 'admin' | 'user';

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  email?: string;
  role: Role;
  created_at?: string;
  updated_at?: string;
}
