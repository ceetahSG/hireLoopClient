"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ShieldCheck } from "lucide-react"

import logo from "@/app/images/logo.png"
import { AuthToggle } from "@/components/auth/auth-toggle"

interface AuthContainerProps {
  mode: "sign-in" | "sign-up"
  onToggle?: (mode: "sign-in" | "sign-up") => void
  children: React.ReactNode
}

export function AuthContainer({
  mode,
  onToggle,
  children,
}: AuthContainerProps) {
  return (
    <div className="relative flex min-h-svh flex-col justify-between overflow-hidden bg-[#070709] px-4 py-8 text-white sm:px-6 lg:px-8">
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-10%] left-1/2 size-[650px] -translate-x-1/2 rounded-full bg-[#5049f4]/20 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10%] bottom-[-10%] size-[500px] rounded-full bg-cyan-500/10 blur-[150px]"
      />

      {/* Top Bar: Back to Home + Logo */}
      <header className="relative z-10 mx-auto flex w-full max-w-[1240px] items-center justify-between">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-white/70 transition-all hover:border-white/20 hover:bg-white/[0.08] hover:text-white focus-visible:outline-2 focus-visible:outline-cyan-400"
        >
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to Home</span>
        </Link>

        <Link
          href="/"
          className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
          aria-label="HireLoop home"
        >
          <Image
            src={logo}
            alt="HireLoop"
            priority
            className="h-auto w-[120px] sm:w-[134px]"
          />
        </Link>
      </header>

      {/* Center Auth Card */}
      <main className="relative z-10 mx-auto my-8 w-full max-w-[480px]">
        <div className="relative rounded-3xl border border-white/10 bg-[#0d0d12]/90 p-6 shadow-2xl shadow-black/80 backdrop-blur-2xl sm:p-9">
          {/* Top Toggle Switch between Sign In and Sign Up */}
          <div className="mb-7">
            <AuthToggle mode={mode} onToggle={onToggle} />
          </div>

          {/* Form Content */}
          {children}
        </div>
      </main>

      {/* Footer reassurance */}
      <footer className="relative z-10 mx-auto flex items-center justify-center gap-2 text-center text-xs text-white/40">
        <ShieldCheck className="size-4 text-emerald-400" />
        <span>Bank-grade security & encrypted authentication</span>
      </footer>
    </div>
  )
}
