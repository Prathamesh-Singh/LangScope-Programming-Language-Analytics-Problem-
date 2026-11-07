"use client";

import Link from "next/link";
import { useState } from "react";
import { useApp } from "@/components/AppProvider";

export default function CompaniesPage() {
  const { companies, languages, companyLanguages, languageName } = useApp();
  const [industry, setIndustry] = useState("");
  const [languageId, setLanguageId] = useState("");

  const industries = [...new Set(companies.map((c) => c.industry))].sort();
  const usedLanguageIds = [...new Set(companyLanguages.map((c) => c.languageId))];

  const filtered = companies
    .filter((c) => !industry || c.industry === industry)
    .filter((c) => !languageId || companyLanguages.some((x) => x.companyId === c.id && x.languageId === Number(languageId)));

  return (
    <>
      <h1>Company & Industry Usage</h1>
      <p className="subtitle">Which companies use which languages, and for what.</p>

      <div className="filters">
        <select value={industry} onChange={(e) => setIndustry(e.target.value)}>
          <option value="">All industries</option>
          {industries.map((i) => <option key={i}>{i}</option>)}
        </select>
        <select value={languageId} onChange={(e) => setLanguageId(e.target.value)}>
          <option value="">Any language</option>
          {languages.filter((l) => usedLanguageIds.includes(l.id)).map((l) => (
            <option key={l.id} value={l.id}>{l.name}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-3">
        {filtered.map((c) => (
          <div key={c.id} className="card">
            <h3>{c.name}</h3>
            <div className="muted small">{c.industry} · {c.headquarters} · Founded {c.founded}</div>
            <div style={{ marginTop: 10 }}>
              {companyLanguages.filter((x) => x.companyId === c.id).map((x) => (
                <div key={x.languageId} className="small" style={{ margin: "3px 0" }}>
                  <Link href={`/languages/${x.languageId}`}>{languageName(x.languageId)}</Link>
                  <span className="muted"> · {x.usageArea}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {filtered.length === 0 && <p className="muted">No companies match your filters.</p>}
    </>
  );
}
