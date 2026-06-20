import type { RiskFlag } from "../types/claim";

const FLAG_LABELS: Record<RiskFlag, string> = {
  high_rejection_history: "High rejection history",
  frequent_manual_review_history: "Frequent manual review",
  elevated_recent_claim_frequency: "Elevated recent claim frequency",
  duplicate_images_submitted: "Duplicate images submitted",
  none: "No risk flags",
};

export function RiskFlagList({ flags }: { flags: RiskFlag[] }) {
  const items = flags.length > 0 ? flags : (["none"] as RiskFlag[]);
  return (
    <ul className="flex flex-col gap-1.5">
      {items.map((flag) => (
        <li key={flag} className="flex items-center gap-2 text-sm text-[var(--color-text)]">
          <span
            aria-hidden="true"
            className="size-1.5 shrink-0 rounded-full"
            style={{ background: flag === "none" ? "var(--color-text-muted)" : "var(--color-status-not-enough)" }}
          />
          {FLAG_LABELS[flag] ?? flag}
        </li>
      ))}
    </ul>
  );
}
