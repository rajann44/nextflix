import { Metadata } from 'next'
import MovieCard from './components/MovieCard'
import { getAllMovies } from './utils/movieData'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Nextflix',
  description: 'A Nextflix built with Next.js and TypeScript',
}

export default async function Home() {
  const moviesByCategory = await getAllMovies()

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
            <li className="headerLink">Music</li>
            <li className="headerLink">Comedy & Entertainment</li>
            <li className="headerLink">Gaming</li>
            <li className="headerLink">People & Culture</li>
            <li className="headerLink">Lifestyle & How-To</li>
            <li className="headerLink">Education</li>
            <li className="headerLink">News</li>
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
        </div>
      </header>

      {/* Banner */}
      <section className="relative h-[60vh]">
        <Image
          src="/banner.jpg"
          alt="Banner"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#010511] via-[#010511]/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-16">
          <h1 className="text-4xl font-bold text-white md:text-6xl">Welcome to Nextflix</h1>
          <p className="mt-4 max-w-md text-lg text-white md:text-xl">
            Nextflix brings you the latest video news in entertainment, digital, and pop culture.
          </p>
          <div className="mt-4 flex space-x-4">
            <button className="flex items-center space-x-2 rounded bg-white px-5 py-1.5 text-sm font-semibold text-black transition hover:opacity-75 md:px-8 md:py-2.5 md:text-xl">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
              </svg>
              Play
            </button>
            <button className="flex items-center space-x-2 rounded bg-gray-500/70 px-5 py-1.5 text-sm font-semibold text-white transition hover:opacity-75 md:px-8 md:py-2.5 md:text-xl">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
              Follow
            </button>
          </div>
        </div>
      </section>

      {/* Movie Categories */}
      <section className="relative space-y-8 bg-gradient-to-b from-[#010511]/80 to-[#010511]">
        {Object.entries(moviesByCategory).map(([category, movies]) => (
          <div key={category} className="space-y-4">
            <h2 className="px-4 lg:px-16 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
              {category}
            </h2>
            <div className="flex space-x-4 overflow-x-scroll px-4 lg:px-16 scrollbar-hide">
              {movies.map((movie, index) => (
                <MovieCard
                  key={movie.id}
                  {...movie}
                  index={index}
                />
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  )
} 