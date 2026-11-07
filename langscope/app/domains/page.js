"use client";

import Link from "next/link";
import { useState } from "react";
import { useApp } from "@/components/AppProvider";

export default function DomainsPage() {
  const { domains, frameworks, languageDomains, languageName } = useApp();
  const [domainId, setDomainId] = useState(domains[0]?.id);

  const domain = domains.find((d) => d.id === domainId);
  const ranked = languageDomains.filter((d) => d.domainId === domainId).sort((a, b) => b.score - a.score);
  const domainFrameworks = frameworks.filter((f) => f.domainId === domainId);

  return (
    <>
      <h1>Domain Analysis</h1>
      <p className="subtitle">Choose a domain to see which languages suit it best.</p>

      <div className="grid grid-4">
        {domains.map((d) => (
          <button
            key={d.id}
            className={d.id === domainId ? "btn" : "btn secondary"}
            onClick={() => setDomainId(d.id)}
          >
            {d.name}
          </button>
        ))}
      </div>

      {domain && (
        <div className="grid grid-2 section">
          <div className="card">
            <h2>Best languages for {domain.name}</h2>
            <p className="muted small">{domain.description}</p>
            {ranked.length === 0 && <p className="muted">No languages linked yet.</p>}
            {ranked.map((d) => (
              <div key={d.languageId} className="bar-row">
                <Link href={`/languages/${d.languageId}`} className="small">{languageName(d.languageId)}</Link>
                <div className="bar-track"><div className="bar-fill" style={{ width: `${d.score * 10}%` }} /></div>
                <span className="small">{d.score}/10</span>
              </div>
            ))}
          </div>

          <div className="card">
            <h2>Frameworks in this domain</h2>
            {domainFrameworks.length === 0 && <p className="muted">No frameworks yet.</p>}
            {domainFrameworks.map((f) => (
              <div key={f.id} className="small" style={{ margin: "6px 0" }}>
                <strong>{f.name}</strong> <span className="muted">· {languageName(f.languageId)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
