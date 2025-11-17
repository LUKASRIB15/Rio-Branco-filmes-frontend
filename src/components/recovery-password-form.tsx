import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTransition } from "react"

const recoveryPasswordFormValidationSchema = z.object({
  password: z.string().min(6),
  confirmPassword: z.string().min(6)
}).refine((data) => data.password === data.confirmPassword)


type RecoveryPasswordFormData = z.infer<typeof recoveryPasswordFormValidationSchema>

export function RecoveryPasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [isLoading, startLoading] = useTransition()

  const {handleSubmit, register, watch} = useForm<RecoveryPasswordFormData>({
    resolver: zodResolver(recoveryPasswordFormValidationSchema)
  })

  const isDisabledRecoveryPasswordAction = !watch("password") || !watch("confirmPassword")

  function handleChangePassword(data: RecoveryPasswordFormData){
    startLoading(()=>{
      console.log(data)
    })
  }

  return (
    <form onSubmit={handleSubmit(handleChangePassword)} className={cn("flex flex-col gap-6 relative", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Recuperação de senha</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Digite sua nova senha e confirme
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="password">Nova senha</FieldLabel>
          <Input id="password" minLength={8} type="password" required {...register("password")}/>
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Confirmar nova senha</FieldLabel>
          <Input id="password" minLength={8} type="password" required {...register("confirmPassword")}/>
        </Field>
        <Field>
          <Button type="submit" disabled={isDisabledRecoveryPasswordAction || isLoading}>Realizar alteração de senha</Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
