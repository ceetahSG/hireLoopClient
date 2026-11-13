"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const SORT_OPTIONS = [
  "Most Recent",
  "Oldest First",
  "Salary: High to Low",
  "Salary: Low to High",
] as const

export function SortJobs() {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground">Sort by:</span>
      <Select defaultValue="Most Recent">
        <SelectTrigger size="sm" aria-label="Sort jobs" className="min-w-36">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
