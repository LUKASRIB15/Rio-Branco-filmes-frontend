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

const forgetPasswordFormValidationSchema = z.object({
  email: z.email(),
})

type ForgetPasswordFormData = z.infer<typeof forgetPasswordFormValidationSchema>

export function ForgetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [isLoading, startLoading] = useTransition()

  const {handleSubmit, register, watch} = useForm<ForgetPasswordFormData>({
    resolver: zodResolver(forgetPasswordFormValidationSchema)
  })

  const isDisabledForgetPasswordAction = !watch("email")

  function handleSendLinkToEmail(data: ForgetPasswordFormData){
    startLoading(()=>{
      console.log(data)
    })
  }

  return (
    <form onSubmit={handleSubmit(handleSendLinkToEmail)} className={cn("flex flex-col gap-6 relative", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Esqueceu sua senha?</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Não se preocupe. Digite seu email para iniciarmos uma validação.
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" placeholder="Digite seu e-mail" required {...register("email")}/>
        </Field>
        <Field>
          <Button type="submit" disabled={isDisabledForgetPasswordAction || isLoading}>Enviar link para este e-mail</Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
