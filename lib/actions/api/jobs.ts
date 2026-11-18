const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

export const getJobs = async (query = "") => {
  const res = await fetch(`${baseUrl}/jobs?${query}`)
  return res.json()
}

export const getJobById = async (id: string) => {
  const res = await fetch(`${baseUrl}/jobs/${id}`)
  return res.json()
}
