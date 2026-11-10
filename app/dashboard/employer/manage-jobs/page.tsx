import Link from "next/link"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { dummyJobs } from "./dummy-jobs"
import { ManageJobsTable } from "./manage-jobs-table"

const ManageJobsPage = () => {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Top bar */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <nav className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>Manage Jobs</span>
            <span aria-hidden>/</span>
            <span>Job Listings &amp; Postings</span>
          </nav>
          <h1 className="text-2xl font-semibold">Manage Job Posts</h1>
          <p className="text-sm text-muted-foreground">
            Review live listings, monitor applicants, and update job details
            across your organization.
          </p>
        </div>
        <Button>
          <Plus data-icon="inline-start" />
          <Link href="/dashboard/employer/add-job">New Job Post</Link>
        </Button>
      </div>

      {/* Data table — scroll horizontally on small screens */}
      <div className="grid grid-cols-1 gap-4">
        <ManageJobsTable jobs={dummyJobs} />
      </div>
    </div>
  )
}

export default ManageJobsPage
