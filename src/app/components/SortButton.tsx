'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

interface SortButtonProps {
  isCategory?: boolean
}

export default function SortButton({ isCategory = false }: SortButtonProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)

  const currentSort = searchParams.get('sort') || 'trending'
  const currentPage = searchParams.get('page') || '1'
  const currentQuery = searchParams.get('q') || ''
  const currentCategory = window.location.pathname.split('/').pop() || ''

  const sortOptions = [
    { value: 'trending', label: 'Trending' },
    { value: 'recent', label: 'Recently Added' },
    { value: 'relevance', label: 'Relevance' },
    { value: 'visited', label: 'Most Viewed' },
    { value: 'popular', label: 'Popular' },
    { value: 'updated_time', label: 'Recently Updated' }
  ]

  const handleSort = (sortValue: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('sort', sortValue)
    params.set('page', '1') // Reset to first page when changing sort

    if (isCategory) {
      router.push(`/categories/${currentCategory}?${params.toString()}`)
    } else {
      router.push(`/search?q=${currentQuery}&${params.toString()}`)
    }
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
      >
        <span>Sort by: {sortOptions.find(opt => opt.value === currentSort)?.label}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSort(option.value)}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  currentSort === option.value
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
                role="menuitem"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 