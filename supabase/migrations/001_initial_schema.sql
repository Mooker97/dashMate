-- Initial database schema for dashMate ADHD task management app
-- This migration creates all necessary tables with proper RLS policies

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE public.user_profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  name text,
  email text,
  avatar_url text,
  preferences jsonb DEFAULT '{
    "theme": "auto",
    "colorScheme": "default",
    "reducedMotion": false,
    "fontScale": 1.0,
    "compactMode": false,
    "defaultTaskPriority": "medium",
    "autoBreakReminders": true,
    "gentleNudges": true,
    "celebrationStyle": "enthusiastic",
    "coachingStyle": "supportive",
    "voiceFeedback": true,
    "proactiveCoaching": true,
    "learningMode": true,
    "enableNotifications": true,
    "quietHours": {"start": "22:00", "end": "08:00"},
    "notificationFrequency": "standard",
    "dataCollection": "full",
    "shareAnalytics": false,
    "localStorageOnly": false,
    "preferredEnergyLevel": 3
  }'::jsonb,
  customizations jsonb DEFAULT '{
    "customColors": {
      "primary": "#3b82f6",
      "secondary": "#8b5cf6",
      "accent": "#06b6d4",
      "priorityHigh": "#ef4444",
      "priorityMedium": "#f59e0b",
      "priorityLow": "#10b981"
    },
    "customFonts": {},
    "customSpacing": {},
    "dashboardLayout": "default",
    "defaultView": "today",
    "taskGrouping": "priority",
    "coachPersonality": "supportive",
    "customPrompts": {},
    "learningPreferences": {
      "trackProductivityPatterns": true,
      "trackEnergyLevels": true,
      "trackMoodCorrelations": true,
      "trackTimeEstimations": true
    },
    "customVoiceCommands": {},
    "quickActionButtons": ["Add Task", "Take Break", "Review Day"],
    "customCategories": ["Work", "Personal", "Health", "Learning"]
  }'::jsonb,
  behavior_data jsonb DEFAULT '[]'::jsonb,
  energy_patterns jsonb DEFAULT '[]'::jsonb,
  productivity_patterns jsonb DEFAULT '[]'::jsonb,
  learning_insights jsonb DEFAULT '[]'::jsonb,
  total_sessions integer DEFAULT 0,
  completed_tasks integer DEFAULT 0,
  working_memory_strength integer DEFAULT 3 CHECK (working_memory_strength >= 1 AND working_memory_strength <= 5),
  focus_style text DEFAULT 'flexible' CHECK (focus_style IN ('structured', 'flexible', 'burst')),
  motivation_triggers text[] DEFAULT array[]::text[],
  stress_indicators text[] DEFAULT array[]::text[],
  average_session_length interval DEFAULT '25 minutes'::interval,
  onboarding_completed boolean DEFAULT false,
  last_ai_interaction timestamp with time zone,
  ai_coaching_enabled boolean DEFAULT true
);

-- Enhanced tasks table
CREATE TABLE public.tasks (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  text text NOT NULL,
  completed boolean DEFAULT false,
  priority text DEFAULT 'medium' CHECK (priority IN ('high', 'medium', 'low')),
  category text,
  estimated_duration interval,
  actual_duration interval,
  due_date timestamp with time zone,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  completed_at timestamp with time zone,
  tags text[] DEFAULT array[]::text[],
  subtasks jsonb DEFAULT '[]'::jsonb,
  context jsonb DEFAULT '{}'::jsonb,
  energy_level_required integer CHECK (energy_level_required >= 1 AND energy_level_required <= 5),
  focus_time_required interval,
  difficulty_rating integer CHECK (difficulty_rating >= 1 AND difficulty_rating <= 5),
  reward text,
  notes text,
  attachment_urls text[] DEFAULT array[]::text[],
  recurring_pattern jsonb,
  parent_task_id uuid REFERENCES public.tasks(id) ON DELETE SET NULL,
  order_index integer DEFAULT 0
);

-- AI conversation history
CREATE TABLE public.conversations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  session_id text NOT NULL,
  message_type text NOT NULL CHECK (message_type IN ('user', 'assistant', 'system')),
  content text NOT NULL,
  context jsonb DEFAULT '{}'::jsonb,
  tokens_used integer DEFAULT 0,
  model_used text DEFAULT 'gpt-4',
  cost_cents integer DEFAULT 0,
  response_time_ms integer,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  metadata jsonb DEFAULT '{}'::jsonb
);

-- Focus sessions
CREATE TABLE public.focus_sessions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  task_id uuid REFERENCES public.tasks(id) ON DELETE SET NULL,
  session_type text DEFAULT 'pomodoro' CHECK (session_type IN ('pomodoro', 'deep_work', 'quick_burst', 'review')),
  planned_duration interval NOT NULL,
  actual_duration interval,
  focus_score integer CHECK (focus_score >= 1 AND focus_score <= 5),
  interruptions integer DEFAULT 0,
  tasks_completed integer DEFAULT 0,
  notes text,
  mood_before integer CHECK (mood_before >= 1 AND mood_before <= 5),
  mood_after integer CHECK (mood_after >= 1 AND mood_after <= 5),
  energy_before integer CHECK (energy_before >= 1 AND energy_before <= 5),
  energy_after integer CHECK (energy_after >= 1 AND energy_after <= 5),
  environment_factors jsonb DEFAULT '{}'::jsonb,
  break_activities jsonb DEFAULT '[]'::jsonb,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  completed_at timestamp with time zone
);

-- Habit tracking
CREATE TABLE public.habits (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  description text,
  category text DEFAULT 'personal',
  frequency_type text DEFAULT 'daily' CHECK (frequency_type IN ('daily', 'weekly', 'monthly')),
  frequency_target integer DEFAULT 1,
  streak_count integer DEFAULT 0,
  longest_streak integer DEFAULT 0,
  difficulty_level integer DEFAULT 3 CHECK (difficulty_level >= 1 AND difficulty_level <= 5),
  reward_points integer DEFAULT 10,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habit completion tracking
CREATE TABLE public.habit_completions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  habit_id uuid REFERENCES public.habits(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  completed_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  quality_rating integer CHECK (quality_rating >= 1 AND quality_rating <= 5),
  notes text,
  context jsonb DEFAULT '{}'::jsonb
);

-- User achievements and rewards
CREATE TABLE public.achievements (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  achievement_type text NOT NULL,
  title text NOT NULL,
  description text,
  icon text,
  points_awarded integer DEFAULT 0,
  unlocked_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  metadata jsonb DEFAULT '{}'::jsonb
);

-- AI coaching insights and recommendations
CREATE TABLE public.coaching_insights (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  insight_type text NOT NULL CHECK (insight_type IN ('productivity_pattern', 'energy_optimization', 'habit_suggestion', 'workflow_improvement', 'stress_management')),
  title text NOT NULL,
  description text NOT NULL,
  confidence_score real DEFAULT 0.5 CHECK (confidence_score >= 0 AND confidence_score <= 1),
  impact_potential text DEFAULT 'medium' CHECK (impact_potential IN ('low', 'medium', 'high')),
  actionable boolean DEFAULT true,
  applied boolean DEFAULT false,
  applied_at timestamp with time zone,
  effectiveness_rating integer CHECK (effectiveness_rating >= 1 AND effectiveness_rating <= 5),
  supporting_data jsonb DEFAULT '{}'::jsonb,
  recommendations text[] DEFAULT array[]::text[],
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  expires_at timestamp with time zone
);

-- Notification queue for smart reminders
CREATE TABLE public.notifications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  notification_type text NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  priority text DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  scheduled_for timestamp with time zone NOT NULL,
  sent_at timestamp with time zone,
  read_at timestamp with time zone,
  action_data jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.focus_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.habit_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coaching_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Row Level Security policies
-- User profiles
CREATE POLICY "Users can view own profile" ON public.user_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.user_profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.user_profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Tasks
CREATE POLICY "Users can view own tasks" ON public.tasks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own tasks" ON public.tasks FOR ALL USING (auth.uid() = user_id);

-- Conversations
CREATE POLICY "Users can view own conversations" ON public.conversations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create conversations" ON public.conversations FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Focus sessions
CREATE POLICY "Users can view own sessions" ON public.focus_sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create sessions" ON public.focus_sessions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own sessions" ON public.focus_sessions FOR UPDATE USING (auth.uid() = user_id);

-- Habits
CREATE POLICY "Users can manage own habits" ON public.habits FOR ALL USING (auth.uid() = user_id);

-- Habit completions
CREATE POLICY "Users can manage own habit completions" ON public.habit_completions FOR ALL USING (auth.uid() = user_id);

-- Achievements
CREATE POLICY "Users can view own achievements" ON public.achievements FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "System can insert achievements" ON public.achievements FOR INSERT WITH CHECK (true); -- Allow system to award achievements

-- Coaching insights
CREATE POLICY "Users can view own insights" ON public.coaching_insights FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update insight status" ON public.coaching_insights FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "System can create insights" ON public.coaching_insights FOR INSERT WITH CHECK (true); -- Allow AI system to create insights

-- Notifications
CREATE POLICY "Users can view own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update notification status" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "System can create notifications" ON public.notifications FOR INSERT WITH CHECK (true);

-- Indexes for better performance
CREATE INDEX idx_tasks_user_id_created ON public.tasks(user_id, created_at DESC);
CREATE INDEX idx_tasks_user_id_priority ON public.tasks(user_id, priority) WHERE NOT completed;
CREATE INDEX idx_tasks_user_id_completed ON public.tasks(user_id, completed);
CREATE INDEX idx_tasks_due_date ON public.tasks(due_date) WHERE due_date IS NOT NULL AND NOT completed;

CREATE INDEX idx_conversations_user_session ON public.conversations(user_id, session_id, created_at);
CREATE INDEX idx_conversations_user_recent ON public.conversations(user_id, created_at DESC);

CREATE INDEX idx_focus_sessions_user_created ON public.focus_sessions(user_id, created_at DESC);
CREATE INDEX idx_focus_sessions_task ON public.focus_sessions(task_id) WHERE task_id IS NOT NULL;

CREATE INDEX idx_habits_user_active ON public.habits(user_id, is_active) WHERE is_active = true;
CREATE INDEX idx_habit_completions_habit_date ON public.habit_completions(habit_id, completed_at::date);

CREATE INDEX idx_notifications_user_scheduled ON public.notifications(user_id, scheduled_for) WHERE sent_at IS NULL;
CREATE INDEX idx_notifications_user_unread ON public.notifications(user_id, read_at) WHERE read_at IS NULL;

-- Triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp_user_profiles
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp_tasks
    BEFORE UPDATE ON public.tasks
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp_habits
    BEFORE UPDATE ON public.habits
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp();

-- Function to automatically create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile automatically
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Function to calculate streaks for habits
CREATE OR REPLACE FUNCTION public.update_habit_streak()
RETURNS TRIGGER AS $$
DECLARE
  current_streak integer := 0;
  last_completion_date date;
  completion_date date;
BEGIN
  completion_date := NEW.completed_at::date;
  
  -- Get the most recent completion before this one
  SELECT completed_at::date INTO last_completion_date
  FROM public.habit_completions
  WHERE habit_id = NEW.habit_id 
    AND completed_at::date < completion_date
  ORDER BY completed_at DESC
  LIMIT 1;
  
  -- Calculate current streak
  IF last_completion_date IS NULL OR last_completion_date = completion_date - INTERVAL '1 day' THEN
    -- Either first completion or consecutive day
    SELECT COALESCE(streak_count, 0) + 1 INTO current_streak
    FROM public.habits
    WHERE id = NEW.habit_id;
  ELSE
    -- Streak broken, start new streak
    current_streak := 1;
  END IF;
  
  -- Update habit with new streak
  UPDATE public.habits
  SET 
    streak_count = current_streak,
    longest_streak = GREATEST(longest_streak, current_streak),
    updated_at = timezone('utc'::text, now())
  WHERE id = NEW.habit_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update streaks on habit completion
CREATE TRIGGER on_habit_completion
  AFTER INSERT ON public.habit_completions
  FOR EACH ROW EXECUTE PROCEDURE public.update_habit_streak();