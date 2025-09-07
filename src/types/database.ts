export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      achievements: {
        Row: {
          achievement_type: string
          description: string | null
          icon: string | null
          id: string
          metadata: Json
          points_awarded: number
          title: string
          unlocked_at: string
          user_id: string
        }
        Insert: {
          achievement_type: string
          description?: string | null
          icon?: string | null
          id?: string
          metadata?: Json
          points_awarded?: number
          title: string
          unlocked_at?: string
          user_id: string
        }
        Update: {
          achievement_type?: string
          description?: string | null
          icon?: string | null
          id?: string
          metadata?: Json
          points_awarded?: number
          title?: string
          unlocked_at?: string
          user_id?: string
        }
      }
      coaching_insights: {
        Row: {
          actionable: boolean
          applied: boolean
          applied_at: string | null
          confidence_score: number
          created_at: string
          description: string
          effectiveness_rating: number | null
          expires_at: string | null
          id: string
          impact_potential: string
          insight_type: string
          recommendations: string[]
          supporting_data: Json
          title: string
          user_id: string
        }
        Insert: {
          actionable?: boolean
          applied?: boolean
          applied_at?: string | null
          confidence_score?: number
          created_at?: string
          description: string
          effectiveness_rating?: number | null
          expires_at?: string | null
          id?: string
          impact_potential?: string
          insight_type: string
          recommendations?: string[]
          supporting_data?: Json
          title: string
          user_id: string
        }
        Update: {
          actionable?: boolean
          applied?: boolean
          applied_at?: string | null
          confidence_score?: number
          created_at?: string
          description?: string
          effectiveness_rating?: number | null
          expires_at?: string | null
          id?: string
          impact_potential?: string
          insight_type?: string
          recommendations?: string[]
          supporting_data?: Json
          title?: string
          user_id?: string
        }
      }
      conversations: {
        Row: {
          content: string
          context: Json
          cost_cents: number
          created_at: string
          id: string
          message_type: string
          metadata: Json
          model_used: string
          response_time_ms: number | null
          session_id: string
          tokens_used: number
          user_id: string
        }
        Insert: {
          content: string
          context?: Json
          cost_cents?: number
          created_at?: string
          id?: string
          message_type: string
          metadata?: Json
          model_used?: string
          response_time_ms?: number | null
          session_id: string
          tokens_used?: number
          user_id: string
        }
        Update: {
          content?: string
          context?: Json
          cost_cents?: number
          created_at?: string
          id?: string
          message_type?: string
          metadata?: Json
          model_used?: string
          response_time_ms?: number | null
          session_id?: string
          tokens_used?: number
          user_id?: string
        }
      }
      focus_sessions: {
        Row: {
          actual_duration: string | null
          break_activities: Json
          completed_at: string | null
          created_at: string
          energy_after: number | null
          energy_before: number | null
          environment_factors: Json
          focus_score: number | null
          id: string
          interruptions: number
          mood_after: number | null
          mood_before: number | null
          notes: string | null
          planned_duration: string
          session_type: string
          task_id: string | null
          tasks_completed: number
          user_id: string
        }
        Insert: {
          actual_duration?: string | null
          break_activities?: Json
          completed_at?: string | null
          created_at?: string
          energy_after?: number | null
          energy_before?: number | null
          environment_factors?: Json
          focus_score?: number | null
          id?: string
          interruptions?: number
          mood_after?: number | null
          mood_before?: number | null
          notes?: string | null
          planned_duration: string
          session_type?: string
          task_id?: string | null
          tasks_completed?: number
          user_id: string
        }
        Update: {
          actual_duration?: string | null
          break_activities?: Json
          completed_at?: string | null
          created_at?: string
          energy_after?: number | null
          energy_before?: number | null
          environment_factors?: Json
          focus_score?: number | null
          id?: string
          interruptions?: number
          mood_after?: number | null
          mood_before?: number | null
          notes?: string | null
          planned_duration?: string
          session_type?: string
          task_id?: string | null
          tasks_completed?: number
          user_id?: string
        }
      }
      habit_completions: {
        Row: {
          completed_at: string
          context: Json
          habit_id: string
          id: string
          notes: string | null
          quality_rating: number | null
          user_id: string
        }
        Insert: {
          completed_at?: string
          context?: Json
          habit_id: string
          id?: string
          notes?: string | null
          quality_rating?: number | null
          user_id: string
        }
        Update: {
          completed_at?: string
          context?: Json
          habit_id?: string
          id?: string
          notes?: string | null
          quality_rating?: number | null
          user_id?: string
        }
      }
      habits: {
        Row: {
          category: string
          created_at: string
          description: string | null
          difficulty_level: number
          frequency_target: number
          frequency_type: string
          id: string
          is_active: boolean
          longest_streak: number
          name: string
          reward_points: number
          streak_count: number
          updated_at: string
          user_id: string
        }
        Insert: {
          category?: string
          created_at?: string
          description?: string | null
          difficulty_level?: number
          frequency_target?: number
          frequency_type?: string
          id?: string
          is_active?: boolean
          longest_streak?: number
          name: string
          reward_points?: number
          streak_count?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          difficulty_level?: number
          frequency_target?: number
          frequency_type?: string
          id?: string
          is_active?: boolean
          longest_streak?: number
          name?: string
          reward_points?: number
          streak_count?: number
          updated_at?: string
          user_id?: string
        }
      }
      notifications: {
        Row: {
          action_data: Json
          created_at: string
          id: string
          message: string
          notification_type: string
          priority: string
          read_at: string | null
          scheduled_for: string
          sent_at: string | null
          title: string
          user_id: string
        }
        Insert: {
          action_data?: Json
          created_at?: string
          id?: string
          message: string
          notification_type: string
          priority?: string
          read_at?: string | null
          scheduled_for: string
          sent_at?: string | null
          title: string
          user_id: string
        }
        Update: {
          action_data?: Json
          created_at?: string
          id?: string
          message?: string
          notification_type?: string
          priority?: string
          read_at?: string | null
          scheduled_for?: string
          sent_at?: string | null
          title?: string
          user_id?: string
        }
      }
      tasks: {
        Row: {
          actual_duration: string | null
          attachment_urls: string[]
          category: string | null
          completed: boolean
          completed_at: string | null
          context: Json
          created_at: string
          difficulty_rating: number | null
          due_date: string | null
          energy_level_required: number | null
          estimated_duration: string | null
          focus_time_required: string | null
          id: string
          notes: string | null
          order_index: number
          parent_task_id: string | null
          priority: string
          recurring_pattern: Json | null
          reward: string | null
          subtasks: Json
          tags: string[]
          text: string
          updated_at: string
          user_id: string
        }
        Insert: {
          actual_duration?: string | null
          attachment_urls?: string[]
          category?: string | null
          completed?: boolean
          completed_at?: string | null
          context?: Json
          created_at?: string
          difficulty_rating?: number | null
          due_date?: string | null
          energy_level_required?: number | null
          estimated_duration?: string | null
          focus_time_required?: string | null
          id?: string
          notes?: string | null
          order_index?: number
          parent_task_id?: string | null
          priority?: string
          recurring_pattern?: Json | null
          reward?: string | null
          subtasks?: Json
          tags?: string[]
          text: string
          updated_at?: string
          user_id: string
        }
        Update: {
          actual_duration?: string | null
          attachment_urls?: string[]
          category?: string | null
          completed?: boolean
          completed_at?: string | null
          context?: Json
          created_at?: string
          difficulty_rating?: number | null
          due_date?: string | null
          energy_level_required?: number | null
          estimated_duration?: string | null
          focus_time_required?: string | null
          id?: string
          notes?: string | null
          order_index?: number
          parent_task_id?: string | null
          priority?: string
          recurring_pattern?: Json | null
          reward?: string | null
          subtasks?: Json
          tags?: string[]
          text?: string
          updated_at?: string
          user_id?: string
        }
      }
      user_profiles: {
        Row: {
          ai_coaching_enabled: boolean
          average_session_length: string
          avatar_url: string | null
          behavior_data: Json
          completed_tasks: number
          created_at: string
          customizations: Json
          email: string | null
          energy_patterns: Json
          focus_style: string
          id: string
          last_ai_interaction: string | null
          learning_insights: Json
          motivation_triggers: string[]
          name: string | null
          onboarding_completed: boolean
          preferences: Json
          productivity_patterns: Json
          stress_indicators: string[]
          total_sessions: number
          updated_at: string
          working_memory_strength: number
        }
        Insert: {
          ai_coaching_enabled?: boolean
          average_session_length?: string
          avatar_url?: string | null
          behavior_data?: Json
          completed_tasks?: number
          created_at?: string
          customizations?: Json
          email?: string | null
          energy_patterns?: Json
          focus_style?: string
          id: string
          last_ai_interaction?: string | null
          learning_insights?: Json
          motivation_triggers?: string[]
          name?: string | null
          onboarding_completed?: boolean
          preferences?: Json
          productivity_patterns?: Json
          stress_indicators?: string[]
          total_sessions?: number
          updated_at?: string
          working_memory_strength?: number
        }
        Update: {
          ai_coaching_enabled?: boolean
          average_session_length?: string
          avatar_url?: string | null
          behavior_data?: Json
          completed_tasks?: number
          created_at?: string
          customizations?: Json
          email?: string | null
          energy_patterns?: Json
          focus_style?: string
          id?: string
          last_ai_interaction?: string | null
          learning_insights?: Json
          motivation_triggers?: string[]
          name?: string | null
          onboarding_completed?: boolean
          preferences?: Json
          productivity_patterns?: Json
          stress_indicators?: string[]
          total_sessions?: number
          updated_at?: string
          working_memory_strength?: number
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}