import { Zap, CheckCircle } from "lucide-react";

const features = [
  "Instant ATS Score Analysis",
  "AI-Powered Cover Letters",
  "Smart Job Matching",
  "Interview Question Generator",
  "Resume Summary AI",
];

function AuthLayout({ children }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-brand-dark">
      {/* ── Left Panel ── */}
      <div className="hidden lg:flex flex-col justify-center p-16 relative overflow-hidden bg-[#05050e]">
        {/* Glows */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full bg-purple-600/8 blur-[120px] pointer-events-none" />
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

        <div className="relative z-10">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.5)]">
              <Zap size={20} className="text-white" />
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent tracking-tight font-outfit">
              ResumeIQ
            </span>
          </div>

          <h1 className="text-5xl font-black text-white font-outfit tracking-tight leading-tight mb-4">
            Land your<br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              dream job
            </span><br />
            faster.
          </h1>

          <p className="text-slate-400 mb-10 leading-relaxed max-w-sm">
            The AI-powered career platform that gives you an unfair advantage in your job search.
          </p>

          <div className="space-y-4">
            {features.map((f) => (
              <div key={f} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center flex-shrink-0">
                  <CheckCircle size={12} className="text-indigo-400" />
                </div>
                <span className="text-slate-300 text-sm font-medium">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right Panel (Forms) ── */}
      <div className="flex justify-center items-center p-6 lg:p-12 relative overflow-hidden bg-brand-dark">
        {/* Subtle background glow for the right side */}
        <div className="absolute w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[140px] pointer-events-none" />

        <div className="w-full max-w-md relative z-10">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Zap size={16} className="text-white" />
            </div>
            <span className="text-xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-outfit">ResumeIQ</span>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
