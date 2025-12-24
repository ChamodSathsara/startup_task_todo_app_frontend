"use client"

import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react"
import { taskAPI } from "@/lib/api-client"

export interface Task {
  _id: string
  title: string
  description?: string
  status: "Pending" | "Completed"
  scheduledAt?: any
  createdAt: string
  updatedAt: string
}

export interface User {
  _id: string
  name: string
  email: string
}

interface TaskContextType {
  tasks: Task[]
  user: User | null
  loading: boolean
  error: string | null
  addTask: (task: { title: string; description?: string; scheduledAt?: string }) => Promise<void>
  updateTask: (id: string, task: Partial<Task>) => Promise<void>
  deleteTask: (id: string) => Promise<void>
  toggleTaskStatus: (id: string) => Promise<void>
  fetchTasks: (date?: string) => Promise<void>
  setUser: (user: User) => void
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

type TaskAction =
  | { type: "SET_TASKS"; payload: Task[] }
  | { type: "ADD_TASK"; payload: Task }
  | { type: "UPDATE_TASK"; payload: Task }
  | { type: "DELETE_TASK"; payload: string }
  | { type: "SET_USER"; payload: User | null }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }

const initialState: { tasks: Task[]; user: User | null; loading: boolean; error: string | null } = {
  tasks: [],
  user: null,
  loading: true,
  error: null,
}

function taskReducer(
  state: { tasks: Task[]; user: User | null; loading: boolean; error: string | null },
  action: TaskAction,
) {
  switch (action.type) {
    case "SET_TASKS":
      return {
        ...state,
        tasks: action.payload,
        loading: false,
      }
    case "ADD_TASK":
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
      }
    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) => (task._id === action.payload._id ? action.payload : task)),
      }
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload),
      }
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      }
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      }
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}

export function TaskProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(taskReducer, initialState)

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async (date?: string) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true })
      dispatch({ type: "SET_ERROR", payload: null })
      const response = await taskAPI.getTasks(date)
      dispatch({ type: "SET_TASKS", payload: response.data || [] })
    } catch (error: any) {
      dispatch({ type: "SET_ERROR", payload: error.message })
    }
  }

  const value: TaskContextType = {
    tasks: state.tasks,
    user: state.user,
    loading: state.loading,
    error: state.error,
    addTask: async (task) => {
      try {
        const response = await taskAPI.createTask(task)
        // Immediately add the new task to state
        dispatch({ type: "ADD_TASK", payload: response.data })
        // Also fetch all tasks to ensure consistency
        await fetchTasks()
      } catch (error: any) {
        dispatch({ type: "SET_ERROR", payload: error.message })
        throw error
      }
    },
    updateTask: async (id, task) => {
      try {
        const response = await taskAPI.updateTask(id, task)
        dispatch({ type: "UPDATE_TASK", payload: response.data })
        await fetchTasks()
      } catch (error: any) {
        dispatch({ type: "SET_ERROR", payload: error.message })
        throw error
      }
    },
    deleteTask: async (id) => {
      try {
        await taskAPI.deleteTask(id)
        dispatch({ type: "DELETE_TASK", payload: id })
        await fetchTasks()
      } catch (error: any) {
        dispatch({ type: "SET_ERROR", payload: error.message })
        throw error
      }
    },
    toggleTaskStatus: async (id) => {
      try {
        const response = await taskAPI.toggleTaskStatus(id)
        dispatch({ type: "UPDATE_TASK", payload: response.data })
        await fetchTasks()
      } catch (error: any) {
        dispatch({ type: "SET_ERROR", payload: error.message })
        throw error
      }
    },
    fetchTasks,
    setUser: (user) => {
      dispatch({ type: "SET_USER", payload: user })
    },
  }

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}

export function useTask() {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error("useTask must be used within TaskProvider")
  }
  return context
}