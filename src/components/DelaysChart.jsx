import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function DelaysChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="label" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#7c3aed" name="Vulnérabilités" />
      </BarChart>
    </ResponsiveContainer>
  );
}