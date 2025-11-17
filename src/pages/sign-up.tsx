import { SignupForm } from "@/components/signup-form";
import { SessionLayout } from "@/layouts/session";

export function SignUp(){
  return (
    <SessionLayout>
      <SignupForm />
    </SessionLayout>
  )
}