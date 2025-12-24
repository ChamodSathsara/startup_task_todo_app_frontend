"use client"

import type React from "react"

import { useState } from "react"
import { MainLayout } from "@/components/main-layout"
import { useTask } from "@/context/task-context"
import { motion } from "framer-motion"
import { Moon, Sun, Lock, User, Mail, Save, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SettingsPage() {
  const { user, setUser } = useTask()
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [username, setUsername] = useState(user?.username || "")
  const [email, setEmail] = useState(user?.email || "")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [savedStatus, setSavedStatus] = useState<"idle" | "saving" | "success" | "error">("idle")

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    if (isDarkMode) {
      document.documentElement.classList.remove("dark")
    } else {
      document.documentElement.classList.add("dark")
    }
  }

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setSavedStatus("saving")
    setIsSaving(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800))

    if (user) {
      setUser({ ...user, username, email })
    }

    setSavedStatus("success")
    setIsSaving(false)

    setTimeout(() => setSavedStatus("idle"), 2000)
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setSavedStatus("error")
      setTimeout(() => setSavedStatus("idle"), 2000)
      return
    }

    setSavedStatus("saving")
    setIsSaving(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800))

    setSavedStatus("success")
    setPassword("")
    setConfirmPassword("")
    setIsSaving(false)

    setTimeout(() => setSavedStatus("idle"), 2000)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5">
        {/* Header */}
        <div className="sticky top-0 bg-background/95 backdrop-blur border-b border-border z-40">
          <div className="px-6 md:px-8 py-6">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Settings</h1>
          </div>
        </div>

        <div className="px-6 md:px-8 py-8">
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="max-w-2xl space-y-8">
            {/* Theme Settings */}
            <motion.div variants={itemVariants} className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Sun className="w-5 h-5 text-primary" />
                Appearance
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                    <div>
                      <p className="font-medium text-foreground">Dark Mode</p>
                      <p className="text-sm text-muted-foreground">Toggle between light and dark theme</p>
                    </div>
                  </div>
                  <button
                    onClick={toggleTheme}
                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                      isDarkMode ? "bg-primary" : "bg-muted"
                    }`}
                  >
                    <span
                      className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                        isDarkMode ? "translate-x-7" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Profile Settings */}
            <motion.div variants={itemVariants} className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Profile Settings
              </h2>

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                  <div className="flex gap-2">
                    <Mail className="w-5 h-5 text-muted-foreground mt-2.5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={isSaving}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    {isSaving ? "Saving..." : "Save Profile"}
                  </Button>
                </div>

                {savedStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-lg bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 text-sm font-medium"
                  >
                    Profile saved successfully!
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* Security Settings */}
            <motion.div variants={itemVariants} className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Lock className="w-5 h-5 text-primary" />
                Security
              </h2>

              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">New Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter new password"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Confirm password"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={isSaving || !password || !confirmPassword}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                  >
                    {isSaving ? "Updating..." : "Update Password"}
                  </Button>
                </div>

                {savedStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-lg bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 text-sm font-medium"
                  >
                    Passwords do not match!
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* Danger Zone */}
            <motion.div variants={itemVariants} className="bg-card border border-destructive rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-destructive mb-4">Danger Zone</h2>
              <p className="text-sm text-muted-foreground mb-4">Once you logout, you cannot access this account.</p>
              <Button
                variant="destructive"
                className="w-full bg-destructive text-destructive-foreground hover:bg-destructive/90 flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  )
}
