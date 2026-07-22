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
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Upload Resume", path: "/upload", icon: Upload },
  { name: "Resume History", path: "/history", icon: FileText },
  { name: "ATS Analysis", path: "/analysis", icon: BarChart3 },
  { name: "Job Match", path: "/job-match", icon: Briefcase },
  { name: "Cover Letter", path: "/cover-letter", icon: FileSignature },
  { name: "Resume Summary", path: "/resume-summary", icon: ScrollText },
  { name: "Interview Questions", path: "/interview", icon: MessageSquare },
  { name: "Profile", path: "/profile", icon: User },
];

function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-slate-900 text-white h-screen p-5">
      <h1 className="text-2xl font-bold mb-8">
        ResumeIQ
      </h1>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? "bg-blue-600"
                    : "hover:bg-slate-800"
                }`
              }
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 mt-10 hover:bg-red-600 rounded-lg w-full transition"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;