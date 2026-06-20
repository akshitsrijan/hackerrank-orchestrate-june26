export type ClaimObject = "car" | "laptop" | "package";

export type ClaimStatus = "supported" | "contradicted" | "not_enough_information";

export type Severity = "none" | "low" | "medium" | "high" | "unknown";

export type IssueType =
  | "dent" | "scratch" | "crack" | "glass_shatter" | "broken_part"
  | "missing_part" | "torn_packaging" | "crushed_packaging"
  | "water_damage" | "stain" | "none" | "unknown";

export type RiskFlag =
  | "high_rejection_history"
  | "frequent_manual_review_history"
  | "elevated_recent_claim_frequency"
  | "duplicate_images_submitted"
  | "none";

export interface PerImageDetail {
  image_id: string;
  path: string;
  loaded: boolean;
  usable?: boolean;
  blurry?: boolean;
  laplacian_var?: number;
  bad_exposure?: boolean;
  mean_brightness?: number;
  too_small?: boolean;
  width?: number;
  height?: number;
  blank?: boolean;
  std_dev?: number;
}

export interface Level1Result {
  per_image: PerImageDetail[];
  duplicates: [string, string, number][];
}

export interface VlmImageResult {
  image_id: string;
  damage_visible: "yes" | "no" | string;
  object_identifiable: "yes" | "no" | string;
  predicted_issue_type: IssueType;
  predicted_object_part: string;
  quality_notes: string;
  verdict: "valid" | "invalid" | "needs_human_review" | string;
  perceived_sharpness: number;
  perceived_brightness: number;
  perceived_contrast: number;
  perceived_low_resolution: "yes" | "no" | string;
}

export interface Level2Result {
  vlm_model: string;
  images_analyzed: number;
  results: VlmImageResult[];
}

export interface UserHistorySummary {
  past_claim_count: number;
  accept_claim?: number;
  manual_review_claim?: number;
  rejected_claim?: number;
  last_90_days_claim_count?: number;
  history_summary: string;
  history_flags: string[];
}

export interface ClaimAnalysis {
  user_id: string;
  claim_object: ClaimObject;
  user_claim: string;
  image_paths: string;
  valid_image: boolean;
  evidence_standard_met: boolean;
  evidence_standard_met_reason: string;
  risk_flags: RiskFlag[];
  issue_type: IssueType;
  object_part: string;
  claim_status: ClaimStatus;
  claim_status_justification: string;
  supporting_image_ids: string[];
  severity: Severity;
  level1: Level1Result;
  level2: Level2Result | null;
  user_history: UserHistorySummary | null;
}

export interface ClaimSummary {
  user_id: string;
  claim_object: ClaimObject;
  claim_status: ClaimStatus;
  severity: Severity;
  date: string;
}

export interface EvidenceRequirement {
  requirement_id: string;
  claim_object: string;
  applies_to: string;
  minimum_image_evidence: string;
}
