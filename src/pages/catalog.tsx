import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { HomeLayout } from "@/layouts/home";

export function Catalog(){
  const inDevelopment = false

  if(!inDevelopment){
    return (
      <HomeLayout>
        <div className="flex flex-1 flex-col items-center justify-center gap-3 ">
          <h1 className="text-3xl">Catálogo de filmes</h1>
          <p>Em breve...</p>
        </div> 
      </HomeLayout>
    )
    
  }

  return (
    <HomeLayout>
      {Array.from({length: 4}).map(()=>{
        return (
          <div className="flex flex-col gap-4 p-12">
            <p className="text-foreground text-sm sm:text-base md:text-xl lg:text-2xl text-balance">Principais séries de ficção científica e fantasia</p>
            <Carousel
              opts={{
                align: "start",
              }}
              orientation="horizontal"
              className="w-full"
            >
              <CarouselContent className="-mt-1">
                {Array.from({ length: 15 }).map((_, index) => (
                  <CarouselItem key={index} className="min-w-40 basis-1/3 md:basis-1/6 lg:basis-1/7">
                    <div className="p-1">
                      <Card className="overflow-hidden rounded-md"> 
                        <CardContent className="flex items-center justify-center p-6">
                          <span className="text-3xl font-semibold">{index + 1}</span>
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
      })}
    </HomeLayout>
  )
}