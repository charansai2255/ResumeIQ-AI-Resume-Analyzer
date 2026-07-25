function StatCard({ title, value, icon: Icon, color }) {
  const colorMap = {
    blue:   { bg: "bg-blue-500/10",   border: "border-blue-500/25",   text: "text-blue-400",   glow: "shadow-[0_0_15px_rgba(59,130,246,0.2)]",   hoverBorder: "hover:border-blue-500/40" },
    green:  { bg: "bg-emerald-500/10",border: "border-emerald-500/25",text: "text-emerald-400",glow: "shadow-[0_0_15px_rgba(52,211,153,0.2)]",   hoverBorder: "hover:border-emerald-500/40" },
    purple: { bg: "bg-purple-500/10", border: "border-purple-500/25", text: "text-purple-400", glow: "shadow-[0_0_15px_rgba(168,85,247,0.2)]",   hoverBorder: "hover:border-purple-500/40" },
    orange: { bg: "bg-orange-500/10", border: "border-orange-500/25", text: "text-orange-400", glow: "shadow-[0_0_15px_rgba(249,115,22,0.2)]",   hoverBorder: "hover:border-orange-500/40" },
    indigo: { bg: "bg-indigo-500/10", border: "border-indigo-500/25", text: "text-indigo-400", glow: "shadow-[0_0_15px_rgba(99,102,241,0.2)]",   hoverBorder: "hover:border-indigo-500/40" },
    pink:   { bg: "bg-pink-500/10",   border: "border-pink-500/25",   text: "text-pink-400",   glow: "shadow-[0_0_15px_rgba(236,72,153,0.2)]",   hoverBorder: "hover:border-pink-500/40" },
  };

  const key = Object.keys(colorMap).find((k) => color.includes(k)) || "indigo";
  const c = colorMap[key];

  return (
    <div
      className={`
        relative group bg-[#0a0b18]/70 border border-white/[0.07]
        rounded-3xl p-7 shadow-md transition-all duration-300
        hover:-translate-y-1 hover:border-white/[0.12] hover:shadow-xl
        overflow-hidden cursor-default
      `}
    >
      {/* Background glow */}
      <div className={`absolute -right-6 -top-6 w-32 h-32 rounded-full blur-[40px] opacity-20 ${c.bg} group-hover:opacity-40 transition-opacity duration-500`} />

      <div className="relative z-10 flex justify-between items-start">
        <div>
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest mb-3">
            {title}
          </p>
          <h2 className="text-5xl font-black text-white font-outfit tracking-tight leading-none group-hover:scale-105 origin-left transition-transform duration-300">
            {value}
          </h2>
          <p className={`text-xs font-medium mt-3 ${c.text}`}>
            Total generated
          </p>
        </div>

        <div className={`p-3.5 rounded-xl ${c.bg} border ${c.border} ${c.text} transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_${c.text.split("-")[1]}-500/20]`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
}

export default StatCard;