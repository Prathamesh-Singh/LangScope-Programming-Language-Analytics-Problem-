"use client";

import { useState } from "react";
import { useApp } from "@/components/AppProvider";
import TrendChart from "@/components/TrendChart";

export default function ComparePage() {
  const {
    languages, frameworks, usageStats, languageDomains, companyLanguages, languageName, domainName,
  } = useApp();
  const [selected, setSelected] = useState([7, 8, 9]); // Python, Java, JavaScript

  const latestYear = Math.max(...usageStats.map((s) => s.year));
  const chosen = selected.map((id) => languages.find((l) => l.id === id)).filter(Boolean);

  function change(index, value) {
    const next = [...selected];
    next[index] = Number(value);
    setSelected(next);
  }

  // Each row of the comparison table: a label and how to get the value
  const rows = [
    ["Released", (l) => l.year],
    ["Paradigm", (l) => l.paradigm],
    ["Typing", (l) => l.typing],
    ["Creator", (l) => l.creator],
    ["Influenced by", (l) => (l.influencedBy ? languageName(l.influencedBy) : "—")],
    ["Frameworks", (l) => frameworks.filter((f) => f.languageId === l.id).length],
    ["Companies using it", (l) => companyLanguages.filter((c) => c.languageId === l.id).length],
    ["Best domain", (l) => {
      const best = languageDomains.filter((d) => d.languageId === l.id).sort((a, b) => b.score - a.score)[0];
      return best ? `${domainName(best.domainId)} (${best.score}/10)` : "—";
    }],
    [`Rank in ${latestYear}`, (l) => usageStats.find((s) => s.languageId === l.id && s.year === latestYear)?.rank ?? "—"],
    [`Score in ${latestYear}`, (l) => usageStats.find((s) => s.languageId === l.id && s.year === latestYear)?.score ?? "—"],
  ];

  const tracked = chosen.filter((l) => usageStats.some((s) => s.languageId === l.id)).map((l) => l.id);

  return (
    <>
      <h1>Compare Languages</h1>
      <p className="subtitle">Pick up to three languages to compare side by side.</p>

      <div className="filters">
        {selected.map((id, i) => (
          <select key={i} value={id} onChange={(e) => change(i, e.target.value)}>
            {languages.map((l) => <option key={l.id} value={l.id}>{l.name}</option>)}
          </select>
        ))}
      </div>

      <div className="table-wrap card" style={{ padding: 0 }}>
        <table>
          <thead>
            <tr>
              <th></th>
              {chosen.map((l) => <th key={l.id}>{l.name}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map(([label, getValue]) => (
              <tr key={label}>
                <td className="muted">{label}</td>
                {chosen.map((l) => <td key={l.id}>{getValue(l)}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card section">
        <h2>Popularity score over time</h2>
        {tracked.length > 0 ? (
          <TrendChart languageIds={tracked} usageStats={usageStats} languageName={languageName} />
        ) : (
          <p className="muted">No yearly statistics for these languages yet.</p>
        )}
      </div>
    </>
  );
}
