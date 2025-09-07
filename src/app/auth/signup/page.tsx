'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, User, Github, Chrome, MessageCircle, Brain, ArrowLeft, Check } from 'lucide-react'
import { useAuthContext } from '@/components/AuthProvider'
import Link from 'next/link'
import { Input } from '@/components/ui/form/input'

export default function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  
  const { signUp, signInWithProvider } = useAuthContext()
  const router = useRouter()

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await signUp(email, password, { name })
    
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
      // Redirect after a brief success message
      setTimeout(() => {
        router.push('/')
      }, 2000)
    }
  }

  const handleOAuthSignup = async (provider: 'github' | 'google' | 'discord') => {
    setError(null)
    const { error } = await signInWithProvider(provider)
    
    if (error) {
      setError(error.message)
    }
    // OAuth will redirect automatically on success
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center max-w-md w-full"
        >
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            Welcome to dashMate! 🎉
          </h1>
          <p className="text-gray-600 mb-4">
            Your account has been created successfully. Check your email for verification instructions.
          </p>
          <p className="text-sm text-gray-500">
            Redirecting you to your dashboard...
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 via-transparent to-purple-100/20 pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Back to home */}
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to dashMate
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            Join dashMate
          </h1>
          <p className="text-gray-600">
            Start your journey to better focus and productivity
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6"
            >
              <p className="text-red-600 text-sm">{error}</p>
            </motion.div>
          )}

          {/* OAuth Buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => handleOAuthSignup('google')}
              className="w-full flex items-center justify-center space-x-3 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors focusable"
            >
              <Chrome className="w-5 h-5" />
              <span className="font-medium text-gray-700">Sign up with Google</span>
            </button>

            <button
              onClick={() => handleOAuthSignup('github')}
              className="w-full flex items-center justify-center space-x-3 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors focusable"
            >
              <Github className="w-5 h-5" />
              <span className="font-medium text-gray-700">Sign up with GitHub</span>
            </button>

            <button
              onClick={() => handleOAuthSignup('discord')}
              className="w-full flex items-center justify-center space-x-3 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors focusable"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium text-gray-700">Sign up with Discord</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-gray-500">or create account with email</span>
            </div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleEmailSignup} className="space-y-4">
            <div>
              <Input
                type="text"
                label="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                leftIcon={<User className="w-5 h-5" />}
                required
              />
            </div>

            <div>
              <Input
                type="email"
                label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                leftIcon={<Mail className="w-5 h-5" />}
                required
              />
            </div>

            <div>
              <Input
                type={showPassword ? 'text' : 'password'}
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                leftIcon={<Lock className="w-5 h-5" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                }
                required
                minLength={6}
              />
              <p className="text-xs text-gray-500 mt-1">
                Must be at least 6 characters long
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed focusable"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Creating account...</span>
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Sign In Link */}
          <div className="text-center mt-6 pt-6 border-t border-gray-100">
            <p className="text-gray-600 text-sm">
              Already have an account?{' '}
              <Link
                href="/auth/login"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-500">
            By creating an account, you agree to our privacy-first approach. 
            Your data stays secure and under your control. 🔒
          </p>
        </div>
      </motion.div>
    </div>
  )
}