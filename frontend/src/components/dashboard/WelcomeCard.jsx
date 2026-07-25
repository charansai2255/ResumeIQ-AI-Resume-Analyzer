import { CalendarDays, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function WelcomeCard() {
  const { user } = useAuth();

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  return (
    <div className="relative rounded-2xl overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 animate-gradient" />
      {/* Mesh overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.08)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,0,0,0.3)_0%,transparent_60%)]" />

      {/* Decorative circles */}
      <div className="absolute -right-12 -top-12 w-52 h-52 rounded-full bg-white/5 blur-xl pointer-events-none" />
      <div className="absolute -left-8 -bottom-8 w-40 h-40 rounded-full bg-purple-500/10 blur-lg pointer-events-none" />

      <div className="relative z-10 p-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="flex-1">
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)] animate-pulse" />
              <Sparkles size={13} className="text-cyan-300" />
              <span className="text-xs font-semibold text-cyan-200 tracking-wide uppercase">AI System Active</span>
            </div>

            <p className="text-indigo-200/80 text-sm font-medium mb-1">{greeting},</p>
            <h1 className="text-4xl font-black tracking-tight font-outfit text-white leading-tight">
              {user?.name?.split(" ")[0] || "Welcome"} 👋
            </h1>

            <p className="mt-3 text-indigo-100/70 max-w-xl leading-relaxed text-sm">
              Your AI-powered career toolkit is ready. Analyze ATS scores, generate
              cover letters, match jobs, and ace your interviews.
            </p>

            <Link
              to="/upload"
              className="inline-flex items-center gap-2 mt-6 bg-white/15 hover:bg-white/25 border border-white/20 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition duration-200 group"
            >
              Get Started
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>

          {/* Date badge */}
          <div className="flex-shrink-0 flex items-center gap-2 bg-white/10 border border-white/15 backdrop-blur-md px-4 py-2.5 rounded-xl text-sm font-medium self-start md:self-center">
            <CalendarDays size={15} className="text-indigo-200" />
            <span className="text-indigo-100">{today}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomeCard;