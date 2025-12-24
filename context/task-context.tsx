"use client"

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { tasksApi } from '@/lib/api/tasks.api'
import type { Task, CreateTaskDto, UpdateTaskDto } from '@/lib/api.type'

interface TaskContextType {
  tasks: Task[]
  loading: boolean
  error: string | null
  fetchTasks: (date?: string) => Promise<void>
  fetchTask: (id: string) => Promise<Task | undefined>
  addTask: (data: CreateTaskDto) => Promise<Task | undefined>
  updateTask: (id: string, data: UpdateTaskDto) => Promise<Task | undefined>
  toggleTask: (id: string) => Promise<void>
  deleteTask: (id: string) => Promise<void>
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch all tasks
  const fetchTasks = useCallback(async (date?: string) => {
    setLoading(true)
    setError(null)
    try {
      const response = await tasksApi.getAll(date)
      setTasks(response.data || [])
    } catch (err: any) {
      setError(err.message || 'Failed to fetch tasks')
      console.error('Error fetching tasks:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Fetch single task
  const fetchTask = useCallback(async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      const response = await tasksApi.getById(id)
      return response.data
    } catch (err: any) {
      setError(err.message || 'Failed to fetch task')
      console.error('Error fetching task:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // Add task
  const addTask = useCallback(async (data: CreateTaskDto) => {
    setLoading(true)
    setError(null)
    try {
      const response = await tasksApi.create(data)
      if (response.data) {
        // Add to local state immediately for instant UI update
        setTasks(prev => [response.data!, ...prev])
        return response.data
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create task')
      console.error('Error creating task:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // Update task
  const updateTask = useCallback(async (id: string, data: UpdateTaskDto) => {
    setLoading(true)
    setError(null)
    try {
      const response = await tasksApi.update(id, data)
      if (response.data) {
        // Update local state immediately
        setTasks(prev => 
          prev.map(task => task._id === id ? response.data! : task)
        )
        return response.data
      }
    } catch (err: any) {
      setError(err.message || 'Failed to update task')
      console.error('Error updating task:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // Toggle task status
  const toggleTask = useCallback(async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      const response = await tasksApi.toggleStatus(id)
      if (response.data) {
        // Update local state immediately
        setTasks(prev => 
          prev.map(task => task._id === id ? response.data! : task)
        )
      }
    } catch (err: any) {
      setError(err.message || 'Failed to toggle task')
      console.error('Error toggling task:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // Delete task
  const deleteTask = useCallback(async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      await tasksApi.delete(id)
      // Remove from local state immediately
      setTasks(prev => prev.filter(task => task._id !== id))
    } catch (err: any) {
      setError(err.message || 'Failed to delete task')
      console.error('Error deleting task:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        fetchTasks,
        fetchTask,
        addTask,
        updateTask,
        toggleTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export function useTask() {
  const context = useContext(TaskContext)
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider')
  }
  return context
}