'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function HomeBanner() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    setImageUrl(`https://picsum.photos/1920/1080?random=${Date.now()}`)
  }, []) // Empty dependency array means this runs only once on mount

  return (
    <section className="relative h-[60vh]">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="Banner"
          fill
          priority
          className={`object-cover transition-opacity duration-1000 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsLoaded(true)}
        />
      )}
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
  )
} 