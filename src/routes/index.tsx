import { useSession } from "@/contexts/sessions";
import { PublicRoutes } from "./public.routes";
import { PrivateRoutes } from "./private.routes";
import { MoviesProvider } from "@/contexts/movies";

export function RootRoutes(){
  const {userLogged} = useSession()

  return (
    <>
      {
        userLogged ? (
          <MoviesProvider>
            <PrivateRoutes />
          </MoviesProvider>
        ) : (
          <PublicRoutes />
        )
      } 
    </>   
  )
}