"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle2, Circle, Edit2, Trash2, Clock } from "lucide-react"
import { useTask, type Task } from "@/context/task-context"
import { Button } from "@/components/ui/button"
import { EditTaskModal } from "@/components/edit-task-modal"
import { ConfirmDialog } from "@/components/confirm-dialog"

interface TaskCardProps {
  task: Task
  onTaskUpdated?: () => void
}

export function TaskCard({ task, onTaskUpdated }: TaskCardProps) {
  const { toggleTaskStatus, deleteTask } = useTask()
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isTogglingStatus, setIsTogglingStatus] = useState(false)

  const fetchTasks = useTask().fetchTasks;

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteTask(task._id)
      setIsDeleteOpen(false)
      fetchTasks();
    } catch (error) {
      console.error("[v0] Error deleting task:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleToggleStatus = async () => {
    setIsTogglingStatus(true)
    try {
      await toggleTaskStatus(task._id)
      setIsStatusDialogOpen(false)
      fetchTasks();
      onTaskUpdated?.();
    } catch (error) {
      console.error("[v0] Error toggling status:", error)
    } finally {
      setIsTogglingStatus(false)
    }
  }

  return (
    <>
      <motion.div
        layout
        initial={false}
        exit={{ opacity: 0, scale: 0.95, y: -10 }}
        transition={{ duration: 0.3 }}
        className={`bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow ${
          task.status === "Completed" ? "opacity-75" : ""
        }`}
      >
        <div className="flex items-start gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsStatusDialogOpen(true)}
            disabled={isTogglingStatus}
            className="flex-shrink-0 mt-1 text-muted-foreground hover:text-primary transition-colors disabled:opacity-50"
          >
            {task.status === "Completed" ? (
              <CheckCircle2 className="w-6 h-6 text-green-500" />
            ) : (
              <Circle className="w-6 h-6" />
            )}
          </motion.button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p
              className={`font-semibold text-foreground ${
                task.status === "Completed" ? "line-through opacity-60" : ""
              }`}
            >
              {task.title}
            </p>
            {task.description && <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{task.description}</p>}
            {task.scheduledAt && (
              <div className="flex items-center gap-2 mt-3">
                <div
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                    task.status === "Completed"
                      ? "bg-green-500/10 text-green-600 dark:text-green-400"
                      : "bg-gray-500/10 text-gray-600 dark:text-gray-400"
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>
                    {new Date(task.scheduledAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}{" "}
                    {new Date(task.scheduledAt).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 ml-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditOpen(true)}
              className="text-muted-foreground hover:text-foreground"
            >
              <Edit2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDeleteOpen(true)}
              disabled={isDeleting}
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </motion.div>

      <EditTaskModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} task={task} />

      <ConfirmDialog
        isOpen={isDeleteOpen}
        title="Delete Task"
        description="Are you sure you want to delete this task? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setIsDeleteOpen(false)}
        confirmText="Delete"
        confirmVariant="destructive"
        isLoading={isDeleting}
      />

      <ConfirmDialog
        isOpen={isStatusDialogOpen}
        title="Update Task Status"
        description={`Mark this task as ${task.status === "Completed" ? "Pending" : "Completed"}?`}
        onConfirm={handleToggleStatus}
        onCancel={() => setIsStatusDialogOpen(false)}
        confirmText={task.status === "Completed" ? "Mark as Pending" : "Mark as Completed"}
        isLoading={isTogglingStatus}
      />
    </>
  )
}