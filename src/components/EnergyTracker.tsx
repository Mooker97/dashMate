'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, TrendingUp, Clock, Brain, Coffee, Moon, Sun, CloudRain } from 'lucide-react';

interface EnergyTrackerProps {
  onEnergySubmit: (energy: number, mood?: string, notes?: string) => void;
  currentEnergy?: number;
  isVisible: boolean;
  onClose: () => void;
}

export function EnergyTracker({ onEnergySubmit, currentEnergy, isVisible, onClose }: EnergyTrackerProps) {
  const [selectedEnergy, setSelectedEnergy] = useState<number>(currentEnergy || 3);
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [timeOfCheck, setTimeOfCheck] = useState<Date>(new Date());

  useEffect(() => {
    if (isVisible) {
      setTimeOfCheck(new Date());
      setSelectedEnergy(currentEnergy || 3);
      setSelectedMood('');
      setNotes('');
    }
  }, [isVisible, currentEnergy]);

  const handleSubmit = () => {
    onEnergySubmit(selectedEnergy, selectedMood, notes);
    onClose();
  };

  const energyLevels = [
    { level: 1, label: 'Drained', icon: Moon, color: 'text-gray-500', bg: 'bg-gray-100' },
    { level: 2, label: 'Low', icon: CloudRain, color: 'text-blue-500', bg: 'bg-blue-100' },
    { level: 3, label: 'Steady', icon: Coffee, color: 'text-yellow-500', bg: 'bg-yellow-100' },
    { level: 4, label: 'Good', icon: Sun, color: 'text-orange-500', bg: 'bg-orange-100' },
    { level: 5, label: 'Peak', icon: Zap, color: 'text-red-500', bg: 'bg-red-100' }
  ];

  const moodOptions = [
    { emoji: '😊', label: 'Happy', value: 'happy' },
    { emoji: '😌', label: 'Calm', value: 'calm' },
    { emoji: '🤔', label: 'Focused', value: 'focused' },
    { emoji: '😴', label: 'Tired', value: 'tired' },
    { emoji: '😰', label: 'Stressed', value: 'stressed' },
    { emoji: '🤯', label: 'Overwhelmed', value: 'overwhelmed' },
    { emoji: '🚀', label: 'Motivated', value: 'motivated' },
    { emoji: '🌊', label: 'Flow State', value: 'flow' }
  ];

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Brain className="w-6 h-6" />
              <div>
                <h3 className="text-xl font-semibold">Energy Check-in</h3>
                <p className="text-blue-100 text-sm">
                  {timeOfCheck.toLocaleTimeString('en', { 
                    hour: 'numeric', 
                    minute: '2-digit',
                    hour12: true 
                  })}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Energy Level Selection */}
          <div>
            <h4 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              How&apos;s your energy level?
            </h4>
            <div className="space-y-3">
              {energyLevels.map(({ level, label, icon: Icon, color, bg }) => (
                <button
                  key={level}
                  onClick={() => setSelectedEnergy(level)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                    selectedEnergy === level
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${bg}`}>
                    <Icon className={`w-5 h-5 ${color}`} />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-800">{label}</p>
                    <p className="text-xs text-gray-500">Level {level}/5</p>
                  </div>
                  {selectedEnergy === level && (
                    <div className="ml-auto w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Mood Selection */}
          <div>
            <h4 className="text-lg font-medium text-gray-800 mb-4">What&apos;s your mood?</h4>
            <div className="grid grid-cols-4 gap-2">
              {moodOptions.map(({ emoji, label, value }) => (
                <button
                  key={value}
                  onClick={() => setSelectedMood(selectedMood === value ? '' : value)}
                  className={`p-3 rounded-lg border-2 text-center transition-all ${
                    selectedMood === value
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="text-2xl mb-1">{emoji}</div>
                  <p className="text-xs text-gray-600">{label}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <h4 className="text-lg font-medium text-gray-800 mb-4">Any notes? (Optional)</h4>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="What's affecting your energy today? Any patterns you notice?"
              className="w-full p-3 border border-gray-300 rounded-lg resize-none h-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength={200}
            />
            <p className="text-xs text-gray-500 mt-1">{notes.length}/200</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
            >
              Skip
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all shadow-md hover:shadow-lg"
            >
              Save Check-in
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}