import { Metadata } from 'next'
import MovieCard from './components/MovieCard'
import { getMoviesByChannel, getChannels } from './utils/movieData'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Nextflix',
  description: 'A Nextflix built with Next.js and TypeScript',
}

export default async function Home() {
  const channels = await getChannels()
  const channelMovies = await Promise.all(
    channels.map(async (channel) => ({
      channel,
      movies: await getMoviesByChannel(channel)
    }))
  )

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
      <div className="relative h-[33.75vw]">
        <Image
          src="/banner.jpg"
          alt="Banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#010511] via-transparent to-transparent" />
        
        {/* Banner Details */}
        <div className="absolute top-[30%] ml-4 md:ml-16">
          <h1 className="text-3xl h-full w-[50%] font-bold">
            What's Trending @whatstrending
          </h1>
          <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] font-light">
            The biggest headlines in entertainment, digital and more. What's Trending delivers the latest video news for all things pop culture.
          </p>
          <div className="flex flex-row gap-3 mt-3 md:mt-4">
            <button className="bannerButton bg-white text-black">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 md:w-7 md:h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
              </svg>
              Play
            </button>
            <button className="bannerButton bg-[gray]/70">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 md:w-7 md:h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
              More Info
            </button>
          </div>
        </div>
      </div>

      <section className="space-y-8 pb-24 bg-gradient-to-b from-[#010511] via-[#010511]/95 to-[#010511]">
        {channelMovies.map(({ channel, movies }) => (
          <div key={channel} className="space-y-4">
            <h2 className="text-lg md:text-xl px-4 lg:px-16 capitalize">{channel}</h2>
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