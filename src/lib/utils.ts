import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPriorityColor(priority: 'high' | 'medium' | 'low') {
  switch (priority) {
    case 'high':
      return 'text-red-500 border-red-200 bg-red-50/50';
    case 'medium':
      return 'text-yellow-600 border-yellow-200 bg-yellow-50/50';
    case 'low':
      return 'text-green-600 border-green-200 bg-green-50/50';
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