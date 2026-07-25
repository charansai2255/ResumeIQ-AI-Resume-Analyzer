import { User, Mail, Shield, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import DashboardLayout from "../../layouts/DashboardLayout";

const Profile = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (!window.confirm("Are you sure you want to sign out?")) return;
    logout();
    toast.success("Signed out successfully");
    navigate("/login");
  };

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
    : "U";

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-80">
          <div className="text-center space-y-3">
            <div className="w-10 h-10 border-2 border-indigo-500/50 border-t-indigo-400 rounded-full animate-spin mx-auto" />
            <p className="text-slate-500 text-sm font-medium">Loading profile...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Profile Hero Card */}
        <div className="relative bg-[#0a0b18]/70 border border-white/[0.07] rounded-2xl overflow-hidden">
          {/* Top banner */}
          <div className="h-28 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.08)_0%,transparent_60%)]" />
          </div>

          <div className="px-8 pb-8">
            {/* Avatar overlapping banner */}
            <div className="relative -mt-12 mb-4">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-black shadow-[0_0_25px_rgba(99,102,241,0.4)] border-4 border-[#0a0b18]">
                {initials}
              </div>
            </div>

            <h1 className="text-2xl font-bold text-white font-outfit tracking-tight">{user?.name}</h1>
            <p className="text-slate-500 text-sm mt-1">{user?.email}</p>

            <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold px-3 py-1 rounded-full mt-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_4px_rgba(52,211,153,0.8)]" />
              Active Account
            </div>
          </div>
        </div>

        {/* Details Card */}
        <div className="bg-[#0a0b18]/70 border border-white/[0.07] rounded-2xl p-6 space-y-1">
          <p className="text-xs font-semibold text-slate-600 uppercase tracking-widest mb-4">Account Information</p>

          <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/[0.03] transition">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/25 text-indigo-400">
              <User size={18} />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold">Full Name</p>
              <p className="font-semibold text-slate-200 mt-0.5">{user?.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/[0.03] transition">
            <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/25 text-blue-400">
              <Mail size={18} />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold">Email Address</p>
              <p className="font-semibold text-slate-200 mt-0.5">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/[0.03] transition">
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/25 text-purple-400">
              <Shield size={18} />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold">Account Status</p>
              <p className="font-semibold text-emerald-400 mt-0.5">Verified & Active</p>
            </div>
          </div>
        </div>

        {/* Logout */}
        <div className="bg-[#0a0b18]/70 border border-white/[0.07] rounded-2xl p-6">
          <p className="text-xs font-semibold text-slate-600 uppercase tracking-widest mb-4">Danger Zone</p>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full bg-red-500/8 hover:bg-red-500/15 text-red-400 border border-red-500/20 hover:border-red-500/35 py-3 px-5 rounded-xl font-semibold transition duration-200 text-sm group"
          >
            <LogOut size={17} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
            Sign Out of Account
          </button>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default Profile;