'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Pause, Square, Coffee, Clock, Target, 
  Brain, Zap, Timer, SkipForward, Volume2, VolumeX
} from 'lucide-react';

interface FocusSessionProps {
  isVisible: boolean;
  onClose: () => void;
  onSessionComplete: (sessionData: SessionData) => void;
  selectedTask?: { id: string; text: string; priority: string };
}

interface SessionData {
  duration: number;
  tasksCompleted: number;
  breaksTaken: number;
  focusScore: number;
  sessionType: string;
}

type SessionType = 'pomodoro' | 'deep-focus' | 'quick-burst' | 'custom';

export function FocusSession({ isVisible, onClose, onSessionComplete, selectedTask }: FocusSessionProps) {
  const [sessionType, setSessionType] = useState<SessionType>('pomodoro');
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [breakCount, setBreakCount] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [currentPhase, setCurrentPhase] = useState<'focus' | 'short-break' | 'long-break'>('focus');
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const sessionTypes = {
    pomodoro: {
      name: 'Pomodoro',
      focus: 25,
      shortBreak: 5,
      longBreak: 15,
      description: 'Classic 25/5 minute cycles',
      icon: Clock,
      color: 'bg-red-500'
    },
    'deep-focus': {
      name: 'Deep Focus',
      focus: 45,
      shortBreak: 10,
      longBreak: 30,
      description: 'Extended focus for complex tasks',
      icon: Brain,
      color: 'bg-purple-500'
    },
    'quick-burst': {
      name: 'Quick Burst',
      focus: 15,
      shortBreak: 3,
      longBreak: 10,
      description: 'Short bursts for ADHD minds',
      icon: Zap,
      color: 'bg-yellow-500'
    },
    custom: {
      name: 'Custom',
      focus: 30,
      shortBreak: 5,
      longBreak: 15,
      description: 'Set your own timing',
      icon: Timer,
      color: 'bg-blue-500'
    }
  };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  useEffect(() => {
    const settings = sessionTypes[sessionType];
    setTimeLeft(settings.focus * 60);
    setCurrentPhase('focus');
  }, [sessionType]);

  const handleTimerComplete = () => {
    setIsRunning(false);
    playNotificationSound();

    if (currentPhase === 'focus') {
      setCompletedSessions(prev => prev + 1);
      const isLongBreak = (completedSessions + 1) % 4 === 0;
      const nextPhase = isLongBreak ? 'long-break' : 'short-break';
      const breakDuration = isLongBreak 
        ? sessionTypes[sessionType].longBreak 
        : sessionTypes[sessionType].shortBreak;
      
      setCurrentPhase(nextPhase);
      setTimeLeft(breakDuration * 60);
      setIsBreak(true);
    } else {
      setBreakCount(prev => prev + 1);
      setCurrentPhase('focus');
      setTimeLeft(sessionTypes[sessionType].focus * 60);
      setIsBreak(false);
    }
  };

  const playNotificationSound = () => {
    if (soundEnabled && audioRef.current) {
      audioRef.current.play().catch(console.warn);
    }
  };

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(sessionTypes[sessionType][currentPhase === 'focus' ? 'focus' : 'shortBreak'] * 60);
  };

  const skipPhase = () => {
    setIsRunning(false);
    handleTimerComplete();
  };

  const endSession = () => {
    const sessionData: SessionData = {
      duration: completedSessions * sessionTypes[sessionType].focus,
      tasksCompleted: completedSessions,
      breaksTaken: breakCount,
      focusScore: calculateFocusScore(),
      sessionType
    };
    
    onSessionComplete(sessionData);
    resetSession();
    onClose();
  };

  const resetSession = () => {
    setIsRunning(false);
    setCompletedSessions(0);
    setBreakCount(0);
    setCurrentPhase('focus');
    setTimeLeft(sessionTypes[sessionType].focus * 60);
    setIsBreak(false);
  };

  const calculateFocusScore = () => {
    const expectedSessions = Math.max(1, completedSessions);
    const breakEfficiency = breakCount / Math.max(1, completedSessions);
    return Math.round((completedSessions / expectedSessions) * (1 + breakEfficiency) * 100);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getPhaseColor = () => {
    if (isBreak) return 'from-green-500 to-emerald-500';
    return currentPhase === 'focus' ? 'from-blue-500 to-purple-500' : 'from-green-500 to-teal-500';
  };

  const getPhaseIcon = () => {
    if (currentPhase === 'focus') return Target;
    return Coffee;
  };

  const progress = currentPhase === 'focus' 
    ? ((sessionTypes[sessionType].focus * 60 - timeLeft) / (sessionTypes[sessionType].focus * 60)) * 100
    : ((sessionTypes[sessionType].shortBreak * 60 - timeLeft) / (sessionTypes[sessionType].shortBreak * 60)) * 100;

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
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
      >
        {/* Header */}
        <div className={`bg-gradient-to-r ${getPhaseColor()} text-white p-6`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {React.createElement(getPhaseIcon(), { className: "w-6 h-6" })}
              <div>
                <h3 className="text-xl font-semibold">
                  {isBreak ? `${currentPhase === 'long-break' ? 'Long' : 'Short'} Break` : 'Focus Session'}
                </h3>
                <p className="text-white/80 text-sm">
                  {selectedTask ? selectedTask.text : sessionTypes[sessionType].name}
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

        <div className="p-6">
          {/* Session Type Selection */}
          {!isRunning && completedSessions === 0 && (
            <div className="mb-6">
              <h4 className="font-medium text-gray-800 mb-3">Choose Session Type</h4>
              <div className="grid grid-cols-2 gap-2">
                {(Object.entries(sessionTypes) as [SessionType, any][]).map(([type, config]) => {
                  const Icon = config.icon;
                  return (
                    <button
                      key={type}
                      onClick={() => setSessionType(type)}
                      className={`p-3 rounded-lg border-2 text-left transition-all ${
                        sessionType === type
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="w-4 h-4" />
                        <span className="font-medium text-sm">{config.name}</span>
                      </div>
                      <p className="text-xs text-gray-500">{config.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Timer Display */}
          <div className="text-center mb-6">
            <div className="relative inline-block">
              <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="transparent"
                  className="text-gray-200"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                  className={isBreak ? 'text-green-500' : 'text-blue-500'}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-light text-gray-800">{formatTime(timeLeft)}</div>
                  <div className="text-sm text-gray-500 mt-1">
                    {currentPhase.replace('-', ' ')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Session Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6 text-center">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{completedSessions}</div>
              <div className="text-xs text-blue-600">Sessions</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{breakCount}</div>
              <div className="text-xs text-green-600">Breaks</div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{calculateFocusScore()}</div>
              <div className="text-xs text-purple-600">Focus Score</div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-3 mb-4">
            {!isRunning ? (
              <button
                onClick={startTimer}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all shadow-md hover:shadow-lg"
              >
                <Play className="w-5 h-5" />
                Start
              </button>
            ) : (
              <button
                onClick={pauseTimer}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-all shadow-md hover:shadow-lg"
              >
                <Pause className="w-5 h-5" />
                Pause
              </button>
            )}

            <button
              onClick={resetTimer}
              className="p-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              title="Reset Timer"
            >
              <Square className="w-5 h-5" />
            </button>

            <button
              onClick={skipPhase}
              className="p-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              title="Skip Phase"
            >
              <SkipForward className="w-5 h-5" />
            </button>

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              title={soundEnabled ? "Disable Sound" : "Enable Sound"}
            >
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Minimize
            </button>
            {completedSessions > 0 && (
              <button
                onClick={endSession}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all"
              >
                End Session
              </button>
            )}
          </div>
        </div>

        {/* Hidden audio element for notifications */}
        <audio
          ref={audioRef as React.RefObject<HTMLAudioElement>}
          preload="auto"
        >
          <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+P27G8hBdux2/LNfS4GI3nP8+OZRQ0PVqzn77BdGwg+ltryxnkpBSl+zPLaizsIGGS57OOeTA8OUKXh8bJwHwU2jdT2z4IwBiZ+0fPjmkMODlOq5O+zYBoGPJPY88p9MAlB2n4xhA==" type="audio/wav" />
        </audio>
      </motion.div>
    </motion.div>
  );
}