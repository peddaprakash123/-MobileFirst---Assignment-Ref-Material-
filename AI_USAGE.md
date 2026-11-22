# AI Tool Usage Disclosure

This file documents AI tool usage during the development of **FocusBoard** in accordance with the assessment transparency guidelines.

---

## Tools Used

- **OpenCode** (AI coding agent, powered by MiMo-V2.6-Flash): Used for scaffolding modular React/JavaScript components, Tailwind CSS responsive layout classes, accessibility attributes, refactoring (TypeScript → JavaScript conversion), unused-code cleanup, and documentation drafting.

No other AI tools were used.

---

## Representative Prompts

1. *"Scaffold the task data model (`Task`, `TaskStatus`, `TaskPriority`, `TaskCategory`) and 12 sample tasks covering To do, In progress, and Completed states."*
2. *"Build a custom `useLocalStorage` React hook that reads existing `focusboard_tasks_v4` from browser storage on mount without overwriting saved user edits with initial sample data."*
3. *"Create a reusable `TaskForm` modal supporting both Create and Edit modes with trimmed title and due date validation, inline error alerts, Escape-key closing, and Status, Priority, Category, and Due date controls."*
4. *"Implement a 3-slide `FocusNotes` carousel component with circular Previous/Next controls, clickable slide indicator dashes, and responsive layout across 390px, 768px, and 1440px."*
5. *"Convert the project from TypeScript to plain JavaScript (`.tsx` → `.jsx`), delete unused files and dependencies, and verify the dev server and production build still work."*

---

## AI-Assisted Areas

- **Component Scaffolding**: Initial JSX structure and Tailwind utility styling for `Sidebar`, `Header`, `StatCard`, `FocusNotes`, `SearchBar`, `FilterTabs`, `TaskCard`, `TaskList`, `TaskForm`, and `ConfirmDeleteModal`.
- **State & Derived Metrics**: Structure of `useMemo` hooks in `src/App.jsx` for dynamic KPI calculation and combined search/status/priority filtering.
- **Accessibility Attributes**: `role="dialog"`, `role="alertdialog"`, `aria-roledescription="carousel"`, `role="alert"` validation errors, and `focus-visible` keyboard focus styles.
- **Cleanup & Migration**: Identification of unused files/dependencies and the TypeScript → JavaScript migration, each verified with a production build and a live dev-server check.

---

## Suggestion Checked, Corrected, or Rejected

- **Native Browser `window.confirm` Rejection**: An initial pattern for delete confirmation relied on `window.confirm()`, which blocks the browser thread, cannot be styled consistently, and fails inside restricted iframe previews. This was replaced with a dedicated accessible `ConfirmDeleteModal` (`role="alertdialog"`, keyboard Escape support, and explicit Cancel/Confirm focus targets) used for task deletion.
- **`localStorage` Initialization Check**: Verified that `useLocalStorage` checks `window.localStorage.getItem(key)` inside the `useState` lazy initializer and validates `Array.isArray(parsed)` so an empty array `[]` (if a user intentionally deletes all tasks) is respected on refresh rather than resetting to `INITIAL_SAMPLE_TASKS`.

---

## Verification

- `npm run build` (production build) and `npm run dev` (live server on `http://localhost:3000`) were run after each change; the running app was checked over HTTP before and after the TypeScript → JavaScript migration.
