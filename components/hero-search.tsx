"use client"

import { MapPin, Search } from "lucide-react"

import { Button } from "@/components/ui/button"

export function HeroSearchForm() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const formData = Object.fromEntries(data.entries())
    console.log("Form submitted:", formData)
    // Handle form submission logic here
  }
  return (
    <form
      role="search"
      aria-label="Job search"
      className="flex h-16 w-full items-center rounded-2xl border border-white/20 bg-[#101010] pr-2 pl-6"
      onSubmit={handleSubmit}
    >
      <div className="flex min-w-0 flex-1 items-center gap-2.5">
        <Search className="size-6 shrink-0 text-white" aria-hidden="true" />
        <input
          type="search"
          name="query"
          placeholder="Job title, skill or company"
          autoComplete="off"
          aria-required="false"
          className="min-w-0 flex-1 bg-transparent text-base text-white outline-none placeholder:text-white/50"
        />
      </div>
      <span
        aria-hidden="true"
        className="mx-5 hidden h-6 w-px shrink-0 bg-white/40 sm:block"
      />
      <div className="hidden w-[280px] items-center gap-2.5 sm:flex">
        <MapPin className="size-6 shrink-0 text-white" aria-hidden="true" />
        <input
          type="text"
          name="location"
          placeholder="Location or Remote"
          autoComplete="off"
          className="w-full bg-transparent text-base text-white outline-none placeholder:text-white/50"
        />
      </div>
      <Button
        type="submit"
        size="icon"
        aria-label="Search"
        className="size-12 shrink-0 rounded-xl bg-[#5c53fe] text-white hover:bg-[#6f66ff] [&_svg]:size-6"
      >
        <Search />
      </Button>
    </form>
  )
}
