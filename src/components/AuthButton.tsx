'use client'

import { useState } from 'react'
import { useAuthContext } from './AuthProvider'
import { User, LogOut, LogIn } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function AuthButton() {
  const { user, profile, isAuthenticated, signOut, loading } = useAuthContext()
  const [showDropdown, setShowDropdown] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    setShowDropdown(false)
  }

  if (loading) {
    return (
      <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
    )
  }

  if (!isAuthenticated) {
    return (
      <a
        href="/auth/login"
        className="flex items-center space-x-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm font-medium focusable"
        title="Sign in to sync your tasks"
      >
        <LogIn className="w-4 h-4" />
        <span className="hidden sm:inline">Sign In</span>
      </a>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition-colors focusable"
        title={`Signed in as ${profile?.name || user?.email}`}
      >
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
          {profile?.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <User className="w-4 h-4 text-white" />
          )}
        </div>
        <div className="hidden md:block text-left">
          <p className="text-sm font-medium text-gray-800 truncate max-w-32">
            {profile?.name || 'User'}
          </p>
          <p className="text-xs text-gray-500">Synced ✓</p>
        </div>
      </button>

      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="font-medium text-gray-900 truncate">
                {profile?.name || 'User'}
              </p>
              <p className="text-sm text-gray-500 truncate">
                {user?.email}
              </p>
              <p className="text-xs text-green-600 mt-1 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Tasks syncing across devices
              </p>
            </div>
            
            <div className="py-1">
              <a
                href="/profile"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => setShowDropdown(false)}
              >
                <User className="w-4 h-4 mr-3" />
                Profile Settings
              </a>
              
              <button
                onClick={handleSignOut}
                className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-3" />
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside to close dropdown */}
      {showDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  )
}