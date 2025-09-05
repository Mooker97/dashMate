'use client';

import { Settings } from '@/types/settings';

interface ColourThemeInfo {
  name: string;
  displayName: string;
  description: string;
  primary: string;
  secondary: string;
  tertiary: string;
  background: string;
}

// ADHD-friendly colour themes with therapeutic properties
const colourThemes: ColourThemeInfo[] = [
  {
    name: 'sage',
    displayName: 'Sage Garden',
    description: 'Soft greens for tranquillity and focus',
    primary: 'rgb(134, 164, 142)',
    secondary: 'rgb(164, 186, 148)', 
    tertiary: 'rgb(147, 171, 155)',
    background: 'rgb(248, 251, 249)'
  },
  {
    name: 'stone',
    displayName: 'River Stone',
    description: 'Warm neutrals for calm concentration',
    primary: 'rgb(156, 149, 142)',
    secondary: 'rgb(142, 136, 130)',
    tertiary: 'rgb(169, 162, 155)',
    background: 'rgb(252, 251, 249)'
  },
  {
    name: 'lavender',
    displayName: 'Gentle Lavender',
    description: 'Soft purples to reduce stress',
    primary: 'rgb(163, 153, 178)',
    secondary: 'rgb(177, 169, 190)',
    tertiary: 'rgb(156, 168, 181)',
    background: 'rgb(252, 251, 254)'
  },
  {
    name: 'sky',
    displayName: 'Peaceful Sky',
    description: 'Muted blues for clarity and peace',
    primary: 'rgb(143, 169, 186)',
    secondary: 'rgb(158, 181, 195)',
    tertiary: 'rgb(134, 159, 173)',
    background: 'rgb(250, 252, 254)'
  },
  {
    name: 'earth',
    displayName: 'Warm Earth',
    description: 'Natural browns for grounding',
    primary: 'rgb(159, 131, 112)',
    secondary: 'rgb(143, 128, 114)',
    tertiary: 'rgb(172, 152, 134)',
    background: 'rgb(253, 251, 248)'
  }
];

interface ThemeStyleInfo {
  name: string;
  displayName: string;
  description: string;
  preview: {
    high: string;
    medium: string;
    low: string;
  };
}

// ADHD-friendly theme styles with gentle transitions
const themeStyles: ThemeStyleInfo[] = [
  {
    name: 'gentle',
    displayName: 'Gentle',
    description: 'Soft colours for sensitive minds',
    preview: {
      high: 'rgb(251, 176, 59)', // soft coral
      medium: 'rgb(252, 211, 77)', // warm honey
      low: 'rgb(167, 243, 208)' // sage green
    }
  },
  {
    name: 'natural',
    displayName: 'Natural',
    description: 'Earth-inspired gentle hues',
    preview: {
      high: 'rgb(252, 165, 165)', // muted clay red
      medium: 'rgb(254, 240, 138)', // soft wheat
      low: 'rgb(153, 246, 228)' // peaceful teal
    }
  },
  {
    name: 'serene',
    displayName: 'Serene',
    description: 'Ultra-calm and peaceful',
    preview: {
      high: 'rgb(251, 207, 232)', // dusty rose
      medium: 'rgb(254, 215, 170)', // gentle peach
      low: 'rgb(167, 243, 208)' // soft mint
    }
  },
  {
    name: 'muted',
    displayName: 'Muted',
    description: 'Minimal contrast for focus',
    preview: {
      high: 'rgb(203, 213, 225)', // calm grey
      medium: 'rgb(214, 211, 209)', // neutral stone
      low: 'rgb(209, 213, 219)' // soft grey
    }
  },
  {
    name: 'warm',
    displayName: 'Warm',
    description: 'Cosy and comforting tones',
    preview: {
      high: 'rgb(253, 186, 116)', // warm terra cotta
      medium: 'rgb(254, 240, 138)', // golden wheat
      low: 'rgb(217, 249, 157)' // soft sage
    }
  }
];

interface ThemeSwatchPickerProps {
  selectedColourTheme: Settings['colourTheme'];
  selectedThemeStyle: Settings['themeStyle'];
  onColourThemeChange: (theme: Settings['colourTheme']) => void;
  onThemeStyleChange: (style: Settings['themeStyle']) => void;
}

interface SwatchProps {
  colours: string[];
  selected: boolean;
  onClick: () => void;
  className?: string;
}

const ColourSwatch = ({ colours, selected, onClick, className = '' }: SwatchProps) => (
  <button
    onClick={onClick}
    className={`relative flex rounded-lg overflow-hidden transition-all duration-200 ${
      selected 
        ? 'ring-2 ring-gray-900 dark:ring-gray-100 ring-offset-2 ring-offset-white dark:ring-offset-gray-900' 
        : 'hover:scale-105 hover:shadow-md'
    } ${className}`}
    style={{ aspectRatio: '3/2' }}
  >
    {colours.map((colour, index) => (
      <div
        key={index}
        className="flex-1 h-full"
        style={{ backgroundColor: colour }}
      />
    ))}
  </button>
);

const PriorityPreview = ({ colours, selected }: { colours: { high: string; medium: string; low: string }, selected: boolean }) => (
  <div className={`flex space-x-1 transition-all duration-200 ${selected ? 'scale-105' : ''}`}>
    <div 
      className="w-3 h-3 rounded-full"
      style={{ backgroundColor: colours.high }}
      title="High priority"
    />
    <div 
      className="w-3 h-3 rounded-full"
      style={{ backgroundColor: colours.medium }}
      title="Medium priority"
    />
    <div 
      className="w-3 h-3 rounded-full"
      style={{ backgroundColor: colours.low }}
      title="Low priority"
    />
  </div>
);

export default function ThemeSwatchPicker({ 
  selectedColourTheme, 
  selectedThemeStyle,
  onColourThemeChange, 
  onThemeStyleChange 
}: ThemeSwatchPickerProps) {
  return (
    <div className="space-y-6">
      {/* Colour Theme Selection */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
            Colour Palette
          </h4>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Choose your therapeutic colours
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {colourThemes.map((theme) => (
            <div key={theme.name} className="text-center">
              <ColourSwatch
                colours={[theme.primary, theme.secondary, theme.tertiary]}
                selected={selectedColourTheme === theme.name}
                onClick={() => onColourThemeChange(theme.name as Settings['colourTheme'])}
                className="mb-2 w-full h-16"
              />
              <h5 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                {theme.displayName}
              </h5>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight">
                {theme.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Theme Style Selection */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
            Style Intensity
          </h4>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Priority colour intensity
          </p>
        </div>
        
        <div className="space-y-2">
          {themeStyles.map((style) => (
            <div key={style.name}>
              <button
                onClick={() => onThemeStyleChange(style.name as Settings['themeStyle'])}
                className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ${
                  selectedThemeStyle === style.name
                    ? 'bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 ring-1 ring-gray-900 dark:ring-gray-100'
                    : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <div className="flex-1 text-left">
                  <div className="flex items-center space-x-3">
                    <PriorityPreview 
                      colours={style.preview} 
                      selected={selectedThemeStyle === style.name}
                    />
                    <div>
                      <h5 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {style.displayName}
                      </h5>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {style.description}
                      </p>
                    </div>
                  </div>
                </div>
                
                {selectedThemeStyle === style.name && (
                  <svg className="w-5 h-5 text-gray-900 dark:text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Preview Section */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
          Theme Preview
        </h4>
        
        {(() => {
          const selectedThemeInfo = colourThemes.find(t => t.name === selectedColourTheme);
          const selectedStyleInfo = themeStyles.find(s => s.name === selectedThemeStyle);
          
          if (!selectedThemeInfo || !selectedStyleInfo) return null;
          
          return (
            <div 
              className="p-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600"
              style={{ backgroundColor: selectedThemeInfo.background }}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span 
                    className="text-sm font-medium"
                    style={{ color: selectedThemeInfo.primary }}
                  >
                    Sample Task List
                  </span>
                  <div className="flex space-x-2">
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: selectedStyleInfo.preview.high }}
                      title="High priority"
                    />
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: selectedStyleInfo.preview.medium }}
                      title="Medium priority"
                    />
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: selectedStyleInfo.preview.low }}
                      title="Low priority"
                    />
                  </div>
                </div>
                
                <div className="text-xs opacity-75 space-y-1">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: selectedStyleInfo.preview.high }}
                    />
                    <span style={{ color: selectedThemeInfo.primary }}>Important task</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: selectedStyleInfo.preview.medium }}
                    />
                    <span style={{ color: selectedThemeInfo.secondary }}>Regular task</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: selectedStyleInfo.preview.low }}
                    />
                    <span style={{ color: selectedThemeInfo.tertiary }}>Low priority task</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
        
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
          Your theme will be applied immediately
        </p>
      </div>
    </div>
  );
}