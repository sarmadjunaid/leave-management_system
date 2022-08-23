export interface LeaveDates {
  date_from?: string;
  date_to?: string;
}

export interface AuthData {
  access: string
  refresh: string,
  id: number,
  isManager: boolean,
}

export interface LeaveData extends LeaveDates {
  id: number;
  number_of_days?: number;
  leaveAccepted: boolean;
  employee?: {};
}

export interface User {
  id: number
  username: string;
  email: string;
}

export interface Department {
  name: string;
}

export interface Employee {
  employee: any;
  id?: number;
  user?: User;
  department?: Department;
  present_count?: number;
  absent_count?: number;
  limit_crossed?: boolean;
  leaves_allocated?: number;
  employee_leaves: LeaveData[];
}

export interface Manager {
  id?: number;
  user?: User;
  department?: Department;
}
