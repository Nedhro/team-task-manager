import { AuthProvider } from "../context/AuthContext";
import "./globals.css";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[var(--surface-muted)]">
        <AuthProvider>
          <Navbar />
          <main className="mx-auto max-w-5xl p-8">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
