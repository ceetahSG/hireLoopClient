// Status values come from the "My Applications" screen in the Figma
// (Applied / Review / Shortlisted / Rejected / Offered).
export type ApplicationStatus =
  "applied" | "review" | "shortlisted" | "rejected" | "offered"

/**
 * A job application record (mirrors the backend /applied-jobs collection).
 *
 * The job fields are a snapshot of the job at apply time so the
 * seeker's applications list can render without extra lookups.
 */
export type JobApplication = {
  _id?: string
  /** The job that was applied to */
  jobId: string
  /** The seeker's auth user id */
  userId: string
  /** The seeker's account email */
  email: string
  /** ISO date string the application was submitted */
  appliedAt: string
  /** Set/updated by the backend; defaults to "applied" */
  status?: ApplicationStatus
  /** Soft archive flag for the Active/Archived tabs */
  isArchived?: boolean
  // --- job snapshot ---
  jobTitle: string
  companyName: string
  jobType: string
  isRemote?: boolean
  location?: string
}

/**
 * Payload sent when a seeker applies to a job.
 * The backend owns `_id`, `status` and `isArchived`.
 */
export type CreateJobApplication = Omit<
  JobApplication,
  "_id" | "status" | "isArchived"
>
