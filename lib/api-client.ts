import axios from "axios"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Task API endpoints
export const taskAPI = {
  getTasks: async (date?: string) => {
    const response = await apiClient.get("/api/tasks", {
      params: date ? { date } : {},
    })
    return response.data
  },

  getTaskById: async (id: string) => {
    const response = await apiClient.get(`/api/tasks/${id}`)
    return response.data
  },

  createTask: async (taskData: { title: string; description?: string; scheduledAt?: string }) => {
    const response = await apiClient.post("/api/tasks", taskData)
    return response.data
  },

  updateTask: async (id: string, taskData: Partial<any>) => {
    const response = await apiClient.put(`/api/tasks/${id}`, taskData)
    return response.data
  },

  toggleTaskStatus: async (id: string) => {
    const response = await apiClient.patch(`/api/tasks/${id}/toggle`)
    return response.data
  },

  deleteTask: async (id: string) => {
    const response = await apiClient.delete(`/api/tasks/${id}`)
    return response.data
  },
}

// User API endpoints
export const userAPI = {
  createUser: async (userData: { name: string; email: string; password: string }) => {
    const response = await apiClient.post("/api/users", userData)
    return response.data
  },

  getUser: async (id: string) => {
    const response = await apiClient.get(`/api/users/${id}`)
    return response.data
  },

  updateUser: async (id: string, userData: Partial<any>) => {
    const response = await apiClient.put(`/api/users/${id}`, userData)
    return response.data
  },
}

export default apiClient
