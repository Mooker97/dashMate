'use client';

import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MicrophoneButtonProps {
  onTranscription: (text: string) => void;
  onError?: (error: string) => void;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function MicrophoneButton({ 
  onTranscription, 
  onError,
  size = 'xl',
  className 
}: MicrophoneButtonProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32'
  };

  const iconSizes = {
    sm: 20,
    md: 24,
    lg: 32,
    xl: 40
  };

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const analyzeAudioLevel = () => {
    if (!analyserRef.current) return;
    
    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);
    
    const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
    setAudioLevel(average / 255);
    
    if (isRecording) {
      animationFrameRef.current = requestAnimationFrame(analyzeAudioLevel);
    }
  };

  const startRecording = async () => {
    try {
      audioChunksRef.current = [];
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });
      streamRef.current = stream;

      const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioContextRef.current = new AudioContextClass();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      analyserRef.current.fftSize = 256;

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await processAudio(audioBlob);
        
        stream.getTracks().forEach(track => track.stop());
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        setAudioLevel(0);
      };

      mediaRecorder.start(100);
      setIsRecording(true);
      analyzeAudioLevel();
    } catch (error) {
      console.error('Error accessing microphone:', error);
      onError?.('Unable to access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      setIsRecording(false);
      mediaRecorderRef.current.stop();
    }
  };

  const processAudio = async (audioBlob: Blob) => {
    setIsProcessing(true);
    
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.webm');
      formData.append('model', 'whisper-1');

      const response = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Transcription failed');
      }

      const { text } = await response.json();
      
      if (text && text.trim()) {
        onTranscription(text.trim());
      }
    } catch (error) {
      console.error('Error processing audio:', error);
      onError?.('Failed to process audio. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className="relative group" role="region" aria-label="Voice recording controls">
      <AnimatePresence>
        {isRecording && (
          <>
            {/* Outer pulse ring */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-red-400 to-pink-400 opacity-30"
              initial={{ scale: 1 }}
              animate={{ 
                scale: [1, 1.3 + audioLevel * 0.8, 1],
              }}
              transition={{ 
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut"
              }}
            />
            {/* Middle pulse ring */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500 to-pink-500 opacity-20"
              initial={{ scale: 1 }}
              animate={{ 
                scale: [1, 1.2 + audioLevel * 0.5, 1],
              }}
              transition={{ 
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut"
              }}
            />
            {/* Inner pulse ring */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500 to-pink-500 opacity-15"
              initial={{ scale: 1 }}
              animate={{ 
                scale: [1, 1.4 + audioLevel * 0.7, 1],
              }}
              transition={{ 
                repeat: Infinity,
                duration: 1.5,
                delay: 0.2,
                ease: "easeInOut"
              }}
            />
          </>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggleRecording}
        disabled={isProcessing}
        className={cn(
          sizeClasses[size],
          "relative rounded-full flex items-center justify-center transition-all duration-300",
          "shadow-xl hover:shadow-2xl transform hover:scale-105",
          "focus:outline-none focus:ring-4 focus:ring-offset-2",
          isRecording 
            ? "bg-gradient-to-r from-red-500 to-pink-500 text-white focus:ring-red-300 animate-pulse" 
            : isProcessing
            ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white focus:ring-purple-300"
            : "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 focus:ring-blue-300 hover:shadow-blue-500/25",
          isProcessing && "cursor-wait",
          className
        )}
        whileTap={{ scale: 0.95 }}
        aria-label={isProcessing ? "Processing audio..." : isRecording ? "Stop recording" : "Start voice recording"}
        aria-describedby="mic-instructions"
        role="button"
        tabIndex={0}
      >
        <AnimatePresence mode="wait">
          {isProcessing ? (
            <motion.div
              key="processing"
              initial={{ opacity: 0, rotate: 0 }}
              animate={{ opacity: 1, rotate: 360 }}
              exit={{ opacity: 0 }}
              transition={{ 
                rotate: { 
                  repeat: Infinity, 
                  duration: 1, 
                  ease: "linear" 
                } 
              }}
            >
              <Loader2 size={iconSizes[size]} />
            </motion.div>
          ) : isRecording ? (
            <motion.div
              key="recording"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <MicOff size={iconSizes[size]} />
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <Mic size={iconSizes[size]} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isRecording && (
          <motion.div 
            className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-red-100 text-red-700 rounded-lg shadow-md border border-red-200"
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            role="status"
            aria-live="polite"
          >
            <div className="flex items-center gap-2 text-sm font-medium">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              Listening... ({Math.round(audioLevel * 100)}%)
            </div>
          </motion.div>
        )}

        {isProcessing && (
          <motion.div 
            className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg shadow-md border border-purple-200"
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            role="status"
            aria-live="polite"
          >
            <div className="flex items-center gap-2 text-sm font-medium">
              <motion.div 
                className="w-2 h-2 bg-purple-500 rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
              />
              Processing audio...
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden instructions for screen readers */}
      <div id="mic-instructions" className="sr-only">
        Press to start voice recording. Speak clearly and the AI will help you manage your tasks. Press again to stop recording. The button changes color to indicate recording state: blue for ready, red for recording, purple for processing.
      </div>
      
      {/* Visual indicator for ready state */}
      {!isRecording && !isProcessing && (
        <motion.div
          className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-blue-50 text-blue-600 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
          initial={{ y: -5 }}
          animate={{ y: 0 }}
        >
          Click to speak
        </motion.div>
      )}
    </div>
  );
}