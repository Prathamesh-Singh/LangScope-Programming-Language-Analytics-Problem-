"use client";

// Holds all app data and the logged-in user in one place.
// For now the data lives in memory (it resets when the page reloads).
// Later, each function here will call an API route that talks to MySQL.

import { createContext, useContext, useEffect, useState } from "react";
import * as seed from "@/lib/data";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [data, setData] = useState({
    languages: seed.languages,
    domains: seed.domains,
    frameworks: seed.frameworks,
    companies: seed.companies,
    developers: seed.developers,
    usageStats: seed.usageStats,
  });
  const [users, setUsers] = useState(seed.demoUsers);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [auditLog, setAuditLog] = useState([]);
  const [ready, setReady] = useState(false);

  // Remember who is logged in across page reloads
  useEffect(() => {
    try {
      const saved = localStorage.getItem("langscope-user");
      if (saved) setCurrentUserId(Number(saved));
    } catch {}
    setReady(true);
  }, []);

  const currentUser = users.find((u) => u.id === currentUserId) || null;

  function log(action, table, details) {
    setAuditLog((prev) => [
      { id: prev.length + 1, time: new Date().toLocaleString(), user: currentUser?.username, action, table, details },
      ...prev,
    ]);
  }

  // ---------- Auth ----------
  function login(username, password) {
    const user = users.find((u) => u.username === username && u.password === password);
    if (!user) return false;
    setCurrentUserId(user.id);
    try { localStorage.setItem("langscope-user", String(user.id)); } catch {}
    return true;
  }

  function logout() {
    setCurrentUserId(null);
    try { localStorage.removeItem("langscope-user"); } catch {}
  }

  // ---------- CRUD on data tables ----------
  function addRow(table, row) {
    const rows = data[table];
    const id = rows.length ? Math.max(...rows.map((r) => r.id)) + 1 : 1;
    setData({ ...data, [table]: [...rows, { ...row, id }] });
    log("INSERT", table, `Added #${id}`);
  }

  function updateRow(table, id, row) {
    setData({ ...data, [table]: data[table].map((r) => (r.id === id ? { ...row, id } : r)) });
    log("UPDATE", table, `Updated #${id}`);
  }

  function deleteRow(table, id) {
    setData({ ...data, [table]: data[table].filter((r) => r.id !== id) });
    log("DELETE", table, `Deleted #${id}`);
  }

  // ---------- User management (admin only) ----------
  function addUser(username, password, role) {
    const id = Math.max(...users.map((u) => u.id)) + 1;
    setUsers([...users, { id, username, password, role, permissions: [] }]);
    log("INSERT", "users", `Created user ${username} (${role})`);
  }

  function setUserRole(userId, role) {
    // Changing role clears granted permissions
    setUsers(users.map((u) => (u.id === userId ? { ...u, role, permissions: [] } : u)));
    const name = users.find((u) => u.id === userId)?.username;
    log("UPDATE", "users", `Set role of ${name} to ${role}`);
  }

  function togglePermission(userId, action, resource) {
    const user = users.find((u) => u.id === userId);
    const has = user.permissions.some((p) => p.action === action && p.resource === resource);
    const permissions = has
      ? user.permissions.filter((p) => !(p.action === action && p.resource === resource))
      : [...user.permissions, { action, resource }];
    setUsers(users.map((u) => (u.id === userId ? { ...u, permissions } : u)));
    log(has ? "REVOKE" : "GRANT", "user_permissions", `${action} on ${resource} for ${user.username}`);
  }

  // ---------- Small lookup helpers ----------
  const languageName = (id) => data.languages.find((l) => l.id === Number(id))?.name || "—";
  const domainName = (id) => data.domains.find((d) => d.id === Number(id))?.name || "—";

  return (
    <AppContext.Provider
      value={{
        ...data,
        languageDomains: seed.languageDomains,
        companyLanguages: seed.companyLanguages,
        users, currentUser, ready, auditLog,
        login, logout,
        addRow, updateRow, deleteRow,
        addUser, setUserRole, togglePermission,
        languageName, domainName,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
