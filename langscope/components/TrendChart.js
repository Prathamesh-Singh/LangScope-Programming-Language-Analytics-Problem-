"use client";

// Line chart of popularity score over the years for the given languages.

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { languageColors, primaryColor, gridColor, axisColor } from "@/lib/colors";

export default function TrendChart({ languageIds, usageStats, languageName, height = 320, showLegend = true }) {
  const years = [...new Set(usageStats.map((s) => s.year))].sort();

  // One row per year: { year: 2016, Python: 11, Java: 21, ... }
  const rows = years.map((year) => {
    const row = { year };
    languageIds.forEach((id) => {
      const stat = usageStats.find((s) => s.year === year && s.languageId === id);
      if (stat) row[languageName(id)] = stat.score;
    });
    return row;
  });

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={rows} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
        <CartesianGrid stroke={gridColor} vertical={false} />
        <XAxis dataKey="year" stroke={axisColor} tickLine={false} />
        <YAxis stroke={axisColor} tickLine={false} axisLine={false} width={40} />
        <Tooltip />
        {showLegend && languageIds.length > 1 && <Legend />}
        {languageIds.map((id) => (
          <Line
            key={id}
            type="monotone"
            dataKey={languageName(id)}
            stroke={languageColors[id] || primaryColor}
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
            isAnimationActive={false}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
