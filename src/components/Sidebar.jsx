import { 
  Home, 
  Users, 
  FileText, 
  BarChart2, 
  Settings, 
  LogOut, 
  Bell, 
  X, 
  ChevronRight, 
  ChevronLeft,
  LayoutDashboard,
  Cog,
  Globe,
  User,
  ShieldCheck,
  BarChart3,
  UsersRound,
  ShieldAlert,
  GraduationCap,
  Building2,
  UserCheck,
  ShieldEllipsis,
  Wrench,
  Activity,
  ClipboardEdit,
  Wallet,
  FileSearch,
  LogIn,
  UserPlus
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Sidebar = ({ isOpen, setIsOpen, isCollapsed, setIsCollapsed }) => {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);

  const menuItems = [
    { icon: <LayoutDashboard size={22} />, label: "Video Kyc", path: "/videokyc" },
    { icon: <Cog size={22} />, label: "Operation", path: "/operation" },
    { icon: <Globe size={22} />, label: "Global", path: "/global" },
    { icon: <User size={22} />, label: "Customer", path: "/customer" },
    { icon: <ShieldCheck size={22} />, label: "Internal", path: "/internal" },
    { icon: <BarChart3 size={22} />, label: "Performance", path: "/performance" },
    { icon: <UsersRound size={22} />, label: "U.Management", path: "/usermanagement" },
    { icon: <ShieldAlert size={22} />, label: "SystemHealth & Security", path: "/systemhealth" },
    { icon: <GraduationCap size={22} />, label: "Training Portal", path: "/generatedpage" },
    { icon: <Building2 size={22} />, label: "Branch Management", path: "/branchmanagement" },
    { icon: <UserCheck size={22} />, label: "Agent Performance", path: "/AgentPerformance" },
    { icon: <ShieldEllipsis size={22} />, label: "Compliance & Risk", path: "/compliancerisk" },
    { icon: <Wrench size={22} />, label: "Service Request", path: "/servicerequest" },
    { icon: <Activity size={22} />, label: "Service Tracking", path: "/servicetracking" },
    { icon: <ClipboardEdit size={22} />, label: "Service Form", path: "/serviceform" },
    { icon: <Wallet size={22} />, label: "Wealth Portal", path: "/wealthportal" },
    { icon: <FileSearch size={22} />, label: "Internal Audit", path: "/internalaudit" },
    { icon: <LogIn size={22} />, label: "Login", path: "/login" },
    { icon: <UserPlus size={22} />, label: "Register", path: "/register" },
    { icon: <Settings size={22} />, label: "Settings", path: "/settings" },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div className={`
        fixed inset-y-0 left-0 z-50 bg-gray-900 text-gray-400 flex flex-col transition-all duration-300 border-r border-gray-800
        lg:static overflow-y-auto overflow-x-hidden scrollbar-hide
        ${isOpen ? "translate-x-0 w-72" : "-translate-x-full lg:translate-x-0"}
        ${isCollapsed ? "lg:w-24" : "lg:w-64"}
       `}>  
        
        {/* Logo Area & Toggle */}
        <div className="p-4 lg:p-6 flex items-center justify-between gap-3 overflow-hidden sticky top-0 z-50 bg-gray-900 border-b border-gray-800/50">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-orange-900/20 group-hover:scale-105 transition-transform">
              <BarChart2 size={24} />
            </div>
            <span className={`text-white font-bold text-xl transition-opacity duration-300 ${isCollapsed ? "lg:opacity-0 lg:hidden" : "opacity-100"}`}>
              AU Bank
            </span>
          </div>
          
          {/* Mobile Close Button */}
          <button onClick={() => setIsOpen(false)} className="lg:hidden p-2 text-gray-400 hover:text-white">
            <X size={24} />
          </button>

          {/* Desktop Toggle Arrow */}
          {!isCollapsed && (
            <button 
              onClick={() => setIsCollapsed(true)}
              className="hidden lg:flex p-1.5 hover:bg-gray-800 rounded-lg text-gray-500 hover:text-white transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-4 px-3 space-y-2 pb-8">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/');
            return (
              <div 
                key={item.label} 
                className="relative flex items-center"
                onMouseEnter={() => setHoveredItem(item.label)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Link
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all relative z-10 ${
                    isActive
                      ? "bg-orange-600 text-white shadow-lg shadow-orange-900/20"
                      : "hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <span className="shrink-0">{item.icon}</span>
                  <span className={`font-medium transition-all duration-300 ${isCollapsed ? "lg:opacity-0 lg:hidden" : "opacity-100"}`}>
                    {item.label}
                  </span>
                </Link>

                {/* Tooltip */}
                {isCollapsed && hoveredItem === item.label && (
                  <div className="hidden lg:block absolute left-full ml-4 px-3 py-2 bg-gray-800 text-white text-xs font-bold rounded-lg shadow-xl whitespace-nowrap z-100 animate-in fade-in slide-in-from-left-2 duration-200">
                    <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                    {item.label}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-gray-800 space-y-2 bg-gray-900 sticky bottom-0 z-50 ">
          <div className="relative flex items-center" onMouseEnter={() => setHoveredItem('Notifications')} onMouseLeave={() => setHoveredItem(null)}>
            <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-gray-800 hover:text-white transition-all text-left">
              <Bell size={22} className="shrink-0" />
              <span className={`font-medium transition-all duration-300 ${isCollapsed ? "lg:opacity-0 lg:hidden" : "opacity-100"}`}>
                Notifications
              </span>
            </button>
            {isCollapsed && hoveredItem === 'Notifications' && (
              <div className="hidden lg:block absolute left-full ml-4 px-3 py-2 bg-gray-800 text-white text-xs font-bold rounded-lg shadow-xl whitespace-nowrap z-100">
                <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                Notifications
              </div>
            )}
          </div>

          <div className="relative flex items-center" onMouseEnter={() => setHoveredItem('Logout')} onMouseLeave={() => setHoveredItem(null)}>
            <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-red-900/20 text-red-400 hover:text-red-300 transition-all text-left">
              <LogOut size={22} className="shrink-0" />
              <span className={`font-medium transition-all duration-300 ${isCollapsed ? "lg:opacity-0 lg:hidden" : "opacity-100"}`}>
                Logout
              </span>
            </button>
            {isCollapsed && hoveredItem === 'Logout' && (
              <div className="hidden lg:block absolute left-full ml-4 px-3 py-2 bg-gray-800 text-white text-xs font-bold rounded-lg shadow-xl whitespace-nowrap z-100">
                <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                Logout
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
