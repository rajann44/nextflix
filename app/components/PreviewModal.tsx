import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon, PlusIcon, PlayIcon } from '@heroicons/react/24/outline'

interface PreviewModalProps {
  isOpen: boolean
  onClose: () => void
  videoData: {
    title: string
    thumbnail_480_url: string
    duration: number
    channel: string
    'owner.screenname': string
    url: string
  }
}

export default function PreviewModal({ isOpen, onClose, videoData }: PreviewModalProps) {
  if (!isOpen) return null

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  // Extract video ID from the URL
  const videoId = videoData.url.split('/').pop()?.split('?')[0]
  const embedUrl = `https://www.dailymotion.com/embed/video/${videoId}?autoplay=1&mute=1`

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 overflow-y-auto"
          onClick={onClose}
        >
          <div className="min-h-screen px-4 text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative inline-block w-[850px] my-8 text-left align-middle bg-[#181818] rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Video Preview */}
              <div className="relative aspect-video">
                <iframe
                  src={embedUrl}
                  className="w-full h-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 rounded bg-white px-6 py-2 text-black hover:bg-gray-200">
                    <PlayIcon className="h-6 w-6" />
                    <span>Play</span>
                  </button>
                  <button className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-white hover:bg-white/20">
                    <PlusIcon className="h-6 w-6" />
                  </button>
                </div>

                {/* Metadata */}
                <div className="mt-4">
                  <h2 className="text-2xl font-bold text-white">{videoData.title}</h2>
                  <div className="mt-2 flex items-center space-x-2 text-sm text-gray-400">
                    <span>{videoData.channel.toUpperCase()}</span>
                    <span>•</span>
                    <span>{formatDuration(videoData.duration)}</span>
                    <span>•</span>
                    <span>HD</span>
                  </div>
                  <p className="mt-4 text-sm text-gray-300">
                    {videoData['owner.screenname']}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 