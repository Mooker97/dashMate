'use client'

import React, { createContext, useContext } from 'react'
import { useAuth } from '@/hooks/useAuth'
import type { User, Session, AuthError, AuthResponse } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

type UserProfile = Database['public']['Tables']['user_profiles']['Row']

interface AuthContextType {
  user: User | null
  profile: UserProfile | null
  session: Session | null
  loading: boolean
  error: AuthError | null
  signIn: (email: string, password: string) => Promise<{ data: AuthResponse['data']; error: AuthError | null }>
  signUp: (email: string, password: string, metadata?: { name?: string; [key: string]: string | number | boolean }) => Promise<{ data: AuthResponse['data']; error: AuthError | null }>
  signInWithProvider: (provider: 'github' | 'google' | 'discord') => Promise<{ data: AuthResponse['data']; error: AuthError | null }>
  signOut: () => Promise<{ error: AuthError | null }>
  resetPassword: (email: string) => Promise<{ data: AuthResponse['data']; error: AuthError | null }>
  updatePassword: (password: string) => Promise<{ data: AuthResponse['data']; error: AuthError | null }>
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ data: UserProfile | null; error: Error | null }>
  isAuthenticated: boolean
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth()

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}