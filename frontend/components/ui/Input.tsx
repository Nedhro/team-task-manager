import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export default function Input({ label, error, className = "", ...props }: Props) {
  return (
    <div className="space-y-1">
      {label && <label className="block text-sm font-medium text-[var(--foreground)]/80">{label}</label>}
      <input
        className={`w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm shadow-sm focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)] ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-[var(--brand-danger)]">{error}</p>}
    </div>
  );
}