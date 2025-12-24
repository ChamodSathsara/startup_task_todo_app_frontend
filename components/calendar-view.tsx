"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Task } from "@/context/task-context"
import { motion } from "framer-motion"

interface CalendarViewProps {
  selectedDate: string
  onSelectDate: (date: string) => void
  tasks: Task[]
}

export function CalendarView({ selectedDate, onSelectDate, tasks }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date(selectedDate))

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const daysInMonth = lastDayOfMonth.getDate()
  const startingDayOfWeek = firstDayOfMonth.getDay()

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: startingDayOfWeek }, (_, i) => i)

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const getTasksForDate = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return tasks.filter((task) => task.scheduledAt === dateStr)
  }

  const isToday = (day: number) => {
    const today = new Date()
    return day === today.getDate() && month === today.getMonth() && year === today.getFullYear()
  }

  const isSelected = (day: number) => {
    return selectedDate === `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
  }

  const monthName = currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })

  return (
    <motion.div className="bg-card border border-border rounded-xl p-6 shadow-sm">
      {/* Month Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-foreground">{monthName}</h2>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={prevMonth} className="text-muted-foreground">
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={nextMonth} className="text-muted-foreground">
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center text-xs font-semibold text-muted-foreground py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-2">
        {emptyDays.map((i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}
        {days.map((day) => {
          const dayTasks = getTasksForDate(day)
          const selected = isSelected(day)
          const today = isToday(day)
          const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`

          return (
            <motion.button
              key={day}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectDate(dateStr)}
              className={`aspect-square rounded-lg p-2 text-sm font-medium transition-all flex flex-col items-center justify-center gap-1 ${
                selected
                  ? "bg-primary text-primary-foreground"
                  : today
                    ? "bg-secondary text-foreground border-2 border-primary"
                    : "bg-secondary/50 text-foreground hover:bg-secondary"
              }`}
            >
              <span>{day}</span>
              {dayTasks.length > 0 && (
                <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold bg-red-500 text-white rounded-full">
                  {dayTasks.length}
                </span>
              )}
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}
