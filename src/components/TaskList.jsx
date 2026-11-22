import { ClipboardList, Plus, RotateCcw } from 'lucide-react';
import { TaskCard } from './TaskCard';

export const TaskList = ({
  tasks,
  totalCount,
  hasActiveFilters,
  onStatusChange,
  onEditTask,
  onDeleteTask,
  onResetFilters,
  onCreateTask,
}) => {
  if (tasks.length === 0) {
    return (
      <div className="bg-white border border-[#ECEEF2] rounded-2xl p-8 sm:p-10 text-center">
        <div className="w-11 h-11 rounded-xl bg-[#F1EFFF] text-[#5B4AF5] flex items-center justify-center mx-auto mb-3.5">
          <ClipboardList size={20} aria-hidden="true" />
        </div>

        {totalCount === 0 ? (
          <>
            <h3 className="font-display font-semibold text-base text-[#111827] mb-1">
              No tasks yet
            </h3>
            <p className="text-xs sm:text-sm text-[#6B7280] max-w-sm mx-auto mb-5">
              Create your first task to start organizing your day and tracking progress.
            </p>
            <button
              type="button"
              onClick={onCreateTask}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[40px] bg-[#5B4AF5] hover:bg-[#4D3DE0] text-white text-xs sm:text-sm font-medium rounded-xl transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B4AF5] focus-visible:ring-offset-2"
            >
              <Plus size={16} aria-hidden="true" />
              <span>New task</span>
            </button>
          </>
        ) : (
          <>
            <h3 className="font-display font-semibold text-base text-[#111827] mb-1">
              No matching tasks found
            </h3>
            <p className="text-xs sm:text-sm text-[#6B7280] max-w-sm mx-auto mb-5">
              None of your {totalCount} tasks match the current search or filter criteria.
            </p>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={onResetFilters}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 min-h-[40px] bg-[#F1EFFF] hover:bg-[#E7E3FF] text-[#5B4AF5] text-xs font-semibold rounded-full transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B4AF5]"
              >
                <RotateCcw size={14} aria-hidden="true" />
                <span>View all tasks</span>
              </button>
            )}
          </>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-2.5">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onStatusChange={onStatusChange}
          onEdit={onEditTask}
          onRequestDelete={onDeleteTask}
        />
      ))}
    </div>
  );
};
