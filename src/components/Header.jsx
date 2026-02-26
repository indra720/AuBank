import { Bell, ChevronDown, Menu } from "lucide-react";

const Header = ({ onMenuClick }) => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 px-4 lg:px-6 flex items-center justify-between sticky top-0 z-30 shadow-sm">
      {/* Left: Mobile Menu & Logo */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg text-gray-600"
        >
          <Menu size={22} />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 lg:flex hidden bg-orange-600 rounded-lg  items-center justify-center text-white font-bold text-lg shadow-sm">
            A
          </div>
          <span className="font-bold text-orange-600 text-lg tracking-tight lg:flex hidden">AU Small Finance Bank</span>
        </div>
      </div>

      {/* Right: Minimal Notifications & Profile */}
      <div className="flex items-center gap-2 lg:gap-4">
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="h-6 w-0.5 bg-gray-200 mx-1"></div>

        <button className="flex items-center gap-2 p-1 hover:bg-gray-50 rounded-xl transition-all group">
          <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center text-white font-bold text-xs shadow-sm group-hover:bg-orange-600 transition-colors">
            AD
          </div>
          <div className="hidden sm:block text-left">
             <p className="text-[10px] font-bold text-gray-400 leading-none">AGENT</p>
             <p className="text-[12px] font-bold text-gray-900">Admin</p>
          </div>
          <ChevronDown size={14} className="text-gray-400 group-hover:text-gray-600 transition-transform group-hover:rotate-180" />
        </button>
      </div>
    </header>
  );
};

export default Header;
