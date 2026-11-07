"use client";

import Link from "next/link";
import { useState } from "react";
import { useApp } from "@/components/AppProvider";

export default function LanguagesPage() {
  const { languages, usageStats } = useApp();
  const [search, setSearch] = useState("");
  const [paradigm, setParadigm] = useState("");
  const [typing, setTyping] = useState("");

  const paradigms = [...new Set(languages.map((l) => l.paradigm))].sort();
  const latestYear = Math.max(...usageStats.map((s) => s.year));

  const filtered = languages
    .filter((l) => l.name.toLowerCase().includes(search.toLowerCase()))
    .filter((l) => !paradigm || l.paradigm === paradigm)
    .filter((l) => !typing || l.typing === typing)
    .sort((a, b) => a.name.localeCompare(b.name));

  function latestRank(id) {
    return usageStats.find((s) => s.languageId === id && s.year === latestYear)?.rank;
  }

  return (
    <>
      <h1>Explore Languages</h1>
      <p className="subtitle">{filtered.length} of {languages.length} languages</p>

      <div className="filters">
        <input placeholder="Search by name..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <select value={paradigm} onChange={(e) => setParadigm(e.target.value)}>
          <option value="">All paradigms</option>
          {paradigms.map((p) => <option key={p}>{p}</option>)}
        </select>
        <select value={typing} onChange={(e) => setTyping(e.target.value)}>
          <option value="">All typing</option>
          <option>Static</option>
          <option>Dynamic</option>
          <option>Gradual</option>
        </select>
      </div>

      <div className="grid grid-3">
        {filtered.map((l) => (
          <Link key={l.id} href={`/languages/${l.id}`} className="card card-link">
            <h3>{l.name}</h3>
            <div className="muted small">Released {l.year} · {l.creator}</div>
            <div style={{ marginTop: 8 }}>
              <span className="badge">{l.paradigm}</span>
              <span className="badge">{l.typing}</span>
              {latestRank(l.id) && <span className="badge user">#{latestRank(l.id)} in {latestYear}</span>}
            </div>
          </Link>
        ))}
      </div>
      {filtered.length === 0 && <p className="muted">No languages match your filters.</p>}
    </>
  );
}
