"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSession } from "@/lib/auth-client"
const menuItemByRole = {
  job_seeker: ["Dashboard", "Profile", "Settings"],
  employee: ["Dashboard", "Profile", "Settings"],
  admin: ["Dashboard", "Profile", "Settings"],
}

export function DashboardSidebar() {
  const { data: session, isPending } = useSession()
  const userRole = session?.user?.role || "job_seeker" // Default to "job_seeker" if role is undefined
  console.log("User Role:", userRole) // Debugging: Log the user role

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
        <SidebarMenu>
          {/* {menuItemByRole[userRole]?.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton render={<a href={item.url} />}>
                <item.icon />
                <span>{item.name}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))} */}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
