import { CarouselMovies, CarouselMovieSkeleton } from "@/components/carousel-movies";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useMovies } from "@/contexts/movies";
import { HomeLayout } from "@/layouts/home";
import { removeUserFromStorage } from "@/storage/sessions-storage";
import { AxiosError } from "axios";
import { useEffect, useState, useTransition } from "react";

export function Catalog(){
  const {fetchAllCategories, popularMovies, topRatedMovies, upcomingMovies} = useMovies()
  const [isLoading, startLoading] = useTransition()

  useEffect(()=>{
    startLoading(async()=>{
      try{
        await new Promise(resolve => setTimeout(resolve, 3000))
        await fetchAllCategories()
      }catch(error){
        if(error instanceof AxiosError){
          switch(error.status){
            case 401: 
              alert('Seu tempo de acesso está expirado. Acesse nossa plataforma novamente')
              removeUserFromStorage()
              break;
          }
        }
      }
    })
  }, [])

  return (
    <HomeLayout>
      {
        isLoading ? (
          <>
            <CarouselMovieSkeleton />
            <CarouselMovieSkeleton />
            <CarouselMovieSkeleton />
          </>
        ) : (
          <>
            <CarouselMovies title="Filmes em Alta nesses últimos dias" movies={popularMovies}/>
            <CarouselMovies title="Filmes mais bem Avaliados" movies={topRatedMovies}/>
            <CarouselMovies title="Filmes em Lançamento" movies={upcomingMovies}/>
          </>
        )
      }
    </HomeLayout>
  )
}