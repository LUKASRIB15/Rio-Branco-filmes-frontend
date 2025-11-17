import { RecoveryPasswordForm } from "@/components/recovery-password-form";
import { SessionLayout } from "@/layouts/session";

export function RecoveryPassword(){
  return (
    <SessionLayout>
      <RecoveryPasswordForm />
    </SessionLayout>
  )
}