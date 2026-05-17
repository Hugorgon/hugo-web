import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * Shared content container.
 * Owns the single source of truth for the homepage's max width and horizontal
 * padding so every section stays visually aligned.
 */
export function Container({ children, className = '' }: ContainerProps) {
  return (
    <div className={`max-w-[1290px] mx-auto px-6 ${className}`}>
      {children}
    </div>
  );
}
