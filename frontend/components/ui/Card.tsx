import React from "react";

type Props = React.PropsWithChildren<{
  title?: string;
  className?: string;
}>;

export default function Card({ title, className = "", children }: Props) {
  return (
    <div className={`rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-sm ${className}`}>
      {title && (
        <div className="border-b border-[var(--border)] px-4 py-3">
          <h2 className="text-base font-semibold text-[var(--foreground)]">{title}</h2>
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
}