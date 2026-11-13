"use client"

import { useState } from "react"

import {
  JOB_CATEGORIES,
  JOB_TYPES,
} from "@/app/dashboard/employer/add-job/add-job-form"
import { FilterGroup, type FilterOption } from "./filter-group"

// Dummy counts until they come back from the API
const JOB_TYPE_COUNTS: Record<(typeof JOB_TYPES)[number], number> = {
  "Full-time": 1200,
  "Part-time": 312,
  Contract: 432,
  Internship: 156,
}

const JOB_TYPE_OPTIONS: FilterOption[] = JOB_TYPES.map((label) => ({
  label,
  count: JOB_TYPE_COUNTS[label],
}))

const JOB_CATEGORY_OPTIONS: FilterOption[] = JOB_CATEGORIES.map(
  (category, index) => ({
    label: category,
    count: (8 - index) * 120,
  })
)

const REMOTE_OPTIONS: FilterOption[] = [{ label: "Remote Only" }]

export function BrowseJobsFilters() {
  const [jobTypes, setJobTypes] = useState<string[]>([])
  const [jobCategories, setJobCategories] = useState<string[]>([])
  const [remoteOnly, setRemoteOnly] = useState(false)

  const toggleValue = (list: string[], value: string) =>
    list.includes(value) ? list.filter((v) => v !== value) : [...list, value]

  // Handlers only flip the local selection for now —
  // no search-query/URL sync here yet (intentionally left for later).
  return (
    <aside className="flex w-full flex-col gap-5 rounded-lg border bg-card p-4">
      <h3 className="text-base font-semibold">Filters</h3>
      <FilterGroup
        title="Job Type"
        options={JOB_TYPE_OPTIONS}
        selected={jobTypes}
        onToggle={(label) => {
          setJobTypes((prev) => toggleValue(prev, label))
          // TODO: update the jobs query with the selected job types
        }}
      />
      <FilterGroup
        title="Job Category"
        options={JOB_CATEGORY_OPTIONS}
        selected={jobCategories}
        onToggle={(label) => {
          setJobCategories((prev) => toggleValue(prev, label))
          // TODO: update the jobs query with the selected categories
        }}
      />
      <FilterGroup
        title="Work Mode"
        options={REMOTE_OPTIONS}
        selected={remoteOnly ? ["Remote Only"] : []}
        onToggle={() => {
          setRemoteOnly((prev) => !prev)
          // TODO: update the jobs query with the isRemote flag
        }}
      />
    </aside>
  )
}
