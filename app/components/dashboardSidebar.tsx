"use client"
import {
  Bookmark,
  Briefcase,
  Building2,
  FileText,
  LayoutDashboard,
  PlusCircle,
  Settings,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSession } from "@/lib/auth-client"
import Link from "next/link"

// Role names match the sidebar variants in the Figma file.
// NOTE: lib/auth.ts uses "employer" for the recruiter role —
// align both if the auth roles ever change.
type UserRole = "job_seeker" | "employer" | "admin"

type MenuItem = {
  id: string
  name: string
  url: string
  icon: LucideIcon
}

const menuItemByRole: Record<UserRole, MenuItem[]> = {
  job_seeker: [
    {
      id: "dashboard",
      name: "Dashboard",
      url: "/dashboard/job-seeker",
      icon: LayoutDashboard,
    },
    {
      id: "jobs",
      name: "Jobs",
      url: "/dashboard/job-seeker/jobs",
      icon: Briefcase,
    },
    {
      id: "saved-jobs",
      name: "Saved Jobs",
      url: "/dashboard/job-seeker/saved-jobs",
      icon: Bookmark,
    },
    {
      id: "applications",
      name: "Applications",
      url: "/dashboard/job-seeker/applications",
      icon: FileText,
    },
    {
      id: "billing",
      name: "Billing",
      url: "/dashboard/job-seeker/billing",
      icon: Wallet,
    },
    {
      id: "settings",
      name: "Settings",
      url: "/dashboard/job-seeker/settings",
      icon: Settings,
    },
  ],
  employer: [
    {
      id: "dashboard",
      name: "Dashboard",
      url: "/dashboard/employer",
      icon: LayoutDashboard,
    },
    {
      id: "my-company",
      name: "My Company",
      url: "/dashboard/employer/my-company",
      icon: Building2,
    },
    {
      id: "manage-jobs",
      name: "Manage Jobs",
      url: "/dashboard/employer/manage-jobs",
      icon: Briefcase,
    },
    {
      id: "add-job",
      name: "Add Job",
      url: "/dashboard/employer/add-job",
      icon: PlusCircle,
    },
    {
      id: "applications",
      name: "Applications",
      url: "/dashboard/employer/applications",
      icon: FileText,
    },
    {
      id: "settings",
      name: "Settings",
      url: "/dashboard/employer/settings",
      icon: Settings,
    },
  ],
  admin: [
    {
      id: "dashboard",
      name: "Dashboard",
      url: "/dashboard/admin",
      icon: LayoutDashboard,
    },
    {
      id: "users",
      name: "Users",
      url: "/dashboard/admin/users",
      icon: Users,
    },
    {
      id: "companies",
      name: "Companies",
      url: "/dashboard/admin/companies",
      icon: Building2,
    },
    {
      id: "jobs",
      name: "Jobs",
      url: "/dashboard/admin/jobs",
      icon: Briefcase,
    },
    {
      id: "payments",
      name: "Payments",
      url: "/dashboard/admin/payments",
      icon: Wallet,
    },
    {
      id: "settings",
      name: "Settings",
      url: "/dashboard/admin/settings",
      icon: Settings,
    },
  ],
}

export function DashboardSidebar() {
  const { data: session, isPending } = useSession()
  const userRole = (session?.user?.role || "job_seeker") as UserRole // Default to "job_seeker" if role is undefined
  console.log("User Role:", userRole) // Debugging: Log the user role

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
        <SidebarMenu>
          {menuItemByRole[userRole]?.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton render={<Link href={item.url} />}>
                <item.icon />
                <span>{item.name}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
