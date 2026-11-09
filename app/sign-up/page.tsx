import type { Metadata } from "next"
import { AuthContainer } from "@/components/auth/auth-container"
import { SignUpForm } from "@/components/auth/sign-up-form"

export const metadata: Metadata = {
  title: "Sign Up - HireLoop",
  description:
    "Create your HireLoop account to discover jobs or hire top-tier talent.",
}

export default function SignUpPage() {
  return (
    <AuthContainer mode="sign-up">
      <SignUpForm />
    </AuthContainer>
  )
}
