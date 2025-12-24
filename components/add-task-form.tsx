"use client"

import { useState } from "react"
import { useTask } from "@/context/task-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface AddTaskFormProps {
  onClose: () => Promise<void> | void
}

export function AddTaskForm({ onClose }: AddTaskFormProps) {
  const { addTask } = useTask()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    scheduledAt: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title.trim()) {
      alert("Task title is required")
      return
    }

    setIsLoading(true)
    try {
      await addTask({
        title: formData.title,
        description: formData.description || undefined,
        scheduledAt: formData.scheduledAt || undefined,
      })
      
      // Reset form
      setFormData({ title: "", description: "", scheduledAt: "" })
      
      // Call onClose to refresh tasks and close form
      await onClose()
    } catch (error) {
      console.error("Error creating task:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-6 space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Task Title
        </label>
        <Input
          type="text"
          placeholder="Enter task title..."
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          disabled={isLoading}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Description
        </label>
        <Textarea
          placeholder="Enter task description..."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          disabled={isLoading}
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Schedule Date & Time
        </label>
        <Input
          type="datetime-local"
          value={formData.scheduledAt}
          onChange={(e) => setFormData({ ...formData, scheduledAt: e.target.value })}
          disabled={isLoading}
        />
      </div>

      <div className="flex gap-3">
        <Button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {isLoading ? "Creating..." : "Create Task"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          disabled={isLoading}
          className="flex-1"
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}