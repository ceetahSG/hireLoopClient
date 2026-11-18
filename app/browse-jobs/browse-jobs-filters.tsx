"use client"

import {
  JOB_CATEGORIES,
  JOB_TYPES,
} from "@/app/dashboard/employer/add-job/add-job-form"
import { FilterGroup, type FilterOption } from "./filter-group"
import { useRouter, useSearchParams } from "next/navigation"

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
  const router = useRouter()
  const searchParams = useSearchParams()
  const jobTypes = searchParams.get("jobType")?.split(",").filter(Boolean) ?? []
  const jobCategories =
    searchParams.get("category")?.split(",").filter(Boolean) ?? []
  const remoteOnly = searchParams.get("isRemote") === "true"

  const toggleValue = (list: string[], value: string) =>
    list.includes(value) ? list.filter((v) => v !== value) : [...list, value]

  const updateUrl = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }

    const query = params.toString()
    router.push(query ? `/browse-jobs?${query}` : "/browse-jobs")
  }

  return (
    <aside className="flex w-full flex-col gap-5 rounded-lg border bg-card p-4">
      <h3 className="text-base font-semibold">Filters</h3>
      <FilterGroup
        title="Job Type"
        options={JOB_TYPE_OPTIONS}
        selected={jobTypes}
        onToggle={(label, checked) => {
          const next = checked
            ? toggleValue(jobTypes, label)
            : jobTypes.filter((value) => value !== label)
          updateUrl("jobType", next.length ? next.join(",") : null)
        }}
      />
      <FilterGroup
        title="Job Category"
        options={JOB_CATEGORY_OPTIONS}
        selected={jobCategories}
        onToggle={(label, checked) => {
          const next = checked
            ? toggleValue(jobCategories, label)
            : jobCategories.filter((value) => value !== label)
          updateUrl("category", next.length ? next.join(",") : null)
        }}
      />
      <FilterGroup
        title="Work Mode"
        options={REMOTE_OPTIONS}
        selected={remoteOnly ? ["Remote Only"] : []}
        onToggle={(_label, checked) => {
          updateUrl("isRemote", checked ? "true" : null)
        }}
      />
    </aside>
  )
}
