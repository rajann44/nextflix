import { Metadata } from 'next'
import MovieCard from './components/MovieCard'
import Banner from './components/Banner'
import { getMoviesByCategory, getCategories } from './utils/movieData'

export const metadata: Metadata = {
  title: 'Nextflix',
  description: 'A Nextflix built with Next.js and TypeScript',
}

export default function Home() {
  const trendingMovies = getMoviesByCategory('trending')
  const popularMovies = getMoviesByCategory('popular')
  const continueWatchingMovies = getMoviesByCategory('continueWatching')
  const myListMovies = getMoviesByCategory('myList')
  const categories = getCategories()

  return (
    <main className="relative bg-gradient-to-b from-gray-900/10 to-[#010511]">
      {/* Header */}
      <header className="fixed top-0 z-50 flex w-full items-center justify-between px-4 py-4 transition-all lg:px-16 lg:py-6">
        <div className="flex items-center space-x-2 md:space-x-10">
          <img
            src="https://rb.gy/ulxxee"
            alt="Netflix"
            width={120}
            height={120}
            className="cursor-pointer object-contain"
          />
          <ul className="hidden space-x-4 md:flex">
            <li className="headerLink">Home</li>
            <li className="headerLink">TV Shows</li>
            <li className="headerLink">Movies</li>
            <li className="headerLink">New & Popular</li>
            <li className="headerLink">My List</li>
          </ul>
        </div>
        <div className="flex items-center space-x-4 text-sm font-light">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <p className="hidden cursor-pointer lg:inline">Kids</p>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>
          <img
            src="https://rb.gy/g1pwyx"
            alt=""
            className="cursor-pointer rounded"
          />
        </div>
      </header>

      {/* Banner */}
      <Banner
        title={trendingMovies[0].title}
        description={trendingMovies[0].description}
        rating={trendingMovies[0].rating}
        year={trendingMovies[0].year}
        seasons={trendingMovies[0].duration}
      />

      {/* Content Rows */}
      <section className="space-y-8 pb-24">
        {/* Trending Now */}
        <div className="space-y-4">
          <h2 className="text-lg md:text-xl px-4 lg:px-16">Trending Now</h2>
          <div className="flex space-x-4 overflow-x-scroll px-4 lg:px-16 scrollbar-hide">
            {trendingMovies.map((movie, index) => (
              <MovieCard
                key={movie.id}
                {...movie}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Popular on Netflix */}
        <div className="space-y-4">
          <h2 className="text-lg md:text-xl px-4 lg:px-16">Popular on Netflix</h2>
          <div className="flex space-x-4 overflow-x-scroll px-4 lg:px-16 scrollbar-hide">
            {popularMovies.map((movie, index) => (
              <MovieCard
                key={movie.id}
                {...movie}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Continue Watching */}
        <div className="space-y-4">
          <h2 className="text-lg md:text-xl px-4 lg:px-16">Continue Watching</h2>
          <div className="flex space-x-4 overflow-x-scroll px-4 lg:px-16 scrollbar-hide">
            {continueWatchingMovies.map((movie, index) => (
              <MovieCard
                key={movie.id}
                {...movie}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* My List */}
        <div className="space-y-4">
          <h2 className="text-lg md:text-xl px-4 lg:px-16">My List</h2>
          <div className="flex space-x-4 overflow-x-scroll px-4 lg:px-16 scrollbar-hide">
            {myListMovies.map((movie, index) => (
              <MovieCard
                key={movie.id}
                {...movie}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-4">
          <h2 className="text-lg md:text-xl px-4 lg:px-16">Categories</h2>
          <div className="grid grid-cols-2 gap-4 px-4 lg:px-16 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {categories.map((category) => (
              <div
                key={category}
                className="cursor-pointer rounded bg-gray-800 p-4 text-center text-sm font-semibold transition hover:bg-gray-700"
              >
                {category}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
} 