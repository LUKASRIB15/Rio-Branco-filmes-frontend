import { HomeLayout } from "@/layouts/home";

export function WatchList(){
  return (
    <HomeLayout>
      <div className="flex flex-1 flex-col items-center justify-center gap-3">
        <h1 className="text-3xl">Filmes para Assistir</h1>
        <p>Em breve...</p>
      </div>
    </HomeLayout>
  )
}