"use client";

// One reusable table with Add / Edit / Delete for any data table.
// Buttons only appear if the logged-in user has that permission.

import { useState } from "react";
import { useApp } from "./AppProvider";
import { tableConfig } from "@/lib/tables";
import { can } from "@/lib/permissions";

export default function CrudTable({ table }) {
  const app = useApp();
  const { currentUser, addRow, updateRow, deleteRow } = app;
  const config = tableConfig[table];
  const rows = app[table];

  const [editing, setEditing] = useState(null); // null, "new", or the row id
  const [form, setForm] = useState({});
  const [error, setError] = useState("");

  const canCreate = can(currentUser, "create", table);
  const canUpdate = can(currentUser, "update", table);
  const canDelete = can(currentUser, "delete", table);

  // Text shown in a table cell
  function display(col, value) {
    if (value === null || value === undefined || value === "") return "—";
    if (col.from) return app[col.from].find((r) => r.id === Number(value))?.name || "—";
    return String(value);
  }

  function startAdd() {
    setForm({});
    setEditing("new");
    setError("");
  }

  function startEdit(row) {
    setForm(row);
    setEditing(row.id);
    setError("");
  }

  function save(e) {
    e.preventDefault();
    const missing = config.columns.find((c) => c.required && (form[c.key] === undefined || form[c.key] === ""));
    if (missing) {
      setError(`${missing.label} is required.`);
      return;
    }

    // Turn form strings into the right types
    const row = {};
    config.columns.forEach((c) => {
      const v = form[c.key];
      if (v === undefined || v === "" || v === null) row[c.key] = null;
      else if (c.type === "number" || c.from) row[c.key] = Number(v);
      else row[c.key] = v;
    });

    if (editing === "new") addRow(table, row);
    else updateRow(table, editing, row);
    setEditing(null);
  }

  function remove(row) {
    if (confirm(`Delete this ${config.label.toLowerCase()} record?`)) deleteRow(table, row.id);
  }

  return (
    <div>
      <div className="filters" style={{ justifyContent: "space-between" }}>
        <span className="muted">{rows.length} records</span>
        {canCreate && editing === null && <button className="btn" onClick={startAdd}>+ Add new</button>}
      </div>

      {editing !== null && (
        <form className="card" onSubmit={save} style={{ marginBottom: 16 }}>
          <h3>{editing === "new" ? "Add new" : `Edit #${editing}`}</h3>
          <div className="form-grid">
            {config.columns.map((c) => (
              <label key={c.key}>
                {c.label}{c.required && " *"}
                {c.type === "select" ? (
                  <select value={form[c.key] ?? ""} onChange={(e) => setForm({ ...form, [c.key]: e.target.value })}>
                    <option value="">—</option>
                    {c.from
                      ? app[c.from].map((r) => <option key={r.id} value={r.id}>{r.name}</option>)
                      : c.options.map((o) => <option key={o}>{o}</option>)}
                  </select>
                ) : (
                  <input
                    type={c.type}
                    value={form[c.key] ?? ""}
                    onChange={(e) => setForm({ ...form, [c.key]: e.target.value })}
                  />
                )}
              </label>
            ))}
          </div>
          {error && <div className="error">{error}</div>}
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <button className="btn" type="submit">Save</button>
            <button className="btn secondary" type="button" onClick={() => setEditing(null)}>Cancel</button>
          </div>
        </form>
      )}

      <div className="table-wrap card" style={{ padding: 0 }}>
        <table>
          <thead>
            <tr>
              <th className="num">ID</th>
              {config.columns.map((c) => <th key={c.key}>{c.label}</th>)}
              {(canUpdate || canDelete) && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td className="num">{row.id}</td>
                {config.columns.map((c) => <td key={c.key}>{display(c, row[c.key])}</td>)}
                {(canUpdate || canDelete) && (
                  <td style={{ display: "flex", gap: 6 }}>
                    {canUpdate && <button className="btn secondary small" onClick={() => startEdit(row)}>Edit</button>}
                    {canDelete && <button className="btn danger small" onClick={() => remove(row)}>Delete</button>}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
