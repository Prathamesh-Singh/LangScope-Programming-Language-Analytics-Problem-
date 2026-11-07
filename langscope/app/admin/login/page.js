"use client";

// Admin portal login. Only admin and editor accounts exist;
// the public site needs no login (read only).

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/components/AppProvider";

export default function AdminLoginPage() {
  const { login } = useApp();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (login(username.trim(), password)) {
      router.push("/admin");
    } else {
      setError("Wrong username or password.");
    }
  }

  return (
    <div style={{ maxWidth: 380, margin: "40px auto" }}>
      <div className="card">
        <h1>Admin Portal</h1>
        <p className="subtitle">Staff login for admins and editors.</p>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && <div className="error">{error}</div>}
          <button className="btn" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
