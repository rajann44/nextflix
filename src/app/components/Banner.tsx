'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface BannerProps {
  title: string
  description: string
  rating: string
  year: string
  seasons: string
}

export default function Banner({ title, description, rating, year, seasons }: BannerProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  return (
    <div className="relative pb-24 lg:space-y-8 lg:pl-16">
      <div className="flex max-w-6xl flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-8">
        <div className="absolute left-0 top-0 -z-10 h-[57vh] w-screen">
          <img
            src={`https://picsum.photos/1920/1080?random=${Date.now()}`}
            alt="Banner"
            className={`h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setIsImageLoaded(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold md:text-4xl lg:text-7xl"
        >
          {title}
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center space-x-2 text-sm"
        >
          <span className="font-semibold text-green-500">{rating}</span>
          <span className="text-gray-400">{year}</span>
          <span className="border border-gray-400 px-1 text-xs">TV-MA</span>
          <span className="text-gray-400">{seasons}</span>
          <span className="border border-gray-400 px-1 text-xs">HD</span>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-xs text-xs font-light text-shadow-md md:max-w-lg md:text-sm lg:max-w-2xl lg:text-base"
        >
          {description}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="flex space-x-3 mt-4"
      >
        <button className="bannerButton bg-white text-black">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
          </svg>
          Play
        </button>
        <button className="bannerButton bg-[gray]/70">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
          More Info
        </button>
      </motion.div>
    </div>
  )
} 