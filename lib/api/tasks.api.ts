import { apiClient } from '../api.client';
import { API_CONFIG } from '../api.config';
import type { ApiResponse, Task, CreateTaskDto, UpdateTaskDto } from '@/lib/api.type';

export const tasksApi = {
  // Get all tasks
  getAll: async (date?: string): Promise<ApiResponse<Task[]>> => {
    const endpoint = date 
      ? `${API_CONFIG.ENDPOINTS.TASKS}?date=${date}`
      : API_CONFIG.ENDPOINTS.TASKS;
    return apiClient.get<ApiResponse<Task[]>>(endpoint);
  },

  // Get single task by ID
  getById: async (id: string): Promise<ApiResponse<Task>> => {
    return apiClient.get<ApiResponse<Task>>(`${API_CONFIG.ENDPOINTS.TASKS}/${id}`);
  },

  // Create new task
  create: async (data: CreateTaskDto): Promise<ApiResponse<Task>> => {
    return apiClient.post<ApiResponse<Task>>(API_CONFIG.ENDPOINTS.TASKS, data);
  },

  // Update task
  update: async (id: string, data: UpdateTaskDto): Promise<ApiResponse<Task>> => {
    return apiClient.put<ApiResponse<Task>>(`${API_CONFIG.ENDPOINTS.TASKS}/${id}`, data);
  },

  // Toggle task status
  toggleStatus: async (id: string): Promise<ApiResponse<Task>> => {
    return apiClient.patch<ApiResponse<Task>>(`${API_CONFIG.ENDPOINTS.TASKS}/${id}/toggle`);
  },

  // Delete task
  delete: async (id: string): Promise<ApiResponse<{ message: string }>> => {
    return apiClient.delete<ApiResponse<{ message: string }>>(`${API_CONFIG.ENDPOINTS.TASKS}/${id}`);
  },
};