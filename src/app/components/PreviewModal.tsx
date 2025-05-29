import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon, PlusIcon, PlayIcon, ArrowsPointingOutIcon } from '@heroicons/react/24/outline'

interface PreviewModalProps {
  isOpen: boolean
  onClose: () => void
  videoData: {
    title: string
    thumbnail_480_url: string
    duration: number
    channel: string
    'owner.screenname'?: string
    url: string
    created_time: number
  }
}

export default function PreviewModal({ isOpen, onClose, videoData }: PreviewModalProps) {
  if (!isOpen) return null

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
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
          className="fixed inset-0 z-50 overflow-y-auto bg-black/80"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative mx-auto mt-20 max-w-4xl overflow-hidden rounded-lg bg-[#181818] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Video Preview */}
            <div className="relative aspect-video">
              <iframe
                src={embedUrl}
                className="absolute inset-0 h-full w-full"
                allow="autoplay"
                allowFullScreen
              />
              <div className="absolute top-2 right-2 sm:top-4 sm:right-4 flex space-x-2">
                <button
                  onClick={() => {
                    const iframe = document.getElementById('video-iframe') as HTMLIFrameElement;
                    if (iframe.requestFullscreen) {
                      iframe.requestFullscreen();
                    }
                  }}
                  className="rounded-full bg-black/50 p-1.5 sm:p-2 text-white hover:bg-black/70"
                >
                  <ArrowsPointingOutIcon className="h-4 w-4 sm:h-6 sm:w-6" />
                </button>
                <button
                  onClick={onClose}
                  className="rounded-full bg-black/50 p-1.5 sm:p-2 text-white hover:bg-black/70"
                >
                  <XMarkIcon className="h-4 w-4 sm:h-6 sm:w-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-3 sm:p-6">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <button className="flex items-center space-x-2 rounded bg-white px-4 sm:px-6 py-1.5 sm:py-2 text-black hover:bg-gray-200 text-sm sm:text-base">
                  <PlayIcon className="h-4 w-4 sm:h-6 sm:w-6" />
                  <span>Play</span>
                </button>
                <button className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border-2 border-white text-white hover:bg-white/20">
                  <PlusIcon className="h-4 w-4 sm:h-6 sm:w-6" />
                </button>
              </div>

              {/* Metadata */}
              <div className="mt-3 sm:mt-4">
                <h2 className="text-lg sm:text-2xl font-bold text-white line-clamp-2">{videoData.title}</h2>
                <div className="mt-2 flex flex-wrap items-center gap-x-2 text-xs sm:text-sm text-gray-400">
                  <span>{videoData.channel.toUpperCase()}</span>
                  <span>•</span>
                  <span>{formatDuration(videoData.duration)}</span>
                  <span>•</span>
                  <span>Uploaded {formatDate(videoData.created_time)}</span>
                  <span>•</span>
                  <span>HD</span>
                </div>
                {videoData['owner.screenname'] && (
                  <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-300">
                    {videoData['owner.screenname']}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 