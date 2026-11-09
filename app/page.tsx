import { Hero } from "@/components/Hero"
import { Navbar } from "@/components/navbar"

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col bg-[#070709]">
      <Navbar />
      <main className="flex-1">
        <Hero />
      </main>
    </div>
  )
}
