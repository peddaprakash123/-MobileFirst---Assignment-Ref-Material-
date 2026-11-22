import { useState, useEffect, useRef } from 'react';
import { X, AlertCircle, Calendar } from 'lucide-react';

const DEFAULT_VALUES = {
  title: '',
  description: '',
  category: 'Design',
  status: 'To do',
  priority: 'Medium',
  dueDate: '',
};

export const TaskForm = ({ isOpen, editingTask, onClose, onSubmit }) => {
  const [values, setValues] = useState(DEFAULT_VALUES);
  const [titleError, setTitleError] = useState(undefined);
  const [dueDateError, setDueDateError] = useState(undefined);
  const [titleTouched, setTitleTouched] = useState(false);
  const [showManualInput, setShowManualInput] = useState(false);
  const [manualNote, setManualNote] = useState('');
  const titleInputRef = useRef(null);
  const manualInputRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    if (editingTask) {
      setValues({
        title: editingTask.title,
        description: editingTask.description,
        category: editingTask.category,
        status: editingTask.status,
        priority: editingTask.priority,
        dueDate: editingTask.dueDate,
      });
    } else {
      setValues(DEFAULT_VALUES);
    }
    setTitleError(undefined);
    setDueDateError(undefined);
    setTitleTouched(false);
    setShowManualInput(false);
    setManualNote('');

    const timer = setTimeout(() => {
      titleInputRef.current?.focus();
    }, 50);

    return () => clearTimeout(timer);
  }, [isOpen, editingTask]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validateTitle = (rawTitle) => {
    const trimmed = rawTitle.trim();
    if (!trimmed) {
      return 'Task title is required.';
    }
    if (trimmed.length < 2) {
      return 'Task title must be at least 2 characters.';
    }
    return undefined;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTitleTouched(true);

    const error = validateTitle(values.title);
    const nextDueDateError = !values.dueDate ? 'Due date is required.' : undefined;

    if (error || nextDueDateError) {
      setTitleError(error);
      setDueDateError(nextDueDateError);
      if (error) {
        titleInputRef.current?.focus();
      }
      return;
    }

    const combinedDescription = [
      values.description.trim(),
      manualNote.trim(),
    ]
      .filter(Boolean)
      .join(' · ');

    onSubmit(
      {
        ...values,
        title: values.title.trim(),
        description: combinedDescription,
      },
      editingTask?.id
    );
    setValues(DEFAULT_VALUES);
    setTitleError(undefined);
    setDueDateError(undefined);
    setTitleTouched(false);
    setShowManualInput(false);
    setManualNote('');
    onClose();
  };

  const isEditing = Boolean(editingTask);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="task-form-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 bg-[#111827]/45 backdrop-blur-[2px] flex items-start sm:items-center justify-center p-4 overflow-y-auto overscroll-contain"
    >
      <div className="relative my-auto w-full max-w-[565px] bg-white border border-[#ECEEF2] rounded-2xl shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4">
          <div>
            <h2
              id="task-form-title"
              className="font-display font-bold text-xl text-[#111827] tracking-tight"
            >
              {isEditing ? 'Edit task' : 'Create new task'}
            </h2>
            <p className="text-xs text-[#6B7280] mt-1">
              {isEditing
                ? 'Update your task details to stay on top of your work.'
                : 'Add your task details to stay on top of your work.'}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close task form"
            className="w-8 h-8 rounded-full bg-[#F5F6F8] hover:bg-[#ECEEF2] text-[#6B7280] hover:text-[#111827] flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B4AF5]"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} noValidate className="px-6 pb-6 space-y-4">
          {/* Task title * */}
          <div>
            <label
              htmlFor="task-title"
              className="block text-xs font-semibold text-[#111827] mb-1.5"
            >
              Task title <span className="text-[#EF4444]">*</span>
            </label>
            <input
              ref={titleInputRef}
              id="task-title"
              type="text"
              required
              value={values.title}
              onChange={(e) => {
                const nextTitle = e.target.value;
                setValues((prev) => ({ ...prev, title: nextTitle }));
                if (titleTouched) {
                  setTitleError(validateTitle(nextTitle));
                }
              }}
              onBlur={() => {
                setTitleTouched(true);
                setTitleError(validateTitle(values.title));
              }}
              placeholder="e.g. Update pricing page"
              aria-invalid={Boolean(titleError)}
              aria-describedby={titleError ? 'task-title-error' : undefined}
              className={`w-full min-h-[42px] px-3.5 py-2 bg-white border rounded-xl text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 transition-colors ${
                titleError
                  ? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-[#DC2626]/20'
                  : 'border-[#E5E7EB] focus:border-[#5B4AF5] focus:ring-[#5B4AF5]/15'
              }`}
            />
            {titleError && (
              <p
                id="task-title-error"
                role="alert"
                className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-[#DC2626]"
              >
                <AlertCircle size={13} aria-hidden="true" />
                <span>{titleError}</span>
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="task-description"
              className="block text-xs font-semibold text-[#111827] mb-1.5"
            >
              Description
            </label>
            <textarea
              id="task-description"
              rows={3}
              value={values.description}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, description: e.target.value }))
              }
              placeholder="Add notes about this task..."
              className="w-full px-3.5 py-2.5 bg-white border border-[#E5E7EB] rounded-xl text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#5B4AF5] focus:ring-2 focus:ring-[#5B4AF5]/15 transition-colors resize-none"
            />
          </div>

          {/* Status & Priority 2-column row */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label
                htmlFor="task-status"
                className="block text-xs font-semibold text-[#111827] mb-1.5"
              >
                Status
              </label>
              <select
                id="task-status"
                value={values.status}
                onChange={(e) =>
                  setValues((prev) => ({
                    ...prev,
                    status: e.target.value,
                  }))
                }
                className="w-full min-h-[42px] px-3 sm:px-3.5 py-2 bg-white border border-[#E5E7EB] rounded-xl text-sm text-[#111827] focus:outline-none focus:border-[#5B4AF5] focus:ring-2 focus:ring-[#5B4AF5]/15 cursor-pointer"
              >
                <option value="To do">To do</option>
                <option value="In progress">In progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="task-priority"
                className="block text-xs font-semibold text-[#111827] mb-1.5"
              >
                Priority
              </label>
              <select
                id="task-priority"
                value={values.priority}
                onChange={(e) =>
                  setValues((prev) => ({
                    ...prev,
                    priority: e.target.value,
                  }))
                }
                className="w-full min-h-[42px] px-3 sm:px-3.5 py-2 bg-white border border-[#E5E7EB] rounded-xl text-sm text-[#111827] focus:outline-none focus:border-[#5B4AF5] focus:ring-2 focus:ring-[#5B4AF5]/15 cursor-pointer"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          {/* Category & Due date 2-column row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label
                htmlFor="task-category"
                className="block text-xs font-semibold text-[#111827] mb-1.5"
              >
                Category
              </label>
              <select
                id="task-category"
                value={values.category}
                onChange={(e) =>
                  setValues((prev) => ({
                    ...prev,
                    category: e.target.value,
                  }))
                }
                className="w-full min-h-[42px] px-3 sm:px-3.5 py-2 bg-white border border-[#E5E7EB] rounded-xl text-sm text-[#111827] focus:outline-none focus:border-[#5B4AF5] focus:ring-2 focus:ring-[#5B4AF5]/15 cursor-pointer"
              >
                <option value="Design">Design</option>
                <option value="Development">Development</option>
                <option value="Content">Content</option>
                <option value="Testing">Testing</option>
                <option value="Research">Research</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="task-due-date"
                className="block text-xs font-semibold text-[#111827] mb-1.5"
              >
                Due date <span className="text-[#EF4444]">*</span>
              </label>
              <div className="relative">
                <Calendar
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  id="task-due-date"
                  type="date"
                  required
                  value={values.dueDate}
                  onChange={(e) => {
                    setValues((prev) => ({ ...prev, dueDate: e.target.value }));
                    if (dueDateError && e.target.value) {
                      setDueDateError(undefined);
                    }
                  }}
                  aria-invalid={Boolean(dueDateError)}
                  aria-describedby={dueDateError ? 'task-date-error' : undefined}
                  className={`w-full min-h-[42px] pl-10 pr-3.5 py-2 bg-white border rounded-xl text-sm text-[#111827] focus:outline-none focus:ring-2 cursor-pointer ${
                    dueDateError
                      ? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-[#DC2626]/20'
                      : 'border-[#E5E7EB] focus:border-[#5B4AF5] focus:ring-[#5B4AF5]/15'
                  }`}
                />
              </div>
              {dueDateError && (
                <p
                  id="task-date-error"
                  role="alert"
                  className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-[#DC2626]"
                >
                  <AlertCircle size={13} aria-hidden="true" />
                  <span>{dueDateError}</span>
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2.5 pt-0.5">
            <button
              type="button"
              onClick={() => {
                setShowManualInput(true);
                setTimeout(() => manualInputRef.current?.focus(), 20);
              }}
              className="inline-flex items-center gap-1 py-1.5 px-1 -my-1 text-xs text-[#6B7280] hover:text-[#111827] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B4AF5] rounded"
            >
              <span className="text-[#EF4444] font-semibold">*</span>
              <span>Required field</span>
            </button>

            {showManualInput && (
              <div className="flex items-center gap-2">
                <input
                  ref={manualInputRef}
                  type="text"
                  value={manualNote}
                  onChange={(e) => setManualNote(e.target.value)}
                  placeholder="Type here..."
                  aria-label="Manual input"
                  className="w-full min-h-[40px] px-3.5 py-2 bg-white border border-[#E5E7EB] rounded-xl text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#5B4AF5] focus:ring-2 focus:ring-[#5B4AF5]/15 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => {
                    setShowManualInput(false);
                    setManualNote('');
                  }}
                  aria-label="Remove manual input"
                  className="w-9 h-9 rounded-lg text-[#9CA3AF] hover:text-[#111827] hover:bg-[#F5F6F8] flex items-center justify-center shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B4AF5]"
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </div>

          <hr className="w-full max-w-[517px] border-0 border-t border-[#E5E7EB]" />

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 min-h-[42px] bg-white hover:bg-[#F9FAFB] text-[#374151] border border-[#E5E7EB] rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B4AF5]"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 min-h-[42px] bg-[#5B4AF5] hover:bg-[#4D3DE0] text-white rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B4AF5] focus-visible:ring-offset-2"
            >
              {isEditing ? 'Save changes' : 'Create task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
