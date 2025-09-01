import { ReactNode } from 'react';

interface HeadingProps {
  children: ReactNode;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  id?: string;
}

interface TextProps {
  children: ReactNode;
  variant?: 'body' | 'small' | 'large';
  className?: string;
}

export function Heading({ children, level, className = '', id }: HeadingProps) {
  const Component = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  
  const baseStyles = 'font-semibold text-neutral-900 leading-tight';
  const sizeStyles = {
    1: 'text-4xl',
    2: 'text-3xl',
    3: 'text-2xl',
    4: 'text-xl',
    5: 'text-lg',
    6: 'text-base',
  };

  return (
    <Component
      id={id}
      className={`${baseStyles} ${sizeStyles[level]} ${className}`}
    >
      {children}
    </Component>
  );
}

export function Text({ children, variant = 'body', className = '' }: TextProps) {
  const variantStyles = {
    body: 'text-base text-neutral-700 leading-relaxed',
    small: 'text-sm text-neutral-600',
    large: 'text-lg text-neutral-700 leading-relaxed',
  };

  return (
    <p className={`${variantStyles[variant]} ${className}`}>
      {children}
    </p>
  );
}