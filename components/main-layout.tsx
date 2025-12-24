"use client"

import type React from "react"

import { Sidebar } from "@/components/sidebar"
import { MobileNav } from "@/components/mobile-nav"
import { useIsMobile } from "@/hooks/use-mobile"
import { useState } from "react"
import { motion } from "framer-motion"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const isMobile = useIsMobile()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-background">

      {/* desktop sidebar eka  */}
      {!isMobile && <Sidebar onOpenChange={setSidebarOpen} />}
      <motion.main
        initial={false}
        animate={{
          marginLeft: isMobile ? 0 : sidebarOpen ? 280 : 80,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="min-h-screen pb-20 md:pb-0 flex flex-col items-center"
      >
        <div className="w-full max-w-7xl px-4">{children}</div>
      </motion.main>

       {/* mobile sidebar eka  */}
      {isMobile && <MobileNav />}
    </div>
  )
}
