import { ReactNode } from 'react';

interface SocialCardProps {
  platform: string;
  icon: ReactNode;
  followers: string;
  description: string;
  handle: string;
  /**
   * Optional profile URL. When present, the entire card is a clickable
   * external link (opens in a new tab) — same pattern as CategoryCard.
   * When absent, the card renders as a plain div with no false affordance.
   */
  url?: string;
}

export function SocialCard({
  platform,
  icon,
  followers,
  description,
  handle,
  url,
}: SocialCardProps) {
  const cardClassName =
    'group bg-[#161618] rounded-lg p-6 border border-[#2A2B31] hover:border-[#F59E0B] transition-all duration-300';

  const inner = (
    <>
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-lg bg-[#F59E0B]/10 flex items-center justify-center group-hover:bg-[#F59E0B]/20 transition-colors">
          <div className="text-[#F59E0B]">
            {icon}
          </div>
        </div>
        <span className="text-[#9CA3AF] text-sm">{platform}</span>
      </div>
      <h3 className="text-2xl font-bold text-[#F9FAFB] mb-1">
        {followers}
      </h3>
      <p className="text-[#D1D5DB] text-sm mb-3">
        {description}
      </p>
      <span className="text-[#F59E0B] text-sm font-medium group-hover:text-[#FFB84D] transition-colors">
        {handle}
      </span>
    </>
  );

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${platform} – ${handle}`}
        className={cardClassName}
      >
        {inner}
      </a>
    );
  }

  return (
    <div className={cardClassName}>
      {inner}
    </div>
  );
}
