'use client'

import { useState, useRef, useEffect } from 'react'
import NetflixLogo from './NetflixLogo'

export default function Header() {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [notifications] = useState([
    {
      id: 1,
      title: 'New Episode Available',
      message: 'The new episode of "Stranger Things" is now available',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      title: 'Continue Watching',
      message: 'Continue watching "The Crown" from where you left off',
      time: '5 hours ago',
      read: true
    },
    {
      id: 3,
      title: 'New Season',
      message: 'Season 2 of "Wednesday" is now available',
      time: '1 day ago',
      read: false
    }
  ])

  const unreadCount = notifications.filter(n => !n.read).length

  // Focus search input when search is shown
  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [showSearch])

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement search functionality
    console.log('Searching for:', searchQuery)
  }

  return (
    <header className="fixed top-0 z-50 flex w-full items-center justify-between px-4 py-4 transition-all lg:px-16 lg:py-6">
      <div className="flex items-center space-x-2 md:space-x-10">
        <NetflixLogo />
        <ul className="hidden space-x-4 md:flex">
          <li className="headerLink">Home</li>
          <li className="headerLink">Music</li>
          <li className="headerLink">Comedy</li>
          <li className="headerLink">Gaming</li>
          <li className="headerLink">Culture</li>
          <li className="headerLink">Lifestyle</li>
          <li className="headerLink">Education</li>
          <li className="headerLink">News</li>
        </ul>
      </div>
      <div className="flex items-center space-x-4 text-sm font-light">
        <div className="relative">
          {showSearch ? (
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
          ) : (
            <button
              onClick={() => setShowSearch(true)}
              className="text-white hover:text-gray-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>
          )}
        </div>
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-md bg-black/90 py-1 shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-4 py-2 text-sm text-gray-300 border-b border-gray-700">
                <p className="font-medium">Notifications</p>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`px-4 py-3 hover:bg-gray-700/50 cursor-pointer ${
                      !notification.read ? 'bg-gray-700/30' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-white">{notification.title}</p>
                        <p className="text-sm text-gray-300 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                      </div>
                      {!notification.read && (
                        <span className="h-2 w-2 rounded-full bg-red-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 border-t border-gray-700">
                <button className="w-full text-center text-sm text-gray-300 hover:text-white">
                  View All Notifications
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="relative">
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <img
              src="https://rb.gy/g1pwyx"
              alt="User"
              className="h-8 w-8 rounded-md"
            />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-4 h-4 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 rounded-md bg-black/90 py-1 shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-4 py-2 text-sm text-gray-300 border-b border-gray-700">
                <p className="font-medium">User Name</p>
                <p className="text-gray-400">user@example.com</p>
              </div>
              <div className="py-1">
                <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Account</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Help Center</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Sign out of Nextflix</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
} 