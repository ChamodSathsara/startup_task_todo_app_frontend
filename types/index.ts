export type Task = {
  id: string
  title: string
  description?: string
  dueDate?: string
  dueTime?: string
  status: "pending" | "completed"
  createdAt: string
}

export type User = {
  id: string
  username: string
  email: string
  avatar?: string
}
