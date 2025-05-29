'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import PreviewModal from './PreviewModal'

interface MovieCardProps {
  title: string
  thumbnail_480_url: string
  index: number
  channel: string
  'owner.screenname'?: string
  duration: number
  url: string
  created_time: number
}

export default function MovieCard({ 
  title, 
  thumbnail_480_url, 
  index,
  channel,
  'owner.screenname': ownerScreenname = '',
  duration,
  url,
  created_time
}: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  }

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M views`
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K views`
    }
    return `${views} views`
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="relative h-[157px] w-[279px] flex-shrink-0 cursor-pointer transition duration-300 ease-out md:hover:scale-110 md:hover:z-20"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsPreviewOpen(true)}
      >
        <img
          src={thumbnail_480_url}
          alt={title}
          className="h-[157px] w-[279px] rounded-sm object-cover md:rounded"
        />
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-10 flex flex-col justify-between bg-black/90 p-2 md:p-4 rounded"
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
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">{title}</h3>
              <p className="text-xs text-gray-400">{channel}</p>
              <p className="text-xs text-gray-400">{formatDuration(duration)}</p>
              <p className="text-xs text-gray-400">Uploaded {formatDate(created_time)}</p>
            </div>
          </motion.div>
        )}
      </motion.div>

      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        videoData={{
          title,
          thumbnail_480_url,
          duration,
          channel,
          'owner.screenname': ownerScreenname,
          url,
          created_time
        }}
      />
    </>
  )
} 