// Legacy exports - use @/utils/supabase/client instead for new code
import { createClient } from '@/utils/supabase/client'

export const supabase = createClient()

// Enhanced Task interface for database compatibility
export interface Task {
  id: string
  text: string
  completed: boolean
  priority: 'high' | 'medium' | 'low'
  category?: string | null
  created_at: string
  updated_at: string
  completed_at?: string | null
  user_id: string
  tags: string[]
  subtasks: any // JSON field
  context: any // JSON field
  estimated_duration?: string | null
  actual_duration?: string | null
  due_date?: string | null
  energy_level_required?: number | null
  difficulty_rating?: number | null
  notes?: string | null
  reward?: string | null
  order_index: number
  parent_task_id?: string | null
  recurring_pattern?: any | null // JSON field
  focus_time_required?: string | null
  attachment_urls: string[]
}