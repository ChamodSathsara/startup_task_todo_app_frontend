"use client"

import { useState } from "react"
import { MainLayout } from "@/components/main-layout"
import { CalendarView } from "@/components/calendar-view"
import { DayTasksView } from "@/components/day-tasks-view"
import { useTask } from "@/context/task-context"
import { motion } from "framer-motion"
import { se } from "date-fns/locale"

export default function CalendarPage() {
  const today = new Date().toISOString().split("T")[0]
  const [selectedDate, setSelectedDate] = useState(today)
  const { tasks } = useTask()

  const tasksForSelectedDate = tasks.filter(task => {
  const taskDate = new Date(task.createdAt)
    .toLocaleDateString("en-CA"); // YYYY-MM-DD
  return taskDate === selectedDate;
});
  console.log(selectedDate);
  console.log(tasks)
  console.log(tasksForSelectedDate);

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5">
        {/* Header */}
        <div className="sticky top-0 bg-background/95 backdrop-blur border-b border-border z-40">
          <div className="px-6 md:px-8 py-6">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Calendar</h1>
          </div>
        </div>

        <div className="px-6 md:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calendar */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <CalendarView selectedDate={selectedDate} onSelectDate={setSelectedDate} tasks={tasks} />
            </motion.div>

            {/* Day Tasks View */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2"
            >
              <DayTasksView date={selectedDate} tasks={tasksForSelectedDate} />
            </motion.div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
