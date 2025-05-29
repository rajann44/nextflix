import { Metadata } from 'next'
import Header from '../components/Header'
import MovieCard from '../components/MovieCard'
import { getSearchResults } from '../utils/movieData'
import PaginationControls from '../components/PaginationControls'
import { DailymotionVideo } from '../types/dailymotion'

interface SearchPageProps {
  searchParams: {
    q?: string
    page?: string
  }
}

export const metadata: Metadata = {
  title: 'Search - Nextflix',
  description: 'Search results on Nextflix',
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const searchQuery = searchParams.q || ''
  const currentPage = Number(searchParams.page) || 1
  const searchData = searchQuery ? await getSearchResults(searchQuery, currentPage) : { results: [], pagination: { currentPage: 1, hasMore: false, totalPages: 0, totalResults: 0 } }

  return (
    <main className="relative bg-gradient-to-b from-gray-900/10 to-[#010511]">
      <Header />
      
      <div className="pt-24 pb-16">
        <div className="px-4 md:px-16">
          <h1 className="text-2xl font-bold md:text-4xl mb-8">
            Search Results for: {searchQuery}
          </h1>
          
          {searchQuery ? (
            <div>
              {searchData.results.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {searchData.results.map((movie: DailymotionVideo, index: number) => (
                      <div key={movie.id} className="aspect-[16/9]">
                        <MovieCard
                          {...movie}
                          index={index}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 flex justify-center">
                    <PaginationControls
                      currentPage={searchData.pagination.currentPage}
                      totalPages={searchData.pagination.totalPages}
                      hasMore={searchData.pagination.hasMore}
                      searchQuery={searchQuery}
                    />
                  </div>
                </>
              ) : (
                <div className="text-gray-400">
                  <p>No results found for "{searchQuery}"</p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-gray-400">
              <p>Please enter a search term to see results.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
} 