import type { ClaimAnalysis, ClaimObject } from "../types/claim";
import { MOCK_CLAIMS, MOCK_RECENT_CLAIMS, MOCK_DASHBOARD_STATS, MOCK_EVIDENCE_REQUIREMENTS } from "./mockData";

// Phase 1: mock client. Swap these for real fetch() calls to the FastAPI wrapper
// (POST /api/claims/analyze, GET /api/reference/evidence-requirements, etc.) in Phase 2
// without changing call sites, since the return shapes already mirror the API contract.

const DELAY_MS = 400;

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), DELAY_MS));
}

export function getDashboardStats() {
  return delay(MOCK_DASHBOARD_STATS);
}

export function getRecentClaims() {
  return delay(MOCK_RECENT_CLAIMS);
}

export function getEvidenceRequirements() {
  return delay(MOCK_EVIDENCE_REQUIREMENTS);
}

export interface AnalyzeClaimRequest {
  user_id: string;
  user_claim: string;
  claim_object: ClaimObject;
  files: File[];
}

export async function analyzeClaim(request: AnalyzeClaimRequest): Promise<ClaimAnalysis> {
  const known = MOCK_CLAIMS[request.user_id];
  if (known) {
    return delay(known);
  }
  // unknown user_id in the demo -- synthesize a minimal not-enough-information result
  return delay({
    user_id: request.user_id,
    claim_object: request.claim_object,
    user_claim: request.user_claim,
    image_paths: request.files.map((f) => f.name).join(";"),
    valid_image: request.files.length > 0,
    evidence_standard_met: false,
    evidence_standard_met_reason: "No reference images on file for this demo user.",
    risk_flags: ["none"],
    issue_type: "unknown",
    object_part: "unknown",
    claim_status: "not_enough_information",
    claim_status_justification: "No prior pipeline output exists for this user in the Phase 1 mock.",
    supporting_image_ids: [],
    severity: "unknown",
    level1: { duplicates: [], per_image: [] },
    level2: null,
    user_history: null,
  });
}

export function getClaim(userId: string): Promise<ClaimAnalysis | null> {
  return delay(MOCK_CLAIMS[userId] ?? null);
}
