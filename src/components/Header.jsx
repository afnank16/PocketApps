import { Bell, Moon, Search, Sun } from "lucide-react";

export default function Header(props) {

  return (
    <header className={`sticky top-0 z-40 flex h-16 items-center justify-between border-b border-gray-200 ${props.currentTheme.bg} px-8 backdrop-blur-md `}>
      {/* Left */}
      <div>
        {/* <h1 className="text-2xl font-bold text-gray-900">
          Welcome
        </h1>
        <p className="text-sm text-gray-500">
          Explore your favorite apps
        </p> */}
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search apps..."
            className="w-72 rounded-xl border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 outline-none transition focus:border-black focus:bg-white"
          />
        </div>

        {/* Theme */}
        <button className="rounded-xl border border-gray-200 p-2 hover:bg-gray-100" onClick={() => props.setDark(!props.dark)}>
          {props.dark? <Moon size={20} /> : <Sun size={20}/>}
        </button>

        {/* Notifications */}
        <button className="relative rounded-xl border border-gray-200 p-2 hover:bg-gray-100 ">
          <Bell size={20} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        {/* Avatar */}
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
          A
        </button>
      </div>
    </header>
  );
}