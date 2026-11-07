"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useApp } from "./AppProvider";

const links = [
  { href: "/", label: "Home" },
  { href: "/languages", label: "Languages" },
  { href: "/compare", label: "Compare" },
  { href: "/domains", label: "Domains" },
  { href: "/companies", label: "Companies" },
  { href: "/trends", label: "Trends" },
  { href: "/dashboard", label: "Dashboard" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, logout } = useApp();

  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  function handleLogout() {
    logout();
    router.push("/");
  }

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link href="/" className="logo">Lang<span>Scope</span></Link>

        <div className="nav-links">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={isActive(l.href) ? "active" : ""}>
              {l.label}
            </Link>
          ))}
          {/* Admin link only appears for logged-in staff; the public never sees it */}
          {currentUser && (
            <Link href="/admin" className={isActive("/admin") ? "active" : ""}>Admin</Link>
          )}
        </div>

        {currentUser && (
          <div className="nav-user">
            <span>{currentUser.username}</span>
            <span className={`badge ${currentUser.role}`}>{currentUser.role}</span>
            <button className="btn secondary small" onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
}
