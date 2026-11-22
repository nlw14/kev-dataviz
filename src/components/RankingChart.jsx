import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function RankingChart({
  data,
  labelKey = "label",
  valueKey = "count",
  color = "#4f46e5",
  seriesName = "Nombre",
  labelWidth = 200,
}) {
  return (
    <ResponsiveContainer width="100%" height={Math.max(200, data.length * 32)}>
      <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
        <XAxis type="number" />
        <YAxis type="category" dataKey={labelKey} width={labelWidth} />
        <Tooltip />
        <Bar dataKey={valueKey} fill={color} name={seriesName} />
      </BarChart>
    </ResponsiveContainer>
  );
}