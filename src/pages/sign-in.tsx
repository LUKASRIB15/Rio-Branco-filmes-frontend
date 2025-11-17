import { LoginForm } from "@/components/login-form";
import { SessionLayout } from "@/layouts/session";

export function SignIn(){
  return (
    <SessionLayout>
      <LoginForm />
    </SessionLayout>
  )
}