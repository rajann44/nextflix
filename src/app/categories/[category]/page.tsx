import { Metadata } from 'next'
import Header from '../../components/Header'
import MovieCard from '../../components/MovieCard'
import { getMoviesByCategory, getCategoryTitleFromSlug } from '../../utils/movieData'
import PaginationControls from '../../components/PaginationControls'
import SortButton from '../../components/SortButton'
import { DailymotionVideo } from '../../types/dailymotion'

interface CategoryPageProps {
  params: {
    category: string
  }
  searchParams: {
    page?: string
    sort?: string
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const categoryTitle = getCategoryTitleFromSlug(params.category) || params.category
  return {
    title: `${categoryTitle} - Nextflix`,
    description: `Browse ${categoryTitle} videos on Nextflix`,
  }
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const categoryTitle = getCategoryTitleFromSlug(params.category) || params.category
  const currentPage = Number(searchParams.page) || 1
  const currentSort = searchParams.sort || 'trending'
  const { results: movies, pagination } = await getMoviesByCategory(params.category, currentPage, 20, currentSort)

  return (
    <main className="relative bg-gradient-to-b from-gray-900/10 to-[#010511]">
      <Header />
      
      <div className="pt-24 pb-16">
        <div className="px-4 md:px-16">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold md:text-4xl">
              {categoryTitle}
            </h1>
            <SortButton isCategory={true} />
          </div>
          
          {movies && movies.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {movies.map((movie: DailymotionVideo, index: number) => (
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
                  currentPage={pagination.currentPage}
                  totalPages={pagination.totalPages}
                  hasMore={pagination.hasMore}
                  searchQuery={params.category}
                  isCategory={true}
                />
              </div>
            </>
          ) : (
            <div className="text-gray-400">
              <p>No videos found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
} 