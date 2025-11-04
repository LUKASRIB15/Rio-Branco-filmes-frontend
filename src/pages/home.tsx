import { useSession } from "@/contexts/sessions"

export function Home(){
  const {userLogged} = useSession()

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-2xl font-bold">Nome do usuário logado: {userLogged?.name}</h1>
      <p className="text-lg">E-mail do usuário logado: {userLogged?.email}</p> 
    </div>
  )
}