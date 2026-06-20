import type { ClaimAnalysis, ClaimSummary, EvidenceRequirement } from "../types/claim";

export const MOCK_CLAIMS: Record<string, ClaimAnalysis> = {
  user_002: {
    user_id: "user_002",
    claim_object: "car",
    user_claim:
      "Customer: Morning. I parked near office and later noticed something off in the front. | " +
      "Agent: Is this about one part or multiple parts? | " +
      "Customer: Two things, I think. The front bumper looks damaged and the left headlight also looks affected. | " +
      "Agent: Should we review both as part of this claim? | " +
      "Customer: Yes, front bumper and left headlight together.",
    image_paths:
      "images/test/case_001/img_1.jpg;images/test/case_001/img_2.jpg;images/test/case_001/img_3.jpg",
    valid_image: true,
    evidence_standard_met: true,
    evidence_standard_met_reason: "1 of 3 image(s) passed pre-filters.",
    risk_flags: ["none"],
    issue_type: "scratch",
    object_part: "front_bumper",
    claim_status: "supported",
    claim_status_justification:
      "Close-up image shows a visible scratch on the front bumper consistent with the customer's description.",
    supporting_image_ids: ["img_2"],
    severity: "medium",
    level1: {
      duplicates: [],
      per_image: [
        {
          image_id: "img_1", path: "images/test/case_001/img_1.jpg", loaded: true, usable: false,
          blurry: true, laplacian_var: 3.1, bad_exposure: false, mean_brightness: 132.4,
          too_small: false, width: 800, height: 600, blank: false, std_dev: 41.2,
        },
        {
          image_id: "img_2", path: "images/test/case_001/img_2.jpg", loaded: true, usable: true,
          blurry: false, laplacian_var: 42.3, bad_exposure: false, mean_brightness: 118.2,
          too_small: false, width: 800, height: 600, blank: false, std_dev: 45.1,
        },
        {
          image_id: "img_3", path: "images/test/case_001/img_3.jpg", loaded: true, usable: false,
          blurry: false, laplacian_var: 38.0, bad_exposure: true, mean_brightness: 212.6,
          too_small: false, width: 800, height: 600, blank: false, std_dev: 39.4,
        },
      ],
    },
    level2: {
      vlm_model: "qwen2.5vl:3b",
      images_analyzed: 1,
      results: [
        {
          image_id: "img_2", damage_visible: "yes", object_identifiable: "yes",
          predicted_issue_type: "scratch", predicted_object_part: "front_bumper",
          quality_notes: "none", verdict: "valid",
          perceived_sharpness: 72, perceived_brightness: 120, perceived_contrast: 48,
          perceived_low_resolution: "no",
        },
      ],
    },
    user_history: {
      past_claim_count: 4, accept_claim: 3, manual_review_claim: 1, rejected_claim: 0,
      last_90_days_claim_count: 2,
      history_summary: "Mostly accepted vehicle claims with one manual review",
      history_flags: ["none"],
    },
  },
  user_036: {
    user_id: "user_036",
    claim_object: "car",
    user_claim:
      "Customer: There's damage near the front of my car. | Support: Can you describe it? | " +
      "Customer: It's hard to tell from the photo, the lighting was bad. | " +
      "Support: Do you have another image? | Customer: I only have this one for now.",
    image_paths: "images/test/case_036/img_1.jpg;images/test/case_036/img_2.jpg",
    valid_image: true,
    evidence_standard_met: true,
    evidence_standard_met_reason: "1 of 2 image(s) passed pre-filters.",
    risk_flags: ["frequent_manual_review_history", "elevated_recent_claim_frequency"],
    issue_type: "unknown",
    object_part: "front_bumper",
    claim_status: "not_enough_information",
    claim_status_justification:
      "The usable image does not clearly show enough of the claimed area to confirm damage.",
    supporting_image_ids: ["img_1"],
    severity: "low",
    level1: {
      duplicates: [],
      per_image: [
        {
          image_id: "img_1", path: "images/test/case_036/img_1.jpg", loaded: true, usable: true,
          blurry: false, laplacian_var: 18.4, bad_exposure: false, mean_brightness: 96.0,
          too_small: false, width: 640, height: 480, blank: false, std_dev: 28.7,
        },
        {
          image_id: "img_2", path: "images/test/case_036/img_2.jpg", loaded: true, usable: false,
          blurry: true, laplacian_var: 2.0, bad_exposure: true, mean_brightness: 38.1,
          too_small: false, width: 640, height: 480, blank: false, std_dev: 12.5,
        },
      ],
    },
    level2: null,
    user_history: {
      past_claim_count: 6, accept_claim: 3, manual_review_claim: 2, rejected_claim: 1,
      last_90_days_claim_count: 3,
      history_summary: "Elevated recent claim frequency with mixed outcomes",
      history_flags: ["frequent_manual_review_history", "elevated_recent_claim_frequency"],
    },
  },
};

export const MOCK_RECENT_CLAIMS: ClaimSummary[] = [
  { user_id: "user_002", claim_object: "car", claim_status: "supported", severity: "medium", date: "2026-06-19" },
  { user_id: "user_005", claim_object: "car", claim_status: "supported", severity: "medium", date: "2026-06-19" },
  { user_id: "user_036", claim_object: "car", claim_status: "not_enough_information", severity: "low", date: "2026-06-19" },
  { user_id: "user_027", claim_object: "laptop", claim_status: "contradicted", severity: "low", date: "2026-06-18" },
  { user_id: "user_029", claim_object: "package", claim_status: "supported", severity: "medium", date: "2026-06-18" },
  { user_id: "user_043", claim_object: "car", claim_status: "contradicted", severity: "unknown", date: "2026-06-17" },
];

export const MOCK_DASHBOARD_STATS = {
  pending: 12,
  supported: 34,
  manual_review: 5,
  rejected: 2,
};

export const MOCK_EVIDENCE_REQUIREMENTS: EvidenceRequirement[] = [
  {
    requirement_id: "REQ_GENERAL_OBJECT_PART", claim_object: "all", applies_to: "general claim review",
    minimum_image_evidence: "The claimed object and relevant part should be visible clearly enough to inspect the claimed condition.",
  },
  {
    requirement_id: "REQ_GENERAL_MULTI_IMAGE", claim_object: "all", applies_to: "multi-image rows",
    minimum_image_evidence: "Each submitted image should be considered separately; at least one relevant image should show the claimed object or part clearly enough to evaluate the claim.",
  },
];
