import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Link } from "react-router"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Bem vindo!</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Acesse com seu e-mail e senha
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" placeholder="Digite seu e-mail" required />
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
          <Input id="password" type="password" required />
        </Field>
        <Field>
          <Button type="submit">Entre</Button>
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
