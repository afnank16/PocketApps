import { NavLink } from "react-router-dom";

import {
  House,
  Calculator,
  CheckSquare,
  Keyboard,
  NotebookPen,
  Settings,
  Gamepad2,
  Sparkles,
  LockKeyhole,
  User,
  ChevronRight,
} from "lucide-react";

const links = [
  { name: "Home", path: "/", icon: House },
  { name: "Calculator", path: "/calculator", icon: Calculator },
  { name: "Todo List", path: "/todolist", icon: CheckSquare },
  { name: "Typing Test", path: "/typing_test", icon: Keyboard },
  { name: "XO Game", path: "/tictactoe", icon: Gamepad2 },
  { name: "Dictionary", path: "/dictionary", icon: NotebookPen },
  // { name: "Password Generator", path: "/password-generator", icon: LockKeyhole },
];

export default function Sidebar(props) {
  const isDark = props.dark;

  return (
    <aside
      className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r transition-colors duration-300 ${
        isDark
          ? "border-white/[0.07] bg-[#0b1020] text-slate-100"
          : "border-slate-200 bg-white text-slate-800"
      }`}
    >
      {/* Branding */}
      <div
        className={`flex h-[72px] shrink-0 items-center gap-3 border-b px-6 ${
          isDark ? "border-white/[0.07]" : "border-slate-100"
        }`}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/20">
          <Sparkles size={21} />
        </div>

        <div>
          <h1 className="text-lg font-bold tracking-tight">
            Pocket<span className="text-indigo-500">Apps</span>
          </h1>
          <p
            className={`text-[10px] font-medium tracking-widest ${
              isDark ? "text-slate-500" : "text-slate-400"
            }`}
          >
            YOUR DIGITAL TOOLKIT
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-7">

        <p
          className={`mb-4 px-3 text-[10px] font-bold uppercase tracking-[0.15em] ${
            isDark ? "text-slate-500" : "text-slate-400"
          }`}
        >
          Workspace
        </p>

        {links.map(({ name, path, icon: Icon }) => (
          <NavLink
            key={name}
            to={path}
            end={path === "/"}
            className={({ isActive }) =>
              `group relative flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? isDark
                    ? "bg-indigo-500/15 text-indigo-400"
                    : "bg-indigo-50 text-indigo-700"
                  : isDark
                    ? "text-slate-400 hover:bg-white/[0.05] hover:text-slate-100"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="absolute -left-4 top-2 h-8 w-1 rounded-r-full bg-indigo-500" />
                )}

                <Icon
                  size={19}
                  strokeWidth={isActive ? 2.3 : 1.8}
                  className="shrink-0 transition-transform duration-200 group-hover:scale-110"
                />

                <span className="flex-1">{name}</span>

                {isActive && (
                  <ChevronRight size={15} className="opacity-60" />
                )}
              </>
            )}
          </NavLink>
        ))}

      </nav>

      {/* Bottom Section */}
      <div
        className={`shrink-0 border-t p-4 ${
          isDark ? "border-white/[0.07]" : "border-slate-100"
        }`}
      >
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `mb-3 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
              isActive
                ? isDark
                  ? "bg-indigo-500/15 text-indigo-400"
                  : "bg-indigo-50 text-indigo-700"
                : isDark
                  ? "text-slate-400 hover:bg-white/[0.05] hover:text-white"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            }`
          }
        >
          <Settings size={19} />
          Settings
        </NavLink>

        {/* Profile */}
        <div
          className={`flex items-center gap-3 rounded-xl p-3 ${
            isDark ? "bg-white/[0.04]" : "bg-slate-50"
          }`}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-sm font-bold text-white">
            A
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">
              My Workspace
            </p>
            <p
              className={`text-xs ${
                isDark ? "text-slate-500" : "text-slate-400"
              }`}
            >
              Personal Account
            </p>
          </div>

          <User
            size={16}
            className={isDark ? "text-slate-500" : "text-slate-400"}
          />
        </div>
      </div>
    </aside>
  );
}
