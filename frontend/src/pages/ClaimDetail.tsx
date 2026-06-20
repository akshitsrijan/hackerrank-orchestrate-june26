import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getClaim } from "../api/client";
import type { ClaimAnalysis } from "../types/claim";
import { StatusBadge } from "../components/StatusBadge";
import { SeverityPill } from "../components/SeverityPill";
import { RiskFlagList } from "../components/RiskFlagList";
import { MetricRow } from "../components/MetricRow";
import { ImageGallery } from "../components/ImageGallery";
import { ConversationBlock } from "../components/ConversationBlock";
import { EmptyState } from "../components/EmptyState";

export function ClaimDetail() {
  const { userId = "" } = useParams();
  const location = useLocation();
  const stateResult = (location.state as { result?: ClaimAnalysis } | null)?.result;
  const [claim, setClaim] = useState<ClaimAnalysis | null>(stateResult ?? null);
  const [loading, setLoading] = useState(!stateResult);

  useEffect(() => {
    if (stateResult) return;
    setLoading(true);
    getClaim(userId).then((result) => {
      setClaim(result);
      setLoading(false);
    });
  }, [userId, stateResult]);

  if (loading) return <p className="text-sm text-[var(--color-text-muted)]">Loading claim…</p>;
  if (!claim) {
    return (
      <EmptyState
        title="Claim not found"
        description={`No analysis on file for ${userId} in this demo session.`}
      />
    );
  }

  const usableImages = claim.level1.per_image.filter((img) => img.usable);
  const allUsableLoaded = claim.level1.per_image.length > 0 && usableImages.length === 0;

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-border)] pb-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-[var(--color-text-muted)]">{claim.user_id}</p>
          <h1 className="text-lg font-semibold capitalize text-[var(--color-text)]">{claim.claim_object} claim</h1>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={claim.claim_status} />
          <SeverityPill severity={claim.severity} />
          <span
            className="text-xs text-[var(--color-text-muted)]"
            title={claim.evidence_standard_met_reason}
          >
            Evidence standard met: <strong className="text-[var(--color-text)]">{claim.evidence_standard_met ? "Yes" : "No"}</strong>
          </span>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[3fr_2fr]">
        <div className="flex flex-col gap-6">
          <section>
            <h2 className="mb-2 text-sm font-semibold">Evidence</h2>
            <ImageGallery images={claim.level1.per_image} />
            {claim.level1.duplicates.length > 0 && (
              <p className="mt-2 text-xs text-[var(--color-status-not-enough)]">
                {claim.level1.duplicates.length} near-duplicate image pair(s) detected.
              </p>
            )}
          </section>

          <section className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <h2 className="mb-2 text-sm font-semibold">Image quality (Level 1)</h2>
            {claim.level1.per_image.length === 0 ? (
              <p className="text-sm text-[var(--color-text-muted)]">No images to evaluate.</p>
            ) : (
              claim.level1.per_image.map((img) => (
                <div key={img.image_id} className="mb-3 last:mb-0">
                  <p className="mb-1 text-xs font-semibold text-[var(--color-text-muted)]">{img.image_id}</p>
                  {!img.loaded ? (
                    <p className="text-sm text-[var(--color-status-contradicted)]">Failed to load image.</p>
                  ) : (
                    <>
                      <MetricRow label="Sharpness" pass={!img.blurry} value={`${img.laplacian_var?.toFixed(1)} (min 5.0)`} />
                      <MetricRow label="Exposure" pass={!img.bad_exposure} value={`${img.mean_brightness?.toFixed(1)} (45–200)`} />
                      <MetricRow label="Resolution" pass={!img.too_small} value={`${img.width}×${img.height} (min 120)`} />
                      <MetricRow label="Blank frame" pass={!img.blank} value={`std ${img.std_dev?.toFixed(1)} (min 10)`} />
                      <MetricRow label="Overall" pass={!!img.usable} value={img.usable ? "Usable" : "Rejected"} />
                    </>
                  )}
                </div>
              ))
            )}
          </section>

          <section className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <h2 className="mb-2 text-sm font-semibold">Vision review (Level 2)</h2>
            {allUsableLoaded ? (
              <p className="text-sm text-[var(--color-text-muted)]">No images passed quality checks — vision review was skipped.</p>
            ) : !claim.level2 || claim.level2.results.length === 0 ? (
              <div className="rounded-md border border-dashed border-[var(--color-border)] p-3 text-sm text-[var(--color-text-muted)]">
                Vision model offline or not run for this claim.
              </div>
            ) : (
              claim.level2.results.map((res) => (
                <div key={res.image_id} className="flex flex-col gap-2 text-sm">
                  <p className="text-xs font-semibold text-[var(--color-text-muted)]">{res.image_id} · {claim.level2!.vlm_model}</p>
                  <div className="grid grid-cols-2 gap-2">
                    <span>Damage visible: <strong className="capitalize">{res.damage_visible}</strong></span>
                    <span>Object identifiable: <strong className="capitalize">{res.object_identifiable}</strong></span>
                    <span>Issue type: <strong className="capitalize">{res.predicted_issue_type}</strong></span>
                    <span>Object part: <strong className="capitalize">{res.predicted_object_part}</strong></span>
                  </div>
                  <p className="text-[var(--color-text-muted)]">Quality notes: {res.quality_notes}</p>
                </div>
              ))
            )}
          </section>
        </div>

        <div className="flex flex-col gap-6">
          <section className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <h2 className="mb-2 text-sm font-semibold">Claim conversation</h2>
            <ConversationBlock transcript={claim.user_claim} />
          </section>

          <section className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <h2 className="mb-2 text-sm font-semibold">Justification</h2>
            <blockquote className="border-l-2 border-[var(--color-accent)] pl-3 text-sm text-[var(--color-text)]">
              {claim.claim_status_justification}
            </blockquote>
          </section>

          <section className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <h2 className="mb-2 text-sm font-semibold">Supporting images</h2>
            {claim.supporting_image_ids.length === 0 ? (
              <p className="text-sm text-[var(--color-text-muted)]">None</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {claim.supporting_image_ids.map((id) => (
                  <span key={id} className="rounded-md border border-[var(--color-border)] px-2 py-1 text-xs">{id}</span>
                ))}
              </div>
            )}
          </section>

          <section className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <h2 className="mb-2 text-sm font-semibold">Risk flags</h2>
            <RiskFlagList flags={claim.risk_flags} />
            {claim.user_history && (
              <p className="mt-3 border-t border-[var(--color-border)] pt-3 text-xs text-[var(--color-text-muted)]">
                {claim.user_history.history_summary} ({claim.user_history.past_claim_count} past claims)
              </p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
