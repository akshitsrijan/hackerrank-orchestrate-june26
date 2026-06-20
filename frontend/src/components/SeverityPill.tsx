import type { Severity } from "../types/claim";

const SEVERITY_COLOR: Record<Severity, string> = {
  none: "var(--color-severity-low)",
  low: "var(--color-severity-low)",
  medium: "var(--color-severity-medium)",
  high: "var(--color-severity-high)",
  unknown: "var(--color-text-muted)",
};

export function SeverityPill({ severity }: { severity: Severity }) {
  const color = SEVERITY_COLOR[severity] ?? "var(--color-text-muted)";
  return (
    <span
      className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium capitalize"
      style={{ color, borderColor: color }}
    >
      {severity}
    </span>
  );
}
