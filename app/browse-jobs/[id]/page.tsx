import { getJobById } from "@/lib/actions/api/jobs"
import { JobDetails } from "./job-details"

const JobDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params
  const jobDetails = await getJobById(id)
  console.log("jobDetails:", jobDetails)

  return <JobDetails job={jobDetails} />
}

export default JobDetailsPage
