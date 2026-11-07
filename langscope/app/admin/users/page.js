"use client";

import Link from "next/link";
import { useState } from "react";
import { useApp } from "@/components/AppProvider";
import RequireRole from "@/components/RequireRole";
import { roles, resources, actions } from "@/lib/data";
import { tableConfig } from "@/lib/tables";

export default function UsersPage() {
  const { users, currentUser, addUser, setUserRole, togglePermission } = useApp();
  const [form, setForm] = useState({ username: "", password: "", role: "editor" });
  const [error, setError] = useState("");

  function handleAdd(e) {
    e.preventDefault();
    if (!form.username.trim() || !form.password) return setError("Username and password are required.");
    if (users.some((u) => u.username === form.username.trim())) return setError("That username is taken.");
    addUser(form.username.trim(), form.password, form.role);
    setForm({ username: "", password: "", role: "editor" });
    setError("");
  }

  const has = (user, action, resource) =>
    user.permissions.some((p) => p.action === action && p.resource === resource);

  return (
    <RequireRole roles={["admin"]}>
      <p className="small"><Link href="/admin">← Back to panel</Link></p>
      <h1>Staff & Permissions</h1>
      <p className="subtitle">Add staff accounts, change roles, and choose exactly what each editor is allowed to do.</p>

      <div className="table-wrap card" style={{ padding: 0 }}>
        <table>
          <thead>
            <tr><th className="num">ID</th><th>Username</th><th>Role</th></tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td className="num">{u.id}</td>
                <td>{u.username}</td>
                <td>
                  {u.id === currentUser?.id ? (
                    <span className={`badge ${u.role}`}>{u.role} (you)</span>
                  ) : (
                    <select value={u.role} onChange={(e) => setUserRole(u.id, e.target.value)}>
                      {roles.map((r) => <option key={r}>{r}</option>)}
                    </select>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="section">Editor permissions</h2>
      {users.filter((u) => u.role === "editor").length === 0 && (
        <p className="muted">No editors yet. Add one below.</p>
      )}
      {users.filter((u) => u.role === "editor").map((u) => (
        <div key={u.id} className="card" style={{ marginBottom: 16 }}>
          <h3>{u.username}</h3>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Table</th>
                  {actions.map((a) => <th key={a} style={{ textTransform: "capitalize" }}>{a}</th>)}
                </tr>
              </thead>
              <tbody>
                {resources.map((r) => (
                  <tr key={r}>
                    <td>{tableConfig[r].label}</td>
                    {actions.map((a) => (
                      <td key={a}>
                        <input type="checkbox" checked={has(u, a, r)} onChange={() => togglePermission(u.id, a, r)} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      <form className="card section" onSubmit={handleAdd}>
        <h2>Add staff account</h2>
        <div className="form-grid">
          <label>Username<input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} /></label>
          <label>Password<input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></label>
          <label>Role
            <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
              {roles.map((r) => <option key={r}>{r}</option>)}
            </select>
          </label>
        </div>
        {error && <div className="error">{error}</div>}
        <button className="btn" type="submit" style={{ marginTop: 12 }}>Add account</button>
      </form>
    </RequireRole>
  );
}
