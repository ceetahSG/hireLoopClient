"use client"
import {
  Banknote,
  Bookmark,
  BriefcaseBusiness,
  CalendarDays,
  MapPin,
  Tags,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import type { JobDetailsData } from "./job-detail-data"
import { useSession } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { applyToJob } from "@/lib/actions/job"
import type { CreateJobApplication } from "@/lib/types/job-application"

// Exact tokens from the Figma "Job Details" screen
// (page #08080a, cards #141418, borders white/7%,
//  labels #a0a0ab, text/values #ededf0)

// Design pattern: "35 – 55 / mo"
const FREQUENCY_SUFFIX = {
  "per hour": "hr",
  "per day": "day",
  "per month": "mo",
  "per year": "yr",
} as const

function formatSalary(job: JobDetailsData) {
  if (!job.minSalary || !job.maxSalary) return null
  const suffix =
    FREQUENCY_SUFFIX[job.salaryFrequency as keyof typeof FREQUENCY_SUFFIX] ??
    job.salaryFrequency
  return `${job.minSalary} – ${job.maxSalary} / ${suffix}`
}

function formatDeadline(job: JobDetailsData) {
  return new Date(job.deadline).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

const CARD = "rounded-xl border border-white/[0.07] bg-[#141418]"

/* ---------- Small building blocks ---------- */

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className={`flex flex-col gap-1.5 p-4 ${CARD}`}>
      <span className="text-[#c4c7c8]">{icon}</span>
      <span className="text-xs tracking-wide text-[#a0a0ab] uppercase">
        {label}
      </span>
      <span className="text-sm font-medium text-[#ededf0]">{value}</span>
    </div>
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="text-base font-semibold text-[#ededf0]">{children}</h3>
}

function OverviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 text-sm">
      <span className="shrink-0 text-xs tracking-wide text-[#a0a0ab] uppercase">
        {label}
      </span>
      <span className="text-right text-[#ededf0]">{value}</span>
    </div>
  )
}

/* ---------- Main component ---------- */

export function JobDetails({ job }: { job: JobDetailsData }) {
  const router = useRouter()
  const salary = formatSalary(job)
  const { data: session } = useSession()
  const user = session?.user
  console.log("user:", user)

  const handleApplyNow = async () => {
    if (!user) {
      router.push(`/sign-in?redirectTo=/browse-jobs/${job._id}`)
      return
    } else if (user.role === "job_seeker") {
      if (!job._id) {
        console.error("Cannot apply: job id is missing.")
        return
      }
      const application: CreateJobApplication = {
        jobId: job._id,
        userId: user.id,
        email: user.email,
        jobTitle: job.title,
        companyName: job.companyName,
        jobType: job.jobType,
        isRemote: job.isRemote,
        location: job.location,
        appliedAt: new Date().toISOString(),
      }
      const res = await applyToJob(application)
      if (res.insertedId) {
        console.log("Application submitted successfully:", res)
        router.push("/browse-jobs")
      } else {
        console.error("Failed to submit application:", res)
      }
    } else {
      console.log("Employer or admin cannot apply for jobs.")
    }
    // TODO: Implement the apply now functionality
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 bg-[#08080a] px-4 py-8">
      {/* Header */}
      <header
        className={`flex flex-wrap items-center justify-between gap-4 p-4 ${CARD}`}
      >
        <div className="flex items-center gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-sm font-semibold text-[#ededf0]">
            {job.companyName.charAt(0) || "•"}
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-semibold text-[#ededf0]">
              {job.title}
            </h1>
            <p className="flex items-center gap-2 text-sm text-[#a0a0ab]">
              {job.companyName}
              {job.isRemote && (
                <>
                  <span className="size-1.5 rounded-full bg-green-400" />
                  <span className="text-green-400">Remote</span>
                </>
              )}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon-sm" aria-label="Save job">
            <Bookmark className="size-4" />
          </Button>
          <Button
            onClick={handleApplyNow}
            className="bg-[#fafafa] text-[#0b0b0c] hover:bg-[#fafafa]/80"
          >
            Apply Now
          </Button>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Main column */}
        <div className="flex flex-col gap-6">
          {/* Info strip */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <InfoCard
              icon={<Banknote className="size-4" />}
              label="Salary Range"
              value={salary ?? "—"}
            />
            <InfoCard
              icon={<MapPin className="size-4" />}
              label="Location"
              value={job.isRemote ? `${job.location} (Remote)` : job.location}
            />
            <InfoCard
              icon={<BriefcaseBusiness className="size-4" />}
              label="Job Type"
              value={job.jobType}
            />
            <InfoCard
              icon={<CalendarDays className="size-4" />}
              label="Deadline"
              value={formatDeadline(job)}
            />
          </div>

          {/* Content card */}
          <div className={`flex flex-col gap-6 p-6 ${CARD}`}>
            <section className="flex flex-col gap-3">
              <SectionHeading>Responsibilities</SectionHeading>
              <p className="text-sm leading-relaxed text-[#a0a0ab]">
                {job.responsibilities}
              </p>
            </section>

            <hr className="border-white/[0.07]" />

            <section className="flex flex-col gap-3">
              <SectionHeading>Requirements</SectionHeading>
              <p className="text-sm leading-relaxed text-[#a0a0ab]">
                {job.requirements}
              </p>
            </section>
          </div>
        </div>

        {/* Job overview aside */}
        <aside className={`flex h-fit flex-col gap-4 p-6 ${CARD}`}>
          <SectionHeading>Job Overview</SectionHeading>
          <div className="flex flex-col divide-y divide-white/[0.07]">
            <OverviewRow label="Company" value={job.companyName} />
            <OverviewRow label="Category" value={job.jobCategory} />
            <OverviewRow label="Job Type" value={job.jobType} />
            <OverviewRow
              label="Work Mode"
              value={job.isRemote ? "Remote" : "On-site"}
            />
            <OverviewRow label="Deadline" value={formatDeadline(job)} />
            {salary && <OverviewRow label="Salary Range" value={salary} />}
          </div>
          <Button
            className="h-11 w-full border border-white/10 bg-white/[0.04] text-[#ededf0] hover:bg-white/[0.08]"
            render={<a href={`/browse-jobs`} />}
          >
            <Tags className="size-4" />
            Browse Similar Jobs
          </Button>
        </aside>
      </div>
    </div>
  )
}
