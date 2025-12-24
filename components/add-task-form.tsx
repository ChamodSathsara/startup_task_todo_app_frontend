"use client"

import { useState } from "react"
import { useTask } from "@/context/task-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner" // Optional: for better notifications

interface AddTaskFormProps {
  onClose: () => void
}

export function AddTaskForm({ onClose }: AddTaskFormProps) {
  const { addTask, loading } = useTask()
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

    try {
      // Format scheduledAt if provided
      const scheduledDate = formData.scheduledAt 
        ? new Date(formData.scheduledAt).toISOString()
        : undefined

      // Create task - this will automatically update the UI
      await addTask({
        title: formData.title,
        description: formData.description || undefined,
        scheduledAt: scheduledDate,
      })
      
      // Reset form
      setFormData({ title: "", description: "", scheduledAt: "" })
      
      // Optional: Show success message
      // toast.success("Task created successfully!")
      
      // Close form
      onClose()
    } catch (error: any) {
      console.error("Error creating task:", error)
      alert(error.message || "Failed to create task")
      // toast.error(error.message || "Failed to create task")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-6 space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Task Title *
        </label>
        <Input
          type="text"
          placeholder="Enter task title..."
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          disabled={loading}
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
          disabled={loading}
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
          disabled={loading}
        />
      </div>

      <div className="flex gap-3">
        <Button
          type="submit"
          disabled={loading}
          className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {loading ? "Creating..." : "Create Task"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          disabled={loading}
          className="flex-1"
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}