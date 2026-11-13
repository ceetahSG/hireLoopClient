"use client"

import { useState } from "react"
import { Banknote, Bookmark, CircleCheck, Flame, Zap } from "lucide-react"

import type { JobFormData } from "@/app/dashboard/employer/add-job/add-job-form"
import { cn } from "@/lib/utils"

export type JobCardData = Pick<
  JobFormData,
  | "title"
  | "companyName"
  | "jobType"
  | "isRemote"
  | "location"
  | "minSalary"
  | "maxSalary"
  | "salaryFrequency"
> & {
  easyApply?: boolean
  hotJob?: boolean
}

// Design: "$140k - $180k" yearly, "$25 - $40 / hr" hourly
function formatSalary(job: JobCardData) {
  if (!job.minSalary || !job.maxSalary) return null
  if (job.salaryFrequency === "per year") {
    return `$${job.minSalary}k - $${job.maxSalary}k`
  }
  if (job.salaryFrequency === "per hour") {
    return `$${job.minSalary} - $${job.maxSalary} / hr`
  }
  if (job.salaryFrequency === "per day") {
    return `$${job.minSalary} - $${job.maxSalary} / day`
  }
  return `$${job.minSalary} - $${job.maxSalary} / mo`
}

type PillVariant = "default" | "easy" | "hot"

function Pill({
  icon,
  variant = "default",
  children,
}: {
  icon: React.ReactNode
  variant?: PillVariant
  children: React.ReactNode
}) {
  return (
    <span
      className={cn(
        "inline-flex h-7 items-center gap-1.5 rounded-md border px-2.5 text-xs font-medium",
        {
          default: "border-border bg-secondary/60 text-foreground/80",
          easy: "border-green-500/30 bg-green-500/10 text-green-400",
          hot: "border-amber-500/30 bg-amber-500/10 text-amber-400",
        }[variant]
      )}
    >
      {icon}
      {children}
    </span>
  )
}

export function JobCard({ job }: { job: JobCardData }) {
  const [saved, setSaved] = useState(false)

  const salary = formatSalary(job)

  return (
    <article className="flex gap-4 rounded-xl border bg-card p-4 transition-colors hover:border-white/20">
      {/* Company logo */}
      <div className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.02] text-sm font-semibold">
        {job.companyName.charAt(0) || "•"}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 flex-col gap-0.5">
            <h3 className="truncate text-base font-semibold">{job.title}</h3>
            <p className="truncate text-sm text-muted-foreground">
              {job.companyName} • {job.location}
              {job.isRemote ? " (Remote)" : ""}
            </p>
          </div>
          <button
            type="button"
            aria-label={saved ? "Remove bookmark" : "Save job"}
            aria-pressed={saved}
            onClick={() => setSaved((prev) => !prev)}
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground"
          >
            <Bookmark className={cn("size-4", saved && "fill-current")} />
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {salary && (
            <Pill icon={<Banknote className="size-3.5" />}>{salary}</Pill>
          )}
          <Pill icon={<CircleCheck className="size-3.5" />}>{job.jobType}</Pill>
          {job.easyApply && (
            <Pill variant="easy" icon={<Zap className="size-3.5" />}>
              Easy Apply
            </Pill>
          )}
          {job.hotJob && (
            <Pill variant="hot" icon={<Flame className="size-3.5" />}>
              Hot Job
            </Pill>
          )}
        </div>
      </div>
    </article>
  )
}
