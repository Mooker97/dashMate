'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, Filter, TrendingUp, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { Task } from '@/hooks/useTasks';
import { TaskItem } from './TaskItem';
import { cn } from '@/lib/utils';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onUpdatePriority: (id: string, priority: Task['priority']) => void;
  onUpdateTask: (id: string, updates: Partial<Task>) => void;
  onAddTask: (text: string, priority: Task['priority']) => void;
  loading?: boolean;
}

type FilterType = 'all' | 'active' | 'completed';

export function TaskList({
  tasks,
  onToggleTask,
  onDeleteTask,
  onUpdatePriority,
  onUpdateTask,
  onAddTask,
  loading = false
}: TaskListProps) {
  const [filter, setFilter] = useState<FilterType>('all');
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<Task['priority']>('medium');
  const [showAddTask, setShowAddTask] = useState(false);

  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'active':
        return !task.completed;
      case 'completed':
        return task.completed;
      default:
        return true;
    }
  });

  const stats = {
    total: tasks.length,
    active: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length,
    high: tasks.filter(t => !t.completed && t.priority === 'high').length,
    medium: tasks.filter(t => !t.completed && t.priority === 'medium').length,
    low: tasks.filter(t => !t.completed && t.priority === 'low').length,
  };

  const handleAddTask = () => {
    if (newTaskText.trim()) {
      onAddTask(newTaskText.trim(), newTaskPriority);
      setNewTaskText('');
      setNewTaskPriority('medium');
      setShowAddTask(false);
    }
  };

  const filterButtons: { value: FilterType; label: string; icon: React.ReactNode }[] = [
    { value: 'all', label: 'All', icon: <Filter className="w-4 h-4" /> },
    { value: 'active', label: 'Active', icon: <TrendingUp className="w-4 h-4" /> },
    { value: 'completed', label: 'Completed', icon: <CheckCircle2 className="w-4 h-4" /> },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {stats.total > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100"
        >
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="flex items-center justify-center gap-2 text-red-600 mb-1">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-2xl font-bold">{stats.high}</span>
              </div>
              <p className="text-xs text-gray-600">Urgent</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 text-yellow-600 mb-1">
                <Clock className="w-4 h-4" />
                <span className="text-2xl font-bold">{stats.medium}</span>
              </div>
              <p className="text-xs text-gray-600">Important</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 text-green-600 mb-1">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-2xl font-bold">{stats.completed}</span>
              </div>
              <p className="text-xs text-gray-600">Done Today</p>
            </div>
          </div>
        </motion.div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {filterButtons.map((btn) => (
            <button
              key={btn.value}
              onClick={() => setFilter(btn.value)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all",
                "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                filter === btn.value
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              )}
            >
              {btn.icon}
              <span className="hidden sm:inline">{btn.label}</span>
              {btn.value === 'active' && stats.active > 0 && (
                <span className="ml-1 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                  {stats.active}
                </span>
              )}
            </button>
          ))}
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddTask(!showAddTask)}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all",
            "bg-gradient-to-r from-green-500 to-emerald-500 text-white",
            "hover:from-green-600 hover:to-emerald-600 shadow-md hover:shadow-lg",
            "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          )}
        >
          <Plus className="w-5 h-5" />
          <span className="hidden sm:inline">Add Task</span>
        </motion.button>
      </div>

      <AnimatePresence>
        {showAddTask && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-white rounded-xl border-2 border-blue-200 p-4 space-y-3">
              <input
                type="text"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAddTask();
                  if (e.key === 'Escape') setShowAddTask(false);
                }}
                placeholder="What needs to be done?"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
              />
              
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {(['high', 'medium', 'low'] as const).map((priority) => (
                    <button
                      key={priority}
                      onClick={() => setNewTaskPriority(priority)}
                      className={cn(
                        "px-3 py-1 rounded-lg text-sm font-medium transition-all",
                        newTaskPriority === priority
                          ? priority === 'high'
                            ? "bg-red-100 text-red-700 border-2 border-red-300"
                            : priority === 'medium'
                            ? "bg-yellow-100 text-yellow-700 border-2 border-yellow-300"
                            : "bg-green-100 text-green-700 border-2 border-green-300"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-transparent"
                      )}
                    >
                      {priority === 'high' ? 'Urgent' : priority === 'medium' ? 'Important' : 'Whenever'}
                    </button>
                  ))}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setShowAddTask(false);
                      setNewTaskText('');
                      setNewTaskPriority('medium');
                    }}
                    className="px-4 py-1 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddTask}
                    disabled={!newTaskText.trim()}
                    className={cn(
                      "px-4 py-1 rounded-lg font-medium transition-all",
                      newTaskText.trim()
                        ? "bg-blue-500 text-white hover:bg-blue-600"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    )}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filteredTasks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
                <CheckCircle2 className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg font-medium">
                {filter === 'completed' 
                  ? "No completed tasks yet" 
                  : filter === 'active'
                  ? "All tasks completed! Great job!"
                  : "No tasks yet. Add one to get started!"}
              </p>
            </motion.div>
          ) : (
            filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={onToggleTask}
                onDelete={onDeleteTask}
                onUpdatePriority={onUpdatePriority}
                onUpdate={onUpdateTask}
              />
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}