import type { JobFormData } from "@/app/dashboard/employer/add-job/add-job-form"

// Matches the backend job record exactly.
// TODO: swap the dummy record for a fetch by job id.
export type JobDetailsData = Pick<
  JobFormData,
  | "_id"
  | "title"
  | "companyName"
  | "jobCategory"
  | "jobType"
  | "isRemote"
  | "location"
  | "deadline"
  | "minSalary"
  | "maxSalary"
  | "salaryFrequency"
  | "responsibilities"
  | "requirements"
>

export const dummyJobDetail: JobDetailsData = {
  _id: "6af334547dc3cb853fbfaf15",
  title: "Data Analyst",
  companyName: "ShopUp",
  jobCategory: "Data & Analytics",
  jobType: "Full-time",
  isRemote: false,
  location: "Dhaka",
  deadline: "2026-12-02",
  minSalary: "35",
  maxSalary: "55",
  salaryFrequency: "per month",
  responsibilities:
    "Analyze business data, create reports, build dashboards, and identify business trends.",
  requirements:
    "Bachelor's degree in CSE, Statistics, or related field. Knowledge of SQL, Excel, and Power BI.",
}
