"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  CheckCircle2,
  Briefcase,
  UserCheck,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { GoogleIcon } from "@/components/auth/google-icon"
import { cn } from "@/lib/utils"
import { authClient } from "@/lib/auth-client"
import { redirect } from "next/navigation"

export type AccountRole = "job-seeker" | "employer" | "admin"

export interface SignUpFormData {
  role: AccountRole
  name: string
  email: string
  password: string
  confirmPassword: string
  agreeTerms: boolean
}

interface SignUpFormProps {
  onSuccess?: (data: SignUpFormData) => void
  onToggleToSignIn?: () => void
}

export function SignUpForm({ onSuccess, onToggleToSignIn }: SignUpFormProps) {
  const [role, setRole] = useState<AccountRole>("job-seeker")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData: SignUpFormData = {
      role,
      name,
      email,
      password,
      confirmPassword,
      agreeTerms,
    }
    // Event handler: collects the form data
    if (formData.password !== formData.confirmPassword) {
      setStatusMessage("Error: Passwords do not match.")
      return
    } else {
      console.log("Collected Sign Up Form Data:", formData)

      setStatusMessage(
        `Form data collected successfully for ${formData.name || formData.email || "user"} (${formData.role}). Check console for details.`
      )

      if (onSuccess) {
        onSuccess(formData)
      }

      // Note for Better-Auth integration:
      const { data, error } = await authClient.signUp.email({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      })
      if (error) {
        console.error("Sign Up Error:", error)
        setStatusMessage(`Error: ${error.message}`)
      } else {
        console.log("Sign Up Success:", data)
        redirect("/sign-in") // Redirect to sign-in page after successful sign-up
      }
    }
  }

  const handleGoogleSignUp = () => {
    console.log("Google Sign Up clicked (integration pending)")
    // Note for Better-Auth Google integration:
    // await authClient.signIn.social({ provider: "google" })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center sm:text-left">
        <h1 className="font-manrope text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Create an account
        </h1>
        <p className="text-sm text-white/60">
          Join HireLoop to discover opportunities or hire top talent
        </p>
      </div>

      {/* Role Selector */}
      <div className="space-y-2">
        <Label className="text-xs text-white/80">I want to</Label>
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => setRole("job-seeker")}
            className={cn(
              "flex items-center gap-2.5 rounded-xl border p-3 text-left transition-all",
              role === "job-seeker"
                ? "border-cyan-400/60 bg-cyan-400/[0.08] text-white ring-1 ring-cyan-400/30"
                : "border-white/10 bg-white/[0.03] text-white/65 hover:border-white/20 hover:text-white"
            )}
          >
            <UserCheck
              className={cn(
                "size-4 shrink-0",
                role === "job-seeker" ? "text-cyan-400" : "text-white/40"
              )}
            />
            <div className="text-xs">
              <span className="block font-semibold">Find Work</span>
              <span className="text-[11px] text-white/50">Job seeker</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setRole("employer")}
            className={cn(
              "flex items-center gap-2.5 rounded-xl border p-3 text-left transition-all",
              role === "employer"
                ? "border-cyan-400/60 bg-cyan-400/[0.08] text-white ring-1 ring-cyan-400/30"
                : "border-white/10 bg-white/[0.03] text-white/65 hover:border-white/20 hover:text-white"
            )}
          >
            <Briefcase
              className={cn(
                "size-4 shrink-0",
                role === "employer" ? "text-cyan-400" : "text-white/40"
              )}
            />
            <div className="text-xs">
              <span className="block font-semibold">Hire Talent</span>
              <span className="text-[11px] text-white/50">Employer</span>
            </div>
          </button>
          <button
            type="button"
            onClick={() => setRole("admin")}
            className={cn(
              "flex items-center gap-2.5 rounded-xl border p-3 text-left transition-all",
              role === "admin"
                ? "border-cyan-400/60 bg-cyan-400/[0.08] text-white ring-1 ring-cyan-400/30"
                : "border-white/10 bg-white/[0.03] text-white/65 hover:border-white/20 hover:text-white"
            )}
          >
            <Briefcase
              className={cn(
                "size-4 shrink-0",
                role === "employer" ? "text-cyan-400" : "text-white/40"
              )}
            />
            <div className="text-xs">
              <span className="block font-semibold">Admin</span>
              <span className="text-[11px] text-white/50">Admin</span>
            </div>
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={handleGoogleSignUp}
        className="flex h-11 w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm font-medium text-white transition-all hover:border-white/20 hover:bg-white/[0.08] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
      >
        <GoogleIcon className="size-5 shrink-0" />
        <span>Sign up with Google</span>
      </button>

      <div className="relative flex items-center justify-center">
        <div className="w-full border-t border-white/10" />
        <span className="relative bg-[#0d0d12] px-3 text-xs tracking-wider text-white/40 uppercase">
          Or sign up with email
        </span>
      </div>

      {statusMessage && (
        <div className="flex items-start gap-2.5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-3.5 text-xs text-cyan-200">
          <CheckCircle2 className="size-4 shrink-0 text-cyan-400" />
          <p className="leading-relaxed">{statusMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div className="space-y-2">
          <Label htmlFor="signup-name" className="text-xs text-white/80">
            Full name
          </Label>
          <div className="relative">
            <User
              className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-white/40"
              aria-hidden="true"
            />
            <Input
              id="signup-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Doe"
              className="h-11 rounded-xl border-white/10 bg-white/[0.04] pl-10 text-sm text-white placeholder:text-white/30 focus-visible:border-cyan-400 focus-visible:ring-cyan-400/20"
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="signup-email" className="text-xs text-white/80">
            Work or personal email
          </Label>
          <div className="relative">
            <Mail
              className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-white/40"
              aria-hidden="true"
            />
            <Input
              id="signup-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="h-11 rounded-xl border-white/10 bg-white/[0.04] pl-10 text-sm text-white placeholder:text-white/30 focus-visible:border-cyan-400 focus-visible:ring-cyan-400/20"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <Label htmlFor="signup-password" className="text-xs text-white/80">
            Password
          </Label>
          <div className="relative">
            <Lock
              className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-white/40"
              aria-hidden="true"
            />
            <Input
              id="signup-password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password (min. 8 characters)"
              className="h-11 rounded-xl border-white/10 bg-white/[0.04] pr-10 pl-10 text-sm text-white placeholder:text-white/30 focus-visible:border-cyan-400 focus-visible:ring-cyan-400/20"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute top-1/2 right-3.5 -translate-y-1/2 text-white/40 transition-colors hover:text-white focus-visible:outline-1 focus-visible:outline-cyan-400"
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-2">
          <Label
            htmlFor="signup-confirm-password"
            className="text-xs text-white/80"
          >
            Confirm password
          </Label>
          <div className="relative">
            <Lock
              className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-white/40"
              aria-hidden="true"
            />
            <Input
              id="signup-confirm-password"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              minLength={8}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              className="h-11 rounded-xl border-white/10 bg-white/[0.04] pr-10 pl-10 text-sm text-white placeholder:text-white/30 focus-visible:border-cyan-400 focus-visible:ring-cyan-400/20"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
              className="absolute top-1/2 right-3.5 -translate-y-1/2 text-white/40 transition-colors hover:text-white focus-visible:outline-1 focus-visible:outline-cyan-400"
            >
              {showConfirmPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
        </div>

        {/* Terms Agreement */}
        <div className="flex items-start gap-2.5 pt-1">
          <Checkbox
            id="signup-terms"
            name="agreeTerms"
            required
            checked={agreeTerms}
            onCheckedChange={(checked) => setAgreeTerms(Boolean(checked))}
            className="mt-0.5"
          />
          <Label
            htmlFor="signup-terms"
            className="cursor-pointer text-xs leading-relaxed font-normal text-white/70 hover:text-white"
          >
            I agree to HireLoop&apos;s{" "}
            <Link
              href="#terms"
              className="text-white underline underline-offset-2 hover:text-cyan-400"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="#privacy"
              className="text-white underline underline-offset-2 hover:text-cyan-400"
            >
              Privacy Policy
            </Link>
          </Label>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="mt-2 h-11 w-full rounded-xl bg-white text-sm font-semibold text-[#070709] shadow-lg transition-all hover:bg-cyan-100 hover:text-[#070709] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
        >
          Create Account
        </Button>
      </form>

      {/* Footer Toggle Link */}
      <p className="text-center text-xs text-white/60">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          onClick={(e) => {
            if (onToggleToSignIn) {
              e.preventDefault()
              onToggleToSignIn()
            }
          }}
          className="font-medium text-white underline underline-offset-4 transition-colors hover:text-cyan-400"
        >
          Sign in
        </Link>
      </p>
    </div>
  )
}
