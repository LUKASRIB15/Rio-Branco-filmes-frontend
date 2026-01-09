"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/shared/components/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/shared/components/field";
import { Input } from "@/shared/components/input";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useCreateCinephileAccount } from "@/hooks/use-create-cinephile-account";
import { HttpError } from "@/shared/errors/http-error";
import { toast } from "sonner";
import { toastError, toastWarning } from "@/shared/helpers/toasts";

const signUpFormValidationSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(8),
});

type SignUpFormData = z.infer<typeof signUpFormValidationSchema>;

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const createCinephileAccount = useCreateCinephileAccount();

  const [isLoading, startLoading] = useTransition();

  const { handleSubmit, register, watch } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormValidationSchema),
  });

  const isDisabledSignUpAction =
    !watch("name") || !watch("email") || !watch("password");

  async function handleSignUp(data: SignUpFormData) {
    startLoading(async () => {
      await createCinephileAccount.execute(data);
    });
  }

  return (
    <form
      onSubmit={handleSubmit(handleSignUp)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Crie sua conta</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Seja bem-vindo à nossa plataforma de filmes.
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="name">Nome</FieldLabel>
          <Input
            id="name"
            minLength={2}
            type="text"
            placeholder="Digite seu nome"
            required
            {...register("name")}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="Digite seu e-mail"
            required
            {...register("email")}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Senha</FieldLabel>
          <Input
            id="password"
            minLength={8}
            type="password"
            required
            {...register("password")}
          />
          <FieldDescription>Deve ter no mínimo 8 caracteres.</FieldDescription>
        </Field>
        <Field>
          <Button type="submit" disabled={isDisabledSignUpAction || isLoading}>
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="border-t-primary h-5 w-5 animate-spin rounded-full border-3 border-gray-200" />
              </div>
            ) : (
              "Criar conta"
            )}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
