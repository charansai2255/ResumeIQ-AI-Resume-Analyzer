function AnalysisCard({ title, icon: Icon, color, items }) {
  const colorMap = {
    green:  { text: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/25", dot: "bg-emerald-400" },
    red:    { text: "text-red-400",     bg: "bg-red-500/10",     border: "border-red-500/25",     dot: "bg-red-400" },
    orange: { text: "text-amber-400",   bg: "bg-amber-500/10",   border: "border-amber-500/25",   dot: "bg-amber-400" },
    indigo: { text: "text-indigo-400",  bg: "bg-indigo-500/10",  border: "border-indigo-500/25",  dot: "bg-indigo-400" },
  };

  const key = Object.keys(colorMap).find((k) => color.includes(k)) || "indigo";
  const c = colorMap[key];

  return (
    <div className="group bg-[#0a0b18]/70 border border-white/[0.07] rounded-2xl p-6 shadow-md hover:border-white/[0.15] hover:bg-white/[0.02] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300">
      {/* Header */}
      <div className={`flex items-center gap-2.5 mb-5 pb-4 border-b border-white/[0.05]`}>
        <div className={`p-2 rounded-lg ${c.bg} border ${c.border} ${c.text} transition-transform duration-300 group-hover:scale-110`}>
          <Icon size={18} />
        </div>
        <h2 className={`text-lg font-bold font-outfit tracking-tight ${c.text}`}>
          {title}
        </h2>
        <span className={`ml-auto text-xs font-semibold ${c.text} ${c.bg} border ${c.border} px-2 py-0.5 rounded-full`}>
          {items.length} items
        </span>
      </div>

      <ul className="space-y-2.5">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2.5 text-slate-300 text-sm leading-relaxed">
            <span className={`w-1.5 h-1.5 rounded-full ${c.dot} flex-shrink-0 mt-1.5`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AnalysisCard;