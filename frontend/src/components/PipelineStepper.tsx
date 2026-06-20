export type PipelineStep = "idle" | "level1" | "level2" | "done";

const STEPS: { key: PipelineStep; label: string }[] = [
  { key: "level1", label: "Running image quality checks" },
  { key: "level2", label: "Reviewing evidence with vision model" },
  { key: "done", label: "Complete" },
];

export function PipelineStepper({ current }: { current: PipelineStep }) {
  const currentIndex = STEPS.findIndex((s) => s.key === current);
  return (
    <ol className="flex flex-col gap-3">
      {STEPS.map((step, idx) => {
        const state = idx < currentIndex ? "done" : idx === currentIndex ? "active" : "pending";
        return (
          <li key={step.key} className="flex items-center gap-3 text-sm">
            <span
              className="flex size-5 shrink-0 items-center justify-center rounded-full text-xs"
              style={{
                background: state === "pending" ? "#f1f5f9" : "var(--color-accent)",
                color: state === "pending" ? "var(--color-text-muted)" : "#fff",
              }}
            >
              {state === "done" ? "✓" : idx + 1}
            </span>
            <span
              className={state === "pending" ? "text-[var(--color-text-muted)]" : "text-[var(--color-text)]"}
            >
              {step.label}
              {state === "active" && "…"}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
