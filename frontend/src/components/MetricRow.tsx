interface MetricRowProps {
  label: string;
  pass: boolean;
  value: string;
  hint?: string;
}

export function MetricRow({ label, pass, value, hint }: MetricRowProps) {
  return (
    <div className="flex items-center justify-between border-b border-[var(--color-border)] py-2 last:border-b-0">
      <div>
        <p className="text-sm text-[var(--color-text)]">{label}</p>
        {hint && <p className="text-xs text-[var(--color-text-muted)]">{hint}</p>}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-[var(--color-text-muted)]">{value}</span>
        <span
          className="flex size-5 items-center justify-center rounded-full text-xs font-bold"
          style={{
            color: pass ? "var(--color-status-supported)" : "var(--color-status-contradicted)",
            background: pass ? "#ecfdf5" : "#fef2f2",
          }}
          aria-label={pass ? "Pass" : "Fail"}
        >
          {pass ? "✓" : "✕"}
        </span>
      </div>
    </div>
  );
}
