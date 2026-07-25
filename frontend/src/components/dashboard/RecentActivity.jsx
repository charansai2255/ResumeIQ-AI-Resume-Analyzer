import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { Upload, Target, Briefcase, FileSignature, ScrollText, MessageSquare } from "lucide-react";
import { getRecentActivity } from "../../api/dashboard";

const activityConfig = {
  "Resume Uploaded":    { icon: Upload,        bg: "bg-blue-500/15",   border: "border-blue-500/25",   text: "text-blue-400" },
  "ATS Analysis":       { icon: Target,        bg: "bg-emerald-500/15",border: "border-emerald-500/25",text: "text-emerald-400" },
  "Job Match":          { icon: Briefcase,     bg: "bg-purple-500/15", border: "border-purple-500/25", text: "text-purple-400" },
  "Cover Letter":       { icon: FileSignature, bg: "bg-orange-500/15", border: "border-orange-500/25", text: "text-orange-400" },
  "Resume Summary":     { icon: ScrollText,    bg: "bg-indigo-500/15", border: "border-indigo-500/25", text: "text-indigo-400" },
  "Interview Questions":{ icon: MessageSquare, bg: "bg-pink-500/15",   border: "border-pink-500/25",   text: "text-pink-400" },
};

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function RecentActivity() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecentActivity()
      .then(setActivities)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-[#0a0b18]/70 border border-white/[0.07] rounded-2xl p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-white font-outfit tracking-tight">Recent Activity</h2>
        {activities.length > 0 && (
          <span className="text-xs text-slate-500 bg-white/5 border border-white/[0.07] px-2.5 py-1 rounded-full">
            {activities.length} events
          </span>
        )}
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-3 animate-pulse">
              <div className="w-9 h-9 rounded-xl bg-white/5 flex-shrink-0" />
              <div className="flex-1 space-y-2 py-1">
                <div className="h-3 bg-white/5 rounded-full w-1/2" />
                <div className="h-2 bg-white/5 rounded-full w-3/4" />
              </div>
            </div>
          ))}
        </div>
      ) : activities.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/[0.07] flex items-center justify-center mb-3">
            <Clock size={20} className="text-slate-600" />
          </div>
          <p className="text-slate-500 text-sm">No recent activity yet.</p>
          <p className="text-slate-600 text-xs mt-1">Start by uploading a resume.</p>
        </div>
      ) : (
        <div className="space-y-1">
          {activities.map((item, index) => {
            const cfg = activityConfig[item.type] || activityConfig["Resume Uploaded"];
            const Icon = cfg.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-white/[0.03] transition duration-200 group"
              >
                <div className={`w-9 h-9 rounded-xl ${cfg.bg} border ${cfg.border} ${cfg.text} flex items-center justify-center flex-shrink-0`}>
                  <Icon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-200 truncate">{item.type}</p>
                  <p className="text-xs text-slate-500 truncate mt-0.5">{item.title}</p>
                </div>
                <span className="text-xs text-slate-600 whitespace-nowrap flex-shrink-0">
                  {timeAgo(item.created_at)}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default RecentActivity;