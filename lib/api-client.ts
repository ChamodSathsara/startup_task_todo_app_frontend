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
  // get task list by date filter
  getTasks: async (date?: string) => {
    const response = await apiClient.get("/api/tasks", {
      params: date ? { date } : {},
    })
    return response.data
  },

  // get task by id
  getTaskById: async (id: string) => {
    const response = await apiClient.get(`/api/tasks/${id}`)
    return response.data
  },

  // create new task
  createTask: async (taskData: { title: string; description?: string; scheduledAt?: string }) => {
    console.log("creating:", taskData);
    const response = await apiClient.post("/api/tasks", taskData)
    return response.data
  },

  // update existing task
  updateTask: async (id: string, taskData: Partial<any>) => {
    console.log("updating:", id, taskData);
    const response = await apiClient.put(`/api/tasks/${id}`, taskData)
    return response.data
  },

  // toggle task status(Pending => Completed)
  toggleTaskStatus: async (id: string) => {
    const response = await apiClient.patch(`/api/tasks/${id}/toggle`)
    return response.data
  },


  // delete task
  deleteTask: async (id: string) => {
    const response = await apiClient.delete(`/api/tasks/${id}`)
    return response.data
  },
}

export default apiClient
