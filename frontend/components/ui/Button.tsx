import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
};

export default function Button({ variant = "primary", className = "", ...props }: Props) {
  const base = "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const styles = {
    primary: "bg-[var(--brand-primary)] text-[var(--brand-primary-foreground)] hover:brightness-95 focus:ring-[var(--brand-primary)]",
    secondary: "bg-[var(--brand-secondary)] text-[var(--brand-secondary-foreground)] hover:brightness-95 focus:ring-[var(--brand-secondary)]",
    danger: "bg-[var(--brand-danger)] text-[var(--brand-danger-foreground)] hover:brightness-95 focus:ring-[var(--brand-danger)]",
  }[variant];
  return <button className={`${base} ${styles} ${className}`} {...props} />;
}