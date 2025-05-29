import { Metadata } from 'next'
import MovieCard from './components/MovieCard'
import Banner from './components/Banner'

export const metadata: Metadata = {
  title: 'Netflix Clone',
  description: 'A Netflix clone built with Next.js and TypeScript',
}

const movies = [
  {
    title: 'Stranger Things',
    image: 'https://image.tmdb.org/t/p/original/49WJfeN0moxb9IPfGn8AIqMGskD.jpg',
    description: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.',
    rating: '98% Match',
    year: '2016',
    duration: '4 Seasons'
  },
  {
    title: 'The Witcher',
    image: 'https://image.tmdb.org/t/p/original/7vjaCdMw15FEbXyLQTVa04URsPm.jpg',
    description: 'Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world where people often prove more wicked than beasts.',
    rating: '95% Match',
    year: '2019',
    duration: '3 Seasons'
  },
  {
    title: 'Money Heist',
    image: 'https://image.tmdb.org/t/p/original/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg',
    description: 'Eight thieves take hostages and lock themselves in the Royal Mint of Spain as a criminal mastermind manipulates the police to carry out his plan.',
    rating: '97% Match',
    year: '2017',
    duration: '5 Seasons'
  },
  {
    title: 'Dark',
    image: 'https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg',
    description: 'A missing child sets four families on a frantic hunt for answers as they unearth a mind-bending mystery that spans three generations.',
    rating: '96% Match',
    year: '2017',
    duration: '3 Seasons'
  },
  {
    title: 'The Crown',
    image: 'https://image.tmdb.org/t/p/original/qZtAf8bZgqvM7Hgp3daiE6ME5xb.jpg',
    description: 'This drama follows the political rivalries and romance of Queen Elizabeth II\'s reign and the events that shaped the second half of the 20th century.',
    rating: '94% Match',
    year: '2016',
    duration: '6 Seasons'
  },
  {
    title: 'Breaking Bad',
    image: 'https://image.tmdb.org/t/p/original/3xwBYGxJXZ1gB5X1g6L9kq1KTlm.jpg',
    description: 'A high school chemistry teacher turned methamphetamine manufacturer partners with a former student to secure his family\'s financial future.',
    rating: '99% Match',
    year: '2008',
    duration: '5 Seasons'
  },
  {
    title: 'Peaky Blinders',
    image: 'https://image.tmdb.org/t/p/original/wiE9doxiLwq3WCGamDIOb2PqBqc.jpg',
    description: 'A notorious gang in 1919 Birmingham, England, is led by the fierce Tommy Shelby, a crime boss set on moving up in the world no matter the cost.',
    rating: '98% Match',
    year: '2013',
    duration: '6 Seasons'
  },
  {
    title: 'The Queen\'s Gambit',
    image: 'https://image.tmdb.org/t/p/original/34OGjFEbHj0E3lE2w0iTUVq0CBz.jpg',
    description: 'In a 1950s orphanage, a young girl reveals an astonishing talent for chess and begins an unlikely journey to stardom while grappling with addiction.',
    rating: '97% Match',
    year: '2020',
    duration: '1 Season'
  }
]

const categories = [
  'Action',
  'Adventure',
  'Animation',
  'Comedy',
  'Crime',
  'Documentary',
  'Drama',
  'Family',
  'Fantasy',
  'History',
  'Horror',
  'Music',
  'Mystery',
  'Romance',
  'Science Fiction',
  'TV Movie',
  'Thriller',
  'War',
  'Western'
]

export default function Home() {
  return (
    <main className="relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh]">
      {/* Header */}
      <header className="fixed top-0 z-50 flex w-full items-center justify-between px-4 py-4 transition-all lg:px-10 lg:py-6">
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
        title="Stranger Things"
        description="When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl."
        rating="98% Match"
        year="2016"
        seasons="4 Seasons"
      />

      {/* Content Rows */}
      <section className="space-y-24 pb-24">
        {/* Trending Now */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold md:text-4xl">Trending Now</h2>
          <div className="flex space-x-4 overflow-x-scroll p-4 scrollbar-hide">
            {movies.map((movie, index) => (
              <MovieCard
                key={movie.title}
                {...movie}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Popular on Netflix */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold md:text-4xl">Popular on Netflix</h2>
          <div className="flex space-x-4 overflow-x-scroll p-4 scrollbar-hide">
            {movies.slice(0, 6).map((movie, index) => (
              <MovieCard
                key={movie.title}
                {...movie}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Continue Watching */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold md:text-4xl">Continue Watching</h2>
          <div className="flex space-x-4 overflow-x-scroll p-4 scrollbar-hide">
            {movies.slice(2, 8).map((movie, index) => (
              <MovieCard
                key={movie.title}
                {...movie}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* My List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold md:text-4xl">My List</h2>
          <div className="flex space-x-4 overflow-x-scroll p-4 scrollbar-hide">
            {movies.slice(4, 8).map((movie, index) => (
              <MovieCard
                key={movie.title}
                {...movie}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Award-Winning TV Shows */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold md:text-4xl">Award-Winning TV Shows</h2>
          <div className="flex space-x-4 overflow-x-scroll p-4 scrollbar-hide">
            {movies.slice(0, 4).map((movie, index) => (
              <MovieCard
                key={movie.title}
                {...movie}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Watch Again */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold md:text-4xl">Watch Again</h2>
          <div className="flex space-x-4 overflow-x-scroll p-4 scrollbar-hide">
            {movies.slice(3, 7).map((movie, index) => (
              <MovieCard
                key={movie.title}
                {...movie}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* New Releases */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold md:text-4xl">New Releases</h2>
          <div className="flex space-x-4 overflow-x-scroll p-4 scrollbar-hide">
            {movies.slice(1, 5).map((movie, index) => (
              <MovieCard
                key={movie.title}
                {...movie}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold md:text-4xl">Categories</h2>
          <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
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

        {/* Top 10 in TV Shows Today */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold md:text-4xl">Top 10 in TV Shows Today</h2>
          <div className="flex space-x-4 overflow-x-scroll p-4 scrollbar-hide">
            {movies.slice(0, 5).map((movie, index) => (
              <div key={movie.title} className="relative">
                <div className="absolute -left-2 -top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-xl font-bold">
                  {index + 1}
                </div>
                <MovieCard {...movie} index={index} />
              </div>
            ))}
          </div>
        </div>

        {/* Netflix Originals */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold md:text-4xl">Netflix Originals</h2>
          <div className="flex space-x-4 overflow-x-scroll p-4 scrollbar-hide">
            {movies.slice(2, 6).map((movie, index) => (
              <MovieCard key={movie.title} {...movie} index={index} />
            ))}
          </div>
        </div>

        {/* Because You Watched */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold md:text-4xl">Because You Watched</h2>
          <div className="flex space-x-4 overflow-x-scroll p-4 scrollbar-hide">
            {movies.slice(4, 8).map((movie, index) => (
              <MovieCard key={movie.title} {...movie} index={index} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
} 