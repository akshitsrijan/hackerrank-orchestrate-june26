import { useEffect, useState } from "react";
import { getEvidenceRequirements } from "../api/client";
import type { EvidenceRequirement } from "../types/claim";

export function Reference() {
  const [requirements, setRequirements] = useState<EvidenceRequirement[]>([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    getEvidenceRequirements().then(setRequirements);
  }, []);

  const filtered = requirements.filter((r) => filter === "all" || r.claim_object === "all" || r.claim_object === filter);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-lg font-semibold">Evidence requirements</h1>
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-fit rounded-md border border-[var(--color-border)] px-3 py-2 text-sm"
      >
        <option value="all">All objects</option>
        <option value="car">Car</option>
        <option value="laptop">Laptop</option>
        <option value="package">Package</option>
      </select>
      <div className="overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-wide text-[var(--color-text-muted)]">
              <th className="px-4 py-2">Requirement ID</th>
              <th className="px-4 py-2">Object</th>
              <th className="px-4 py-2">Applies to</th>
              <th className="px-4 py-2">Minimum evidence</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((req) => (
              <tr key={req.requirement_id} className="border-t border-[var(--color-border)]">
                <td className="px-4 py-2 font-mono text-xs">{req.requirement_id}</td>
                <td className="px-4 py-2 capitalize">{req.claim_object}</td>
                <td className="px-4 py-2">{req.applies_to}</td>
                <td className="px-4 py-2 text-[var(--color-text-muted)]">{req.minimum_image_evidence}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
