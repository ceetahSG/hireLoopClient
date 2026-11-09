import Image from "next/image"
import { BarChart3, BriefcaseBusiness, Star, UserSearch } from "lucide-react"

import { HeroSearchForm } from "@/components/hero-search"
import dots from "@/app/images/hero-dots.png"
import globe from "@/app/images/globe.png"

const trendingSkills = [
  "Product Designer",
  "AI Engineering",
  "Dev-ops Engineer",
]

const stats = [
  { label: "Active Jobs", value: "50K", icon: BriefcaseBusiness },
  { label: "Companies", value: "12K", icon: BarChart3 },
  { label: "Job Seekers", value: "2M", icon: UserSearch },
  { label: "Satisfaction Rate", value: "97%", icon: Star },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#070709] pt-20 pb-24 text-white sm:pt-24">
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        {/* Intro block */}
        <div className="mx-auto flex max-w-[784px] flex-col items-center text-center">
          {/* Jobs badge */}
          <div className="flex w-full items-center justify-center">
            <span
              aria-hidden="true"
              className="hidden h-px w-16 shrink-0 bg-white/30 sm:block"
            />
            <span className="flex h-12 items-center gap-3 rounded-full border border-white/30 bg-white/[0.06] px-6 font-space-mono text-sm sm:text-xl">
              <BriefcaseBusiness
                className="size-6 shrink-0"
                aria-hidden="true"
              />
              <span>
                <strong className="font-bold">50,000+</strong> new jobs this
                month
              </span>
            </span>
            <span
              aria-hidden="true"
              className="hidden h-px w-16 shrink-0 bg-white/30 sm:block"
            />
          </div>

          <h1 className="mt-9 font-manrope text-[40px] leading-[1.15] font-bold tracking-[-0.02em] sm:text-5xl lg:text-[56px] lg:leading-[64px]">
            Find Your Dream Job Today
          </h1>
          <p className="mt-5 max-w-[720px] font-manrope text-lg leading-[32px] text-white/80 sm:text-xl">
            HireLoop connects top talent with world-class companies. Browse
            thousands of curated opportunities and land your next role — faster.
          </p>

          <div className="mt-12 w-full">
            <HeroSearchForm />
          </div>

          {/* Trending positions */}
          <ul className="mt-10 flex flex-wrap items-center justify-center gap-2 font-manrope">
            <li className="mr-2 text-base">Trending Position</li>
            {trendingSkills.map((skill) => (
              <li key={skill}>
                <span className="rounded-full border border-white/10 bg-[#1a1a1b] px-3 py-1.5 text-sm text-white/90">
                  {skill}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Globe visual */}
        <div className="relative mx-auto mt-14 w-full max-w-[1180px] sm:mt-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-[32%] left-1/2 size-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#5049f4]/30 blur-[130px]"
          />
          <div className="relative aspect-[1180/731] w-full overflow-hidden">
            <Image
              src={globe}
              alt=""
              aria-hidden="true"
              sizes="(min-width: 1240px) 1180px, 100vw"
              unoptimized
              className="size-full object-cover object-[50%_38%]"
            />
            <Image
              src={dots}
              alt=""
              aria-hidden="true"
              sizes="(min-width: 1240px) 1180px, 100vw"
              unoptimized
              className="pointer-events-none absolute inset-0 size-full object-cover opacity-80 mix-blend-screen"
            />
          </div>
        </div>

        {/* Tagline + stats */}
        <div className="relative z-10 mx-auto -mt-20 max-w-[1320px] sm:-mt-24">
          <p className="mx-auto max-w-[600px] text-center font-manrope text-2xl leading-[1.3] font-medium tracking-[-0.02em] sm:mt-2 sm:text-[32px] lg:text-[40px]">
            Assisting over 15,000 job seekers find their dream positions.
          </p>

          <ul className="mt-12 grid grid-cols-1 gap-5 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map(({ label, value, icon: Icon }) => (
              <li
                key={label}
                className="flex min-h-[254px] flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <Icon className="size-6" aria-hidden="true" />
                <div className="mt-auto pt-6">
                  <p className="font-jakarta text-[40px] leading-none font-semibold tracking-[-0.02em] sm:text-[44px] sm:leading-[1.15] lg:text-[56px] lg:leading-[64px]">
                    {value}
                  </p>
                  <p className="mt-2 font-inter-tight text-lg text-white/70">
                    {label}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
