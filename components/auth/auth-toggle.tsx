"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

interface AuthToggleProps {
  mode: "sign-in" | "sign-up"
  onToggle?: (mode: "sign-in" | "sign-up") => void
  className?: string
}

export function AuthToggle({ mode, onToggle, className }: AuthToggleProps) {
  return (
    <div
      role="tablist"
      aria-label="Authentication mode"
      className={cn(
        "relative grid grid-cols-2 rounded-2xl border border-white/10 bg-white/[0.04] p-1.5 backdrop-blur-md",
        className
      )}
    >
      <Link
        href="/sign-in"
        role="tab"
        aria-selected={mode === "sign-in"}
        onClick={(e) => {
          if (onToggle) {
            e.preventDefault()
            onToggle("sign-in")
          }
        }}
        className={cn(
          "flex items-center justify-center rounded-xl py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400",
          mode === "sign-in"
            ? "bg-white text-[#070709] shadow-lg shadow-black/30"
            : "text-white/65 hover:bg-white/[0.04] hover:text-white"
        )}
      >
        Sign In
      </Link>
      <Link
        href="/sign-up"
        role="tab"
        aria-selected={mode === "sign-up"}
        onClick={(e) => {
          if (onToggle) {
            e.preventDefault()
            onToggle("sign-up")
          }
        }}
        className={cn(
          "flex items-center justify-center rounded-xl py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400",
          mode === "sign-up"
            ? "bg-white text-[#070709] shadow-lg shadow-black/30"
            : "text-white/65 hover:bg-white/[0.04] hover:text-white"
        )}
      >
        Sign Up
      </Link>
    </div>
  )
}
