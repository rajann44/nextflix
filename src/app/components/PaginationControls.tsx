'use client'

import { useRouter } from 'next/navigation'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

interface PaginationControlsProps {
  currentPage: number
  totalPages: number
  hasMore: boolean
  searchQuery: string
  isCategory?: boolean
}

export default function PaginationControls({
  currentPage,
  totalPages,
  hasMore,
  searchQuery,
  isCategory = false,
}: PaginationControlsProps) {
  const router = useRouter()

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return
    if (isCategory) {
      router.push(`/categories/${encodeURIComponent(searchQuery)}?page=${newPage}`)
    } else {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}&page=${newPage}`)
    }
  }

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center gap-1 px-4 py-2 rounded-md ${
          currentPage === 1
            ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
            : 'bg-red-600 text-white hover:bg-red-700'
        }`}
      >
        <ChevronLeftIcon className="w-5 h-5" />
        Previous
      </button>

      <div className="flex items-center gap-2">
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          const pageNum = i + 1
          return (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`w-10 h-10 rounded-md ${
                currentPage === pageNum
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {pageNum}
            </button>
          )
        })}
        {totalPages > 5 && (
          <span className="text-gray-400">...</span>
        )}
      </div>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!hasMore}
        className={`flex items-center gap-1 px-4 py-2 rounded-md ${
          !hasMore
            ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
            : 'bg-red-600 text-white hover:bg-red-700'
        }`}
      >
        Next
        <ChevronRightIcon className="w-5 h-5" />
      </button>
    </div>
  )
} 