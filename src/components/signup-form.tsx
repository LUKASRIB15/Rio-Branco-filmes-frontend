import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Link } from "react-router"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Crie sua conta</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Seja bem-vindo à nossa plataforma de filmes.
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="name">Nome</FieldLabel>
          <Input id="name" type="text" placeholder="Digite seu nome" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" placeholder="Digite seu e-mail" required />
          <FieldDescription>
            Usaremos este e-mail para entrar em contato. Não comparatilhamos essa informação com nenhuma pessoa.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Senha</FieldLabel>
          <Input id="password" type="password" required />
          <FieldDescription>
           Deve ter no mínimo 8 caracteres.
          </FieldDescription>
        </Field>
        <Field>
          <Button type="submit">Criar conta</Button>
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
