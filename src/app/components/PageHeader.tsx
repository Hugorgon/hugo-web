import type { ReactNode } from 'react';

interface PageHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  align?: 'center' | 'left';
}

/**
 * Reusable section/page heading.
 * Mirrors the visual rhythm of homepage section headers (eyebrow pill,
 * accent-coloured highlight inside the title, muted subtitle below).
 */
export function PageHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
}: PageHeaderProps) {
  const wrapperAlign = align === 'center' ? 'text-center' : 'text-left';
  const subtitleAlign = align === 'center' ? 'mx-auto' : '';

  return (
    <div className={`${wrapperAlign} mb-16`}>
      {eyebrow && (
        <div className="inline-block px-4 py-2 bg-[#F59E0B]/10 border border-[#F59E0B]/30 rounded-full mb-6">
          <span className="text-[#F59E0B] text-sm font-medium">{eyebrow}</span>
        </div>
      )}
      <h1 className="text-4xl md:text-5xl font-bold text-[#F9FAFB] mb-4 leading-tight">
        {title}
      </h1>
      {subtitle && (
        <p className={`text-[#D1D5DB] text-lg max-w-2xl ${subtitleAlign}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
