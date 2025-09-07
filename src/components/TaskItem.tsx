'use client';

import { useState } from 'react';
import { Check, X, ChevronDown, AlertCircle, Clock, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Task } from '@/hooks/useTasks';
import { cn, getPriorityColor, getPriorityLabel } from '@/lib/utils';
import { format } from 'date-fns';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdatePriority: (id: string, priority: Task['priority']) => void;
  onUpdate: (id: string, updates: Partial<Task>) => void;
}

export function TaskItem({ 
  task, 
  onToggle, 
  onDelete, 
  onUpdatePriority,
  onUpdate 
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [showPriorityMenu, setShowPriorityMenu] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSaveEdit = () => {
    if (editText.trim() && editText !== task.text) {
      onUpdate(task.id, { text: editText.trim() });
    } else {
      setEditText(task.text);
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditText(task.text);
    setIsEditing(false);
  };

  const priorityIcons = {
    high: <AlertCircle className="w-4 h-4" />,
    medium: <Clock className="w-4 h-4" />,
    low: <Sparkles className="w-4 h-4" />
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className={cn(
        "group relative bg-white rounded-xl border-2 transition-all duration-300",
        "hover:shadow-lg hover:border-opacity-100 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-opacity-50",
        task.completed 
          ? "opacity-70 border-gray-200" 
          : getPriorityColor(task.priority)
      )}
      role="listitem"
      aria-label={`Task: ${task.text} (${getPriorityLabel(task.priority)} priority, ${task.completed ? 'completed' : 'active'})`}
      tabIndex={0}
      aria-describedby={`task-shortcuts-${task.id}`}
      onKeyDown={(e) => {
        // Handle keyboard navigation and shortcuts at the item level
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          const nextItem = (e.currentTarget as HTMLElement).nextElementSibling as HTMLElement;
          nextItem?.focus();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          const prevItem = (e.currentTarget as HTMLElement).previousElementSibling as HTMLElement;
          prevItem?.focus();
        } else if (e.key === ' ') {
          e.preventDefault();
          onToggle(task.id);
        } else if (e.key === 'Delete') {
          e.preventDefault();
          onDelete(task.id);
        } else if (e.key === 'e' || e.key === 'E') {
          e.preventDefault();
          if (!task.completed) setIsEditing(true);
        }
      }}
    >
      <div className="p-4">
        <div className="flex items-start gap-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => onToggle(task.id)}
            className={cn(
              "mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
              "hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2",
              task.completed 
                ? "bg-green-500 border-green-500 text-white focus:ring-green-300" 
                : "border-gray-300 hover:border-gray-400 focus:ring-blue-300"
            )}
            aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
          >
            <AnimatePresence>
              {task.completed && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Check className="w-4 h-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveEdit();
                    if (e.key === 'Escape') handleCancelEdit();
                  }}
                  className="flex-1 px-2 py-1 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
                <button
                  onClick={handleSaveEdit}
                  className="px-2 py-1 text-green-600 hover:bg-green-50 rounded"
                  aria-label="Save"
                >
                  <Check className="w-5 h-5" />
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="px-2 py-1 text-red-600 hover:bg-red-50 rounded"
                  aria-label="Cancel"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <p
                onClick={() => !task.completed && setIsEditing(true)}
                className={cn(
                  "text-gray-900 transition-all cursor-text font-medium",
                  task.completed && "line-through text-gray-600"
                )}
              >
                {task.text}
              </p>
            )}

            <div className="flex items-center gap-4 mt-2">
              {/* Quick action shortcuts hint */}
              <div className="sr-only" id={`task-shortcuts-${task.id}`}>
                Press Space to toggle completion, Delete to remove, E to edit, arrow keys to navigate
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowPriorityMenu(!showPriorityMenu)}
                  className={cn(
                    "flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium transition-all",
                    "hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-1",
                    task.completed 
                      ? "bg-gray-100 text-gray-500" 
                      : getPriorityColor(task.priority)
                  )}
                  disabled={task.completed}
                >
                  {priorityIcons[task.priority]}
                  <span>{getPriorityLabel(task.priority)}</span>
                  {!task.completed && <ChevronDown className="w-3 h-3" />}
                </button>

                <AnimatePresence>
                  {showPriorityMenu && !task.completed && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-10"
                      role="menu"
                      aria-label="Priority options"
                    >
                      {(['high', 'medium', 'low'] as const).map((priority) => (
                        <button
                          key={priority}
                          onClick={() => {
                            onUpdatePriority(task.id, priority);
                            setShowPriorityMenu(false);
                          }}
                          className={cn(
                            "flex items-center gap-2 w-full px-3 py-2 text-left text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg",
                            task.priority === priority && "bg-gray-50 font-medium"
                          )}
                          role="menuitem"
                          aria-selected={task.priority === priority}
                        >
                          {priorityIcons[priority]}
                          <span>{getPriorityLabel(priority)}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <span className="text-xs text-gray-500">
                {task.created_at
                  ? format(new Date(task.created_at), 'MMM d, h:mm a')
                  : 'Just now'
                }
              </span>

              {task.completed && task.updated_at && (
                <span className="text-xs text-green-600 font-medium">
                  Completed {format(new Date(task.updated_at), 'MMM d')}
                </span>
              )}
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => onDelete(task.id)}
            className={cn(
              "opacity-0 group-hover:opacity-100 transition-opacity",
              "p-2 text-red-500 hover:bg-red-50 rounded-lg",
              "focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-300"
            )}
            aria-label="Delete task"
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}