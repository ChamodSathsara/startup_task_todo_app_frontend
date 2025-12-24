"use client"

import { useState, useEffect, useMemo } from "react"
import { MainLayout } from "@/components/main-layout"
import { TaskCard } from "@/components/task-card"
import { AddTaskForm } from "@/components/add-task-form"
import { useTask } from "@/context/task-context"
import { motion, AnimatePresence } from "framer-motion"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TasksPage() {
  const { tasks, fetchTasks } = useTask()
  const [showForm, setShowForm] = useState(false)
  const [filter, setFilter] = useState<"all"| "today" | "pending" | "completed" >("today")
  const [key, setKey] = useState(0) // Key to force re-render of tasks grid

  // Get current date
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })

  // Use useMemo to compute filtered tasks whenever tasks change
  const { pendingTasks, completedTasks, todayTasks } = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const pending = tasks.filter((t) => t.status === "Pending")
    const completed = tasks.filter((t) => t.status === "Completed")
    const todayFiltered = tasks.filter((t) => {
      const taskDate = new Date(t.scheduledAt)
      taskDate.setHours(0, 0, 0, 0)
      return taskDate.getTime() === today.getTime()
    })
    
    return { pendingTasks: pending, completedTasks: completed, todayTasks: todayFiltered }
  }, [tasks])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  }

  const handleFormClose = async () => {
    setShowForm(false)
    await fetchTasks()
    setKey(prev => prev + 1) // Force re-render with animation
  }

  const handleTaskUpdated = () => {
    setKey(prev => prev + 1) // Force re-render with animation
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5">
        {/* Header */}
        <div className="sticky top-0 bg-background/95 backdrop-blur border-b border-border z-40">
          <div className="px-6 md:px-8 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Tasks</h1>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <p className="text-sm text-muted-foreground">{currentDate}</p>
              <Button
                onClick={() => setShowForm(!showForm)}
                className="w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary/90 hidden md:flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Task
              </Button>
            </div>
          </div>
        </div>

        <div className="px-6 md:px-8 py-8">
          {/* Add Task Form */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-8"
              >
                <AddTaskForm onClose={handleFormClose} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Filter Tabs */}
          <div className="md:flex hidden gap-2 mb-8 overflow-x-auto">
            {(["today","all",  "pending", "completed"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  filter === f
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-secondary"
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* Tasks Grid - key prop forces re-render with animation */}
          <div key={key} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Today Tasks */}
            {filter === "today" && (
              <motion.div variants={containerVariants} initial="hidden" animate="visible" className="lg:col-span-2">
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-blue-500 rounded"></span>
                  Today's Tasks ({todayTasks.length})
                </h2>
                <motion.div variants={containerVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  {todayTasks.length === 0 ? (
                    <motion.div
                      variants={itemVariants}
                      className="bg-card border border-border rounded-lg p-8 text-center text-muted-foreground lg:col-span-2"
                    >
                      No tasks created today.
                    </motion.div>
                  ) : (
                    todayTasks.map((task) => (
                      <motion.div key={task._id} variants={itemVariants}>
                        <TaskCard task={task} onTaskUpdated={handleTaskUpdated} />
                      </motion.div>
                    ))
                  )}
                </motion.div>
              </motion.div>
            )}

            {/* Pending Tasks */}
            {(filter === "all" || filter === "pending") && (
              <motion.div variants={containerVariants} initial="hidden" animate="visible">
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-amber-500 rounded"></span>
                  Pending Tasks ({pendingTasks.length})
                </h2>
                <motion.div variants={containerVariants} className="space-y-3">
                  {pendingTasks.length === 0 ? (
                    <motion.div
                      variants={itemVariants}
                      className="bg-card border border-border rounded-lg p-8 text-center text-muted-foreground"
                    >
                      No pending tasks. Great job!
                    </motion.div>
                  ) : (
                    pendingTasks.map((task) => (
                      <motion.div key={task._id} variants={itemVariants}>
                        <TaskCard task={task} onTaskUpdated={handleTaskUpdated} />
                      </motion.div>
                    ))
                  )}
                </motion.div>
              </motion.div>
            )}

            {/* Completed Tasks */}
            {(filter === "all" || filter === "completed") && (
              <motion.div variants={containerVariants} initial="hidden" animate="visible">
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-green-500 rounded"></span>
                  Completed Tasks ({completedTasks.length})
                </h2>
                <motion.div variants={containerVariants} className="space-y-3">
                  {completedTasks.length === 0 ? (
                    <motion.div
                      variants={itemVariants}
                      className="bg-card border border-border rounded-lg p-8 text-center text-muted-foreground"
                    >
                      No completed tasks yet.
                    </motion.div>
                  ) : (
                    completedTasks.map((task) => (
                      <motion.div key={task._id} variants={itemVariants}>
                        <TaskCard task={task} onTaskUpdated={handleTaskUpdated} />
                      </motion.div>
                    ))
                  )}
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}