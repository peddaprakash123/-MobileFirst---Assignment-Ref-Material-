export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColorClass,
  iconBgClass,
  className = '',
}) => {
  return (
    <div
      className={`bg-white border border-[#ECEEF2] rounded-2xl p-4 sm:p-5 flex flex-col justify-between gap-3.5 ${className}`}
    >
      {/* Top Row: Icon Badge (and Title on sm+) */}
      <div className="flex items-center gap-2.5">
        <div
          className={`w-8 h-8 rounded-xl ${iconBgClass} ${iconColorClass} flex items-center justify-center shrink-0`}
          aria-hidden="true"
        >
          <Icon size={16} strokeWidth={2} />
        </div>
        <p className="hidden sm:block text-xs font-medium text-[#6B7280]">{title}</p>
      </div>

      {/* Mobile Bottom Row: Metric + Title side-by-side matching mobile Figma */}
      <div className="flex sm:hidden items-baseline gap-2 flex-wrap">
        <p className="font-display font-bold text-2xl text-[#111827] tabular-nums tracking-tight leading-none">
          {value}
        </p>
        <span className="text-xs text-[#6B7280] truncate">{title}</span>
      </div>

      {/* Desktop/Tablet Bottom Row: Metric + Subtitle */}
      <div className="hidden sm:flex items-baseline gap-2.5 flex-wrap">
        <p className="font-display font-bold text-[26px] text-[#111827] tabular-nums tracking-tight leading-none">
          {value}
        </p>
        <span className="text-xs text-[#9CA3AF] truncate">{subtitle}</span>
      </div>
    </div>
  );
};
