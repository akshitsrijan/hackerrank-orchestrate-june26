const METRICS = [
  { label: "Issue type accuracy", value: "—" },
  { label: "Object part accuracy", value: "—" },
  { label: "Exact-match precision", value: "—" },
  { label: "Quality estimate accuracy", value: "—" },
  { label: "Quality precision", value: "—" },
];

export function Evaluation() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-lg font-semibold">Evaluation</h1>
      <div className="rounded-md border border-[var(--color-border)] bg-slate-50 p-3 text-sm text-[var(--color-text-muted)]">
        Based on a 20-row labeled sample — treat as illustrative, not a production SLA.
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {METRICS.map((m) => (
          <div key={m.label} className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-text-muted)]">{m.label}</p>
            <p className="mt-1 text-2xl font-semibold text-[var(--color-text)]">{m.value}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-[var(--color-text-muted)]">
        Wired up in Phase 4 once /api/evaluation/metrics returns results from evaluation/main.py.
      </p>
    </div>
  );
}
