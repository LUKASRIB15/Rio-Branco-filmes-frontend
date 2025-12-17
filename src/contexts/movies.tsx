import { api } from "@/services/axios";
import { createContext, useContext, useState, type ReactNode } from "react";
import { useSession } from "./sessions";

export type MovieDTO = {
  id: string
  title: string
  imageUrl: string
  releaseDate: string
  rating: number
}

type MoviesContextProps = {
  popularMovies: MovieDTO[]
  topRatedMovies: MovieDTO[]
  upcomingMovies: MovieDTO[]
  fetchAllCategories: () => Promise<void>
}

const MoviesContext = createContext({} as MoviesContextProps)

export function MoviesProvider({children}:{children:ReactNode}){
  const {accessToken} = useSession()

  const [popularMovies, setPopularMovies] = useState<MovieDTO[]>([])
  const [topRatedMovies, setTopRatedMovies] = useState<MovieDTO[]>([])
  const [upcomingMovies, setUpcomingMovies] = useState<MovieDTO[]>([])

  async function fetchAllCategories(){
    try{
      const response = await api.get('/movie/home', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
      const {popular, topRated, upcoming} = response.data

      setPopularMovies(popular)
      setTopRatedMovies(topRated)
      setUpcomingMovies(upcoming)
    }catch(error){
      throw error
    }
  }

  return (
    <MoviesContext.Provider value={{
      popularMovies,
      topRatedMovies,
      upcomingMovies,
      fetchAllCategories
    }}>
      {children}
    </MoviesContext.Provider>
  )
}

export const useMovies = () => useContext(MoviesContext)