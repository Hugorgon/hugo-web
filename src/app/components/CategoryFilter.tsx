import { UI } from '../../data/ui';

interface CategoryFilterProps<T extends string> {
  options: readonly T[];
  active: T;
  onChange: (value: T) => void;
  className?: string;
}

/**
 * Pill-style filter row. Active state mirrors the primary Button look
 * (orange fill, dark text). Inactive state mirrors the secondary Button look
 * (card background, subtle border, accent border on hover).
 */
export function CategoryFilter<T extends string>({
  options,
  active,
  onChange,
  className = '',
}: CategoryFilterProps<T>) {
  return (
    <div
      className={`flex flex-wrap justify-center gap-3 mb-12 ${className}`}
      role="tablist"
      aria-label={UI.archive.filterAriaLabel}
    >
      {options.map((option) => {
        const isActive = option === active;
        return (
          <button
            key={option}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(option)}
            className={
              'px-5 py-2.5 rounded-lg font-medium transition-colors text-sm ' +
              (isActive
                ? 'bg-[#F59E0B] text-[#0A0A0B]'
                : 'bg-[#161618] text-[#D1D5DB] border border-[#2A2B31] hover:border-[#F59E0B]')
            }
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
