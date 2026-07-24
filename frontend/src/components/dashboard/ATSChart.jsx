import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { getATSTrend } from "../../api/dashboard";

function ATSChart() {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchTrend();
  }, []);

  const fetchTrend = async () => {
    try {
      const response = await getATSTrend();
      setData(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow border p-6 h-[420px]">

      <h2 className="text-2xl font-bold mb-6">
        ATS Score Trend
      </h2>

      {data.length === 0 ? (

        <div className="flex items-center justify-center h-full text-gray-500">
          No ATS reports available.
        </div>

      ) : (

        <ResponsiveContainer width="100%" height="90%">

          <LineChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis domain={[0, 100]} />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="score"
              stroke="#2563eb"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      )}

    </div>
  );
}

export default ATSChart;