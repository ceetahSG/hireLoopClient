"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { JobApplication } from "@/lib/types/job-application"
import { ApplicationsTable } from "./applications-table"

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-lg border bg-card p-4">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-2xl font-semibold">{value}</span>
    </div>
  )
}

export function ApplicationsView({
  applications,
}: {
  applications: JobApplication[]
}) {
  const [tab, setTab] = useState<"active" | "archived">("active")

  const filtered = applications.filter(
    (application) => application.isArchived === (tab === "archived")
  )

  const total = applications.length
  const stats = [
    { label: "Total Applied", value: String(total) },
    {
      label: "Shortlisted",
      value: String(
        applications.filter((a) => a.status === "shortlisted").length
      ),
    },
    {
      label: "Interviews",
      value: String(applications.filter((a) => a.status === "review").length),
    },
    {
      label: "Success Rate",
      value: `${Math.round(
        (applications.filter(
          (a) => a.status === "shortlisted" || a.status === "offered"
        ).length /
          total) *
          100
      )}%`,
    },
  ]

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold">My Applications</h2>
          <p className="text-sm text-muted-foreground">
            Track your job applications and interview progress in real-time.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border p-1">
            {(["active", "archived"] as const).map((value) => (
              <Button
                key={value}
                size="sm"
                variant="ghost"
                aria-pressed={tab === value}
                className={
                  tab === value ? "bg-secondary text-foreground" : undefined
                }
                onClick={() => setTab(value)}
              >
                {value === "active" ? "Active" : "Archived"}
              </Button>
            ))}
          </div>
          <Button
            variant="outline"
            onClick={() => {
              // TODO: generate and download the applications PDF
            }}
          >
            <Download data-icon="inline-start" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Table */}
      <div className="rounded-xl border bg-card p-2">
        <ApplicationsTable applications={filtered} />
      </div>

      {/* Pagination footer */}
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          Showing 1-{filtered.length} of {total} applications
        </p>
        <div className="flex items-center gap-1">
          <Button size="icon-sm" variant="outline" aria-label="Previous page">
            <ArrowLeft className="size-4" />
          </Button>
          <Button size="icon-sm" variant="outline" aria-label="Next page">
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
