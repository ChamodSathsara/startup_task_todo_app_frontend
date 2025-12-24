"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, CheckSquare, Calendar, Settings, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AddTaskModal } from "@/components/add-task-modal"

export function MobileNav() {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { label: "Dashboard", href: "/", icon: LayoutDashboard },
    { label: "Tasks", href: "/tasks", icon: CheckSquare },
    { label: "Calendar", href: "/calendar", icon: Calendar },
    { label: "Settings", href: "/settings", icon: Settings },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <>
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border flex justify-around items-center h-20 md:hidden z-50">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)
          return (
            <Link key={item.href} href={item.href}>
              <Button variant="ghost" size="icon" className={`${active ? "text-primary" : "text-muted-foreground"}`}>
                <Icon className="w-6 h-6" />
              </Button>
            </Link>
          )
        })}
      </nav>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsAddTaskOpen(true)}
        className="fixed bottom-24 right-6 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center md:hidden z-40 hover:shadow-xl transition-shadow"
      >
        <Plus className="w-6 h-6" />
      </button>

      <AddTaskModal isOpen={isAddTaskOpen} onClose={() => setIsAddTaskOpen(false)} />
    </>
  )
}
