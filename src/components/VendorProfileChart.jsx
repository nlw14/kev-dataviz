import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

function VendorTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--border)", padding: 8, borderRadius: 6 }}>
      <strong>{d.vendor}</strong>
      <div>{d.total} vulnérabilités</div>
      <div>{d.rate} % liées à des ransomwares</div>
    </div>
  );
}

export default function VendorProfileChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" dataKey="total" scale="log" domain={["auto", "auto"]} name="Vulnérabilités" />
        <YAxis type="number" dataKey="rate" domain={[0, 100]} unit=" %" />
        <Tooltip content={<VendorTooltip />} />
        <Scatter data={data} fill="#dc2626" fillOpacity={0.6} />
      </ScatterChart>
    </ResponsiveContainer>
  );
}