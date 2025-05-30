import { Metadata } from 'next'
import MovieCard from './components/MovieCard'
import { getAllMovies, channelMap } from './utils/movieData'
import Image from 'next/image'
import Header from './components/Header'
import Link from 'next/link'
import HomeBanner from './components/HomeBanner'

export const metadata: Metadata = {
  title: 'Nextflix',
  description: 'A Nextflix built with Next.js and TypeScript',
}

export default async function Home() {
  const moviesByCategory = await getAllMovies()

  return (
    <main className="relative bg-gradient-to-b from-gray-900/10 to-[#010511]">
      <Header />

      {/* Banner */}
      <HomeBanner />

      {/* Movie Categories */}
      <section className="relative space-y-8 bg-gradient-to-b from-[#010511]/80 to-[#010511]">
        {Object.entries(moviesByCategory).map(([category, movies]) => (
          <div key={category} className="space-y-4">
            <Link href={`/categories/${channelMap[category as keyof typeof channelMap].slug}`}>
              <h2 className="px-4 lg:px-16 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
                {category}
              </h2>
            </Link>
            <div className="flex space-x-4 overflow-x-scroll px-4 lg:px-16 scrollbar-hide">
              {movies.slice(0, 10).map((movie, index) => (
                <MovieCard
                  key={movie.id}
                  {...movie}
                  index={index}
                />
              ))}
            </div>
            <div className="px-4 lg:px-16">
              <Link
                href={`/categories/${channelMap[category as keyof typeof channelMap].slug}`}
                className="text-sm text-gray-400 hover:text-white transition duration-200"
              >
                See all →
              </Link>
            </div>
          </div>
        ))}
      </section>
    </main>
  )
} 