'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useAuthContext } from '@/components/AuthProvider';

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  created_at: string;
  updated_at: string;
  user_id?: string;
}

const TASKS_STORAGE_KEY = 'dashmate-tasks';

// Default sample tasks for new users
const defaultTasks: Task[] = [
  { 
    id: '1', 
    text: 'Check in with your AI coach', 
    completed: false, 
    priority: 'high',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  { 
    id: '2', 
    text: 'Organize your workspace', 
    completed: true, 
    priority: 'medium',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  { 
    id: '3', 
    text: 'Plan tomorrow\'s priorities', 
    completed: false, 
    priority: 'low',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

// Generate unique ID for tasks
function generateTaskId(): string {
  return 'task_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { isAuthenticated, user, profile, loading: authLoading } = useAuthContext();
  const supabase = createClient();

  // Fetch tasks based on authentication state
  const fetchTasks = useCallback(async () => {
    // Wait for auth to be determined
    if (authLoading) return;
    
    try {
      setLoading(true);
      setError(null);
      
      if (isAuthenticated && user && profile) {
        // User is authenticated - use Supabase
        const { data, error: supabaseError } = await supabase
          .from('tasks')
          .select('*')
          .eq('user_id', profile.id)
          .order('created_at', { ascending: false });

        if (supabaseError) {
          throw supabaseError;
        }

        if (data && data.length === 0) {
          // No tasks found, create default tasks for new user
          await createDefaultTasksInSupabase();
        } else {
          setTasks(data || []);
        }
      } else {
        // User not authenticated - use localStorage
        loadFromLocalStorage();
      }
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch tasks');
      // Fallback to localStorage
      loadFromLocalStorage();
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, user, authLoading]);

  // Create default tasks in Supabase for authenticated users
  const createDefaultTasksInSupabase = async () => {
    if (!profile) return;
    
    try {
      const { data, error: supabaseError } = await supabase
        .from('tasks')
        .insert(defaultTasks.map(task => ({
          text: task.text,
          completed: task.completed,
          priority: task.priority,
          user_id: profile.id,
          tags: [],
          subtasks: [],
          context: {},
          attachment_urls: [],
          order_index: 0
        })))
        .select();

      if (supabaseError) throw supabaseError;
      setTasks(data || []);
    } catch (err) {
      console.error('Error creating default tasks:', err);
      setTasks(defaultTasks);
    }
  };

  // Save tasks to localStorage for unauthenticated users
  const saveToLocalStorage = (newTasks: Task[]) => {
    try {
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(newTasks));
    } catch (error) {
      console.warn('Failed to save tasks to localStorage:', error);
    }
  };

  // Fallback to localStorage
  const loadFromLocalStorage = () => {
    try {
      const stored = localStorage.getItem(TASKS_STORAGE_KEY);
      if (stored) {
        const parsedTasks = JSON.parse(stored);
        setTasks(parsedTasks);
      } else {
        setTasks(defaultTasks);
      }
    } catch (err) {
      console.error('Error loading from localStorage:', err);
      setTasks(defaultTasks);
    }
  };

  // Add new task
  const addTask = async (text: string, priority: Task['priority'] = 'medium') => {
    setError(null);
    
    if (isAuthenticated && profile) {
      // Authenticated user - use Supabase
      try {
        const { data, error: supabaseError } = await supabase
          .from('tasks')
          .insert([{ 
            text: text.trim(), 
            priority,
            user_id: profile.id,
            tags: [],
            subtasks: [],
            context: {},
            attachment_urls: [],
            order_index: tasks.length
          }])
          .select()
          .single();

        if (supabaseError) throw supabaseError;

        if (data) {
          setTasks(prev => [data, ...prev]);
          return data;
        }
      } catch (err) {
        console.error('Error adding task to Supabase:', err);
        setError(err instanceof Error ? err.message : 'Failed to add task');
      }
    } else {
      // Unauthenticated user - use localStorage
      const newTask: Task = {
        id: generateTaskId(),
        text: text.trim(),
        completed: false,
        priority,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      const updatedTasks = [newTask, ...tasks];
      setTasks(updatedTasks);
      saveToLocalStorage(updatedTasks);
      return newTask;
    }
  };

  // Toggle task completion
  const toggleTask = async (id: string) => {
    setError(null);
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    if (isAuthenticated) {
      // Authenticated user - use Supabase
      try {
        const { error: supabaseError } = await supabase
          .from('tasks')
          .update({ completed: !task.completed })
          .eq('id', id);

        if (supabaseError) throw supabaseError;

        setTasks(prev => 
          prev.map(t => t.id === id ? { 
            ...t, 
            completed: !t.completed,
            completed_at: !t.completed ? new Date().toISOString() : undefined
          } : t)
        );
      } catch (err) {
        console.error('Error toggling task in Supabase:', err);
        setError(err instanceof Error ? err.message : 'Failed to update task');
      }
    } else {
      // Unauthenticated user - use localStorage
      const updatedTasks = tasks.map(t => 
        t.id === id ? { 
          ...t, 
          completed: !t.completed, 
          completed_at: !t.completed ? new Date().toISOString() : undefined 
        } : t
      );
      setTasks(updatedTasks);
      saveToLocalStorage(updatedTasks);
    }
  };

  // Delete task
  const deleteTask = async (id: string) => {
    setError(null);

    if (isAuthenticated) {
      // Authenticated user - use Supabase
      try {
        const { error: supabaseError } = await supabase
          .from('tasks')
          .delete()
          .eq('id', id);

        if (supabaseError) throw supabaseError;

        setTasks(prev => prev.filter(t => t.id !== id));
      } catch (err) {
        console.error('Error deleting task from Supabase:', err);
        setError(err instanceof Error ? err.message : 'Failed to delete task');
      }
    } else {
      // Unauthenticated user - use localStorage
      const updatedTasks = tasks.filter(t => t.id !== id);
      setTasks(updatedTasks);
      saveToLocalStorage(updatedTasks);
    }
  };

  // Update task priority
  const updateTaskPriority = async (id: string, priority: Task['priority']) => {
    setError(null);

    if (isAuthenticated) {
      // Authenticated user - use Supabase
      try {
        const { error: supabaseError } = await supabase
          .from('tasks')
          .update({ priority })
          .eq('id', id);

        if (supabaseError) throw supabaseError;

        setTasks(prev => 
          prev.map(t => t.id === id ? { ...t, priority } : t)
        );
      } catch (err) {
        console.error('Error updating task priority in Supabase:', err);
        setError(err instanceof Error ? err.message : 'Failed to update priority');
      }
    } else {
      // Unauthenticated user - use localStorage
      const updatedTasks = tasks.map(t => 
        t.id === id ? { ...t, priority, updated_at: new Date().toISOString() } : t
      );
      setTasks(updatedTasks);
      saveToLocalStorage(updatedTasks);
    }
  };

  // Update existing task
  const updateTask = async (id: string, updates: Partial<Omit<Task, 'id' | 'created_at'>>) => {
    setError(null);

    if (isAuthenticated) {
      // Authenticated user - use Supabase
      try {
        const { error: supabaseError } = await supabase
          .from('tasks')
          .update({ ...updates, updated_at: new Date().toISOString() })
          .eq('id', id);

        if (supabaseError) throw supabaseError;

        setTasks(prev => 
          prev.map(t => t.id === id ? { ...t, ...updates } : t)
        );
      } catch (err) {
        console.error('Error updating task in Supabase:', err);
        setError(err instanceof Error ? err.message : 'Failed to update task');
      }
    } else {
      // Unauthenticated user - use localStorage
      const updatedTasks = tasks.map(t => 
        t.id === id ? { ...t, ...updates, updated_at: new Date().toISOString() } : t
      );
      setTasks(updatedTasks);
      saveToLocalStorage(updatedTasks);
    }
  };

  // Helper functions
  const getCompletedTasks = () => tasks.filter(task => task.completed);
  const getPendingTasks = () => tasks.filter(task => !task.completed);
  const getTasksByPriority = (priority: Task['priority']) => 
    tasks.filter(task => task.priority === priority);

  // Load tasks on mount
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return {
    tasks,
    loading,
    error,
    isAuthenticated,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    updateTaskPriority,
    getCompletedTasks,
    getPendingTasks,
    getTasksByPriority,
    refetch: fetchTasks
  };
}