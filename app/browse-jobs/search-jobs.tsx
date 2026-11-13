"use client"

import { useState } from "react"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SearchJobs() {
  const [query, setQuery] = useState("")

  // Search submit intentionally does nothing for now —
  // no search-query/URL sync here yet (intentionally left for later).
  return (
    <form
      className="flex flex-col gap-2 sm:flex-row"
      onSubmit={(event) => {
        event.preventDefault()
        
        // TODO: update the jobs query with the search term
      }}
    >
      <div className="relative flex-1">
        <Input
          aria-label="Search jobs"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by job title, keywords..."
          className="h-9 pr-10"
        />
        <Search className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" />
      </div>
      <Button type="submit" size="lg">
        Search Jobs
      </Button>
    </form>
  )
}
