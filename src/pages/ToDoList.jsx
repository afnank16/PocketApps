import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import {
  Plus,
  Trash2,
  Check,
  ListTodo,
  Circle,
  CheckCircle2,
  ClipboardList,
  Sparkles,
  X,
} from "lucide-react";

function ToDoList(props) {
  const isDark = props.dark;

  // Load todos from localStorage
  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem("todos");

      return saved
        ? JSON.parse(saved)
        : [
            { id: 1, text: "Go to the gym", completed: false },
            { id: 2, text: "Buy groceries", completed: false },
            { id: 3, text: "Finish React project", completed: false },
          ];
    } catch {
      return [];
    }
  });

  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");

  // Save todos whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Add todo
  const addTodo = () => {
    if (!input.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
    };

    setTodos((prev) => [...prev, newTodo]);
    setInput("");
    setFilter("all");
  };

  // Toggle completion
  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  // Delete todo
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // Delete completed todos
  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  // Statistics
  const completedCount = todos.filter(
    (todo) => todo.completed
  ).length;

  const pendingCount = todos.length - completedCount;

  const progress =
    todos.length > 0
      ? Math.round((completedCount / todos.length) * 100)
      : 0;

  // Filter todos
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const cardStyle = isDark
    ? "border-white/[0.07] bg-[#131b2e]"
    : "border-slate-200 bg-white";

  const mutedText = isDark
    ? "text-slate-400"
    : "text-slate-500";

  const filters = [
    { id: "all", label: "All Tasks", count: todos.length },
    { id: "active", label: "Pending", count: pendingCount },
    { id: "completed", label: "Completed", count: completedCount },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark
          ? "bg-[#0b1020] text-slate-100"
          : "bg-[#f8f9fd] text-slate-800"
      }`}
    >
      <Sidebar
        theme={props.theme}
        currentTheme={props.currentTheme}
        dark={props.dark}
        setDark={props.setDark}
      />

      <div className="ml-64">
        <Header
          theme={props.theme}
          currentTheme={props.currentTheme}
          dark={props.dark}
          setDark={props.setDark}
        />

        <main className="mx-auto max-w-6xl space-y-8 p-6 md:p-9">

          {/* Heading */}
          <section>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500">
                <ListTodo size={25} />
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight">
                  My Tasks
                </h1>
                <p className={`mt-1 text-sm ${mutedText}`}>
                  Organize your day, one task at a time.
                </p>
              </div>
            </div>
          </section>

          {/* Welcome Banner */}
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 p-7 text-white shadow-xl shadow-emerald-500/10 md:p-9">

            <div className="absolute -right-12 -top-20 h-64 w-64 rounded-full border-[30px] border-white/5" />
            <div className="absolute -bottom-32 right-40 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

            <div className="relative z-10 max-w-xl">
              <div className="mb-4 flex items-center gap-2 text-xs font-semibold tracking-widest text-emerald-100">
                <Sparkles size={15} />
                PRODUCTIVITY SPACE
              </div>

              <h2 className="text-3xl font-bold md:text-4xl">
                Make today count.
              </h2>

              <p className="mt-3 text-sm leading-7 text-emerald-100">
                Every small task completed is a step forward.
                Stay organized and keep making progress.
              </p>

              <div className="mt-6 max-w-sm">
                <div className="mb-2 flex justify-between text-xs font-medium">
                  <span>Your daily progress</span>
                  <span>{progress}%</span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-black/20">
                  <div
                    className="h-full rounded-full bg-white transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="absolute bottom-4 right-10 hidden text-8xl opacity-20 md:block">
              ✓
            </div>
          </section>

          {/* Statistics */}
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">

            {[
              {
                label: "Total Tasks",
                value: todos.length,
                icon: ClipboardList,
                color: "text-indigo-500",
                bg: "bg-indigo-500/10",
              },
              {
                label: "Pending",
                value: pendingCount,
                icon: Circle,
                color: "text-amber-500",
                bg: "bg-amber-500/10",
              },
              {
                label: "Completed",
                value: completedCount,
                icon: CheckCircle2,
                color: "text-emerald-500",
                bg: "bg-emerald-500/10",
              },
            ].map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className={`rounded-2xl border p-5 transition hover:-translate-y-1 hover:shadow-lg ${cardStyle}`}
                >
                  <div className="flex items-center justify-between">
                    <p className={`text-sm font-medium ${mutedText}`}>
                      {stat.label}
                    </p>

                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}>
                      <Icon size={20} />
                    </div>
                  </div>

                  <h3 className="mt-4 text-3xl font-bold">
                    {stat.value}
                  </h3>
                </div>
              );
            })}
          </section>

          {/* Main Todo Section */}
          <section className={`rounded-3xl border p-5 shadow-sm md:p-7 ${cardStyle}`}>

            {/* Section Heading */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold">
                  Your To-Do List
                </h2>
                <p className={`mt-1 text-sm ${mutedText}`}>
                  Manage your tasks and stay on track.
                </p>
              </div>

              {completedCount > 0 && (
                <button
                  onClick={clearCompleted}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-rose-500 transition hover:bg-rose-500/10"
                >
                  <Trash2 size={15} />
                  Clear completed
                </button>
              )}
            </div>

            {/* Add Task */}
            <div className={`mb-7 flex gap-2 rounded-2xl border p-2 transition focus-within:border-emerald-500 ${
              isDark
                ? "border-white/10 bg-[#0b1020]"
                : "border-slate-200 bg-slate-50"
            }`}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTodo()}
                placeholder="What needs to get done?"
                className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-slate-400"
              />

              <button
                onClick={addTodo}
                disabled={!input.trim()}
                className="flex shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-emerald-500/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Plus size={18} />
                Add Task
              </button>
            </div>

            {/* Filters */}
            <div className="mb-6 flex flex-wrap items-center gap-2">
              {filters.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setFilter(item.id)}
                  className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${
                    filter === item.id
                      ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                      : isDark
                        ? "bg-white/5 text-slate-400 hover:bg-white/10"
                        : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  }`}
                >
                  {item.label}
                  <span className="ml-2 opacity-70">
                    {item.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Todo List */}
            <div className="space-y-3">

              {filteredTodos.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl ${
                    isDark ? "bg-white/5" : "bg-slate-100"
                  }`}>
                    <ClipboardList
                      size={30}
                      className="text-slate-400"
                    />
                  </div>

                  <h3 className="font-semibold">
                    {filter === "completed"
                      ? "No completed tasks yet"
                      : filter === "active"
                        ? "You're all caught up!"
                        : "Your list is empty"}
                  </h3>

                  <p className={`mt-2 text-sm ${mutedText}`}>
                    {filter === "active"
                      ? "Enjoy your free time or add another task."
                      : "Add a task above to get started."}
                  </p>
                </div>
              ) : (
                filteredTodos.map((todo) => (
                  <div
                    key={todo.id}
                    className={`group flex items-center gap-3 rounded-2xl border p-4 transition-all duration-200 ${
                      isDark
                        ? "border-white/[0.06] bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]"
                        : "border-slate-100 bg-slate-50/70 hover:border-slate-200 hover:bg-white"
                    }`}
                  >
                    {/* Checkbox */}
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      aria-label={
                        todo.completed
                          ? "Mark as pending"
                          : "Mark as completed"
                      }
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border-2 transition-all duration-200 ${
                        todo.completed
                          ? "border-emerald-500 bg-emerald-500 text-white"
                          : isDark
                            ? "border-slate-600 hover:border-emerald-500"
                            : "border-slate-300 hover:border-emerald-500"
                      }`}
                    >
                      {todo.completed && <Check size={15} strokeWidth={3} />}
                    </button>

                    {/* Task Text */}
                    <span
                      className={`min-w-0 flex-1 break-words text-sm font-medium transition-all ${
                        todo.completed
                          ? "text-slate-400 line-through opacity-60"
                          : ""
                      }`}
                    >
                      {todo.text}
                    </span>

                    {/* Status */}
                    <span className={`hidden rounded-full px-3 py-1 text-[10px] font-semibold sm:block ${
                      todo.completed
                        ? "bg-emerald-500/10 text-emerald-500"
                        : "bg-amber-500/10 text-amber-500"
                    }`}>
                      {todo.completed ? "Completed" : "Pending"}
                    </span>

                    {/* Delete */}
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      aria-label="Delete task"
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 opacity-60 transition hover:bg-rose-500/10 hover:text-rose-500 hover:opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                ))
              )}

            </div>

            {/* Footer */}
            {todos.length > 0 && (
              <div className={`mt-6 flex flex-wrap items-center justify-between gap-3 border-t pt-5 text-xs ${mutedText} ${
                isDark ? "border-white/[0.07]" : "border-slate-100"
              }`}>
                <span>
                  Showing {filteredTodos.length} of {todos.length} tasks
                </span>

                <span className="font-medium">
                  {pendingCount === 0
                    ? "🎉 All tasks completed!"
                    : `${pendingCount} tasks remaining`}
                </span>
              </div>
            )}

          </section>

          {/* Footer */}
          <footer className={`pb-4 text-center text-xs ${isDark ? "text-slate-600" : "text-slate-400"}`}>
            PocketApps · Small steps, big progress.
          </footer>

        </main>
      </div>
    </div>
  );
}

export default ToDoList;
