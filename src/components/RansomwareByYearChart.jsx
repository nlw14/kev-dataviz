import {
  ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer,
} from "recharts";

export default function RansomwareByYearChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <ComposedChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="year" />
        <YAxis yAxisId="count" />
        <YAxis yAxisId="rate" orientation="right" domain={[0, 100]} unit=" %" />
        <Tooltip />
        <Legend />
        <Bar yAxisId="count" dataKey="total" fill="#94a3b8" name="Ajouts" />
        <Line yAxisId="rate" type="monotone" dataKey="rate" stroke="#dc2626" strokeWidth={2} name="Part ransomware (%)" />
      </ComposedChart>
    </ResponsiveContainer>
  );
}