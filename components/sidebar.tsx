"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, CheckSquare, Calendar, Settings, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTask } from "@/context/task-context"
import { motion } from "framer-motion"

interface SidebarProps {
  onOpenChange?: (open: boolean) => void
}

export function Sidebar({ onOpenChange }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true)
  const pathname = usePathname()
  const { user } = useTask()

  const navItems = [
    { label: "Dashboard", href: "/", icon: LayoutDashboard },
    { label: "Tasks", href: "/tasks", icon: CheckSquare },
    { label: "Calendar", href: "/calendar", icon: Calendar },
    { label: "Settings", href: "/settings", icon: Settings },
  ]

  const isActive = (href: string) => pathname === href

  const handleToggle = () => {
    const newState = !isOpen
    setIsOpen(newState)
    onOpenChange?.(newState)
  }

  return (
    <motion.aside
      initial={false}
      animate={{ width: isOpen ? 280 : 80 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border flex flex-col z-50"
    >
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
        {isOpen && <h1 className="text-xl font-bold text-sidebar-foreground">TaskTrack</h1>}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleToggle}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {isOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)
          return (
            <Link className="" key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className={`w-full justify-start  ${
                  active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary py-6 mb-2"
                    : "text-sidebar-foreground hover:bg-sidebar-accent py-6 mb-2"
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {isOpen && <span className="ml-3">{item.label}</span>}
              </Button>
            </Link>
          )
        })}
      </nav>

     
    </motion.aside>
  )
}
