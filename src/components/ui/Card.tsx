import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'article' | 'section';
}

export default function Card({ children, className = '', as: Component = 'div' }: CardProps) {
  return (
    <Component
      className={`
        border border-neutral-200 
        rounded-lg 
        p-6 
        bg-white 
        shadow-sm 
        hover:shadow-md 
        transition-shadow 
        duration-200 
        focus-within:ring-2 
        focus-within:ring-blue-500 
        focus-within:ring-offset-2
        ${className}
      `}
    >
      {children}
    </Component>
  );
}