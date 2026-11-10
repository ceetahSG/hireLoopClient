import {
  BriefcaseBusiness,
  Eye,
  MapPin,
  Pencil,
  Trash2,
  UserRound,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { JobListData } from "./dummy-jobs"

const JOB_TYPE_LABEL = {
  "Full-time": "secondary",
  "Part-time": "outline",
  Contract: "outline",
  Internship: "outline",
} as const

// Figma: "€25 – €40 / hr" for hourly, "€90k – €115k / yr" for yearly
const FREQUENCY_SUFFIX = {
  "per hour": "hr",
  "per day": "day",
  "per month": "mo",
  "per year": "yr",
} as const

function formatSalary(job: JobListData) {
  if (!job.minSalary || !job.maxSalary) return "—"
  const suffix =
    FREQUENCY_SUFFIX[job.salaryFrequency as keyof typeof FREQUENCY_SUFFIX] ??
    job.salaryFrequency
  const unit: "" | "k" = suffix === "yr" ? "k" : ""
  return `€${job.minSalary}${unit} – €${job.maxSalary}${unit} / ${suffix}`
}

function isExpired(job: JobListData) {
  return new Date(job.deadline) < new Date()
}

function formatDeadline(job: JobListData) {
  return new Date(job.deadline).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export function ManageJobsTable({ jobs }: { jobs: JobListData[] }) {
  return (
    <Table className="min-w-4xl">
      <TableHeader>
        <TableRow>
          <TableHead className="size-10 text-xs uppercase">
            Job Title & Dept
          </TableHead>
          <TableHead className="text-xs uppercase">
            Company & Location
          </TableHead>
          <TableHead className="text-xs uppercase">Type</TableHead>
          <TableHead className="text-xs uppercase">Compensation</TableHead>
          <TableHead className="text-xs uppercase">Applicants</TableHead>
          <TableHead className="text-xs uppercase">Status</TableHead>
          <TableHead className="text-xs uppercase">Deadline</TableHead>
          <TableHead className="text-right text-xs uppercase">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobs.map((job) => {
          const expired = isExpired(job)
          return (
            <TableRow key={job.title}>
              <TableCell>
                <div className="flex items-center gap-2.5">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                    <BriefcaseBusiness className="size-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium">{job.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {job.jobCategory}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <span className="font-medium">{job.companyName}</span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="size-3" />
                    {job.location}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={JOB_TYPE_LABEL[job.jobType]}>
                  {job.jobType}
                </Badge>
              </TableCell>
              <TableCell className="whitespace-nowrap tabular-nums">
                {formatSalary(job)}
              </TableCell>
              <TableCell>
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <UserRound className="size-3.5" />
                  {job.applicants} Candidates
                </span>
              </TableCell>
              <TableCell>
                <Badge variant={expired ? "destructive" : "default"}>
                  {expired ? "Expired" : "Active"}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="whitespace-nowrap tabular-nums">
                    {formatDeadline(job)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {expired ? "Closed" : job.postedAgo}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <Button size="sm" variant="secondary">
                    <Pencil data-icon="inline-start" />
                    Update
                  </Button>
                  <Button size="icon-sm" variant="ghost" aria-label="View job">
                    <Eye />
                  </Button>
                  <Button
                    size="icon-sm"
                    variant="ghost"
                    aria-label="Delete job"
                  >
                    <Trash2 />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
