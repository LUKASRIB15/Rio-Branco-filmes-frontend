import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "@/contexts/sessions"
import { AxiosError } from "axios"
import { useTransition } from "react"

const loginFormValidationSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
})

type LoginFormData = z.infer<typeof loginFormValidationSchema>

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const {signIn} = useSession()
  const navigate = useNavigate()
  const [isLoading, startLoading] = useTransition()

  const {handleSubmit, register, watch} = useForm<LoginFormData>({
    resolver: zodResolver(loginFormValidationSchema)
  })

  const isDisabledLoginAction = !watch("email")  || !watch("password")

  async function handleLogin(data: LoginFormData) {
    startLoading(async ()=>{
      try{
        await signIn(data)
        navigate("/")
      }catch(error){
        if(error instanceof AxiosError){
          switch(error.status){
            case 401:
              alert("Credenciais inválidas. Seu e-mail ou senha estão inválidas")
              break
            default:
              alert("Ocorreu um erro ao efetuar o login. Tente novamente mais tarde.")
          }
        }
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(handleLogin)} className={cn("flex flex-col gap-6 relative", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Bem vindo!</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Acesse com seu e-mail e senha
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" placeholder="Digite seu e-mail" required {...register("email")}/>
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Senha</FieldLabel>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline text-primary"
            >
              Esqueci a senha?
            </a>
          </div>
          <Input id="password" minLength={8} type="password" required {...register("password")}/>
        </Field>
        <Field>
          <Button type="submit" disabled={isDisabledLoginAction || isLoading}>Entre</Button>
        </Field>
        <span
          className="m-auto text-sm underline-offset-4 font-semibold"
        >
          Não tem uma conta? <Link to="/sign-up" className="text-primary hover:underline">Cadastre-se</Link>       
        </span>
      </FieldGroup>
    </form>
  )
}
