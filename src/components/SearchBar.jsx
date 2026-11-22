import { Search, X } from 'lucide-react';

export const SearchBar = ({ value, onChange }) => {
  return (
    <div className="relative w-full sm:w-[220px] md:w-[240px]">
      <label htmlFor="task-search-input" className="sr-only">
        Find a task
      </label>
      <Search
        size={15}
        className="absolute left-3.5 sm:left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none"
        aria-hidden="true"
      />
      <input
        id="task-search-input"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Find a task"
        className="w-full min-h-[44px] sm:min-h-[38px] pl-10 sm:pl-9 pr-8 py-2 sm:py-1.5 bg-white sm:bg-[#F5F6F8] border border-[#ECEEF2] sm:border-transparent focus:bg-white focus:border-[#5B4AF5] focus:ring-2 focus:ring-[#5B4AF5]/15 rounded-2xl sm:rounded-xl text-xs text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none transition-colors"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search query"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-[#9CA3AF] hover:text-[#111827] rounded-md cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B4AF5]"
        >
          <X size={13} />
        </button>
      )}
    </div>
  );
};
