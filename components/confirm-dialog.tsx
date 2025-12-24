"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

interface ConfirmDialogProps {
  isOpen: boolean
  title: string
  description: string
  onConfirm: () => void
  onCancel: () => void
  confirmText?: string
  confirmVariant?: "default" | "destructive"
  isLoading?: boolean
}

export function ConfirmDialog({
  isOpen,
  title,
  description,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  confirmVariant = "default",
  isLoading = false,
}: ConfirmDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="fixed inset-0 bg-black/50 z-40"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card border border-border rounded-xl p-6 w-full max-w-md z-50 shadow-xl"
          >
            <h2 className="text-xl font-bold text-foreground mb-2">{title}</h2>
            <p className="text-muted-foreground mb-6">{description}</p>

            <div className="flex gap-3">
              <Button
                onClick={onConfirm}
                disabled={isLoading}
                variant={confirmVariant === "destructive" ? "destructive" : "default"}
                className="flex-1"
              >
                {isLoading ? "Processing..." : confirmText}
              </Button>
              <Button onClick={onCancel} variant="outline" className="flex-1 bg-transparent">
                Cancel
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
