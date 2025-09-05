'use client';

import { Task } from '@/hooks/useTasks';

// Task service interface - can be implemented for localStorage, API, etc.
export interface TaskServiceInterface {
  loadTasks(): Promise<Task[]>;
  saveTasks(tasks: Task[]): Promise<void>;
  syncTasks?(): Promise<void>;
  isOnline?(): boolean;
}

// User context types for future auth integration
export type UserMode = 'guest' | 'authenticated';

export interface UserContext {
  mode: UserMode;
  userId?: string;
  isOnline: boolean;
}

// Local storage implementation (current)
export class LocalStorageTaskService implements TaskServiceInterface {
  private storageKey: string;

  constructor(userContext?: UserContext) {
    // Support different storage keys for guest vs authenticated users
    this.storageKey = userContext?.mode === 'authenticated' && userContext.userId
      ? `dashmate-tasks-${userContext.userId}`
      : 'dashmate-tasks-guest';
  }

  async loadTasks(): Promise<Task[]> {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        return JSON.parse(stored);
      }
      return [];
    } catch (error) {
      console.warn('Failed to load tasks from localStorage:', error);
      return [];
    }
  }

  async saveTasks(tasks: Task[]): Promise<void> {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(tasks));
    } catch (error) {
      console.warn('Failed to save tasks to localStorage:', error);
      throw error;
    }
  }

  isOnline(): boolean {
    return navigator.onLine;
  }
}

// Future API implementation (placeholder)
export class APITaskService implements TaskServiceInterface {
  private apiUrl: string;
  private authToken?: string;
  private localService: LocalStorageTaskService;

  constructor(apiUrl: string, userContext: UserContext, authToken?: string) {
    this.apiUrl = apiUrl;
    this.authToken = authToken;
    this.localService = new LocalStorageTaskService(userContext);
  }

  async loadTasks(): Promise<Task[]> {
    try {
      if (!this.isOnline()) {
        // Offline - load from cache
        return await this.localService.loadTasks();
      }

      const response = await fetch(`${this.apiUrl}/tasks`, {
        headers: {
          'Authorization': `Bearer ${this.authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to load tasks: ${response.statusText}`);
      }

      const tasks = await response.json();
      
      // Cache locally for offline access
      await this.localService.saveTasks(tasks);
      
      return tasks;
    } catch (error) {
      console.warn('Failed to load tasks from API, using local cache:', error);
      return await this.localService.loadTasks();
    }
  }

  async saveTasks(tasks: Task[]): Promise<void> {
    try {
      // Always save locally first for immediate feedback
      await this.localService.saveTasks(tasks);

      if (!this.isOnline()) {
        // Queue for later sync when online
        console.log('Offline: Tasks queued for sync');
        return;
      }

      const response = await fetch(`${this.apiUrl}/tasks`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tasks),
      });

      if (!response.ok) {
        throw new Error(`Failed to save tasks: ${response.statusText}`);
      }
    } catch (error) {
      console.warn('Failed to sync tasks to API:', error);
      // Local save already succeeded, so don't throw
    }
  }

  async syncTasks(): Promise<void> {
    if (!this.isOnline()) {
      return;
    }

    try {
      // Load local tasks and sync to server
      const localTasks = await this.localService.loadTasks();
      await this.saveTasks(localTasks);
    } catch (error) {
      console.warn('Failed to sync tasks:', error);
    }
  }

  isOnline(): boolean {
    return navigator.onLine;
  }
}

// Task service factory
export function createTaskService(userContext?: UserContext, apiUrl?: string, authToken?: string): TaskServiceInterface {
  if (apiUrl && userContext?.mode === 'authenticated' && authToken) {
    return new APITaskService(apiUrl, userContext, authToken);
  }
  
  return new LocalStorageTaskService(userContext);
}

// Hook for getting current user context (placeholder for future auth)
export function useUserContext(): UserContext {
  // This will be replaced with actual auth context later
  return {
    mode: 'guest',
    isOnline: typeof window !== 'undefined' ? navigator.onLine : false,
  };
}

// Task sync utilities for future use
export class TaskSyncManager {
  private service: TaskServiceInterface;
  private syncInterval?: NodeJS.Timeout;

  constructor(service: TaskServiceInterface) {
    this.service = service;
  }

  startAutoSync(intervalMs: number = 30000) {
    if (this.service.syncTasks) {
      this.syncInterval = setInterval(() => {
        this.service.syncTasks?.();
      }, intervalMs);
    }
  }

  stopAutoSync() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = undefined;
    }
  }

  async forcSync() {
    if (this.service.syncTasks) {
      await this.service.syncTasks();
    }
  }
}

export default createTaskService;