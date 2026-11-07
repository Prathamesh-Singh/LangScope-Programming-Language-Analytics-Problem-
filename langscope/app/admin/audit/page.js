"use client";

import Link from "next/link";
import { useApp } from "@/components/AppProvider";
import RequireRole from "@/components/RequireRole";

export default function AuditPage() {
  const { auditLog } = useApp();

  return (
    <RequireRole roles={["admin"]}>
      <p className="small"><Link href="/admin">← Back to panel</Link></p>
      <h1>Audit Log</h1>
      <p className="subtitle">Every change made by admins and editors. (Later this will be filled by MySQL triggers.)</p>

      {auditLog.length === 0 ? (
        <p className="muted">No changes yet. Add, edit or delete something in Manage Data.</p>
      ) : (
        <div className="table-wrap card" style={{ padding: 0 }}>
          <table>
            <thead>
              <tr><th>Time</th><th>User</th><th>Action</th><th>Table</th><th>Details</th></tr>
            </thead>
            <tbody>
              {auditLog.map((e) => (
                <tr key={e.id}>
                  <td>{e.time}</td>
                  <td>{e.user}</td>
                  <td><span className="badge">{e.action}</span></td>
                  <td>{e.table}</td>
                  <td>{e.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </RequireRole>
  );
}
