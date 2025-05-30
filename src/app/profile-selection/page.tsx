import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Who\'s Watching - Nextflix',
  description: 'Select your profile to continue',
}

const profiles = [
  {
    id: 1,
    name: 'John',
    avatar: 'https://rb.gy/g1pwyx',
  },
  {
    id: 2,
    name: 'Sarah',
    avatar: 'https://rb.gy/g1pwyx',
  },
  {
    id: 3,
    name: 'Mike',
    avatar: 'https://rb.gy/g1pwyx',
  },
  {
    id: 4,
    name: 'Emma',
    avatar: 'https://rb.gy/g1pwyx',
  },
]

export default function ProfileSelectionPage() {
  const cookieStore = cookies()
  const selectedProfile = cookieStore.get('selectedProfile')

  // If profile is already selected, redirect to home
  if (selectedProfile) {
    redirect('/')
  }

  return (
    <main className="relative bg-gradient-to-b from-gray-900/10 to-[#010511] min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-white">Who's watching?</h1>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto px-4">
          {profiles.map((profile) => (
            <Link
              key={profile.id}
              href={`/api/select-profile?profileId=${profile.id}`}
              className="group"
            >
              <div className="relative h-32 w-32 mx-auto mb-4">
                <Image
                  src={profile.avatar}
                  alt={profile.name}
                  fill
                  className="rounded-md object-cover group-hover:border-2 group-hover:border-white transition-all"
                />
              </div>
              <p className="text-gray-400 group-hover:text-white transition-colors">
                {profile.name}
              </p>
            </Link>
          ))}
        </div>

        <button className="mt-12 border border-gray-600 text-gray-400 px-8 py-2 hover:text-white hover:border-white transition-colors">
          Manage Profiles
        </button>
      </div>
    </main>
  )
} 