import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export function Error404(){
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="font-semibold text-3xl">Ops! Página não encontrada.</h1>
      <p className="text-base">
        Parece que você tentou acessar um endereço que não existe ou foi removido. 
        Mas não se preocupe, você pode voltar para a página inicial e continuar explorando o que temos preparado para você. 
        Se acha que isso é um erro, entre em contato conosco. Estamos aqui para ajudar!
      </p>
      <Button 
        className="w-full"
        onClick={()=> navigate('/')}
      >
        Voltar para página inicial
      </Button>
    </div>
  )
}