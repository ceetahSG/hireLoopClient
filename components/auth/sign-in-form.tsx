"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, Lock, Mail, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { GoogleIcon } from "@/components/auth/google-icon"
import { authClient } from "@/lib/auth-client"
import { redirect } from "next/navigation"

export interface SignInFormData {
  email: string
  password: string
  rememberMe: boolean
}

interface SignInFormProps {
  onSuccess?: (data: SignInFormData) => void
  onToggleToSignUp?: () => void
}

export function SignInForm({ onSuccess, onToggleToSignUp }: SignInFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData: SignInFormData = {
      email,
      password,
      rememberMe,
    }

    // Event handler: collects the form data
    console.log("Collected Sign In Form Data:", formData)

    // setStatusMessage(
    //   `Form data collected successfully for ${formData.email || "user"}. Check console for details.`
    // )

    // if (onSuccess) {
    //   onSuccess(formData)
    // }

    // Note for Better-Auth integration:
    const { data, error } = await authClient.signIn.email({
      email: formData.email,
      password: formData.password,
      rememberMe: formData.rememberMe,
    })
    if (error) {
      console.error("Sign In Error:", error)
      setStatusMessage(`Error: ${error.message}`)
    } else {
      console.log("Sign In Success:", data)
      redirect("/") // Redirect to home page on successful sign-in
    }
  }

  const handleGoogleSignIn = () => {
    console.log("Google Sign In clicked (integration pending)")
    // Note for Better-Auth Google integration:
    // await authClient.signIn.social({ provider: "google" })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center sm:text-left">
        <h1 className="font-manrope text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Welcome back
        </h1>
        <p className="text-sm text-white/60">
          Enter your credentials to access your HireLoop account
        </p>
      </div>

      <button
        type="button"
        onClick={handleGoogleSignIn}
        className="flex h-11 w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm font-medium text-white transition-all hover:border-white/20 hover:bg-white/[0.08] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
      >
        <GoogleIcon className="size-5 shrink-0" />
        <span>Continue with Google</span>
      </button>

      <div className="relative flex items-center justify-center">
        <div className="w-full border-t border-white/10" />
        <span className="relative bg-[#0d0d12] px-3 text-xs tracking-wider text-white/40 uppercase">
          Or continue with email
        </span>
      </div>

      {statusMessage && (
        <div className="flex items-start gap-2.5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-3.5 text-xs text-cyan-200">
          <CheckCircle2 className="size-4 shrink-0 text-cyan-400" />
          <p className="leading-relaxed">{statusMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="signin-email" className="text-xs text-white/80">
            Email address
          </Label>
          <div className="relative">
            <Mail
              className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-white/40"
              aria-hidden="true"
            />
            <Input
              id="signin-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="h-11 rounded-xl border-white/10 bg-white/[0.04] pl-10 text-sm text-white placeholder:text-white/30 focus-visible:border-cyan-400 focus-visible:ring-cyan-400/20"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="signin-password" className="text-xs text-white/80">
              Password
            </Label>
            <Link
              href="#forgot-password"
              className="text-xs text-white/50 transition-colors hover:text-cyan-400 focus-visible:outline-1 focus-visible:outline-cyan-400"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock
              className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-white/40"
              aria-hidden="true"
            />
            <Input
              id="signin-password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
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

        {/* Remember Me */}
        <div className="flex items-center gap-2 pt-1">
          <Checkbox
            id="signin-remember"
            name="rememberMe"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(Boolean(checked))}
          />
          <Label
            htmlFor="signin-remember"
            className="cursor-pointer text-xs font-normal text-white/70 hover:text-white"
          >
            Remember me for 30 days
          </Label>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="mt-2 h-11 w-full rounded-xl bg-white text-sm font-semibold text-[#070709] shadow-lg transition-all hover:bg-cyan-100 hover:text-[#070709] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
        >
          Sign In
        </Button>
      </form>

      {/* Footer Toggle Link */}
      <p className="text-center text-xs text-white/60">
        Don&apos;t have an account?{" "}
        <Link
          href="/sign-up"
          onClick={(e) => {
            if (onToggleToSignUp) {
              e.preventDefault()
              onToggleToSignUp()
            }
          }}
          className="font-medium text-white underline underline-offset-4 transition-colors hover:text-cyan-400"
        >
          Sign up
        </Link>
      </p>
    </div>
  )
}
