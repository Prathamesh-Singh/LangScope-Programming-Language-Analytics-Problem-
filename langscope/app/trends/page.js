"use client";

import { useState } from "react";
import { useApp } from "@/components/AppProvider";
import TrendChart from "@/components/TrendChart";
import { languageColors } from "@/lib/colors";

export default function TrendsPage() {
  const { usageStats, languageName } = useApp();

  const years = [...new Set(usageStats.map((s) => s.year))].sort();
  // Tracked languages, listed in the same order as their chart colors
  const statIds = new Set(usageStats.map((s) => s.languageId));
  const trackedIds = [
    ...Object.keys(languageColors).map(Number).filter((id) => statIds.has(id)),
    ...[...statIds].filter((id) => !languageColors[id]),
  ];
  const [year, setYear] = useState(years[years.length - 1]);
  const [shown, setShown] = useState(trackedIds);

  const ranking = usageStats.filter((s) => s.year === year).sort((a, b) => a.rank - b.rank);

  // Rank change compared to the year before (positive = moved up)
  function rankChange(languageId) {
    const prev = usageStats.find((s) => s.languageId === languageId && s.year === year - 1);
    const now = usageStats.find((s) => s.languageId === languageId && s.year === year);
    if (!prev || !now) return null;
    return prev.rank - now.rank;
  }

  function toggle(id) {
    setShown(shown.includes(id) ? shown.filter((x) => x !== id) : [...shown, id]);
  }

  return (
    <>
      <h1>Popularity Trends</h1>
      <p className="subtitle">Popularity score (0–100) of the tracked languages, {years[0]}–{years[years.length - 1]}.</p>

      <div className="card">
        <h2>Score over time</h2>
        <div className="legend">
          {trackedIds.map((id) => (
            <label key={id}>
              <input type="checkbox" checked={shown.includes(id)} onChange={() => toggle(id)} />
              <span className="swatch" style={{ background: languageColors[id] }} />
              {languageName(id)}
            </label>
          ))}
        </div>
        <TrendChart languageIds={trackedIds.filter((id) => shown.includes(id))} usageStats={usageStats} languageName={languageName} showLegend={false} />
      </div>

      <div className="card section">
        <div className="filters" style={{ justifyContent: "space-between" }}>
          <h2 style={{ margin: 0 }}>Ranking for {year}</h2>
          <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
            {years.map((y) => <option key={y}>{y}</option>)}
          </select>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th className="num">Rank</th><th>Language</th><th className="num">Score</th><th className="num">Change vs {year - 1}</th></tr>
            </thead>
            <tbody>
              {ranking.map((s) => {
                const change = rankChange(s.languageId);
                return (
                  <tr key={s.id}>
                    <td className="num">{s.rank}</td>
                    <td>{languageName(s.languageId)}</td>
                    <td className="num">{s.score}</td>
                    <td className="num">
                      {change === null ? "—" : change > 0 ? `▲ ${change}` : change < 0 ? `▼ ${-change}` : "–"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
