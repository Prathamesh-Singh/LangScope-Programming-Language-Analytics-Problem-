"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useApp } from "@/components/AppProvider";
import { primaryColor, gridColor, axisColor } from "@/lib/colors";

// Count how many items fall into each group, biggest first
function countBy(items, getKey) {
  const counts = {};
  items.forEach((item) => {
    const key = getKey(item);
    counts[key] = (counts[key] || 0) + 1;
  });
  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

function HorizontalBars({ data, dataKey, height = 280 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} layout="vertical" margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
        <CartesianGrid stroke={gridColor} horizontal={false} />
        <XAxis type="number" stroke={axisColor} tickLine={false} allowDecimals={false} />
        <YAxis type="category" dataKey="name" stroke={axisColor} tickLine={false} width={120} interval={0} />
        <Tooltip cursor={{ fill: "#f0efec" }} />
        <Bar dataKey={dataKey} fill={primaryColor} radius={[0, 4, 4, 0]} barSize={14} isAnimationActive={false} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default function DashboardPage() {
  const { languages, frameworks, companies, developers, usageStats, languageName } = useApp();

  const latestYear = Math.max(...usageStats.map((s) => s.year));
  const latest = usageStats
    .filter((s) => s.year === latestYear)
    .sort((a, b) => a.rank - b.rank)
    .map((s) => ({ name: languageName(s.languageId), score: s.score }));

  const byParadigm = countBy(languages, (l) => l.paradigm);
  const favourites = countBy(developers, (d) => languageName(d.languageId));
  const avgSatisfaction = developers.length
    ? (developers.reduce((sum, d) => sum + Number(d.satisfaction || 0), 0) / developers.length).toFixed(1)
    : "—";

  const stats = [
    { label: "Languages", value: languages.length },
    { label: "Frameworks", value: frameworks.length },
    { label: "Companies", value: companies.length },
    { label: "Developers surveyed", value: developers.length },
    { label: "Avg. satisfaction", value: `${avgSatisfaction}/10` },
    { label: `Top language ${latestYear}`, value: latest[0]?.name || "—" },
  ];

  return (
    <>
      <h1>Analytics Dashboard</h1>
      <p className="subtitle">Key numbers and charts across the whole dataset.</p>

      <div className="grid grid-4">
        {stats.map((s) => (
          <div key={s.label} className="card">
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-2 section">
        <div className="card">
          <h2>Popularity score, {latestYear}</h2>
          <HorizontalBars data={latest} dataKey="score" />
        </div>
        <div className="card">
          <h2>Languages by paradigm</h2>
          <HorizontalBars data={byParadigm} dataKey="count" />
        </div>
        <div className="card">
          <h2>Developers' primary language</h2>
          <HorizontalBars data={favourites} dataKey="count" />
        </div>
      </div>
    </>
  );
}
