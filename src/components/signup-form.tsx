import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "@/contexts/sessions"
import { AxiosError } from "axios"
import { useTransition } from "react"

const signUpFormValidationSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(8),
})

type SignUpFormData = z.infer<typeof signUpFormValidationSchema>

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const {signUp} = useSession()
  const navigate = useNavigate()
  const [isLoading, startLoading] = useTransition()

  const {handleSubmit, register, watch} = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormValidationSchema)
  })

  const isDisabledSignUpAction = !watch("name") || !watch("email") || !watch("password")

  async function handleSignUp(data: SignUpFormData) {
    startLoading(async ()=>{
      try{
        await signUp(data)
        navigate("/")
      }catch(error){
        if(error instanceof AxiosError){
          switch(error.status){
            case 409:
              alert("O e-mail informado já está em uso.")
              break
            default:
              alert("Ocorreu um erro ao efetuar o cadastro. Tente novamente mais tarde.")
          }
        }
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(handleSignUp)} className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Crie sua conta</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Seja bem-vindo à nossa plataforma de filmes.
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="name">Nome</FieldLabel>
          <Input id="name" minLength={2} type="text" placeholder="Digite seu nome" required {...register("name")}/>
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" placeholder="Digite seu e-mail" required {...register("email")}/>
          <FieldDescription>
            Usaremos este e-mail para entrar em contato. Não comparatilhamos essa informação com nenhuma pessoa.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Senha</FieldLabel>
          <Input id="password" minLength={8} type="password" required {...register("password")}/>
          <FieldDescription>
           Deve ter no mínimo 8 caracteres.
          </FieldDescription>
        </Field>
        <Field>
          <Button type="submit" disabled={isDisabledSignUpAction || isLoading}>Criar conta</Button>
        </Field>
        <span
          className="m-auto text-sm underline-offset-4 font-semibold"
        >
          Tem uma conta? <Link to="/" className="text-primary hover:underline">Faça login</Link>       
        </span>
      </FieldGroup>
    </form>
  )
}
