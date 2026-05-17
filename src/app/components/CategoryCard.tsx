import { ReactNode } from 'react';
import { Link } from 'react-router';

interface CategoryCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  videoCount: string;
  /** Cílová URL filtru — typicky /videos?category=<název>. */
  to: string;
}

/**
 * Vizuálně beze změny — pouze obal převeden z <div> na <Link>, aby celá
 * karta vedla na předfiltrovaný archiv videí. Třídy, ikona, layout,
 * hover chování i responsivní rozvržení zůstávají identické.
 */
export function CategoryCard({
  title,
  description,
  icon,
  videoCount,
  to,
}: CategoryCardProps) {
  return (
    <Link
      to={to}
      className="group bg-[#161618] rounded-lg p-6 hover:bg-[#1A1A1C] border border-[#2A2B31] hover:border-[#F59E0B] transition-all duration-300 cursor-pointer flex flex-col items-center text-center"
    >
      <div className="w-12 h-12 rounded-lg bg-[#F59E0B]/10 flex items-center justify-center mb-4 group-hover:bg-[#F59E0B]/20 transition-colors">
        <div className="text-[#F59E0B]">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-semibold text-[#F9FAFB] mb-2">
        {title}
      </h3>
      <p className="text-[#9CA3AF] text-sm mb-4 leading-relaxed">
        {description}
      </p>
      <div className="text-[#D1D5DB] text-sm font-medium">
        {videoCount}
      </div>
    </Link>
  );
}
