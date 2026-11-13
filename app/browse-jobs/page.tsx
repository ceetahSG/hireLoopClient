import { getJobs } from "@/lib/actions/api/jobs"
import React from "react"
import { BrowseJobsFilters } from "./browse-jobs-filters"
import { JobCard, type JobCardData } from "./job-card"
import { SearchJobs } from "./search-jobs"
import { SortJobs } from "./sort-jobs"

const BrowseJobsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string } | undefined>
}) => {
  const search = await searchParams
  const urlSearch = new URLSearchParams(
    search as Record<string, string>
  ).toString()

  const jobs = await getJobs(urlSearch)
  // console.log("jobs:", jobs)

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8">
      {/* Search & quick filters */}
      <SearchJobs />

      <div className="grid gap-8 md:grid-cols-[260px_1fr]">
        {/* Sidebar filters */}
        <BrowseJobsFilters />

        {/* Main job listing */}
        <section className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold">
              Found {jobs.length} Professional Jobs
            </h2>
            <SortJobs />
          </div>
          <div className="flex flex-col gap-4">
            {jobs.map((job: JobCardData, index: number) => (
              <JobCard key={index} job={job} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default BrowseJobsPage
