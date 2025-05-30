import { Metadata } from 'next'
import Header from '../components/Header'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Help Center - Nextflix',
  description: 'Get help with your Nextflix account',
}

export default function HelpCenterPage() {
  return (
    <main className="relative bg-gradient-to-b from-gray-900/10 to-[#010511] min-h-screen">
      <Header />
      
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Help Center</h1>
          
          {/* Search Section */}
          <div className="mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for help"
                className="w-full bg-black/60 border border-gray-700 rounded-md px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-red-600"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-black/60 rounded-lg p-6 hover:bg-black/80 transition-colors">
              <h2 className="text-xl font-semibold mb-4">Account & Billing</h2>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white">How to update payment method</Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white">Change subscription plan</Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white">Cancel membership</Link>
                </li>
              </ul>
            </div>
            <div className="bg-black/60 rounded-lg p-6 hover:bg-black/80 transition-colors">
              <h2 className="text-xl font-semibold mb-4">Watching & Streaming</h2>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white">Streaming quality issues</Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white">Download content</Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white">Parental controls</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Popular Topics */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Popular Topics</h2>
            <div className="space-y-4">
              <div className="bg-black/60 rounded-lg p-6 hover:bg-black/80 transition-colors">
                <h3 className="text-lg font-medium mb-2">How to reset your password</h3>
                <p className="text-gray-400 mb-4">Learn how to reset your password if you've forgotten it or want to change it for security reasons.</p>
                <Link href="#" className="text-red-600 hover:text-red-500">Read more →</Link>
              </div>
              <div className="bg-black/60 rounded-lg p-6 hover:bg-black/80 transition-colors">
                <h3 className="text-lg font-medium mb-2">Streaming on multiple devices</h3>
                <p className="text-gray-400 mb-4">Find out how many devices you can stream on simultaneously with your current plan.</p>
                <Link href="#" className="text-red-600 hover:text-red-500">Read more →</Link>
              </div>
              <div className="bg-black/60 rounded-lg p-6 hover:bg-black/80 transition-colors">
                <h3 className="text-lg font-medium mb-2">Troubleshooting playback issues</h3>
                <p className="text-gray-400 mb-4">Common solutions for video playback problems and streaming quality issues.</p>
                <Link href="#" className="text-red-600 hover:text-red-500">Read more →</Link>
              </div>
            </div>
          </div>

          {/* Contact Support */}
          <div className="bg-black/60 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Need more help?</h2>
            <p className="text-gray-400 mb-6">Our support team is available 24/7 to assist you with any questions or issues.</p>
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </main>
  )
} 