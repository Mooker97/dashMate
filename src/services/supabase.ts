// Legacy exports - use @/utils/supabase/client instead for new code
import { createClient } from '@/utils/supabase/client'

export const supabase = createClient()

// Enhanced Task interface for database compatibility
export interface Task {
  id: string
  text: string
  completed: boolean
  priority: 'high' | 'medium' | 'low'
  category?: string
  created_at: string
  updated_at: string
  completed_at?: string
  user_id?: string
  tags?: string[]
  subtasks?: any[]
  context?: Record<string, any>
  estimated_duration?: string
  actual_duration?: string
  due_date?: string
  energy_level_required?: number
  difficulty_rating?: number
  notes?: string
  reward?: string
}