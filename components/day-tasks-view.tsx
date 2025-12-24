"use client"

import { motion } from "framer-motion"
import { AlertCircle } from "lucide-react"
import type { Task } from "@/context/task-context"
import { TaskCard } from "@/components/task-card"

interface DayTasksViewProps {
  date: string
  tasks: Task[]
}

export function DayTasksView({ date, tasks }: DayTasksViewProps) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  })

  const pendingTasks = tasks.filter((task) => task.status === "Pending")
  const completedTasks = tasks.filter((task) => task.status === "Completed")

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <h2 className="text-2xl font-bold text-foreground mb-2">{formattedDate}</h2>
      <p className="text-muted-foreground mb-6">
        {tasks.length === 0 ? "No tasks scheduled" : `${tasks.length} task${tasks.length !== 1 ? "s" : ""} scheduled`}
      </p>

      {tasks.length === 0 ? (
        <motion.div
          variants={itemVariants}
          className="bg-card border border-border rounded-xl p-12 text-center flex flex-col items-center justify-center gap-4"
        >
          <AlertCircle className="w-12 h-12 text-muted-foreground opacity-50" />
          <p className="text-muted-foreground">No tasks scheduled for this date</p>
        </motion.div>
      ) : (
        <motion.div variants={containerVariants} className="space-y-6">
          {/* Pending Tasks */}
          {pendingTasks.length > 0 && (
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className="w-1 h-5 bg-amber-500 rounded"></span>
                Pending
              </h3>
              <div className="space-y-3">
                {pendingTasks.map((task) => (
                  <TaskCard key={task._id} task={task} />
                ))}
              </div>
            </motion.div>
          )}

          {/* Completed Tasks */}
          {completedTasks.length > 0 && (
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className="w-1 h-5 bg-green-500 rounded"></span>
                Completed
              </h3>
              <div className="space-y-3">
                {completedTasks.map((task) => (
                  <TaskCard key={task._id} task={task} />
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </motion.div>
  )
}
