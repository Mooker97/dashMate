import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPriorityColor(priority: 'high' | 'medium' | 'low') {
  switch (priority) {
    case 'high':
      return 'priority-high priority-high-text border-red-200 bg-red-50/50';
    case 'medium':
      return 'priority-medium priority-medium-text border-yellow-200 bg-yellow-50/50';
    case 'low':
      return 'priority-low priority-low-text border-green-200 bg-green-50/50';
  }
}

export function getPriorityLabel(priority: 'high' | 'medium' | 'low') {
  switch (priority) {
    case 'high':
      return 'Urgent';
    case 'medium':
      return 'Important';
    case 'low':
      return 'Whenever';
  }
}

export function formatTaskForSpeech(text: string): string {
  return text
    .replace(/([.!?])\s*$/g, '$1')
    .replace(/^\s+|\s+$/g, '');
}