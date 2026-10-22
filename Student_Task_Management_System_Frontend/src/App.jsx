
import React, { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  CalendarDays,
  Check,
  CheckCheck,
  CircleHelp,
  ClipboardList,
  Clock3,
  GraduationCap,
  LayoutDashboard,
  ListTodo,
  Plus,
  Search,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";

import Login from "./Login";

const sampleTasks = [
  {
    id: 101,
    title: "Finish the DSA assignment",
    subject: "Data Structures",
    due: "",
    priority: "High",
    notes: "Review the linked list questions before submitting.",
    done: false,
  },
  {
    id: 102,
    title: "Revise Java exception handling",
    subject: "Java Programming",
    due: "",
    priority: "Medium",
    notes: "Practise one example using try and catch.",
    done: false,
  },
  {
    id: 103,
    title: "Read the sensor experiment notes",
    subject: "Sensors",
    due: "",
    priority: "Low",
    notes: "",
    done: true,
  },
];

const todayString = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(d.getDate()).padStart(2, "0")}`;
};

function loadTasks() {
  try {
    const saved = localStorage.getItem("studyspace-tasks");
    return saved ? JSON.parse(saved) : sampleTasks;
  } catch {
    return sampleTasks;
  }
}

function TaskForm({
  modal = false,
  title,
  setTitle,
  subject,
  setSubject,
  due,
  setDue,
  priority,
  setPriority,
  notes,
  setNotes,
  today,
  addTask,
}) {
  return (
    <form className="task-form" onSubmit={addTask}>
      <label htmlFor={modal ? "modal-title" : "task-title"}>
        Task name <span>*</span>
      </label>
      <input
        id={modal ? "modal-title" : "task-title"}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="e.g. Review lecture notes"
        maxLength={100}
        required
      />

      <label htmlFor={modal ? "modal-subject" : "task-subject"}>
        Subject or category
      </label>
      <input
        id={modal ? "modal-subject" : "task-subject"}
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="e.g. Mathematics"
        maxLength={50}
      />

      <div className="form-columns">
        <div>
          <label htmlFor={modal ? "modal-due" : "task-due"}>
            Due date
          </label>
          <input
            id={modal ? "modal-due" : "task-due"}
            type="date"
            min={today}
            value={due}
            onChange={(e) => setDue(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor={modal ? "modal-priority" : "task-priority"}>
            Priority
          </label>
          <select
            id={modal ? "modal-priority" : "task-priority"}
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>
      </div>

      <label htmlFor={modal ? "modal-notes" : "task-notes"}>
        A note to yourself <span className="optional">(optional)</span>
      </label>
      <textarea
        id={modal ? "modal-notes" : "task-notes"}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={3}
        maxLength={220}
        placeholder="Anything useful to remember?"
      />

      <button className="primary-button full-button" type="submit">
        <Plus size={17} /> Save task
      </button>

      {!modal && (
        <div className="privacy-note">
          <CircleHelp size={14} />
          Tasks stay in this browser on this device.
        </div>
      )}
    </form>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [tasks, setTasks] = useState(loadTasks);
  const [view, setView] = useState("all");
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [due, setDue] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [notes, setNotes] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    localStorage.setItem("studyspace-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const today = todayString();
  const pending = tasks.filter((t) => !t.done).length;
  const completed = tasks.filter((t) => t.done).length;

  const labels = {
    all: "All tasks",
    today: "Due today",
    pending: "Still to do",
    completed: "Completed",
  };

  const shownTasks = useMemo(
    () =>
      tasks
        .filter((t) => {
          if (view === "pending" && t.done) return false;
          if (view === "completed" && !t.done) return false;
          if (view === "today" && (t.due !== today || t.done)) {
            return false;
          }

          const query = `${t.title} ${t.subject} ${t.notes}`.toLowerCase();

          return (
            query.includes(search.trim().toLowerCase()) &&
            (priorityFilter === "All" || t.priority === priorityFilter)
          );
        })
        .sort(
          (a, b) =>
            Number(a.done) - Number(b.done) ||
            (a.due || "9999").localeCompare(b.due || "9999")
        ),
    [tasks, view, search, priorityFilter, today]
  );

  function flash(message) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2400);
  }

  function addTask(e) {
    e.preventDefault();

    if (!title.trim()) return;

    setTasks((current) => [
      {
        id: Date.now(),
        title: title.trim(),
        subject: subject.trim() || "General",
        due,
        priority,
        notes: notes.trim(),
        done: false,
      },
      ...current,
    ]);

    setTitle("");
    setSubject("");
    setDue("");
    setPriority("Medium");
    setNotes("");
    setShowModal(false);
    setView("all");

    flash("Task added. You've got this!");
  }

  function toggleTask(id) {
    setTasks((current) =>
      current.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  function removeTask(id) {
    setTasks((current) => current.filter((t) => t.id !== id));
    flash("Task removed.");
  }

  const dateLabel = new Date().toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  const nav = [
    { id: "all", label: "Overview", icon: LayoutDashboard },
    { id: "today", label: "Due today", icon: CalendarDays },
    { id: "pending", label: "Still to do", icon: ListTodo },
    { id: "completed", label: "Completed", icon: CheckCheck },
  ];

  const formProps = {
    title,
    setTitle,
    subject,
    setSubject,
    due,
    setDue,
    priority,
    setPriority,
    notes,
    setNotes,
    today,
    addTask,
  };

  // Display login before the dashboard.
  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-icon">
            <GraduationCap size={23} />
          </span>
          <span className="brand-copy">
            StudySpace
            <small>YOUR STUDY PLANNER</small>
          </span>
        </div>

        <div className="side-label">MENU</div>

        <nav className="side-nav" aria-label="Task views">
          {nav.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                className={`nav-link ${
                  view === item.id ? "selected" : ""
                }`}
                onClick={() => setView(item.id)}
              >
                <Icon size={18} />
                {item.label}
                {item.id === "pending" && (
                  <span className="nav-count">{pending}</span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-tip">
          <div className="tip-sparkle">
            <Sparkles size={18} />
          </div>
          <strong>One thing at a time.</strong>
          <p>
            You don't have to finish everything today. Start with the next
            small step.
          </p>
        </div>

        <div className="sidebar-user">
          <div className="user-avatar">S</div>
          <div>
            <strong>Student workspace</strong>
            <span>Personal planner</span>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="page-header">
          <div>
            <div className="overline">
              YOUR WEEK, A LITTLE MORE ORGANISED
            </div>
            <h1>
              Hi there, ready to get things done?{" "}
              <span className="sparkle-text">✦</span>
            </h1>
            <p className="header-subtitle">
              Keep your assignments, study plans and deadlines in one place.
            </p>
          </div>

          <div className="date-chip">
            <CalendarDays size={16} />
            {dateLabel}
          </div>
        </header>

        <section className="stats-grid" aria-label="Task summary">
          <article className="stat-card">
            <div className="stat-label">
              Total tasks
              <span className="stat-icon lavender">
                <ClipboardList size={18} />
              </span>
            </div>
            <div className="stat-number">{tasks.length}</div>
            <div className="stat-foot">Everything on your list</div>
          </article>

          <article className="stat-card">
            <div className="stat-label">
              Still to do
              <span className="stat-icon peach">
                <Clock3 size={18} />
              </span>
            </div>
            <div className="stat-number">{pending}</div>
            <div className="stat-foot">Small steps add up</div>
          </article>

          <article className="stat-card">
            <div className="stat-label">
              Finished
              <span className="stat-icon mint">
                <Check size={18} />
              </span>
            </div>
            <div className="stat-number">{completed}</div>
            <div className="stat-foot">Give yourself credit</div>
          </article>
        </section>

        <section className="workspace-grid">
          <section className="panel task-panel">
            <div className="panel-heading">
              <div>
                <h2>{labels[view]}</h2>
                <p>A little progress is still progress.</p>
              </div>

              <button
                className="primary-button compact"
                onClick={() => setShowModal(true)}
              >
                <Plus size={17} /> Add task
              </button>
            </div>

            <div className="filter-row">
              <label className="search-box">
                <Search size={17} />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Find a task..."
                  aria-label="Search tasks"
                />

                {search && (
                  <button
                    type="button"
                    className="clear-search"
                    onClick={() => setSearch("")}
                    aria-label="Clear search"
                  >
                    <X size={14} />
                  </button>
                )}
              </label>

              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                aria-label="Filter by priority"
              >
                <option>All</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>

            <div className="list-summary">
              <span>
                {shownTasks.length}{" "}
                {shownTasks.length === 1 ? "task" : "tasks"}
              </span>
              <span>Tick a task when it's done</span>
            </div>

            <div className="task-list">
              {shownTasks.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">
                    <BookOpen size={24} />
                  </div>
                  <strong>Nothing on this list right now</strong>
                  <p>
                    Try another filter or add a task when you're ready.
                  </p>
                  <button
                    className="text-button"
                    onClick={() => setShowModal(true)}
                  >
                    Add a task
                  </button>
                </div>
              ) : (
                shownTasks.map((task) => (
                  <article
                    className={`task-row ${task.done ? "is-done" : ""}`}
                    key={task.id}
                  >
                    <button
                      className={`check-button ${
                        task.done ? "checked" : ""
                      }`}
                      onClick={() => toggleTask(task.id)}
                      aria-label={
                        task.done
                          ? "Mark task as not done"
                          : "Mark task as done"
                      }
                    >
                      {task.done && <Check size={14} />}
                    </button>

                    <div className="task-details">
                      <div className="task-title">{task.title}</div>
                      <div className="task-meta">
                        <span>{task.subject}</span>
                        <span className="meta-dot">·</span>
                        <span>
                          {task.due
                            ? `Due ${new Date(
                                `${task.due}T00:00:00`
                              ).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                              })}`
                            : "No deadline"}
                        </span>
                        {task.notes && (
                          <span className="notes-preview">
                            · {task.notes}
                          </span>
                        )}
                      </div>
                    </div>

                    <span
                      className={`priority-tag ${task.priority.toLowerCase()}`}
                    >
                      {task.priority}
                    </span>

                    <button
                      className="delete-button"
                      onClick={() => removeTask(task.id)}
                      aria-label={`Delete ${task.title}`}
                      title="Delete task"
                    >
                      <Trash2 size={16} />
                    </button>
                  </article>
                ))
              )}
            </div>
          </section>

          <aside className="panel right-panel">
            <div className="panel-heading">
              <div>
                <h2>Quick add</h2>
                <p>Got something to remember?</p>
              </div>
              <span className="form-heading-icon">
                <Plus size={19} />
              </span>
            </div>

            <TaskForm {...formProps} />

            <div className="gentle-reminder">
              <div className="reminder-icon">
                <Sparkles size={17} />
              </div>
              <div>
                <strong>A gentle reminder</strong>
                <p>
                  Leave a little room for breaks, too. Rest is part of getting
                  things done.
                </p>
              </div>
            </div>
          </aside>
        </section>

        <footer className="page-footer">
          <span>StudySpace · Student Task Management System</span>
          <span>Made for real student routines</span>
        </footer>
      </main>

      {showModal && (
        <div
          className="modal-backdrop"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setShowModal(false);
          }}
        >
          <section
            className="modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-heading"
          >
            <div className="modal-heading">
              <div>
                <h2 id="modal-heading">Add a task</h2>
                <p>
                  Write it down so you don't have to keep it in your head.
                </p>
              </div>

              <button
                className="modal-close"
                onClick={() => setShowModal(false)}
                aria-label="Close form"
              >
                <X size={18} />
              </button>
            </div>

            <TaskForm {...formProps} modal />
          </section>
        </div>
      )}

      {notice && (
        <div className="toast" role="status">
          <Check size={17} />
          {notice}
        </div>
      )}
    </div>
  );
}
