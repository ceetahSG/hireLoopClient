import { getJobs } from "@/lib/actions/api/jobs"
import React from "react"

const BrowseJobsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string } | undefined>
}) => {
  const search = await searchParams
  const urlSearch = new URLSearchParams(
    search as Record<string, string>
  ).toString()

  // console.log(urlSearch)
  const jobs = await getJobs(urlSearch)

  return (
    <div>
      <h1>Browse Jobs</h1>
      <ul>
        {jobs.map((job: any, index: number) => (
          <li key={index}>
            <h2>{job.title}</h2>
            <p>{job.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BrowseJobsPage
