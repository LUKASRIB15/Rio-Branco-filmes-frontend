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
import { useNavigate, useSearchParams } from "react-router"
import { Error404 } from "@/components/404"
import { useSession } from "@/contexts/sessions"
import { AxiosError } from "axios"

const recoveryPasswordFormValidationSchema = z.object({
  password: z.string(),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem.",
  path: ["confirmPassword"],
})

type RecoveryPasswordFormData = z.infer<typeof recoveryPasswordFormValidationSchema>

export function RecoveryPasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const {recoveryPassword} = useSession()
  const [isLoading, startLoading] = useTransition()
  const [queryParams] = useSearchParams()
  const navigate = useNavigate()

  const accessToken = queryParams.get('token')

  const {handleSubmit, register, watch, formState: {errors}} = useForm<RecoveryPasswordFormData>({
    resolver: zodResolver(recoveryPasswordFormValidationSchema)
  })

  const isDisabledRecoveryPasswordAction = !watch("password") || !watch("confirmPassword")

  function handleChangePassword(data: RecoveryPasswordFormData){
    startLoading(async ()=>{
      try{
        const {password} = data
        if(accessToken){
          await recoveryPassword({newPassword: password, accessToken})
          alert('Sua redefinição de senha foi realizada com sucesso! Acesse sua conta agora efetuando login.')
          navigate('/')
        }
      }catch(error){
        if(error instanceof AxiosError){
          switch(error.status){
            case 401:
              alert('Você não tem permissão para efetuar troca da senha desse usuário')
              break
            default:
              alert('Não foi possível redefinir a senha desse usuário. Tente novamente mais tarde!')
          }
        }
      }
    })
  }

  if(!accessToken){
    return <Error404 />
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
        {
          errors.confirmPassword && <p className="text-primary text-sm">{errors.confirmPassword.message}*</p>
        }
        <Field>
          <Button type="submit" disabled={isDisabledRecoveryPasswordAction || isLoading}>Realizar alteração de senha</Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
