"use client";

// Shows the page only if the logged-in user has one of the allowed roles.

import Link from "next/link";
import { useApp } from "./AppProvider";

export default function RequireRole({ roles, children }) {
  const { currentUser, ready } = useApp();

  if (!ready) return null;

  if (!currentUser) {
    return <p>Please <Link href="/admin/login">log in to the admin portal</Link> to view this page.</p>;
  }

  if (!roles.includes(currentUser.role)) {
    return (
      <div className="card">
        <h2>Access denied</h2>
        <p className="muted" style={{ margin: 0 }}>
          Your role (<strong>{currentUser.role}</strong>) cannot open this page.
        </p>
      </div>
    );
  }

  return children;
}
