"use client";

import { MainLayout } from "@/components/main-layout";
import { useTask } from "@/context/task-context";
import { CheckCircle2, Clock, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { TaskCard } from "@/components/task-card";

export default function Dashboard() {
  const { tasks } = useTask();
  const isMobile = useIsMobile();
  const today = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD

  const pendingTasks = tasks.filter(
    (t) =>
      t.status === "Pending" &&
      new Date(t.scheduledAt).toLocaleDateString("en-CA") === today
  ).length;

  const completedTasks = tasks.filter(
    (t) =>
      t.status === "Completed" &&
      new Date(t.scheduledAt).toLocaleDateString("en-CA") === today
  ).length;

  const totalTasks = tasks.length;

  console.log(completedTasks, pendingTasks);

  const stats = [
    { label: "Total Tasks", value: totalTasks, icon: Clock },
    { label: "Pending", value: pendingTasks, icon: Zap },
    { label: "Completed", value: completedTasks, icon: CheckCircle2 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

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
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">
              Organize your time for more productive
            </h2>
            <p className="text-white/90 text-base md:text-lg hidden md:block">
              Stay focused and achieve your goals with our task tracker
            </p>
          </div>
        </motion.section>

        {/* Stats Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="px-6 md:px-8 py-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">
                        {stat.label}
                      </p>
                      <p className="text-3xl font-bold text-foreground">
                        {stat.value}
                      </p>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Recent Tasks Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="px-6 md:px-8 py-12"
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Recent Tasks
            </h2>

            {tasks.length === 0 ? (
              <motion.div
                variants={itemVariants}
                className="bg-card border border-border rounded-xl p-12 text-center"
              >
                <p className="text-muted-foreground mb-4">
                  No tasks yet. Create your first task to get started!
                </p>
              </motion.div>
            ) : (
              <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {/* Pending Tasks Column */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <span className="w-1 h-5 bg-amber-500 rounded"></span>
                    Pending
                    <span className="ml-auto text-xs font-normal bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2.5 py-1 rounded-full">
                      {
                        tasks.filter(
                          (t) =>
                            t.status === "Pending" &&
                            new Date(t.scheduledAt).toLocaleDateString(
                              "en-CA"
                            ) === today
                        ).length
                      }
                    </span>
                  </h3>
                  <motion.div
                    variants={containerVariants}
                    className="space-y-3"
                  >
                    {tasks.filter(
                      (t) =>
                        t.status === "Pending" &&
                        new Date(t.scheduledAt).toLocaleDateString("en-CA") ===
                          today
                    ).length === 0 ? (
                      <motion.div
                        variants={itemVariants}
                        className="bg-secondary/30 border border-dashed border-border rounded-lg p-8 text-center"
                      >
                        <div className="flex flex-col items-center gap-2">
                          <svg
                            className="w-10 h-10 text-muted-foreground/40"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                            />
                          </svg>
                          <p className="text-muted-foreground text-sm font-medium">
                            No pending tasks
                          </p>
                          <p className="text-muted-foreground/60 text-xs">
                            Great job! You're all caught up
                          </p>
                        </div>
                      </motion.div>
                    ) : (
                      tasks
                        .filter(
                          (t) =>
                            t.status === "Pending" &&
                            new Date(t.scheduledAt).toLocaleDateString(
                              "en-CA"
                            ) === today
                        )
                        .slice(0, 3)
                        .map((task) => (
                          <motion.div key={task._id} variants={itemVariants}>
                            <TaskCard task={task} />
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
                    <span className="ml-auto text-xs font-normal bg-green-500/10 text-green-600 dark:text-green-400 px-2.5 py-1 rounded-full">
                      {
                        tasks.filter(
                          (t) =>
                            t.status === "Completed" &&
                            new Date(t.scheduledAt).toLocaleDateString(
                              "en-CA"
                            ) === today
                        ).length
                      }
                    </span>
                  </h3>
                  <motion.div
                    variants={containerVariants}
                    className="space-y-3"
                  >
                    {tasks.filter(
                      (t) =>
                        t.status === "Completed" &&
                        new Date(t.scheduledAt).toLocaleDateString("en-CA") ===
                          today
                    ).length === 0 ? (
                      <motion.div
                        variants={itemVariants}
                        className="bg-secondary/30 border border-dashed border-border rounded-lg p-8 text-center"
                      >
                        <div className="flex flex-col items-center gap-2">
                          <svg
                            className="w-10 h-10 text-muted-foreground/40"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <p className="text-muted-foreground text-sm font-medium">
                            No completed tasks
                          </p>
                          <p className="text-muted-foreground/60 text-xs">
                            Complete tasks to see them here
                          </p>
                        </div>
                      </motion.div>
                    ) : (
                      tasks
                        .filter(
                          (t) =>
                            t.status === "Completed" &&
                            new Date(t.scheduledAt).toLocaleDateString(
                              "en-CA"
                            ) === today
                        )
                        .slice(0, 3)
                        .map((task) => (
                          <motion.div key={task._id} variants={itemVariants}>
                            <TaskCard task={task} />
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
  );
}
