import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Bell } from "lucide-react";

const routeTitles = {
  "/dashboard": "Dashboard",
  "/upload": "Upload Resume",
  "/history": "Resume History",
  "/ats-analysis": "ATS Analysis",
  "/job-match": "Job Match",
  "/cover-letter": "Cover Letter",
  "/resume-summary": "Resume Summary",
  "/interview": "Interview Prep",
  "/profile": "My Profile",
};

function Navbar() {
  const { user } = useAuth();
  const location = useLocation();

  const pageTitle = Object.entries(routeTitles).find(([path]) =>
    location.pathname.startsWith(path)
  )?.[1] ?? "Dashboard";

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
    : "U";

  return (
    <header className="border-b border-white/[0.06] bg-[#05050f]/70 backdrop-blur-xl px-6 py-3.5 flex justify-between items-center flex-shrink-0">
      {/* Page Title */}
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight">
          {pageTitle}
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
        </p>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Notification bell */}
        <button className="w-9 h-9 rounded-xl bg-white/5 border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition duration-200">
          <Bell size={16} />
        </button>

        {/* User chip */}
        <div className="flex items-center gap-2.5 bg-white/5 border border-white/[0.08] rounded-xl px-3 py-1.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-[0_0_10px_rgba(99,102,241,0.4)]">
            {initials}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-200 leading-none">{user?.name || "User"}</p>
            <p className="text-xs text-slate-500 mt-0.5 leading-none truncate max-w-[140px]">{user?.email}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;