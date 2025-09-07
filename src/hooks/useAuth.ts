'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/utils/supabase/client'
import type { User, Session, AuthError } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

type UserProfile = Database['public']['Tables']['user_profiles']['Row']

interface AuthState {
  user: User | null
  profile: UserProfile | null
  session: Session | null
  loading: boolean
  error: AuthError | null
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    profile: null,
    session: null,
    loading: true,
    error: null
  })

  const supabase = createClient()

  // Load user profile from database
  const loadUserProfile = useCallback(async (authId: string): Promise<UserProfile | null> => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('auth_id', authId)
        .single()

      if (error) {
        console.error('Error loading user profile:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error loading user profile:', error)
      return null
    }
  }, [supabase])

  // Initialize auth state
  useEffect(() => {
    const getInitialSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error) {
        setAuthState(prev => ({ ...prev, error, loading: false }))
        return
      }

      let profile = null
      if (session?.user) {
        profile = await loadUserProfile(session.user.id)
      }

      setAuthState({
        user: session?.user ?? null,
        profile,
        session,
        loading: false,
        error: null
      })
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event)
        
        let profile = null
        if (session?.user) {
          profile = await loadUserProfile(session.user.id)
        }

        setAuthState({
          user: session?.user ?? null,
          profile,
          session,
          loading: false,
          error: null
        })
      }
    )

    return () => subscription.unsubscribe()
  }, [supabase, loadUserProfile])

  // Sign in with email/password
  const signIn = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }))
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      setAuthState(prev => ({ ...prev, error, loading: false }))
      return { data: null, error }
    }

    return { data, error: null }
  }

  // Sign up with email/password
  const signUp = async (email: string, password: string, metadata?: { 
    name?: string 
    [key: string]: string | number | boolean 
  }) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }))
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    })

    if (error) {
      setAuthState(prev => ({ ...prev, error, loading: false }))
      return { data: null, error }
    }

    return { data, error: null }
  }

  // Sign in with OAuth provider
  const signInWithProvider = async (provider: 'github' | 'google' | 'discord') => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })

    if (error) {
      setAuthState(prev => ({ ...prev, error }))
    }

    return { data, error }
  }

  // Sign out
  const signOut = async () => {
    setAuthState(prev => ({ ...prev, loading: true }))
    
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      setAuthState(prev => ({ ...prev, error, loading: false }))
      return { error }
    }

    setAuthState({
      user: null,
      profile: null,
      session: null,
      loading: false,
      error: null
    })

    return { error: null }
  }

  // Reset password
  const resetPassword = async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`
    })

    return { data, error }
  }

  // Update password
  const updatePassword = async (password: string) => {
    const { data, error } = await supabase.auth.updateUser({
      password
    })

    return { data, error }
  }

  // Update user profile
  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!authState.user) {
      return { error: new Error('Not authenticated') }
    }

    const { data, error } = await supabase
      .from('user_profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('auth_id', authState.user.id)
      .select()
      .single()

    if (error) {
      return { data: null, error }
    }

    // Update local state
    setAuthState(prev => ({
      ...prev,
      profile: data
    }))

    return { data, error: null }
  }

  return {
    ...authState,
    signIn,
    signUp,
    signInWithProvider,
    signOut,
    resetPassword,
    updatePassword,
    updateProfile,
    isAuthenticated: !!authState.user,
    isLoading: authState.loading
  }
}