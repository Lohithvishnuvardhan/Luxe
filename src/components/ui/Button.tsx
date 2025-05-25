import React from 'react';
import { cn } from '@/utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  as?: any;
  to?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      as: Component = 'button',
      to,
      ...props
    },
    ref
  ) => {
    const variants = {
      primary: 'bg-gradient-to-r from-secondary-500 via-accent-500 to-secondary-500 bg-[length:200%_auto] text-white hover:bg-[length:100%_auto] active:scale-95 shadow-lg hover:shadow-xl transition-all duration-300',
      secondary: 'bg-white text-gray-900 border-2 border-accent-500 hover:bg-accent-50 active:bg-accent-100 shadow-md hover:shadow-lg transition-all duration-300',
      outline: 'border-2 border-white bg-transparent backdrop-blur-sm text-white hover:bg-white/10 active:bg-white/20 shadow-md hover:shadow-lg transition-all duration-300',
      ghost: 'text-gray-900 hover:bg-accent-50 active:bg-accent-100 transition-all duration-300',
    };

    const sizes = {
      sm: 'py-2 px-4 text-sm',
      md: 'py-2.5 px-5 text-base',
      lg: 'py-3 px-6 text-lg',
    };

    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transform hover:scale-105 active:scale-100 transition-all duration-300';

    return (
      <Component
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || isLoading}
        to={to}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Loading...
          </>
        ) : (
          <>
            {leftIcon && <span className="mr-2 -ml-1">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="ml-2 -mr-1">{rightIcon}</span>}
          </>
        )}
      </Component>
    );
  }
);

Button.displayName = 'Button';

export default Button;