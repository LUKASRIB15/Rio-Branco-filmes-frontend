"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/shared/components/button";
import { Field, FieldGroup, FieldLabel } from "@/shared/components/field";
import { Input } from "@/shared/components/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";

const signInFormValidationSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

type SignInFormData = z.infer<typeof signInFormValidationSchema>;

export function SignInForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [isLoading, startLoading] = useTransition();

  const { handleSubmit, register, watch } = useForm<SignInFormData>({
    resolver: zodResolver(signInFormValidationSchema),
  });

  const isDisabledSignInAction = !watch("email") || !watch("password");

  function handleSignIn(data: SignInFormData) {
    console.log(data);
  }

  return (
    <form
      onSubmit={handleSubmit(handleSignIn)}
      className={cn("relative flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Bem vindo!</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Acesse com seu e-mail e senha
          </p>
        </div>
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
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Senha</FieldLabel>
            <a
              href="#"
              className="text-primary ml-auto text-sm underline-offset-4 hover:underline"
            >
              Esqueceu a senha?
            </a>
          </div>
          <Input
            id="password"
            minLength={8}
            type="password"
            required
            {...register("password")}
          />
        </Field>
        <Field>
          <Button type="submit" disabled={isDisabledSignInAction || isLoading}>
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="border-t-primary h-5 w-5 animate-spin rounded-full border-3 border-gray-200" />
              </div>
            ) : (
              "Entre"
            )}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
