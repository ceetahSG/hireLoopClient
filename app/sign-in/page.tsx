import type { Metadata } from "next"
import { AuthContainer } from "@/components/auth/auth-container"
import { SignInForm } from "@/components/auth/sign-in-form"

export const metadata: Metadata = {
  title: "Sign In - HireLoop",
  description:
    "Sign in to your HireLoop account to access job opportunities or talent pipelines.",
}

export default function SignInPage() {
  return (
    <AuthContainer mode="sign-in">
      <SignInForm />
    </AuthContainer>
  )
}
