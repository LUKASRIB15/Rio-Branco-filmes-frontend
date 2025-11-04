import { useSession } from "@/contexts/sessions";
import { PublicRoutes } from "./public.routes";
import { PrivateRoutes } from "./private.routes";

export function RootRoutes(){
  const {userLogged} = useSession()

  return (
    <>
      {
        userLogged ? <PrivateRoutes /> : <PublicRoutes />
      } 
    </>   
  )
}