import { ForgetPasswordForm } from "@/components/forget-password-form";
import { SessionLayout } from "@/layouts/session";

export function ForgetPassword(){
  return (
    <SessionLayout>
      <ForgetPasswordForm />
    </SessionLayout>
  )
}