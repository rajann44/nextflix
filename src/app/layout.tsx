import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from './components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nextflix',
  description: 'A Nextflix built with Next.js and TypeScript',
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        type: 'image/x-icon',
      }
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-netflix-black text-white min-h-screen flex flex-col`}>
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
} 