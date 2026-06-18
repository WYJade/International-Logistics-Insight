import { Search, Command } from "lucide-react";

export function Header() {
  return (
    <header className="flex h-14 items-center justify-between border-b border-gray-100 bg-white px-6">
      <div className="text-sm text-gray-500">layout.menus.dashboard</div>
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-500 hover:bg-gray-100 transition-colors">
          <Search className="h-3.5 w-3.5" />
          <span>common.button.search</span>
          <kbd className="ml-2 flex items-center gap-0.5 text-xs text-gray-400">
            <Command className="h-3 w-3" />K
          </kbd>
        </button>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-violet-700 text-xs font-medium">
          DU
        </div>
      </div>
    </header>
  );
}
