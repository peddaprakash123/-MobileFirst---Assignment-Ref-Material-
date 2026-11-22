import { ChevronDown } from 'lucide-react';
import { FocusBoardLogoIcon } from './Sidebar';

const NAV_LABELS = {
  overview: 'Overview',
  tasks: 'My tasks',
  calendar: 'Calendar',
  settings: 'Settings',
};

export const Header = ({ activeNav }) => {
  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-[#ECEEF2] px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
      {/* Desktop Breadcrumb */}
      <div className="hidden lg:flex items-center gap-2 text-xs">
        <span className="text-[#9CA3AF]">Workspace</span>
        <span className="text-[#D1D5DB]" aria-hidden="true">
          /
        </span>
        <span className="font-medium text-[#374151]">{NAV_LABELS[activeNav]}</span>
      </div>

      {/* Mobile / Tablet Brand */}
      <div className="flex lg:hidden items-center gap-2.5">
        <FocusBoardLogoIcon size="sm" />
        <span className="font-display font-bold text-base tracking-tight text-[#111827]">
          FocusBoard
        </span>
      </div>

      {/* Right User Avatar Pill */}
      <div className="flex items-center gap-1.5">
        <div
          className="w-8 h-8 rounded-full bg-[#EEF0FF] text-[#5B4AF5] text-xs font-semibold flex items-center justify-center select-none"
          aria-label="User profile JD"
        >
          JD
        </div>
        <ChevronDown
          size={14}
          className="hidden lg:block text-[#9CA3AF]"
          aria-hidden="true"
        />
      </div>
    </header>
  );
};
