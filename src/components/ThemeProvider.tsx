'use client';

import { useEffect } from 'react';
import { UserCustomizations } from '@/types/user';

interface ThemeProviderProps {
  customizations: UserCustomizations;
  children: React.ReactNode;
}

export function ThemeProvider({ customizations, children }: ThemeProviderProps) {
  useEffect(() => {
    // Apply custom colors as CSS variables
    const root = document.documentElement;
    
    if (customizations?.customColors) {
      const { customColors } = customizations;
      
      // Main colors
      root.style.setProperty('--color-primary', customColors.primary || '#6B7280');
      root.style.setProperty('--color-secondary', customColors.secondary || '#9CA3AF');
      root.style.setProperty('--color-accent', customColors.accent || '#4B5563');
      
      // Priority colors
      root.style.setProperty('--color-priority-high', customColors.priorityHigh || '#DC2626');
      root.style.setProperty('--color-priority-medium', customColors.priorityMedium || '#D97706');
      root.style.setProperty('--color-priority-low', customColors.priorityLow || '#059669');
      
      // Apply to specific elements
      applyThemeToElements(customColors);
    }
    
    // Apply other customizations
    if (customizations?.customFonts) {
      root.style.setProperty('--font-family', customizations.customFonts.primary || 'inherit');
      root.style.setProperty('--font-size-base', customizations.customFonts.baseSize || '16px');
    }
    
    if (customizations?.customSpacing) {
      root.style.setProperty('--spacing-comfortable', customizations.customSpacing.comfortable ? '1.5' : '1');
      root.style.setProperty('--spacing-compact', customizations.customSpacing.compact ? '0.75' : '1');
    }
    
  }, [customizations]);

  // Apply theme colors to specific elements
  const applyThemeToElements = (colors: UserCustomizations['customColors']) => {
    // Update gradient backgrounds
    const gradients = document.querySelectorAll('[class*="bg-gradient"]');
    gradients.forEach(el => {
      if (el.classList.contains('from-blue-500')) {
        el.classList.remove('from-blue-500');
        el.classList.add('theme-gradient-primary');
      }
    });
    
    // Update buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn => {
      if (btn.classList.contains('bg-blue-500')) {
        btn.style.backgroundColor = colors.primary;
      }
    });
    
    // Update priority indicators
    updatePriorityColors(colors);
  };
  
  const updatePriorityColors = (colors: UserCustomizations['customColors']) => {
    // High priority
    const highPriorityElements = document.querySelectorAll('[data-priority="high"]');
    highPriorityElements.forEach(el => {
      (el as HTMLElement).style.borderLeftColor = colors.priorityHigh;
    });
    
    // Medium priority
    const mediumPriorityElements = document.querySelectorAll('[data-priority="medium"]');
    mediumPriorityElements.forEach(el => {
      (el as HTMLElement).style.borderLeftColor = colors.priorityMedium;
    });
    
    // Low priority
    const lowPriorityElements = document.querySelectorAll('[data-priority="low"]');
    lowPriorityElements.forEach(el => {
      (el as HTMLElement).style.borderLeftColor = colors.priorityLow;
    });
  };

  return <>{children}</>;
}