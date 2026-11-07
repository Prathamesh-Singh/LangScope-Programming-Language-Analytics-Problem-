"use client";

import Link from "next/link";
import { useApp } from "@/components/AppProvider";

const features = [
  { href: "/languages", title: "Explore Languages", text: "Browse and search programming languages by paradigm and typing." },
  { href: "/compare", title: "Compare", text: "Put languages side by side and compare their popularity." },
  { href: "/domains", title: "Domains", text: "Find the best languages for web, AI, mobile, games and more." },
  { href: "/companies", title: "Company Usage", text: "See which companies use which languages, and for what." },
  { href: "/trends", title: "Trends", text: "Year-wise popularity scores and rankings from 2016 to 2025." },
  { href: "/dashboard", title: "Dashboard", text: "Charts and key numbers across the whole dataset." },
];

export default function HomePage() {
  const { languages, frameworks, companies, domains } = useApp();

  const counts = [
    { label: "Languages", value: languages.length },
    { label: "Frameworks", value: frameworks.length },
    { label: "Domains", value: domains.length },
    { label: "Companies", value: companies.length },
  ];

  return (
    <>
      <section className="hero">
        <h1>LangScope</h1>
        <p>
          Explore, compare and understand programming languages: popularity, domains,
          frameworks, developer preferences, company usage and historical trends, all in one place.
        </p>
        <Link href="/languages" className="btn">Start exploring</Link>
      </section>

      <div className="grid grid-4 section">
        {counts.map((c) => (
          <div key={c.label} className="card">
            <div className="stat-value">{c.value}</div>
            <div className="stat-label">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-3 section">
        {features.map((f) => (
          <Link key={f.href} href={f.href} className="card card-link">
            <h3>{f.title}</h3>
            <p className="muted small" style={{ margin: 0 }}>{f.text}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
