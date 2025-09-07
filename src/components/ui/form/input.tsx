import React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  labelClassName?: string
  containerClassName?: string
  iconClassName?: string
  variant?: 'default' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

const inputVariants = {
  default: "border border-gray-200 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent",
  ghost: "border-0 bg-transparent focus:ring-1 focus:ring-gray-300",
  outline: "border-2 border-gray-300 bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
}

const inputSizes = {
  sm: "h-9 px-3 py-2 text-sm",
  md: "h-12 px-4 py-3 text-base", 
  lg: "h-14 px-6 py-4 text-lg"
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    type = 'text', 
    label, 
    error, 
    leftIcon, 
    rightIcon, 
    labelClassName,
    containerClassName,
    iconClassName,
    variant = 'default',
    size = 'md',
    id, 
    ...props 
  }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`

    return (
      <div className={cn("space-y-2", containerClassName)}>
        {label && (
          <label 
            htmlFor={inputId} 
            className={cn("block text-sm font-medium text-gray-700", labelClassName)}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className={cn(
              "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400",
              size === 'sm' && "w-4 h-4",
              size === 'md' && "w-5 h-5", 
              size === 'lg' && "w-6 h-6",
              iconClassName
            )}>
              {leftIcon}
            </div>
          )}
          <input
            type={type}
            id={inputId}
            className={cn(
              "flex w-full rounded-xl text-gray-900 placeholder:text-gray-500 focus:outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-50",
              inputVariants[variant],
              inputSizes[size],
              leftIcon && (size === 'sm' ? "pl-9" : size === 'md' ? "pl-10" : "pl-12"),
              rightIcon && (size === 'sm' ? "pr-9" : size === 'md' ? "pr-10" : "pr-12"),
              error && "border-red-500 focus:ring-red-500 focus:border-red-500",
              className
            )}
            ref={ref}
            {...props}
          />
          {rightIcon && (
            <div className={cn(
              "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400",
              size === 'sm' && "w-4 h-4",
              size === 'md' && "w-5 h-5",
              size === 'lg' && "w-6 h-6", 
              iconClassName
            )}>
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }