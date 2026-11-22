import { useEffect, useRef, useState } from 'react';
import {
  Calendar,
  Check,
  Clock,
  MoreHorizontal,
  Pencil,
  Square,
  Trash2,
} from 'lucide-react';

const CATEGORY_PILLS = {
  Design: 'bg-[#F1EFFF] text-[#5B4AF5]',
  Development: 'bg-[#EEF2FF] text-[#4F46E5]',
  Content: 'bg-[#F3E8FF] text-[#7C3AED]',
  Testing: 'bg-[#EFF6FF] text-[#2563EB]',
  Research: 'bg-[#F5F3FF] text-[#6D28D9]',
};

const PRIORITY_PILLS = {
  High: 'bg-[#FFEDD5] text-[#C2410C]',
  Medium: 'bg-[#DCFCE7] text-[#15803D]',
  Low: 'bg-[#ECFDF5] text-[#059669]',
};

const STATUS_BADGES = {
  'To do': 'bg-[#F3F4F6] text-[#4B5563]',
  'In progress': 'bg-[#EEF2FF] text-[#4F46E5]',
  Completed: 'bg-[#ECFDF5] text-[#059669]',
};

function formatShortDate(dateStr) {
  if (!dateStr) return 'No date';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  const year = Number(parts[0]);
  const month = Number(parts[1]) - 1;
  const day = Number(parts[2]);
  const date = new Date(year, month, day);
  if (Number.isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

const NEXT_STATUS_MAP = {
  'To do': 'In progress',
  'In progress': 'Completed',
  Completed: 'To do',
};

const STATUS_OPTIONS = ['To do', 'In progress', 'Completed'];

export const TaskCard = ({ task, onStatusChange, onEdit, onRequestDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const desktopMenuRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return;
    const handleOutside = (e) => {
      const target = e.target;
      const inMobile = mobileMenuRef.current?.contains(target) ?? false;
      const inDesktop = desktopMenuRef.current?.contains(target) ?? false;
      if (!inMobile && !inDesktop) {
        setMenuOpen(false);
      }
    };
    const handleEscape = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('mousedown', handleOutside);
    window.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [menuOpen]);

  const isCompleted = task.status === 'Completed';
  const isInProgress = task.status === 'In progress';

  const handleCycleStatus = () => {
    onStatusChange(task.id, NEXT_STATUS_MAP[task.status]);
  };

  const renderMenu = () => (
    <div
      role="menu"
      className="absolute right-0 top-full mt-1.5 z-30 w-44 bg-white border border-[#ECEEF2] rounded-xl shadow-lg py-1.5 text-xs"
    >
      <p className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#9CA3AF]">
        Status
      </p>
      {STATUS_OPTIONS.map((statusOption) => (
        <button
          key={statusOption}
          type="button"
          role="menuitem"
          onClick={() => {
            onStatusChange(task.id, statusOption);
            setMenuOpen(false);
          }}
          className={`w-full px-3 py-1.5 text-left flex items-center justify-between hover:bg-[#F9FAFB] cursor-pointer ${
            task.status === statusOption
              ? 'text-[#5B4AF5] font-semibold'
              : 'text-[#374151]'
          }`}
        >
          <span>{statusOption}</span>
          {task.status === statusOption && (
            <Check size={12} aria-hidden="true" />
          )}
        </button>
      ))}

      <div className="my-1 border-t border-[#F1F2F6]" />

      <button
        type="button"
        role="menuitem"
        onClick={() => {
          setMenuOpen(false);
          onEdit(task);
        }}
        className="w-full px-3 py-1.5 text-left flex items-center gap-2 text-[#374151] hover:bg-[#F9FAFB] cursor-pointer"
      >
        <Pencil size={13} aria-hidden="true" />
        <span>Edit task</span>
      </button>

      <button
        type="button"
        role="menuitem"
        onClick={() => {
          setMenuOpen(false);
          onRequestDelete(task);
        }}
        className="w-full px-3 py-1.5 text-left flex items-center gap-2 text-[#DC2626] hover:bg-[#FEF2F2] cursor-pointer"
      >
        <Trash2 size={13} aria-hidden="true" />
        <span>Delete task</span>
      </button>
    </div>
  );

  return (
    <article
      aria-label={`Task: ${task.title}`}
      className="bg-white border border-[#ECEEF2] hover:border-[#D1D5DB] rounded-2xl px-4 py-3.5 sm:px-5 sm:py-4 transition-colors"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Left: Status Toggle Icon + Title & Subtitle */}
        <div className="flex items-start sm:items-center gap-3.5 min-w-0 flex-1">
          <button
            type="button"
            onClick={handleCycleStatus}
            aria-label={`Current status: ${task.status}. Click to change to ${NEXT_STATUS_MAP[task.status]}`}
            title={`Status: ${task.status} (click to switch to ${NEXT_STATUS_MAP[task.status]})`}
            className={`w-9 h-9 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B4AF5] ${
              isCompleted
                ? 'bg-[#ECFDF5] text-[#10B981] hover:bg-[#D1FAE5]'
                : isInProgress
                ? 'bg-[#F3F2FF] text-[#5B4AF5] hover:bg-[#E7E5FF]'
                : 'bg-[#F5F6FA] text-[#8B8FA3] hover:bg-[#EEF0FF] hover:text-[#5B4AF5]'
            }`}
          >
            {isCompleted ? (
              <Check size={15} strokeWidth={2.5} aria-hidden="true" />
            ) : isInProgress ? (
              <Clock size={14} strokeWidth={2} aria-hidden="true" />
            ) : (
              <Square size={14} strokeWidth={1.75} aria-hidden="true" />
            )}
          </button>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-display font-semibold text-sm text-[#111827] leading-snug break-words">
                {task.title}
              </h3>

              {/* Mobile top-right more button */}
              <div className="sm:hidden relative shrink-0" ref={mobileMenuRef}>
                <button
                  type="button"
                  onClick={() => setMenuOpen((prev) => !prev)}
                  aria-label={`Actions for ${task.title}`}
                  aria-expanded={menuOpen}
                  className="p-2.5 -mr-1 text-[#9CA3AF] hover:text-[#374151] rounded-lg cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B4AF5]"
                >
                  <MoreHorizontal size={16} />
                </button>
                {menuOpen && renderMenu()}
              </div>
            </div>

            {task.description && (
              <p className="text-xs text-[#9CA3AF] leading-relaxed truncate mt-0.5">
                {task.description}
              </p>
            )}
          </div>
        </div>

        {/* Right: Category Pill + Priority Pill + Date + More Menu */}
        <div className="flex items-center justify-between sm:justify-end gap-2.5 sm:gap-3 pt-1 sm:pt-0 shrink-0">
          <div className="flex items-center flex-wrap gap-1.5 sm:gap-2">
            <span
              className={`inline-flex items-center px-2.5 sm:px-3 py-1 rounded-full text-[11px] font-semibold ${STATUS_BADGES[task.status]}`}
            >
              {task.status}
            </span>

            <span
              className={`inline-flex items-center px-2.5 sm:px-3 py-1 rounded-full text-[11px] font-semibold ${CATEGORY_PILLS[task.category]}`}
            >
              {task.category}
            </span>

            <span
              className={`inline-flex items-center px-2.5 sm:px-3 py-1 rounded-full text-[11px] font-semibold ${PRIORITY_PILLS[task.priority]}`}
            >
              {task.priority}
            </span>

            <span className="inline-flex items-center gap-1.5 text-xs text-[#6B7280] tabular-nums ml-0.5 sm:ml-1">
              <Calendar size={13} className="text-[#9CA3AF]" aria-hidden="true" />
              <span>{formatShortDate(task.dueDate)}</span>
            </span>
          </div>

          {/* Desktop Action Menu Trigger */}
          <div className="hidden sm:block relative" ref={desktopMenuRef}>
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={`Task actions for ${task.title}`}
              aria-expanded={menuOpen}
              className="flex w-8 h-8 rounded-lg items-center justify-center text-[#9CA3AF] hover:text-[#374151] hover:bg-[#F3F4F6] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B4AF5]"
            >
              <MoreHorizontal size={16} aria-hidden="true" />
            </button>

            {menuOpen && renderMenu()}
          </div>
        </div>
      </div>
    </article>
  );
};
