'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { slugify } from '../utils/movieData'

export default function SearchBar() {
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)
  const searchParams = useSearchParams()
  const router = useRouter()

  // Set search query from URL when component mounts or URL changes
  useEffect(() => {
    const query = searchParams.get('q')
    if (query) {
      setSearchQuery(query.split('-').join(' '))
      setShowSearch(true)
    }
  }, [searchParams])

  // Focus search input when search is shown
  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [showSearch])

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      const slugifiedQuery = slugify(searchQuery.trim())
      router.push(`/search?q=${slugifiedQuery}`)
      setShowSearch(false)
      setSearchQuery('')
    }
  }

  if (showSearch) {
    return (
      <form onSubmit={handleSearch} className="relative">
        <input
          ref={searchInputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Titles, people, genres"
          className="w-[300px] bg-black/80 border border-white/20 rounded px-4 py-1.5 text-white placeholder-gray-400 focus:outline-none focus:border-white/40"
        />
        <button
          type="button"
          onClick={() => {
            setShowSearch(false)
            setSearchQuery('')
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </form>
    )
  }

  return (
    <button
      onClick={() => setShowSearch(true)}
      className="text-white hover:text-gray-300"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    </button>
  )
} 