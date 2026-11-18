import { BriefcaseBusiness } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type {
  ApplicationStatus,
  JobApplication,
} from "@/lib/types/job-application"

// Colors from the Figma status pills (bg 14% / border 30% / text full)
const STATUS_STYLES: Record<ApplicationStatus, string> = {
  applied: "bg-[#a1a4aa]/15 border-[#a1a4aa]/30 text-[#a1a4aa]",
  review: "bg-amber-500/15 border-amber-500/30 text-amber-400",
  shortlisted: "bg-blue-400/15 border-blue-400/30 text-blue-400",
  rejected: "bg-red-500/15 border-red-500/30 text-red-400",
  offered: "bg-green-500/15 border-green-500/30 text-green-400",
}

export function StatusBadge({ status }: { status: ApplicationStatus }) {
  return (
    <span
      className={`inline-flex h-7 items-center rounded-md border px-2.5 text-xs font-medium capitalize ${STATUS_STYLES[status]}`}
    >
      {status}
    </span>
  )
}

// "2 hours ago" / "1 day ago" / "2 weeks ago" like the design
function formatRelativeTime(date: string) {
  const diffMinutes = Math.round(
    (new Date(date).getTime() - Date.now()) / 60000
  )
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" })
  if (Math.abs(diffMinutes) < 60) return rtf.format(diffMinutes, "minute")
  const diffHours = Math.round(diffMinutes / 60)
  if (Math.abs(diffHours) < 24) return rtf.format(diffHours, "hour")
  const diffDays = Math.round(diffHours / 24)
  if (Math.abs(diffDays) < 7) return rtf.format(diffDays, "day")
  return rtf.format(Math.round(diffDays / 7), "week")
}

export function ApplicationsTable({
  applications,
}: {
  applications: JobApplication[]
}) {
  return (
    <Table className="min-w-3xl">
      <TableHeader>
        <TableRow>
          <TableHead className="text-xs uppercase">Job Title</TableHead>
          <TableHead className="text-xs uppercase">Company</TableHead>
          <TableHead className="text-xs uppercase">Applied</TableHead>
          <TableHead className="text-xs uppercase">Status</TableHead>
          <TableHead className="text-right text-xs uppercase">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applications.map((application) => (
          <TableRow key={application._id ?? application.jobId}>
            <TableCell>
              <div className="flex items-center gap-2.5">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  <BriefcaseBusiness className="size-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium">{application.jobTitle}</span>
                  <span className="text-xs text-muted-foreground">
                    {application.jobType} •{" "}
                    {application.isRemote ? "Remote" : "On-site"}
                  </span>
                </div>
              </div>
            </TableCell>
            <TableCell>{application.companyName}</TableCell>
            <TableCell className="text-muted-foreground">
              {formatRelativeTime(application.appliedAt)}
            </TableCell>
            <TableCell>
              <StatusBadge status={application.status ?? "applied"} />
            </TableCell>
            <TableCell className="text-right">
              {/* TODO: link to the application details view */}
              <Button size="sm" variant="secondary">
                Details
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
