import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { getATSTrend } from "../../api/dashboard";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0d0e1e] border border-white/[0.1] rounded-xl px-4 py-3 shadow-2xl">
        <p className="text-xs text-slate-500 mb-1">{label}</p>
        <p className="text-xl font-black text-indigo-400 font-outfit">{payload[0].value}<span className="text-sm font-medium text-slate-500 ml-1">/ 100</span></p>
      </div>
    );
  }
  return null;
};

function ATSChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getATSTrend()
      .then(setData)
      .catch(console.error);
  }, []);

  const latest = data[data.length - 1]?.score ?? 0;

  return (
    <div className="bg-[#0a0b18]/70 border border-white/[0.07] rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white font-outfit tracking-tight">ATS Score Trend</h2>
          <p className="text-xs text-slate-500 mt-0.5">Your analysis history</p>
        </div>
        {data.length > 0 && (
          <div className="flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-500/25 text-indigo-400 px-3 py-1.5 rounded-xl">
            <TrendingUp size={14} />
            <span className="text-sm font-bold">{latest}</span>
            <span className="text-xs text-indigo-500">pts</span>
          </div>
        )}
      </div>

      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-56 text-center">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/[0.07] flex items-center justify-center mb-3">
            <TrendingUp size={20} className="text-slate-600" />
          </div>
          <p className="text-slate-500 text-sm">No ATS data yet.</p>
          <p className="text-slate-600 text-xs mt-1">Run an analysis to see your trend.</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={230}>
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <defs>
              <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#818cf8" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />

            <XAxis
              dataKey="name"
              stroke="#475569"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              dy={8}
            />
            <YAxis
              domain={[0, 100]}
              stroke="#475569"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              dx={-5}
            />
            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="score"
              stroke="#818cf8"
              strokeWidth={2.5}
              fill="url(#scoreGradient)"
              dot={{ r: 4, stroke: "#818cf8", strokeWidth: 2, fill: "#0a0b18" }}
              activeDot={{ r: 6, stroke: "#38bdf8", strokeWidth: 2, fill: "#0a0b18" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default ATSChart;