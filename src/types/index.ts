export interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  created_at?: string | Date;  // Support both field names for compatibility
  createdAt?: Date;
  updated_at?: string | Date;
  completedAt?: Date;
  category?: string;
  dueDate?: Date;
}

export interface RecordingState {
  isRecording: boolean;
  audioBlob?: Blob;
  transcription?: string;
  error?: string;
}

export interface AIResponse {
  message: string;
  tasks?: Partial<Task>[];
  action?: 'add' | 'complete' | 'update' | 'delete';
  taskIds?: string[];
}

export type TaskFilter = 'all' | 'active' | 'completed';
export type TaskSort = 'priority' | 'date' | 'alphabetical';