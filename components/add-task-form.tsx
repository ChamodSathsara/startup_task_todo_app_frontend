"use client"

import type React from "react"

import { useState } from "react"
import { useTask } from "@/context/task-context"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { toast } from "sonner"

interface AddTaskFormProps {
  onClose: () => void
}

export function AddTaskForm({ onClose }: AddTaskFormProps) {
  const { addTask } = useTask()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [dueDate, setDueDate] = useState(new Date().toISOString().split("T")[0])
  const [dueTime, setDueTime] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    setIsLoading(true)
    try {
      const scheduledAt = dueTime ? `${dueDate}T${dueTime}:00.000Z` : `${dueDate}T00:00:00.000Z`

      await addTask({
        title,
        description: description || undefined,
        scheduledAt,
      })

      toast.success("Task created successfully")
      setTitle("")
      setDescription("")
      setDueDate(new Date().toISOString().split("T")[0])
      setDueTime("")
      onClose()
    } catch (error) {
      toast.error("Failed to create task")
      console.error("[v0] Error creating task:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="bg-card border border-border rounded-lg p-6 space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Title *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add more details (optional)"
          rows={3}
          className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Time</label>
          <input
            type="time"
            value={dueTime}
            onChange={(e) => setDueTime(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          type="submit"
          disabled={isLoading || !title.trim()}
          className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          {isLoading ? "Creating..." : "Create Task"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="flex-1 border-border text-foreground hover:bg-secondary bg-transparent"
        >
          Cancel
        </Button>
      </div>
    </motion.form>
  )
}
