import type { ButtonHTMLAttributes } from 'react';

interface ButtonOwnProps {
  variant?: 'primary' | 'secondary';
}

type ButtonProps = ButtonOwnProps & ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Primary site button.
 * Visual contract preserved 1:1 — colours, radius, padding, and font weight
 * are unchanged. What's new is the interaction feel:
 *   • Defaults to type="button" so it never accidentally submits a form.
 *   • `transition duration-200 ease-out` covers transform + colour so the
 *     active press animates instead of jumping.
 *   • `active:scale-[0.98]` adds the subtle tactile press feedback.
 *   • Forwards all native button attributes (aria-*, disabled, type, etc.).
 */
export function Button({
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  ...rest
}: ButtonProps) {
  const baseStyles =
    'px-6 py-3 rounded-lg font-medium transition duration-200 ease-soft active:scale-[0.98] select-none disabled:opacity-60 disabled:pointer-events-none';

  const variantStyles = {
    primary: 'bg-[#F59E0B] text-[#0A0A0B] hover:bg-[#FFB84D]',
    secondary:
      'bg-[#161618] text-[#F9FAFB] border border-[#2A2B31] hover:border-[#F59E0B]',
  } as const;

  return (
    <button
      type={type}
      {...rest}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
