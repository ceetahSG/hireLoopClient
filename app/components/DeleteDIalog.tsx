"use client"
import { Trash2Icon } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { deleteJob } from "@/lib/actions/job"
import { JobListData } from "../dashboard/employer/manage-jobs/manage-jobs-table"
import { useState } from "react"
import { toast } from "@/components/ui/toast"
import { useRouter } from "next/navigation"

export function DeleteJobDialog({ job }: { job: JobListData }) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  //   console.log("DeleteJobDialog job:", job)

  //   console.log("DeleteJobDialog response:", response)

  const handleDelete = async () => {
    // console.log("Deleting job with ID:", job._id)
    const response = await deleteJob(job._id)
    if (response.deletedCount === 1) {
      toast.add({
        title: "Job Deleted",
        description: `The job "${job.title}" has been successfully deleted.`,
      })
      router.push("/dashboard/employer/manage-jobs")
      setOpen(false)
    }
  }
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <Button variant="destructive">
            <Trash2Icon />
          </Button>
        }
      />
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete Job?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this job posting. View{" "}
            <a href="#">Settings</a> to delete any memories saved during this
            job posting.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} variant="destructive">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
