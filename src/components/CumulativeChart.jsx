import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function CumulativeChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" minTickGap={30} />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="total"
          stroke="#4f46e5"
          fill="#4f46e5"
          fillOpacity={0.2}
          name="Total au catalogue"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}