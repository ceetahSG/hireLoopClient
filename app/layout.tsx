import {
  Geist,
  Geist_Mono,
  Inter,
  Instrument_Sans,
  Manrope,
  Plus_Jakarta_Sans,
  Space_Mono,
  Inter_Tight,
} from "next/font/google"

import "./globals.css"
// import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const fontInstrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
})

const fontManrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
})

const fontJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
})

const fontSpaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
})

const fontInterTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable,
        fontInter.variable,
        fontInstrument.variable,
        fontManrope.variable,
        fontJakarta.variable,
        fontSpaceMono.variable,
        fontInterTight.variable
      )}
    >
      <body>{children}</body>
    </html>
  )
}
