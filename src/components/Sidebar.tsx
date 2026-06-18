import {
  LayoutDashboard,
  Ship,
  ChevronLeft,
  ChevronRight,
  FileText,
} from "lucide-react";

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
}

const navItems = [
  { label: "End To End", icon: LayoutDashboard, active: false },
  { label: "International Logistics Insight", icon: Ship, active: true },
  { label: "Report", icon: FileText, active: false },
];

export function Sidebar({ open, onToggle }: SidebarProps) {
  return (
    <aside
      className={`relative flex flex-col border-r border-gray-200 bg-white transition-all duration-300 ${
        open ? "w-64" : "w-16"
      }`}
    >
      {/* Logo */}
      <div className="flex h-14 items-center gap-2 border-b border-gray-100 px-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 text-white font-bold text-sm shrink-0">
          O
        </div>
        {open && (
          <span className="text-sm font-semibold text-gray-800 truncate">
            OMS
          </span>
        )}
      </div>

      {/* Section label */}
      {open && (
        <div className="px-4 pt-4 pb-2">
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
            International Logistic
          </span>
        </div>
      )}

      {/* Nav items */}
      <nav className="flex-1 px-2 py-2 space-y-1">
        {navItems.map((item) => (
          <a
            key={item.label}
            href="#"
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
              item.active
                ? "bg-violet-50 text-violet-700 font-medium"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <item.icon className={`h-4.5 w-4.5 shrink-0 ${item.active ? "text-violet-600" : ""}`} />
            {open && <span className="truncate">{item.label}</span>}
          </a>
        ))}
      </nav>

      {/* Toggle */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm hover:bg-gray-50"
      >
        {open ? <ChevronLeft className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
      </button>
    </aside>
  );
}
