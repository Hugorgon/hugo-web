import { ReactNode } from 'react';

interface SocialCardProps {
  platform: string;
  icon: ReactNode;
  followers: string;
  description: string;
  handle: string;
  /**
   * Optional profile URL. When present, the handle becomes an external link
   * (opens in a new tab). When absent, the handle is rendered as a styled
   * span — same color, weight, hover transition — so the card looks identical
   * either way.
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
  // Identical visual treatment for both states — only the underlying tag
  // changes. The hover color shift still fires on the <a> via Tailwind's
  // group-less hover utilities; on the <span> it stays static (no false
  // affordance of clickability when there's nowhere to go).
  const handleClassName =
    'text-[#F59E0B] text-sm font-medium hover:text-[#FFB84D] transition-colors';

  return (
    <div className="bg-[#161618] rounded-lg p-6 border border-[#2A2B31] hover:border-[#F59E0B] transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-lg bg-[#F59E0B]/10 flex items-center justify-center">
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
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${platform}: ${handle}`}
          className={handleClassName}
        >
          {handle}
        </a>
      ) : (
        <span className={handleClassName}>{handle}</span>
      )}
    </div>
  );
}
