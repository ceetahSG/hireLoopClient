"use client"

import { useState, type FormEvent } from "react"
import { ChevronRight, Globe, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { createJob } from "@/lib/actions/job"

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"] as const

const JOB_CATEGORIES = [
  "Engineering & Tech",
  "Design",
  "Product",
  "Marketing",
  "Sales",
  "Customer Support",
  "Finance",
  "Other",
] as const

const SALARY_FREQUENCIES = [
  "per hour",
  "per day",
  "per month",
  "per year",
] as const

export type JobFormData = {
  title: string
  companyName: string
  jobCategory: string
  jobType: (typeof JOB_TYPES)[number]
  isRemote: boolean
  location: string
  deadline: string
  minSalary: string
  maxSalary: string
  salaryFrequency: string
  responsibilities: string
  requirements: string
}

const INITIAL_JOB_DATA: JobFormData = {
  title: "",
  companyName: "",
  jobCategory: "",
  jobType: "Full-time",
  isRemote: false,
  location: "",
  deadline: "",
  minSalary: "",
  maxSalary: "",
  salaryFrequency: "per hour",
  responsibilities: "",
  requirements: "",
}

export function AddJobForm() {
  const [job, setJob] = useState<JobFormData>(INITIAL_JOB_DATA)

  const update = <K extends keyof JobFormData>(
    key: K,
    value: JobFormData[K]
  ) => {
    setJob((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log("New job data:", job)
    const result = await createJob(job)
    if (result.acknowledged) {
      alert("Job created successfully!")
      setJob(INITIAL_JOB_DATA) // Reset the form after successful submission
    } else {
      alert("Failed to create job. Please try again.")
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Top bar */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <nav className="flex items-center gap-1 text-sm text-muted-foreground">
            <a
              href="/dashboard/employer/manage-jobs"
              className="hover:text-foreground"
            >
              Manage Jobs
            </a>
            <ChevronRight className="size-3.5" />
            <span className="text-foreground">Create New Listing</span>
          </nav>
          <h1 className="text-2xl font-semibold">Post a New Job</h1>
          <p className="text-sm text-muted-foreground">
            Fill in the position specifications to attract qualified talent
            across our network.
          </p>
        </div>
        <Button type="submit" form="add-job-form">
          Publish Job
          <Send data-icon="inline-end" />
        </Button>
      </div>

      <form
        id="add-job-form"
        onSubmit={handleSubmit}
        className="flex max-w-4xl flex-col gap-6"
      >
        {/* 1. Basic Information */}
        <section className="flex flex-col gap-4 rounded-lg border bg-card p-4">
          <h2 className="text-base font-medium">
            <span className="text-primary">1.</span> Basic Information
          </h2>

          <div className="flex flex-col gap-2">
            <Label htmlFor="job-title">Job Title *</Label>
            <Input
              id="job-title"
              placeholder="Frontend Developer"
              value={job.title}
              onChange={(e) => update("title", e.target.value)}
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="company-name">Company Name *</Label>
              <Input
                id="company-name"
                placeholder="HirePulse Network"
                value={job.companyName}
                onChange={(e) => update("companyName", e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="job-category">Job Category *</Label>
              <Select
                value={job.jobCategory}
                onValueChange={(value) => update("jobCategory", value ?? "")}
              >
                <SelectTrigger id="job-category" className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {JOB_CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Job Type *</Label>
            <div className="flex flex-wrap gap-2">
              {JOB_TYPES.map((type) => (
                <Button
                  key={type}
                  type="button"
                  variant="outline"
                  aria-pressed={job.jobType === type}
                  className={
                    job.jobType === type
                      ? "bg-red text-white"
                      : "bg-blue text-gray-400"
                  }
                  onClick={() => update("jobType", type)}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* 2. Location, Compensation & Timeline */}
        <section className="flex flex-col gap-4 rounded-lg border bg-card p-4">
          <h2 className="text-base font-medium">
            <span className="text-primary">2.</span> Location, Compensation &
            Timeline
          </h2>

          <div className="flex items-center justify-between gap-4 rounded-lg border p-3">
            <div className="flex items-center gap-3">
              <Globe className="size-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Remote Work Allowed</p>
                <p className="text-xs text-muted-foreground">
                  Enable worldwide or distributed candidate applications
                </p>
              </div>
            </div>
            <Switch
              checked={job.isRemote}
              onCheckedChange={(checked) => update("isRemote", checked)}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="job-location">
                Job Location{" "}
                <span className="text-muted-foreground">(Required)</span>
              </Label>
              <Input
                id="job-location"
                placeholder="New York, USA"
                value={job.location}
                onChange={(e) => update("location", e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="deadline">Application Deadline</Label>
              <Input
                id="deadline"
                type="date"
                value={job.deadline}
                onChange={(e) => update("deadline", e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="flex flex-col gap-2">
              <Label htmlFor="min-salary">Min Salary / Rate</Label>
              <Input
                id="min-salary"
                type="number"
                min="0"
                placeholder="25"
                value={job.minSalary}
                onChange={(e) => update("minSalary", e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="max-salary">Max Salary / Rate</Label>
              <Input
                id="max-salary"
                type="number"
                min="0"
                placeholder="40"
                value={job.maxSalary}
                onChange={(e) => update("maxSalary", e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="salary-frequency">Frequency</Label>
              <Select
                value={job.salaryFrequency}
                onValueChange={(value) =>
                  update("salaryFrequency", value ?? "per hour")
                }
              >
                <SelectTrigger id="salary-frequency" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SALARY_FREQUENCIES.map((frequency) => (
                    <SelectItem key={frequency} value={frequency}>
                      {frequency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* 3. Responsibilities & Requirements */}
        <section className="flex flex-col gap-4 rounded-lg border bg-card p-4">
          <h2 className="text-base font-medium">
            <span className="text-primary">3.</span> Responsibilities &
            Requirements
          </h2>

          <div className="flex flex-col gap-2">
            <Label htmlFor="responsibilities">Key Responsibilities *</Label>
            <Textarea
              id="responsibilities"
              rows={5}
              placeholder="Showcase what the day-to-day looks like for this role..."
              value={job.responsibilities}
              onChange={(e) => update("responsibilities", e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="requirements">
              Qualifications & Requirements *
            </Label>
            <Textarea
              id="requirements"
              rows={5}
              placeholder={
                "• 3+ years of experience with React, TypeScript...\n• Solid understanding of ..."
              }
              value={job.requirements}
              onChange={(e) => update("requirements", e.target.value)}
              required
            />
          </div>
        </section>
      </form>
    </div>
  )
}
