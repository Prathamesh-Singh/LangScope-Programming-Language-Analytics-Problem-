"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useApp } from "@/components/AppProvider";
import TrendChart from "@/components/TrendChart";

export default function LanguageDetailPage() {
  const { id } = useParams();
  const {
    languages, frameworks, companies, usageStats, languageDomains, companyLanguages,
    languageName, domainName,
  } = useApp();

  const lang = languages.find((l) => l.id === Number(id));
  if (!lang) return <p>Language not found. <Link href="/languages">Back to languages</Link></p>;

  // Walk up the "influenced by" chain: e.g. Kotlin -> Java -> C++ -> C
  // (this becomes a recursive SQL query later)
  const lineage = [];
  let current = lang;
  while (current) {
    lineage.unshift(current);
    current = languages.find((l) => l.id === current.influencedBy);
  }

  const influenced = languages.filter((l) => l.influencedBy === lang.id);
  const langDomains = languageDomains.filter((d) => d.languageId === lang.id).sort((a, b) => b.score - a.score);
  const langFrameworks = frameworks.filter((f) => f.languageId === lang.id);
  const usedBy = companyLanguages.filter((c) => c.languageId === lang.id);
  const hasStats = usageStats.some((s) => s.languageId === lang.id);

  return (
    <>
      <p className="small"><Link href="/languages">← All languages</Link></p>
      <h1>{lang.name}</h1>
      <p className="subtitle">{lang.description}</p>

      <div className="grid grid-4">
        <div className="card"><div className="stat-label">Released</div><div className="stat-value">{lang.year}</div></div>
        <div className="card"><div className="stat-label">Paradigm</div><h3>{lang.paradigm}</h3></div>
        <div className="card"><div className="stat-label">Typing</div><h3>{lang.typing}</h3></div>
        <div className="card"><div className="stat-label">Creator</div><h3>{lang.creator}</h3></div>
      </div>

      <div className="card section">
        <h2>Family tree</h2>
        <div className="lineage">
          {lineage.map((l, i) => (
            <span key={l.id}>
              {i > 0 && <span className="arrow">→ </span>}
              {l.id === lang.id ? <strong>{l.name}</strong> : <Link href={`/languages/${l.id}`}>{l.name}</Link>}
            </span>
          ))}
        </div>
        {influenced.length > 0 && (
          <p className="small" style={{ marginBottom: 0 }}>
            Influenced:{" "}
            {influenced.map((l, i) => (
              <span key={l.id}>{i > 0 && ", "}<Link href={`/languages/${l.id}`}>{l.name}</Link></span>
            ))}
          </p>
        )}
      </div>

      {hasStats && (
        <div className="card section">
          <h2>Popularity score over time</h2>
          <TrendChart languageIds={[lang.id]} usageStats={usageStats} languageName={languageName} height={260} />
        </div>
      )}

      <div className="grid grid-2 section">
        <div className="card">
          <h2>Domains</h2>
          {langDomains.length === 0 && <p className="muted">No domains linked.</p>}
          {langDomains.map((d) => (
            <div key={d.domainId} className="bar-row">
              <span className="small">{domainName(d.domainId)}</span>
              <div className="bar-track"><div className="bar-fill" style={{ width: `${d.score * 10}%` }} /></div>
              <span className="small">{d.score}/10</span>
            </div>
          ))}
        </div>

        <div className="card">
          <h2>Used by companies</h2>
          {usedBy.length === 0 && <p className="muted">No company data.</p>}
          {usedBy.map((c) => (
            <div key={c.companyId} className="small" style={{ margin: "4px 0" }}>
              <strong>{companies.find((x) => x.id === c.companyId)?.name}</strong>
              <span className="muted"> · {c.usageArea}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card section">
        <h2>Frameworks</h2>
        {langFrameworks.length === 0 ? (
          <p className="muted">No frameworks listed.</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Name</th><th>Domain</th><th className="num">Released</th><th className="num">GitHub stars (k)</th></tr>
              </thead>
              <tbody>
                {langFrameworks.map((f) => (
                  <tr key={f.id}>
                    <td>{f.name}</td>
                    <td>{domainName(f.domainId)}</td>
                    <td className="num">{f.year}</td>
                    <td className="num">{f.stars ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
