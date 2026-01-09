import Image from "next/image";
import LogoSvg from "@/assets/logo.svg";
import BackgroundJpg from "@/assets/background.jpg";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/tabs";
import { SignInForm } from "@/components/sign-in-form";
import { SignUpForm } from "@/components/sign-up-form";

export default function AuthPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="bg-muted relative m-4 hidden overflow-hidden rounded-lg lg:block">
        <Image
          src={BackgroundJpg}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.9]"
          quality={100}
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md" />
            Rio Branco Filmes
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="relative flex h-full w-full max-w-xs items-center">
            <Tabs defaultValue="sign-in" className="w-full">
              <TabsList className="absolute top-0 left-1/2 w-full -translate-x-1/2">
                <TabsTrigger value="sign-in">Entrar</TabsTrigger>
                <TabsTrigger value="sign-up">Cadastrar</TabsTrigger>
              </TabsList>
              <TabsContent value="sign-in">
                <SignInForm />
              </TabsContent>
              <TabsContent value="sign-up">
                <SignUpForm />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
