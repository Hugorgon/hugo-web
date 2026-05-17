import type { ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router';

interface LinkButtonProps extends Omit<LinkProps, 'children'> {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

/**
 * <Link> styled exactly like <Button>.
 * Use this when the visual target is a button but the semantic target is
 * navigation. Anchor-friendly behaviours (cmd-click, right-click, screen
 * reader role) come for free.
 */
export function LinkButton({
  children,
  variant = 'primary',
  className = '',
  ...rest
}: LinkButtonProps) {
  const base =
    'inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition duration-200 ease-soft active:scale-[0.98] select-none';

  const variantStyles = {
    primary: 'bg-[#F59E0B] text-[#0A0A0B] hover:bg-[#FFB84D]',
    secondary:
      'bg-[#161618] text-[#F9FAFB] border border-[#2A2B31] hover:border-[#F59E0B]',
  } as const;

  return (
    <Link
      {...rest}
      className={`${base} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
