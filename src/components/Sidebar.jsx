import { LayoutGrid, ListTodo, Calendar, Settings } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', mobileLabel: 'Overview', icon: LayoutGrid },
  { id: 'tasks', label: 'My tasks', mobileLabel: 'Tasks', icon: ListTodo },
  { id: 'calendar', label: 'Calendar', mobileLabel: 'Calendar', icon: Calendar },
  { id: 'settings', label: 'Settings', mobileLabel: 'Settings', icon: Settings },
];

export const FocusBoardLogoIcon = ({ size = 'md' }) => {
  const boxClass = size === 'sm' ? 'w-7 h-7 rounded-lg' : 'w-8 h-8 rounded-[10px]';
  const dotClass = size === 'sm' ? 'w-[5px] h-[5px] rounded-[1.5px]' : 'w-[6px] h-[6px] rounded-[2px]';
  return (
    <div
      className={`${boxClass} bg-[#5B4AF5] flex items-center justify-center shrink-0 shadow-xs`}
      aria-hidden="true"
    >
      <div className="grid grid-cols-2 gap-[3px]">
        <span className={`${dotClass} bg-white`} />
        <span className={`${dotClass} bg-white`} />
        <span className={`${dotClass} bg-white`} />
        <span className={`${dotClass} bg-white`} />
      </div>
    </div>
  );
};

export const Sidebar = ({ activeNav, onSelectNav }) => {
  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:flex flex-col w-[228px] shrink-0 bg-white border-r border-[#ECEEF2] sticky top-0 h-screen px-4 py-5 select-none">
        {/* Brand */}
        <a
          href="#overview"
          onClick={(e) => {
            e.preventDefault();
            onSelectNav('overview');
          }}
          className="flex items-center gap-2.5 px-2 mb-8 text-[#111827] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B4AF5] rounded-lg"
        >
          <FocusBoardLogoIcon />
          <span className="font-display font-bold text-[17px] tracking-tight whitespace-nowrap">
            FocusBoard
          </span>
        </a>

        {/* Workspace Navigation */}
        <nav aria-label="Workspace navigation" className="space-y-1">
          <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-[#9CA3AF]">
            WORKSPACE
          </p>

          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-current={isActive ? 'page' : undefined}
                onClick={() => onSelectNav(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B4AF5] ${
                  isActive
                    ? 'bg-[#F1EFFF] text-[#5B4AF5]'
                    : 'text-[#6B7280] hover:bg-[#F9FAFB] hover:text-[#111827]'
                }`}
              >
                <Icon
                  size={17}
                  className={isActive ? 'text-[#5B4AF5] shrink-0' : 'text-[#9CA3AF] shrink-0'}
                />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Mobile / Tablet Bottom Navigation Bar */}
      <nav
        aria-label="Mobile navigation"
        className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-white border-t border-[#ECEEF2] grid grid-cols-4 px-2 pb-[env(safe-area-inset-bottom)]"
      >
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeNav === item.id;
          return (
            <button
              key={item.id}
              type="button"
              aria-current={isActive ? 'page' : undefined}
              onClick={() => onSelectNav(item.id)}
              className={`relative flex flex-col items-center justify-center gap-1 py-2.5 min-h-[56px] text-[11px] font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B4AF5] ${
                isActive ? 'text-[#5B4AF5]' : 'text-[#9CA3AF] hover:text-[#4B5563]'
              }`}
            >
              <Icon size={18} />
              <span>{item.mobileLabel}</span>
              {isActive && (
                <span
                  className="w-6 h-[2.5px] rounded-full bg-[#5B4AF5] mt-0.5"
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </nav>
    </>
  );
};
