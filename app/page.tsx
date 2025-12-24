"use client"

import { MainLayout } from "@/components/main-layout"
import { useTask } from "@/context/task-context"
import { CheckCircle2, Clock, Zap } from "lucide-react"
import { motion } from "framer-motion"
import { useIsMobile } from "@/hooks/use-mobile"

export default function Dashboard() {
  const { tasks } = useTask()
  const isMobile = useIsMobile()
  const pendingTasks = tasks.filter((t) => t.status === "Pending").length
  const completedTasks = tasks.filter((t) => t.status === "Completed").length
  const totalTasks = tasks.length

  const stats = [
    { label: "Total Tasks", value: totalTasks, icon: Clock },
    { label: "Pending", value: pendingTasks, icon: Zap },
    { label: "Completed", value: completedTasks, icon: CheckCircle2 },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5">
        {isMobile && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="px-6 py-6 text-center border-b border-border"
          >
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              TackTrack
            </h1>
          </motion.div>
        )}

        {/* Hero Banner Section */}
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 px-6 md:px-8 py-4 md:py-16 rounded-2xl mx-6 md:mx-8 mt-6 md:mt-8 shadow-lg"
        >
          <div className="max-w-4xl">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">Organize your time for more productive</h2>
            <p className="text-white/90 text-base md:text-lg hidden md:block">
              Stay focused and achieve your goals with our task tracker
            </p>
          </div>
        </motion.section>

        {/* Stats Section */}
        <motion.section initial="hidden" animate="visible" variants={containerVariants} className="px-6 md:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">{stat.label}</p>
                      <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        <motion.section initial="hidden" animate="visible" variants={containerVariants} className="px-6 md:px-8 py-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-6">Recent Tasks</h2>

            {tasks.length === 0 ? (
              <motion.div variants={itemVariants} className="bg-card border border-border rounded-xl p-12 text-center">
                <p className="text-muted-foreground mb-4">No tasks yet. Create your first task to get started!</p>
              </motion.div>
            ) : (
              <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pending Tasks Column */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <span className="w-1 h-5 bg-amber-500 rounded"></span>
                    Pending
                  </h3>
                  <motion.div variants={containerVariants} className="space-y-3">
                    {tasks.filter((t) => t.status === "Pending").length === 0 ? (
                      <motion.div
                        variants={itemVariants}
                        className="bg-secondary/50 rounded-lg p-6 text-center text-muted-foreground text-sm"
                      >
                        No pending tasks
                      </motion.div>
                    ) : (
                      tasks
                        .filter((t) => t.status === "Pending")
                        .slice(0, 3)
                        .map((task) => (
                          <motion.div
                            key={task._id}
                            variants={itemVariants}
                            className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
                          >
                            <p className="font-semibold text-foreground text-sm">{task.title}</p>
                            {task.description && (
                              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{task.description}</p>
                            )}
                            {task.createdAt && (
                              <p className="text-xs text-muted-foreground mt-2">
                                {new Date(task.createdAt).toLocaleDateString()}
                                {task.createdAt && ` at ${task.createdAt}`}
                              </p>
                            )}
                          </motion.div>
                        ))
                    )}
                  </motion.div>
                </div>

                {/* Completed Tasks Column */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <span className="w-1 h-5 bg-green-500 rounded"></span>
                    Completed
                  </h3>
                  <motion.div variants={containerVariants} className="space-y-3">
                    {tasks.filter((t) => t.status === "Completed").length === 0 ? (
                      <motion.div
                        variants={itemVariants}
                        className="bg-secondary/50 rounded-lg p-6 text-center text-muted-foreground text-sm"
                      >
                        No completed tasks
                      </motion.div>
                    ) : (
                      tasks
                        .filter((t) => t.status === "Completed")
                        .slice(0, 3)
                        .map((task) => (
                          <motion.div
                            key={task._id}
                            variants={itemVariants}
                            className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow opacity-75"
                          >
                            <p className="font-semibold text-foreground text-sm line-through">{task.title}</p>
                            {task.description && (
                              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{task.description}</p>
                            )}
                            {task.createdAt && (
                              <p className="text-xs text-muted-foreground mt-2">
                                {new Date(task.createdAt).toLocaleDateString()}
                                {task.createdAt && ` at ${task.createdAt}`}
                              </p>
                            )}
                          </motion.div>
                        ))
                    )}
                  </motion.div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.section>
      </div>
    </MainLayout>
  )
}
