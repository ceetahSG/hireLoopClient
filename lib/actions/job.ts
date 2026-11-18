import { JobFormData } from "@/app/dashboard/employer/add-job/add-job-form"
import { CreateJobApplication } from "@/lib/types/job-application"

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"
export const createJob = async (data: JobFormData) => {
  console.log("base url:", baseUrl)
  const res = await fetch(`${baseUrl}/jobs`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
  return res.json()
}

export const deleteJob = async (jobId: string) => {
  const res = await fetch(`${baseUrl}/jobs/${jobId}`, {
    method: "DELETE",
  })
  return res.json()
}

export const applyToJob = async (data: CreateJobApplication) => {
  const response = await fetch(`${baseUrl}/applied-jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  return response.json()
}
