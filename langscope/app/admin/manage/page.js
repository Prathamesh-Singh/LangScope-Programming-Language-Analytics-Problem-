"use client";

import Link from "next/link";
import { useState } from "react";
import { useApp } from "@/components/AppProvider";
import RequireRole from "@/components/RequireRole";
import CrudTable from "@/components/CrudTable";
import { resources } from "@/lib/data";
import { tableConfig } from "@/lib/tables";
import { editableResources } from "@/lib/permissions";

export default function ManageDataPage() {
  const { currentUser } = useApp();
  const allowed = editableResources(currentUser, resources);
  const [table, setTable] = useState(null);
  const active = allowed.includes(table) ? table : allowed[0];

  return (
    <RequireRole roles={["admin", "editor"]}>
      <p className="small"><Link href="/admin">← Back to panel</Link></p>
      <h1>Manage Data</h1>
      <p className="subtitle">
        {currentUser?.role === "editor"
          ? "You only see the tables and actions the admin has granted you."
          : "Full access to every table."}
      </p>

      {allowed.length === 0 ? (
        <p className="muted">No tables available. Ask the admin to grant you permissions.</p>
      ) : (
        <>
          <div className="filters">
            {allowed.map((r) => (
              <button key={r} className={r === active ? "btn" : "btn secondary"} onClick={() => setTable(r)}>
                {tableConfig[r].label}
              </button>
            ))}
          </div>
          <CrudTable key={active} table={active} />
        </>
      )}
    </RequireRole>
  );
}
