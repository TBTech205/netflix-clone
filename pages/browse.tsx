import { NextPageContext } from "next"
import { getSession } from "next-auth/react"
import useMovieList from "@/hooks/useMovieList"

import Navbar from "@/components/Navbar"
import Billboard from "@/components/billboard"
import MovieList from "@/components/MovieList"
import useFavorites from "@/hooks/useFavorites"

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)
  
  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  return {
    props: {
      session
    }
  }
}

const Home = () => {
  const { data: movies = [] } = useMovieList()
  const { data: favorites = [] } = useFavorites();

  return (
    <>
      <Navbar />
      <Billboard />
      
      <div className="pb-5">
        <MovieList title="Trending Now" data={movies} />
      </div>
      
      <div className="pb-5">
        <MovieList title="My List" data={favorites} />
      </div>
    </>
  )
}

export default Home;