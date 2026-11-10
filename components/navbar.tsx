"use client"

import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useState } from "react"

import logo from "@/app/images/logo.png"
import { signOut, useSession } from "@/lib/auth-client"
import { Button } from "@base-ui/react"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session } = useSession()

  console.log("Session data in Navbar:", session?.user.role) // Debugging line

  const links = [
    { label: "Find talent", href: "#talent" },
    { label: "Find work", href: "#work" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Resources", href: "#resources" },
    {
      label: "Dashboard",
      href: `/dashboard/${session?.user?.role || "job_seeker"}`,
    },
  ]
  const handleLogout = async () => {
    await signOut()
  }
  return (
    <header className="relative z-50 border-b border-white/10 bg-[#070709]/95 text-white backdrop-blur-xl">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-[76px] max-w-[1240px] items-center justify-between px-5 sm:px-8 lg:px-10"
      >
        <Link
          href="/"
          className="shrink-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
          aria-label="HireLoop home"
        >
          <Image
            src={logo}
            alt="HireLoop"
            priority
            className="h-auto w-[126px] sm:w-[138px]"
          />
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13px] font-medium tracking-wide text-white/65 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          {session?.user ? (
            <span className="text-sm font-medium text-white/80">
              Welcome, {session.user.name}
              <Button
                onClick={handleLogout}
                className="rounded-full px-4 py-2.5 text-[13px] font-medium text-white/75 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
              >
                Sign Out
              </Button>
            </span>
          ) : (
            <>
              {" "}
              <Link
                href="/sign-in"
                className="rounded-full px-4 py-2.5 text-[13px] font-medium text-white/75 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
              >
                Log in
              </Link>
              <Link
                href="/sign-up"
                className="rounded-full bg-white px-5 py-2.5 text-[13px] font-semibold text-[#101014] transition-colors hover:bg-cyan-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
              >
                Get started
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          aria-label={
            isMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
          className="rounded-md p-2 text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 lg:hidden"
        >
          {isMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {isMenuOpen && (
        <div className="absolute inset-x-0 top-full border-b border-white/10 bg-[#0b0b0e] px-5 py-5 shadow-2xl shadow-black/30 lg:hidden">
          <div className="mx-auto flex max-w-[1240px] flex-col">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="border-b border-white/10 py-4 text-sm font-medium text-white/75 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-cyan-400"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-3 pt-5">
              <Link
                href="/sign-in"
                onClick={() => setIsMenuOpen(false)}
                className="flex-1 rounded-full border border-white/15 px-5 py-3 text-center text-sm font-medium text-white/80 transition-colors hover:border-white/30 hover:text-white"
              >
                Log in
              </Link>
              <Link
                href="/sign-up"
                onClick={() => setIsMenuOpen(false)}
                className="flex-1 rounded-full bg-white px-5 py-3 text-center text-sm font-semibold text-[#101014] transition-colors hover:bg-cyan-100"
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
