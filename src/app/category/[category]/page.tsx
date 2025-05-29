import { Metadata } from 'next'
import Header from '../../components/Header'
import MovieCard from '../../components/MovieCard'
import { getMoviesByCategory } from '../../utils/movieData'

interface Movie {
  id: string
  title: string
  thumbnail_480_url: string
  channel: string
  'owner.screenname'?: string
  duration: number
  url: string
}

interface CategoryPageProps {
  params: {
    category: string
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const decodedCategory = decodeURIComponent(params.category)
  return {
    title: `${decodedCategory} - Nextflix`,
    description: `Browse ${decodedCategory} content on Nextflix`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const decodedCategory = decodeURIComponent(params.category)
  const movies = await getMoviesByCategory(decodedCategory)

  return (
    <main className="relative bg-gradient-to-b from-gray-900/10 to-[#010511]">
      <Header />
      
      <div className="pt-24 pb-16">
        <div className="px-4 md:px-16">
          <h1 className="text-2xl font-bold md:text-4xl mb-8">{decodedCategory}</h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie: Movie, index: number) => (
              <div key={movie.id} className="aspect-[16/9]">
                <MovieCard
                  {...movie}
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
} 