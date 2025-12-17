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
import { useSession } from "@/contexts/sessions"
import { AxiosError } from "axios"

const forgetPasswordFormValidationSchema = z.object({
  email: z.email(),
})

type ForgetPasswordFormData = z.infer<typeof forgetPasswordFormValidationSchema>

export function ForgetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const {sendLinkToEmail} = useSession()
  const [isLoading, startLoading] = useTransition()

  const {handleSubmit, register, watch} = useForm<ForgetPasswordFormData>({
    resolver: zodResolver(forgetPasswordFormValidationSchema)
  })

  const isDisabledForgetPasswordAction = !watch("email")

  function handleSendLinkToEmail(data: ForgetPasswordFormData){
    startLoading(async ()=>{
      try{
        const {email} = data
        await sendLinkToEmail(email)

        alert("Acabamos de enviar uma mensagem para você. Acesse sua caixa de email")
      }catch(error){
        if(error instanceof AxiosError){
          switch(error.status){
            case 404:
              alert("Algo não está correto. Revise os dados informados ou crie uma conta, caso ainda não tenha.")
              break
            default:
              alert("Ocorreu um erro ao tentar recuperar sua senha. Tente novamente mais tarde.")
          }
        }
      }
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
          <Button type="submit" disabled={isDisabledForgetPasswordAction || isLoading}>
            {
              isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-3 border-gray-200 border-t-primary rounded-full animate-spin" />
                </div>
              ) : (
                'Enviar Link para este e-mail'
              )
            }
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
