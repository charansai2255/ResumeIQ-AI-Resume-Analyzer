import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import {
  LayoutDashboard,
  Upload,
  FileText,
  BarChart3,
  Briefcase,
  FileSignature,
  ScrollText,
  MessageSquare,
  User,
  LogOut,
  Zap,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard",           path: "/dashboard",      icon: LayoutDashboard },
  { name: "Upload Resume",       path: "/upload",         icon: Upload },
  { name: "Resume History",      path: "/history",        icon: FileText },
  { name: "ATS Analysis",        path: "/ats-analysis",   icon: BarChart3 },
  { name: "Job Match",           path: "/job-match",      icon: Briefcase },
  { name: "Cover Letter",        path: "/cover-letter",   icon: FileSignature },
  { name: "Resume Summary",      path: "/resume-summary", icon: ScrollText },
  { name: "Interview Questions", path: "/interview",      icon: MessageSquare },
  { name: "Profile",             path: "/profile",        icon: User },
];

function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="w-64 h-screen flex flex-col border-r border-white/[0.06] bg-[#05050f] relative overflow-hidden">
      {/* Subtle glow inside sidebar */}
      <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-indigo-600/8 to-transparent pointer-events-none" />

      {/* Logo */}
      <div className="px-5 py-5 flex-shrink-0 border-b border-white/[0.05]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)]">
            <Zap size={16} className="text-white" />
          </div>
          <span className="text-xl font-black bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent tracking-tight">
            ResumeIQ
          </span>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <p className="px-3 text-[10px] font-bold text-slate-600 uppercase tracking-[0.12em] mb-3">
          Navigation
        </p>

        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/dashboard"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-600/20 to-purple-600/10 text-white border border-indigo-500/25 shadow-[0_0_12px_rgba(99,102,241,0.15)]"
                    : "text-slate-500 hover:text-slate-200 hover:bg-white/5"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-indigo-400 rounded-full shadow-[0_0_6px_rgba(99,102,241,0.8)]" />
                  )}
                  <Icon size={17} className={isActive ? "text-indigo-400" : ""} />
                  <span className="text-sm font-medium">{item.name}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 flex-shrink-0 border-t border-white/[0.05]">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-500/8 border border-transparent hover:border-red-500/15 transition-all duration-200 group"
        >
          <LogOut size={17} />
          <span className="text-sm font-medium">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;