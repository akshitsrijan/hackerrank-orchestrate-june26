import type { ClaimStatus } from "../types/claim";

const STATUS_CONFIG: Record<ClaimStatus, { label: string; color: string; bg: string }> = {
  supported: { label: "Supported", color: "var(--color-status-supported)", bg: "#ecfdf5" },
  contradicted: { label: "Contradicted", color: "var(--color-status-contradicted)", bg: "#fef2f2" },
  not_enough_information: { label: "Not enough information", color: "var(--color-status-not-enough)", bg: "#fffbeb" },
};

export function StatusBadge({ status }: { status: ClaimStatus }) {
  const config = STATUS_CONFIG[status] ?? {
    label: status, color: "var(--color-status-unknown)", bg: "#f1f5f9",
  };
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold"
      style={{ color: config.color, background: config.bg }}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full" style={{ background: config.color }} />
      {config.label}
    </span>
  );
}
