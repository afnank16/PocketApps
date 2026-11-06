import { Bell, Moon, Search, Sun, Command } from "lucide-react";

export default function Header(props) {
  const isDark = props.dark;

  return (
    <header
      className={`sticky top-0 z-40 flex h-[72px] items-center justify-between border-b px-6 md:px-8 backdrop-blur-xl transition-colors duration-300 ${
        isDark
          ? "border-white/[0.07] bg-[#0b1020]/80 text-slate-100"
          : "border-slate-200/80 bg-white/80 text-slate-800"
      }`}
    >
      {/* Left */}
      <div className="flex items-center gap-3">
        <div>
          <h2 className="text-sm font-bold tracking-tight">
            My Workspace
          </h2>
          <p
            className={`mt-0.5 text-xs ${
              isDark ? "text-slate-500" : "text-slate-400"
            }`}
          >
            Your personal digital space
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">

        {/* Search */}
        <div className="relative hidden sm:block">
          <Search
            size={17}
            className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${
              isDark ? "text-slate-500" : "text-slate-400"
            }`}
          />

          <input
            type="text"
            placeholder="Search your tools..."
            className={`w-52 rounded-xl border py-2.5 pl-10 pr-12 text-sm outline-none transition-all duration-200 md:w-64 ${
              isDark
                ? "border-white/10 bg-white/[0.04] text-white placeholder:text-slate-500 focus:border-indigo-500/60 focus:bg-white/[0.07]"
                : "border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white"
            }`}
          />

          <div
            className={`absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 rounded-md border px-1.5 py-0.5 ${
              isDark
                ? "border-white/10 text-slate-500"
                : "border-slate-200 text-slate-400"
            }`}
          >
            <Command size={11} />
            <span className="text-[10px]">K</span>
          </div>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={() => props.setDark(!props.dark)}
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          aria-label="Toggle theme"
          className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-200 hover:-translate-y-0.5 ${
            isDark
              ? "border-white/10 bg-white/[0.04] text-amber-400 hover:bg-white/10"
              : "border-slate-200 bg-white text-indigo-600 hover:bg-indigo-50"
          }`}
        >
          {isDark ? <Sun size={19} /> : <Moon size={19} />}
        </button>

        {/* Notifications */}
        <button
          aria-label="Notifications"
          className={`relative flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-200 hover:-translate-y-0.5 ${
            isDark
              ? "border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/10"
              : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
          }`}
        >
          <Bell size={19} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-rose-500 dark:border-[#0b1020]" />
        </button>

        {/* Avatar */}
        <button
          title="My Profile"
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-sm font-bold text-white shadow-md shadow-indigo-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
        >
          A
        </button>

      </div>
    </header>
  );
}
