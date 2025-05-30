import { Metadata } from 'next'
import Header from '../components/Header'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Profile - Nextflix',
  description: 'Manage your Nextflix profile',
}

export default function ProfilePage() {
  return (
    <main className="relative bg-gradient-to-b from-gray-900/10 to-[#010511] min-h-screen">
      <Header />
      
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Account & Profile</h1>
          
          <div className="bg-black/60 rounded-lg p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Profile Section */}
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-4">Profile</h2>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="relative h-24 w-24">
                      <Image
                        src="https://rb.gy/mg378l"
                        alt="Profile"
                        fill
                        className="rounded-md object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">John Doe</h3>
                      <p className="text-gray-400">Member since 2024</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                      <input
                        type="email"
                        value="john.doe@example.com"
                        readOnly
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-4 py-2 text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Phone</label>
                      <input
                        type="tel"
                        value="+1 (555) 123-4567"
                        readOnly
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-4 py-2 text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Membership Section */}
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-4">Membership & Billing</h2>
                <div className="space-y-6">
                  <div className="bg-gray-800/30 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400">Premium Plan</span>
                      <span className="text-green-500">Active</span>
                    </div>
                    <p className="text-sm text-gray-400">$19.99/month</p>
                  </div>
                  
                  <div className="space-y-4">
                    <button className="w-full bg-red-600 hover:bg-red-700 text-white rounded-md px-4 py-2 transition-colors">
                      Change Plan
                    </button>
                    <button className="w-full bg-gray-800 hover:bg-gray-700 text-white rounded-md px-4 py-2 transition-colors">
                      Update Payment Method
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Preferences Section */}
            <div className="mt-8 pt-8 border-t border-gray-800">
              <h2 className="text-xl font-semibold mb-4">Preferences</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Language</h3>
                  <select className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-4 py-2 text-white">
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                  </select>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Playback Settings</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded bg-gray-800/50 border-gray-700" />
                      <span>Autoplay next episode</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded bg-gray-800/50 border-gray-700" />
                      <span>Show previews while browsing</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 