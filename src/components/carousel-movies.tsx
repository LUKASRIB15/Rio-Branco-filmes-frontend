import type { MovieDTO } from "@/contexts/movies";
import { Card, CardContent } from "./ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Star } from "lucide-react";

type CarouselMoviesProps = {
  title: string
  movies: MovieDTO[]
}

export function CarouselMovies({title, movies}: CarouselMoviesProps){
  return (
    <div className="flex flex-col gap-4 p-12">
      <p className="text-foreground text-sm sm:text-base md:text-xl lg:text-2xl text-balance">{title}</p>
      <Carousel
        opts={{
          align: "start",
        }}
        orientation="horizontal"
        className="w-full"
      >
        <CarouselContent className="-mt-1">
          {movies.map((movie) => (
            <CarouselItem key={movie.id} className="group min-w-50 basis-1/3 md:basis-1/5 lg:basis-1/6 hover:scale-105 transition-all overflow-hidden">
              <div className="p-1">
                <Card className="overflow-hidden rounded-md"> 
                  <CardContent className="flex flex-col hover:cursor-pointer relative">
                    <img src={movie.imageUrl} alt={movie.title} className="w-full h-[231px]"/>
                      <div className="absolute bottom-0 right-0 left-0 flex  pb-4 flex-col items-center justify-center bg-background opacity-90 translate-y-full p-2 backdrop-blur-sm transition-transform duration-300 group-hover:translate-y-0">
                        <p className=" font-semibold text-xs text-center line-clamp-1">{movie.title}</p>
                        <div className="flex items-center gap-2">
                          <Star fill="#ffd230" color="#ffd230" size={16}/>
                          <span className="text-sm text-muted-foreground">{movie.rating.toFixed(1)}</span>
                        </div>
                      </div>
                    
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 disabled:hidden"/>
        <CarouselNext className="right-2 disabled:hidden"/>
      </Carousel>
    </div>
  )
}

export function CarouselMovieSkeleton(){
  return (
    <div className="flex flex-col gap-4 p-12">
      <div className="h-7 max-w-[400px] bg-muted-foreground opacity-10 rounded-md animate-pulse"/>
      <div className="flex items-center gap-4 overflow-hidden">
      {
        Array.from({length: 10}).map((_, index ) => {
          return (
            <div key={index} className="min-w-40 basis-1/3 md:basis-1/6 lg:basis-1/7">
              <div className="p-1">
                <div className="overflow-hidden rounded-md w-40 h-[231px] bg-muted-foreground opacity-10 animate-pulse"/>
              </div>
            </div>
          )
        })
      }
      </div>
    </div>
  )
}