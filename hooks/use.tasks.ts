import { useState, useCallback } from 'react';
import { tasksApi } from '@/lib/api/tasks.api';
import type { Task, CreateTaskDto, UpdateTaskDto } from '@/lib/api.type';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get all tasks
  const fetchTasks = useCallback(async (date?: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await tasksApi.getAll(date);
      setTasks(response.data || []);
      return response.data || [];
    } catch (err: any) {
      setError(err.message || 'Failed to fetch tasks');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get single task
  const fetchTask = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await tasksApi.getById(id);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch task');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Create task
  const createTask = useCallback(async (data: CreateTaskDto) => {
    setLoading(true);
    setError(null);
    try {
      const response = await tasksApi.create(data);
      if (response.data) {
        setTasks(prev => [...prev, response.data!]);
      }
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to create task');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update task
  const updateTask = useCallback(async (id: string, data: UpdateTaskDto) => {
    setLoading(true);
    setError(null);
    try {
      const response = await tasksApi.update(id, data);
      if (response.data) {
        setTasks(prev => 
          prev.map(task => task._id === id ? response.data! : task)
        );
      }
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to update task');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Toggle task status
  const toggleTask = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await tasksApi.toggleStatus(id);
      if (response.data) {
        setTasks(prev => 
          prev.map(task => task._id === id ? response.data! : task)
        );
      }
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to toggle task');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete task
  const deleteTask = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await tasksApi.delete(id);
      setTasks(prev => prev.filter(task => task._id !== id));
    } catch (err: any) {
      setError(err.message || 'Failed to delete task');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    fetchTask,
    createTask,
    updateTask,
    toggleTask,
    deleteTask,
  };
};