import { useMemo, useState } from 'react';
import {
  ListTodo,
  Clock,
  CheckCircle2,
  Plus,
} from 'lucide-react';
import { INITIAL_SAMPLE_TASKS } from './data/sampleTasks';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { StatCard } from './components/StatCard';
import { FocusNotes } from './components/FocusNotes';
import { SearchBar } from './components/SearchBar';
import { FilterTabs } from './components/FilterTabs';
import { TaskList } from './components/TaskList';
import { TaskForm } from './components/TaskForm';
import { ConfirmDeleteModal } from './components/ConfirmDeleteModal';

const STORAGE_KEY = 'focusboard_tasks_v4';

export default function App() {
  const [tasks, setTasks] = useLocalStorage(
    STORAGE_KEY,
    INITIAL_SAMPLE_TASKS
  );

  // Navigation state matching Figma sidebar & mobile bottom bar
  const [activeNav, setActiveNav] = useState('overview');

  // Search & filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  // Create / Edit modal state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Delete confirmation modal state
  const [taskToDelete, setTaskToDelete] = useState(null);

  // Derived statistics — calculated directly from task state
  const stats = useMemo(() => {
    const total = tasks.length;
    const todo = tasks.filter((t) => t.status === 'To do').length;
    const inProgress = tasks.filter((t) => t.status === 'In progress').length;
    const completed = tasks.filter((t) => t.status === 'Completed').length;
    const pending = todo + inProgress;
    const completionRate =
      total === 0 ? 0 : Math.round((completed / total) * 100);

    return { total, todo, inProgress, completed, pending, completionRate };
  }, [tasks]);

  // Combined filtering: search + status tab + priority dropdown
  const filteredTasks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const result = tasks.filter((task) => {
      const matchesSearch =
        query === '' || task.title.toLowerCase().includes(query);
      const matchesStatus =
        statusFilter === 'All' || task.status === statusFilter;
      const matchesPriority =
        priorityFilter === 'All' || task.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });

    if (activeNav === 'calendar') {
      return [...result].sort((a, b) => a.dueDate.localeCompare(b.dueDate));
    }

    return result;
  }, [tasks, searchQuery, statusFilter, priorityFilter, activeNav]);

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    statusFilter !== 'All' ||
    priorityFilter !== 'All';

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
    setPriorityFilter('All');
  };

  // Immutable CRUD handlers
  const handleSaveTask = (values, editingId) => {
    if (editingId) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === editingId ? { ...task, ...values } : task
        )
      );
    } else {
      const maxNumericId = tasks.reduce((max, t) => {
        const parsed = Number(t.id);
        return !Number.isNaN(parsed) && parsed > max ? parsed : max;
      }, 100);

      const newTask = {
        id: String(maxNumericId + 1),
        ...values,
      };
      setTasks((prev) => [newTask, ...prev]);
    }
    setEditingTask(null);
  };

  const handleStatusChange = (id, nextStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: nextStatus } : task
      )
    );
  };

  const handleConfirmDelete = () => {
    if (!taskToDelete) return;
    const idToRemove = taskToDelete.id;
    setTasks((prev) => prev.filter((task) => task.id !== idToRemove));
    setTaskToDelete(null);
  };

  const handleOpenCreateForm = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleSelectNav = (nav) => {
    setActiveNav(nav);
    if (nav === 'overview') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (nav === 'tasks' || nav === 'calendar') {
      const el = document.getElementById('my-tasks');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-clip bg-[#FAFAFC] text-[#111827] flex">
      {/* Left Sidebar (Desktop) & Bottom Tab Bar (Mobile/Tablet) */}
      <Sidebar activeNav={activeNav} onSelectNav={handleSelectNav} />

      {/* Right Main Column */}
      <div className="flex-1 min-w-0 flex flex-col">
        <Header activeNav={activeNav} />

        <main className="flex-1 px-4 sm:px-6 lg:px-8 pt-5 sm:pt-7 pb-24 lg:pb-10">
          <div className="max-w-[1080px] mx-auto space-y-5 sm:space-y-6">
            {/* Hero Greeting + Primary CTA */}
            <section
              id="overview"
              aria-labelledby="dashboard-title"
              className="flex items-start sm:items-center justify-between gap-4"
            >
              <div>
                <h1
                  id="dashboard-title"
                  className="font-display font-bold text-2xl sm:text-[26px] text-[#111827] tracking-tight leading-[1.2]"
                >
                  <span className="sm:hidden">
                    Your work,
                    <br />
                    in focus.
                  </span>
                  <span className="hidden sm:inline">Your work, in focus.</span>
                </h1>
                <p className="text-xs sm:text-sm text-[#6B7280] mt-1">
                  <span className="sm:hidden">
                    Stay organized and keep moving forward.
                  </span>
                  <span className="hidden sm:inline">
                    Plan your day, stay organized, and celebrate small wins.
                  </span>
                </p>
              </div>

              <button
                type="button"
                onClick={handleOpenCreateForm}
                className="hidden sm:inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[42px] bg-[#5B4AF5] hover:bg-[#4D3DE0] active:bg-[#4334D0] text-white text-xs sm:text-sm font-medium rounded-xl shadow-xs transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B4AF5] focus-visible:ring-offset-2"
              >
                <Plus size={16} aria-hidden="true" />
                <span>New task</span>
              </button>
            </section>

            {/* Focus Notes 3-Slide Carousel */}
            <FocusNotes
              pendingCount={stats.pending}
              completionRate={stats.completionRate}
            />

            {/* Overview Statistics Cards */}
            <section aria-labelledby="overview-stats-heading">
              <div className="mb-3">
                <h2
                  id="overview-stats-heading"
                  className="sm:hidden font-display font-bold text-base text-[#111827]"
                >
                  Overview
                </h2>
                <span className="hidden sm:inline text-xs font-medium text-[#6B7280]">
                  Overview
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                <StatCard
                  title="Total tasks"
                  value={stats.total}
                  subtitle="Across all projects"
                  icon={ListTodo}
                  iconColorClass="text-[#5B4AF5]"
                  iconBgClass="bg-[#F1EFFF]"
                />
                <StatCard
                  title="In progress"
                  value={stats.inProgress}
                  subtitle="Keep the momentum"
                  icon={Clock}
                  iconColorClass="text-[#3B82F6]"
                  iconBgClass="bg-[#EFF6FF]"
                  className="hidden sm:flex"
                />
                <StatCard
                  title="Completed"
                  value={stats.completed}
                  subtitle="Great work this week"
                  icon={CheckCircle2}
                  iconColorClass="text-[#10B981]"
                  iconBgClass="bg-[#ECFDF5]"
                />
              </div>
            </section>

            {/* My Tasks Section */}
            <section
              id="my-tasks"
              aria-labelledby="my-tasks-heading"
              className="space-y-3.5 pt-1"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2
                    id="my-tasks-heading"
                    className="font-display font-bold text-base sm:text-lg text-[#111827]"
                  >
                    My tasks
                  </h2>
                  <p className="text-xs text-[#6B7280] mt-0.5">
                    <span className="sm:hidden">
                      Your priorities for this week
                    </span>
                    <span className="hidden sm:inline">
                      Manage and track everything in one place.
                    </span>
                  </p>
                </div>

                {/* Desktop View All Tasks Pill */}
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="hidden sm:inline-flex items-center justify-center px-4 py-2 min-h-[36px] bg-[#F1EFFF] hover:bg-[#E7E3FF] text-[#5B4AF5] text-xs font-semibold rounded-full transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B4AF5]"
                >
                  View all tasks
                </button>

                {/* Mobile Square + Add Task Button */}
                <button
                  type="button"
                  onClick={handleOpenCreateForm}
                  aria-label="Create new task"
                  className="sm:hidden w-10 h-10 rounded-xl bg-[#5B4AF5] hover:bg-[#4D3DE0] text-white flex items-center justify-center shrink-0 shadow-xs transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B4AF5]"
                >
                  <Plus size={18} aria-hidden="true" />
                </button>
              </div>

              {/* Filter Tabs + Search + Priority Filter */}
              <FilterTabs
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
                priorityFilter={priorityFilter}
                onPriorityChange={setPriorityFilter}
                totalCount={stats.total}
                hasActiveFilters={hasActiveFilters}
                onResetFilters={handleResetFilters}
                searchBar={
                  <SearchBar value={searchQuery} onChange={setSearchQuery} />
                }
              />

              {/* Task Rows / Cards */}
              <TaskList
                tasks={filteredTasks}
                totalCount={stats.total}
                hasActiveFilters={hasActiveFilters}
                onStatusChange={handleStatusChange}
                onEditTask={handleOpenEditForm}
                onDeleteTask={(task) => setTaskToDelete(task)}
                onResetFilters={handleResetFilters}
                onCreateTask={handleOpenCreateForm}
              />
            </section>
          </div>
        </main>
      </div>

      {/* Create / Edit Task Modal */}
      <TaskForm
        isOpen={isFormOpen}
        editingTask={editingTask}
        onClose={() => {
          setIsFormOpen(false);
          setEditingTask(null);
        }}
        onSubmit={handleSaveTask}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={Boolean(taskToDelete)}
        title="Delete task"
        message={
          taskToDelete
            ? `Are you sure you want to delete "${taskToDelete.title}"? This action cannot be undone.`
            : ''
        }
        confirmLabel="Delete task"
        onCancel={() => setTaskToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
