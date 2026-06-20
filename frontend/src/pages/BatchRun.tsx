export function BatchRun() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-lg font-semibold">Batch run</h1>
      <div className="rounded-md border border-[var(--color-status-not-enough)] bg-amber-50 p-3 text-sm text-[var(--color-text)]">
        Requires Ollama with qwen2.5vl:3b and trained models on sample_claims.csv. Not wired up in this Phase 1 demo.
      </div>
      <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
        <label className="mb-1 block text-sm font-medium">Claims file</label>
        <input
          disabled
          value="dataset/claims.csv"
          className="w-full rounded-md border border-[var(--color-border)] bg-slate-50 px-3 py-2 text-sm text-[var(--color-text-muted)]"
        />
        <button
          disabled
          className="mt-4 rounded-md bg-slate-300 px-4 py-2 text-sm font-medium text-white"
        >
          Run pipeline
        </button>
        <p className="mt-2 text-xs text-[var(--color-text-muted)]">
          Wired up in Phase 3 once the FastAPI wrapper exposes /api/pipeline/run.
        </p>
      </div>
    </div>
  );
}
