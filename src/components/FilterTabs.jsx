import { ChevronDown, RotateCcw } from 'lucide-react';

export const FilterTabs = ({
  statusFilter,
  onStatusChange,
  priorityFilter,
  onPriorityChange,
  totalCount,
  hasActiveFilters,
  onResetFilters,
  searchBar,
}) => {
  const tabs = [
    { key: 'All', desktopLabel: `All tasks ${totalCount}`, mobileLabel: `All ${totalCount}` },
    { key: 'To do', desktopLabel: 'To do', mobileLabel: 'To do' },
    { key: 'In progress', desktopLabel: 'In progress', mobileLabel: 'In progress' },
    { key: 'Completed', desktopLabel: 'Completed', mobileLabel: 'Completed' },
  ];

  return (
    <div className="space-y-3 sm:space-y-0 sm:bg-white sm:border sm:border-[#ECEEF2] sm:rounded-2xl sm:px-4 sm:py-3 flex flex-col-reverse sm:flex-col lg:flex-row lg:items-center justify-between gap-3">
      {/* Status Tabs */}
      <div
        role="group"
        aria-label="Filter tasks by status"
        className="flex items-center gap-1.5 overflow-x-auto no-scrollbar"
      >
        {tabs.map((tab) => {
          const isActive = statusFilter === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              aria-pressed={isActive}
              onClick={() => onStatusChange(tab.key)}
              className={`min-w-0 flex-1 sm:flex-initial px-2.5 sm:px-3.5 py-2 min-h-[38px] sm:min-h-[36px] rounded-xl sm:rounded-full text-[11px] sm:text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B4AF5] ${
                isActive
                  ? 'bg-[#EFEFFF] text-[#5B4AF5] font-semibold border border-transparent'
                  : 'bg-white sm:bg-transparent border border-[#ECEEF2] sm:border-transparent text-[#4B5563] sm:text-[#6B7280] hover:text-[#111827] hover:bg-[#F5F6F8]'
              }`}
            >
              <span className="sm:hidden">{tab.mobileLabel}</span>
              <span className="hidden sm:inline">{tab.desktopLabel}</span>
            </button>
          );
        })}
      </div>

      {/* Search + Priority Dropdown + Reset */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        {searchBar}

        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:flex-initial">
            <label htmlFor="priority-filter" className="sr-only">
              Filter by priority
            </label>
            <select
              id="priority-filter"
              value={priorityFilter}
              onChange={(e) => onPriorityChange(e.target.value)}
              className="w-full sm:w-auto appearance-none min-h-[40px] sm:min-h-[38px] pl-3.5 pr-8 py-1.5 bg-white border border-[#ECEEF2] sm:border-[#E5E7EB] hover:border-[#D1D5DB] rounded-2xl sm:rounded-xl text-xs font-medium text-[#374151] focus:outline-none focus:border-[#5B4AF5] focus:ring-2 focus:ring-[#5B4AF5]/15 cursor-pointer"
            >
              <option value="All">Priority: All</option>
              <option value="High">Priority: High</option>
              <option value="Medium">Priority: Medium</option>
              <option value="Low">Priority: Low</option>
            </select>
            <ChevronDown
              size={14}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none"
              aria-hidden="true"
            />
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              aria-label="Reset search and filters"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 min-h-[40px] sm:min-h-[38px] bg-white hover:bg-[#F5F6F8] text-[#4B5563] hover:text-[#111827] border border-[#ECEEF2] sm:border-[#E5E7EB] rounded-2xl sm:rounded-xl text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B4AF5]"
            >
              <RotateCcw size={13} aria-hidden="true" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
