import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDashboardStats, getRecentClaims } from "../api/client";
import type { ClaimSummary } from "../types/claim";
import { StatusBadge } from "../components/StatusBadge";
import { SeverityPill } from "../components/SeverityPill";
import { EmptyState } from "../components/EmptyState";

const STAT_CARDS = [
  { key: "pending", label: "Pending" },
  { key: "supported", label: "Supported" },
  { key: "manual_review", label: "Manual review" },
  { key: "rejected", label: "Rejected" },
] as const;

export function Dashboard() {
  const [stats, setStats] = useState<Record<string, number> | null>(null);
  const [claims, setClaims] = useState<ClaimSummary[] | null>(null);

  useEffect(() => {
    getDashboardStats().then(setStats);
    getRecentClaims().then(setClaims);
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {STAT_CARDS.map((card) => (
          <div key={card.key} className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-text-muted)]">{card.label}</p>
            <p className="mt-1 text-2xl font-semibold text-[var(--color-text)]">
              {stats ? stats[card.key] : "–"}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
        <section className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]">
          <h2 className="border-b border-[var(--color-border)] px-4 py-3 text-sm font-semibold">Recent claims</h2>
          {!claims ? (
            <p className="px-4 py-6 text-sm text-[var(--color-text-muted)]">Loading…</p>
          ) : claims.length === 0 ? (
            <div className="p-4">
              <EmptyState title="No claims yet" description="Submitted claims will appear here." />
            </div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-wide text-[var(--color-text-muted)]">
                  <th className="px-4 py-2">User ID</th>
                  <th className="px-4 py-2">Object</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Severity</th>
                  <th className="px-4 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {claims.map((claim) => (
                  <tr key={claim.user_id} className="border-t border-[var(--color-border)]">
                    <td className="px-4 py-2">
                      <Link to={`/claims/${claim.user_id}`} className="font-medium text-[var(--color-accent)] hover:underline">
                        {claim.user_id}
                      </Link>
                    </td>
                    <td className="px-4 py-2 capitalize">{claim.claim_object}</td>
                    <td className="px-4 py-2"><StatusBadge status={claim.claim_status} /></td>
                    <td className="px-4 py-2"><SeverityPill severity={claim.severity} /></td>
                    <td className="px-4 py-2 text-[var(--color-text-muted)]">{claim.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        <section className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <h2 className="text-sm font-semibold">Pipeline status</h2>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">Last run: not yet run in this session.</p>
          <Link
            to="/batch"
            className="mt-4 inline-flex rounded-md bg-[var(--color-accent)] px-3 py-1.5 text-sm font-medium text-white hover:bg-[var(--color-accent-hover)]"
          >
            Run batch
          </Link>
        </section>
      </div>
    </div>
  );
}
