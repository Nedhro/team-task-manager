"use client";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import Button from "./ui/Button";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const { token, logout } = useAuth();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const linkBase = "inline-flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors";
  const isActive = (href: string) => (pathname === href ? "text-[var(--brand-primary)]" : "text-[var(--foreground)]");

  return (
    <header className="sticky top-0 z-50 bg-[var(--surface)] border-b border-[var(--border)]">
      <div className="mx-auto max-w-5xl px-4 md:px-8 h-14 flex items-center justify-between">
        <Link href="/" className="text-base md:text-lg font-semibold text-[var(--foreground)]">Team Task Manager</Link>
        <div className="flex items-center gap-2">
          <button
            aria-label="Toggle menu"
            className="md:hidden inline-flex items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface)] p-2 text-[var(--foreground)]"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            ☰
          </button>
          <nav className="hidden md:flex items-center gap-4">
            {token ? (
              <>
                <Link href="/tasks" className={`${linkBase} ${isActive("/tasks")}`}>Tasks</Link>
                <Button variant="secondary" onClick={logout}>Logout</Button>
              </>
            ) : (
              <>
                <Link href="/login" className={`${linkBase} ${isActive("/login")}`}>Login</Link>
              </>
            )}
          </nav>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-[var(--border)] bg-[var(--surface)]">
          <nav className="mx-auto max-w-5xl px-4 py-2 flex flex-col gap-2">
            {token ? (
              <>
                <Link href="/tasks" className={`${linkBase} ${isActive("/tasks")}`} onClick={() => setOpen(false)}>Tasks</Link>
                <Button variant="secondary" onClick={() => { logout(); setOpen(false); }}>Logout</Button>
              </>
            ) : (
              <>
                <Link href="/login" className={`${linkBase} ${isActive("/login")}`} onClick={() => setOpen(false)}>Login</Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}