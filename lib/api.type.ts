// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  count?: number;
}

// Task Types
export interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'Pending' | 'Completed';
  scheduledAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskDto {
  title: string;
  description?: string;
  scheduledAt?: string;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  status?: 'Pending' | 'Completed';
  scheduledAt?: string;
}

// User Types
export interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
}