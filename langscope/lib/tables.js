// Column settings for each table on the admin "Manage Data" page.
// type: "text" | "number" | "select"
// For "select", `from` names the table whose rows fill the dropdown.

export const tableConfig = {
  languages: {
    label: "Languages",
    columns: [
      { key: "name", label: "Name", type: "text", required: true },
      { key: "year", label: "Release year", type: "number", required: true },
      { key: "paradigm", label: "Paradigm", type: "text", required: true },
      { key: "typing", label: "Typing", type: "select", options: ["Static", "Dynamic", "Gradual"], required: true },
      { key: "creator", label: "Creator", type: "text" },
      { key: "influencedBy", label: "Influenced by", type: "select", from: "languages" },
      { key: "description", label: "Description", type: "text" },
    ],
  },
  domains: {
    label: "Domains",
    columns: [
      { key: "name", label: "Name", type: "text", required: true },
      { key: "description", label: "Description", type: "text" },
    ],
  },
  frameworks: {
    label: "Frameworks",
    columns: [
      { key: "name", label: "Name", type: "text", required: true },
      { key: "languageId", label: "Language", type: "select", from: "languages", required: true },
      { key: "domainId", label: "Domain", type: "select", from: "domains" },
      { key: "year", label: "Release year", type: "number" },
      { key: "stars", label: "GitHub stars (k)", type: "number" },
    ],
  },
  companies: {
    label: "Companies",
    columns: [
      { key: "name", label: "Name", type: "text", required: true },
      { key: "industry", label: "Industry", type: "text", required: true },
      { key: "headquarters", label: "Headquarters", type: "text" },
      { key: "founded", label: "Founded", type: "number" },
    ],
  },
  developers: {
    label: "Developers",
    columns: [
      { key: "name", label: "Name", type: "text", required: true },
      { key: "country", label: "Country", type: "text" },
      { key: "experience", label: "Experience (yrs)", type: "number", required: true },
      { key: "languageId", label: "Primary language", type: "select", from: "languages" },
      { key: "domainId", label: "Preferred domain", type: "select", from: "domains" },
      { key: "satisfaction", label: "Satisfaction (1-10)", type: "number" },
    ],
  },
  usageStats: {
    label: "Usage Statistics",
    columns: [
      { key: "languageId", label: "Language", type: "select", from: "languages", required: true },
      { key: "year", label: "Year", type: "number", required: true },
      { key: "score", label: "Popularity score", type: "number", required: true },
      { key: "rank", label: "Rank", type: "number", required: true },
    ],
  },
};
