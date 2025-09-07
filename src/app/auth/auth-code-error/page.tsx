'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, ArrowLeft, Brain } from 'lucide-react'
import Link from 'next/link'

export default function AuthCodeErrorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 via-transparent to-purple-100/20 pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            Authentication Error
          </h1>
          <p className="text-gray-600">
            Something went wrong during the sign-in process
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          <div className="mb-6">
            <p className="text-gray-600 mb-4">
              We couldn&apos;t complete your sign-in request. This might happen if:
            </p>
            <ul className="text-left text-sm text-gray-600 space-y-2 mb-6">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                The authentication link expired
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                The authentication was cancelled
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                There was a temporary server issue
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <Link
              href="/auth/login"
              className="block w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
            >
              Try signing in again
            </Link>
            
            <Link
              href="/"
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue without account
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Brain className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-500">dashMate</span>
          </div>
          <p className="text-xs text-gray-500">
            Don&apos;t worry! You can still use dashMate without an account. 
            Your tasks will be saved locally. 💙
          </p>
        </div>
      </motion.div>
    </div>
  )
}