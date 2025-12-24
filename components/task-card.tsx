"use client"

import { useState } from "react"
import { useTask } from "@/context/task-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { MoreVertical, Trash2, Edit, Calendar } from "lucide-react"
import type { Task } from "@/lib/api.type"
import { format } from "date-fns"

interface TaskCardProps {
  task: Task
}

export function TaskCard({ task }: TaskCardProps) {
  const { toggleTask, deleteTask, loading } = useTask()
  const [isDeleting, setIsDeleting] = useState(false)
  const [isToggling, setIsToggling] = useState(false)

  const handleToggle = async () => {
    setIsToggling(true)
    try {
      await toggleTask(task._id)
    } catch (error) {
      console.error("Error toggling task:", error)
    } finally {
      setIsToggling(false)
    }
  }

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this task?")) {
      setIsDeleting(true)
      try {
        await deleteTask(task._id)
      } catch (error) {
        console.error("Error deleting task:", error)
        setIsDeleting(false)
      }
    }
  }

  return (
    <Card className={`transition-all duration-200 hover:shadow-md ${
      task.status === "Completed" ? "opacity-75" : ""
    }`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {/* Checkbox */}
          <Checkbox
            checked={task.status === "Completed"}
            onCheckedChange={handleToggle}
            disabled={isToggling || loading}
            className="mt-1"
          />

          {/* Task Content */}
          <div className="flex-1 min-w-0">
            <h3 className={`font-semibold text-foreground mb-1 ${
              task.status === "Completed" ? "line-through text-muted-foreground" : ""
            }`}>
              {task.title}
            </h3>
            
            {task.description && (
              <p className="text-sm text-muted-foreground mb-2">
                {task.description}
              </p>
            )}

            {/* Scheduled Date */}
            {task.scheduledAt && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" />
                <span>
                  {format(new Date(task.scheduledAt), "MMM dd, yyyy 'at' hh:mm a")}
                </span>
              </div>
            )}

            {/* Status Badge */}
            <div className="mt-2">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                task.status === "Pending" 
                  ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                  : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
              }`}>
                {task.status}
              </span>
            </div>
          </div>

          {/* Actions Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
                disabled={isDeleting || loading}
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleToggle} disabled={isToggling}>
                <Edit className="mr-2 h-4 w-4" />
                {task.status === "Pending" ? "Mark Complete" : "Mark Pending"}
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={handleDelete} 
                disabled={isDeleting}
                className="text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  )
}