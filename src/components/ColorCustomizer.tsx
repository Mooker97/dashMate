'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Eye, Sparkles, Save, RotateCcw } from 'lucide-react';
import { UserCustomizations } from '@/types/user';

interface ColorCustomizerProps {
  customizations: UserCustomizations;
  onUpdate: (updates: Partial<UserCustomizations>) => void;
}

export function ColorCustomizer({ customizations, onUpdate }: ColorCustomizerProps) {
  const [activePreview, setActivePreview] = useState<string | null>(null);

  // Extensive neutral color palettes
  const neutralPalettes = {
    'Warm Grays': {
      primary: ['#8B7355', '#A68B5B', '#C4A27A', '#D4B896', '#E8D5B7'],
      secondary: ['#6B5B73', '#7A6881', '#9A7CA0', '#B8A1C8', '#D4C2DC'],
      accent: ['#9B6B47', '#B8845F', '#D4A373', '#E9C893', '#F2E7D5']
    },
    'Cool Grays': {
      primary: ['#5A6B7D', '#6B7B8C', '#8C9CAE', '#ADBCCF', '#D1DAEA'],
      secondary: ['#4A5A6B', '#5A6A7B', '#7A8A9B', '#9AACBD', '#BACFDE'],
      accent: ['#3A5A7A', '#4A6A8A', '#6A8AAA', '#8AABCA', '#AACCEA']
    },
    'Sage Greens': {
      primary: ['#6B7C6E', '#7C8D7F', '#9CAE9F', '#BDCFC0', '#DEEFE1'],
      secondary: ['#5B6C7E', '#6C7D8F', '#8D9EAF', '#AEBFD0', '#CFE0F1'],
      accent: ['#8B9B5F', '#9CAB70', '#BDCC91', '#DEEDB2', '#F0F8D3']
    },
    'Warm Beiges': {
      primary: ['#A0968B', '#B8A99F', '#D1C4BA', '#E9DDD6', '#F7F2EF'],
      secondary: ['#968B7A', '#A99F8E', '#C4BAA8', '#DDD6C8', '#F2EFE8'],
      accent: ['#B89F7A', '#CDB28E', '#E2C6A8', '#F7DAC8', '#FFF0E8']
    },
    'Soft Lavenders': {
      primary: ['#8B7C96', '#9F8FAA', '#BAA8C5', '#D5C4E0', '#F0E1FB'],
      secondary: ['#7A6B85', '#8E7F99', '#A8999C', '#C5B6CF', '#E0D1EA'],
      accent: ['#9F8FB8', '#B8A2CC', '#D1B8E0', '#EACEF4', '#FDE7FF']
    },
    'Dusty Blues': {
      primary: ['#6B7C96', '#7F92A8', '#99ADBA', '#B8CCDC', '#D7EBFE'],
      secondary: ['#5A6B85', '#6E7F99', '#8299AD', '#B0C5D9', '#DEF1FF'],
      accent: ['#7A8BB8', '#8E9FCC', '#A8B9E0', '#C6D7F4', '#E4F5FF']
    },
    'Stone Grays': {
      primary: ['#7A7A7A', '#8F8F8F', '#ADADAD', '#CBCBCB', '#E9E9E9'],
      secondary: ['#6A6A6A', '#7F7F7F', '#9D9D9D', '#BBBBBB', '#D9D9D9'],
      accent: ['#8A8A7A', '#9F9F8F', '#ADADBD', '#CBCBDB', '#E9E9F9']
    },
    'Muted Roses': {
      primary: ['#A68B8B', '#B89F9F', '#D4B8B8', '#E9D1D1', '#FEEBEB'],
      secondary: ['#968080', '#A69393', '#C4B0B0', '#E0CDCD', '#FDEAEA'],
      accent: ['#B89F8B', '#CCB29F', '#E0C6B8', '#F4DAD1', '#FFEEEB']
    }
  };

  const priorityColorSets = {
    'Classic Traffic': { high: '#DC2626', medium: '#D97706', low: '#059669' },
    'Soft Pastels': { high: '#F87171', medium: '#FCD34D', low: '#6EE7B7' },
    'Muted Tones': { high: '#B91C1C', medium: '#B45309', low: '#047857' },
    'Neutral Warnings': { high: '#7C2D12', medium: '#92400E', low: '#14532D' },
    'Gentle Signals': { high: '#FCA5A5', medium: '#FDE047', low: '#86EFAC' },
    'Earthy Tones': { high: '#A16207', medium: '#CA8A04', low: '#65A30D' },
    'Cool Neutrals': { high: '#64748B', medium: '#6B7280', low: '#4B5563' },
    'Warm Grays': { high: '#78716C', medium: '#A8A29E', low: '#D6D3D1' }
  };

  const backgroundThemes = {
    'Pure Minimal': {
      primary: '#FFFFFF',
      secondary: '#F9FAFB',
      surface: '#F3F4F6',
      accent: '#E5E7EB'
    },
    'Warm White': {
      primary: '#FEFEFE',
      secondary: '#FAF9F7',
      surface: '#F5F3F0',
      accent: '#E8E6E3'
    },
    'Cool White': {
      primary: '#FDFDFE',
      secondary: '#F8F9FB',
      surface: '#F1F3F5',
      accent: '#E3E6EA'
    },
    'Cream Canvas': {
      primary: '#FFFEF7',
      secondary: '#FFFBF0',
      surface: '#FBF7EB',
      accent: '#F3EFE0'
    },
    'Soft Gray': {
      primary: '#FAFAFA',
      secondary: '#F5F5F5',
      surface: '#F0F0F0',
      accent: '#E5E5E5'
    }
  };

  const textColorSets = {
    'Soft Blacks': {
      primary: '#1F2937',
      secondary: '#374151',
      muted: '#6B7280',
      light: '#9CA3AF'
    },
    'Warm Grays': {
      primary: '#292524',
      secondary: '#44403C',
      muted: '#78716C',
      light: '#A8A29E'
    },
    'Cool Grays': {
      primary: '#1E293B',
      secondary: '#334155',
      muted: '#64748B',
      light: '#94A3B8'
    },
    'Deep Neutrals': {
      primary: '#18181B',
      secondary: '#3F3F46',
      muted: '#71717A',
      light: '#A1A1AA'
    }
  };

  const applyPalette = (paletteType: string, paletteName: string) => {
    const palette = neutralPalettes[paletteName as keyof typeof neutralPalettes];
    if (!palette) return;

    const newColors = { ...customizations.customColors };
    
    if (paletteType === 'primary') {
      newColors.primary = palette.primary[2]; // Middle tone
      newColors.secondary = palette.secondary[2];
      newColors.accent = palette.accent[2];
    }

    onUpdate({
      customColors: newColors
    });
  };

  const applyPrioritySet = (setName: string) => {
    const set = priorityColorSets[setName as keyof typeof priorityColorSets];
    if (!set) return;

    onUpdate({
      customColors: {
        ...customizations.customColors,
        priorityHigh: set.high,
        priorityMedium: set.medium,
        priorityLow: set.low
      }
    });
  };

  const ColorPreview = ({ color, size = 'w-8 h-8' }: { color: string; size?: string }) => (
    <div 
      className={`${size} rounded-lg border border-gray-200 shadow-sm`}
      style={{ backgroundColor: color }}
    />
  );

  return (
    <div className="space-y-8">
      {/* Quick Palette Application */}
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
          <Palette className="w-5 h-5" />
          Neutral Color Palettes
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(neutralPalettes).map(([name, palette]) => (
            <motion.div
              key={name}
              className="p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-all cursor-pointer"
              whileHover={{ scale: 1.02 }}
              onClick={() => applyPalette('primary', name)}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-700">{name}</h4>
                <Sparkles className="w-4 h-4 text-gray-400" />
              </div>
              <div className="flex gap-1 mb-2">
                {palette.primary.map((color, i) => (
                  <ColorPreview key={i} color={color} size="w-6 h-6" />
                ))}
              </div>
              <p className="text-xs text-gray-500">Click to apply</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Priority Color Sets */}
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-4">Priority Color Sets</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(priorityColorSets).map(([name, colors]) => (
            <motion.div
              key={name}
              className="p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-all cursor-pointer"
              whileHover={{ scale: 1.02 }}
              onClick={() => applyPrioritySet(name)}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-700">{name}</h4>
              </div>
              <div className="flex gap-2 items-center">
                <div className="text-center">
                  <ColorPreview color={colors.high} />
                  <p className="text-xs text-gray-500 mt-1">High</p>
                </div>
                <div className="text-center">
                  <ColorPreview color={colors.medium} />
                  <p className="text-xs text-gray-500 mt-1">Med</p>
                </div>
                <div className="text-center">
                  <ColorPreview color={colors.low} />
                  <p className="text-xs text-gray-500 mt-1">Low</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Individual Color Customization */}
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-4">Fine-tune Individual Colors</h3>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Main Colors */}
            <div>
              <h4 className="font-medium text-gray-700 mb-4">Main Colors</h4>
              <div className="space-y-3">
                {[
                  { key: 'primary', label: 'Primary Color' },
                  { key: 'secondary', label: 'Secondary Color' },
                  { key: 'accent', label: 'Accent Color' }
                ].map(({ key, label }) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{label}</span>
                    <div className="flex items-center gap-2">
                      <ColorPreview 
                        color={customizations.customColors[key as keyof typeof customizations.customColors]} 
                      />
                      <input
                        type="color"
                        value={customizations.customColors[key as keyof typeof customizations.customColors]}
                        onChange={(e) => onUpdate({
                          customColors: {
                            ...customizations.customColors,
                            [key]: e.target.value
                          }
                        })}
                        className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Priority Colors */}
            <div>
              <h4 className="font-medium text-gray-700 mb-4">Priority Colors</h4>
              <div className="space-y-3">
                {[
                  { key: 'priorityHigh', label: 'High Priority' },
                  { key: 'priorityMedium', label: 'Medium Priority' },
                  { key: 'priorityLow', label: 'Low Priority' }
                ].map(({ key, label }) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{label}</span>
                    <div className="flex items-center gap-2">
                      <ColorPreview 
                        color={customizations.customColors[key as keyof typeof customizations.customColors]} 
                      />
                      <input
                        type="color"
                        value={customizations.customColors[key as keyof typeof customizations.customColors]}
                        onChange={(e) => onUpdate({
                          customColors: {
                            ...customizations.customColors,
                            [key]: e.target.value
                          }
                        })}
                        className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-medium text-gray-700 mb-4 flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Live Preview
            </h4>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="space-y-3">
                {/* Sample task items with current colors */}
                <div className="bg-white p-3 rounded-lg border-l-4" style={{ borderLeftColor: customizations.customColors.priorityHigh }}>
                  <span className="text-sm font-medium">High Priority Task</span>
                </div>
                <div className="bg-white p-3 rounded-lg border-l-4" style={{ borderLeftColor: customizations.customColors.priorityMedium }}>
                  <span className="text-sm font-medium">Medium Priority Task</span>
                </div>
                <div className="bg-white p-3 rounded-lg border-l-4" style={{ borderLeftColor: customizations.customColors.priorityLow }}>
                  <span className="text-sm font-medium">Low Priority Task</span>
                </div>
                <div 
                  className="p-3 rounded-lg text-white text-center font-medium"
                  style={{ backgroundColor: customizations.customColors.primary }}
                >
                  Primary Color Sample
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => {
                onUpdate({
                  customColors: {
                    primary: '#6B7280',
                    secondary: '#9CA3AF',
                    accent: '#4B5563',
                    priorityHigh: '#DC2626',
                    priorityMedium: '#D97706',
                    priorityLow: '#059669'
                  }
                });
              }}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset to Default
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white hover:bg-gray-900 rounded-lg transition-colors"
            >
              <Save className="w-4 h-4" />
              Colors Saved Automatically
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}