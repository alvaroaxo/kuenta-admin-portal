import {LoginForm} from "@/app/auth/login/components/login-form"
import {VerificationEmailForm} from "@/app/auth/verification-email/components/verification-email-form";

export default function VerificationEmailPage() {
  console.log("LoginPage")
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="w-full max-w-xs">
        <VerificationEmailForm/>
      </div>
    </div>
  )
}
