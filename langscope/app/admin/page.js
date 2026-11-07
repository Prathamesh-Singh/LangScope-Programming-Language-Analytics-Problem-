"use client";

import Link from "next/link";
import { useApp } from "@/components/AppProvider";
import RequireRole from "@/components/RequireRole";
import { resources } from "@/lib/data";
import { tableConfig } from "@/lib/tables";
import { editableResources } from "@/lib/permissions";

export default function AdminHomePage() {
  const { currentUser, users, auditLog } = useApp();

  return (
    <RequireRole roles={["admin", "editor"]}>
      <h1>{currentUser?.role === "admin" ? "Admin Panel" : "Editor Panel"}</h1>
      <p className="subtitle">Welcome, {currentUser?.username}.</p>

      <div className="grid grid-3">
        <Link href="/admin/manage" className="card card-link">
          <h3>Manage Data</h3>
          <p className="muted small" style={{ margin: 0 }}>Add, edit and delete records in the data tables.</p>
        </Link>
        {currentUser?.role === "admin" && (
          <>
            <Link href="/admin/users" className="card card-link">
              <h3>Staff & Permissions</h3>
              <p className="muted small" style={{ margin: 0 }}>{users.length} staff accounts. Change roles and grant editor permissions.</p>
            </Link>
            <Link href="/admin/audit" className="card card-link">
              <h3>Audit Log</h3>
              <p className="muted small" style={{ margin: 0 }}>{auditLog.length} change{auditLog.length === 1 ? "" : "s"} recorded this session.</p>
            </Link>
          </>
        )}
      </div>

      {currentUser?.role === "editor" && (
        <div className="card section">
          <h2>Your permissions</h2>
          <p className="muted small">Granted by the admin.</p>
          {editableResources(currentUser, resources).length === 0 && <p className="muted">No permissions granted yet.</p>}
          {currentUser.permissions.map((p) => (
            <span key={p.action + p.resource} className="badge editor">
              {p.action} · {tableConfig[p.resource].label}
            </span>
          ))}
        </div>
      )}
    </RequireRole>
  );
}
