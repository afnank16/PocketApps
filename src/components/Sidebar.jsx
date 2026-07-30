import { NavLink } from "react-router-dom";
import {
  House,
  Calculator,
  CheckSquare,
  Keyboard,
  Timer,
  NotebookPen,
  LockKeyhole,
  Settings,
} from "lucide-react";

const links = [
  { name: "Home", path: "/", icon: House },
  { name: "Calculator", path: "/calculator", icon: Calculator },
  { name: "Todo", path: "/todolist", icon: CheckSquare },
  { name: "Typing Test", path: "/typing-test", icon: Keyboard },

//   { name: "Notes", path: "/notes", icon: NotebookPen },
//   { name: "Password Generator", path: "/password-generator", icon: LockKeyhole },
];

export default function Sidebar(props) {
  return (
    <aside className={`fixed left-0 top-0 h-screen w-64 border-r border-gray-200 ${props.currentTheme.bg}`}>
      <div className={`border-b ${props.currentTheme.border} p-4`}>
        <h1 className={`text-2xl font-bold ${props.currentTheme.text}`}>PocketApps</h1>
        {/* <p className="text-sm text-gray-500">
          Everyday tools in one place
        </p> */}
      </div>

      <nav className="flex flex-col gap-2 p-4">
        {links.map(({ name, path, icon: Icon }) => (
          <NavLink
            key={name}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                isActive
                  ? "bg-black text-white  "
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <Icon size={20} />
            <span>{name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="absolute bottom-0 w-full border-t p-4">
        <NavLink
          to="/settings"
          className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100"
        >
          <Settings size={20} />
          Settings
        </NavLink>
      </div>
    </aside>
  );
}