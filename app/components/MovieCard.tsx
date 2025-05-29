'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface MovieCardProps {
  title: string
  image: string
  index: number
  description?: string
  rating?: string
  year?: string
  duration?: string
}

export default function MovieCard({ 
  title, 
  image, 
  index,
  description,
  rating,
  year,
  duration 
}: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative h-[157px] w-[279px] flex-shrink-0 cursor-pointer transition duration-200 ease-out md:hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={image}
        alt={title}
        className="h-[157px] w-[279px] rounded-sm object-cover md:rounded"
      />
      {isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 z-10 flex flex-col justify-between bg-black/80 p-2 md:p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black hover:bg-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                </svg>
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-white hover:bg-white/20">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-white hover:bg-white/20">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>
              </button>
            </div>
            <button className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-white hover:bg-white/20">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <span className="font-semibold text-green-500">{rating}</span>
              <span className="text-gray-400">{year}</span>
              <span className="text-gray-400">{duration}</span>
            </div>
            <p className="text-xs text-gray-400 line-clamp-2">{description}</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
} 