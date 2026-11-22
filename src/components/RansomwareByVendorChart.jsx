import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function RansomwareByVendorChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={Math.max(200, data.length * 32)}>
      <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
        <XAxis type="number" />
        <YAxis type="category" dataKey="vendor" width={120} />
        <Tooltip />
        <Legend />
        <Bar dataKey="ransomware" stackId="a" fill="#dc2626" name="Utilisée par des ransomwares" />
        <Bar dataKey="other" stackId="a" fill="#94a3b8" name="Pas d'usage connu" />
      </BarChart>
    </ResponsiveContainer>
  );
}