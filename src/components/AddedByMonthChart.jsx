import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function AddedByMonthChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" minTickGap={30} />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="count" stroke="#dc2626" dot={false} name="Ajouts" />
      </LineChart>
    </ResponsiveContainer>
  );
}