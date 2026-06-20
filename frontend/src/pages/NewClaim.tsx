import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { analyzeClaim, getEvidenceRequirements } from "../api/client";
import type { ClaimObject, EvidenceRequirement } from "../types/claim";
import { PipelineStepper, type PipelineStep } from "../components/PipelineStepper";

const CLAIM_OBJECTS: { value: ClaimObject; label: string }[] = [
  { value: "car", label: "Car" },
  { value: "laptop", label: "Laptop" },
  { value: "package", label: "Package" },
];

export function NewClaim() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [claimObject, setClaimObject] = useState<ClaimObject>("car");
  const [userClaim, setUserClaim] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [step, setStep] = useState<PipelineStep>("idle");
  const [requirements, setRequirements] = useState<EvidenceRequirement[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getEvidenceRequirements().then(setRequirements);
  }, []);

  const matchingRequirements = requirements.filter(
    (r) => r.claim_object === "all" || r.claim_object === claimObject
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!userId.trim()) return setError("User ID is required.");
    if (userClaim.trim().length < 20) return setError("Describe the claim in at least 20 characters.");
    if (files.length === 0) return setError("Attach at least one image.");

    setStep("level1");
    await new Promise((r) => setTimeout(r, 500));
    setStep("level2");

    const result = await analyzeClaim({ user_id: userId.trim(), user_claim: userClaim, claim_object: claimObject, files });
    setStep("done");
    navigate(`/claims/${result.user_id}`, { state: { result } });
  }

  if (step !== "idle") {
    return (
      <div className="mx-auto max-w-md rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
        <h1 className="mb-4 text-base font-semibold">Analyzing claim</h1>
        <PipelineStepper current={step} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-lg font-semibold text-[var(--color-text)]">New claim</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="user_id">User ID</label>
          <input
            id="user_id"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="user_002"
            className="w-full rounded-md border border-[var(--color-border)] px-3 py-2 text-sm"
          />
        </div>

        <div>
          <span className="mb-1 block text-sm font-medium">Claim object</span>
          <div className="inline-flex rounded-md border border-[var(--color-border)] p-0.5">
            {CLAIM_OBJECTS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setClaimObject(opt.value)}
                className="rounded-[5px] px-3 py-1.5 text-sm font-medium"
                style={{
                  background: claimObject === opt.value ? "var(--color-accent)" : "transparent",
                  color: claimObject === opt.value ? "#fff" : "var(--color-text-muted)",
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {matchingRequirements.length > 0 && (
            <ul className="mt-2 flex flex-col gap-1 rounded-md bg-slate-50 p-3 text-xs text-[var(--color-text-muted)]">
              {matchingRequirements.map((req) => (
                <li key={req.requirement_id}>{req.minimum_image_evidence}</li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="user_claim">Conversation</label>
          <textarea
            id="user_claim"
            value={userClaim}
            onChange={(e) => setUserClaim(e.target.value)}
            rows={5}
            placeholder="Customer: ... | Support: ..."
            className="w-full rounded-md border border-[var(--color-border)] px-3 py-2 text-sm"
          />
        </div>

        <div>
          <span className="mb-1 block text-sm font-medium">Images</span>
          <label
            htmlFor="files"
            className="flex cursor-pointer flex-col items-center justify-center gap-1 rounded-md border border-dashed border-[var(--color-border)] px-4 py-8 text-center"
          >
            <span className="text-sm text-[var(--color-text)]">Drag and drop, or click to choose files</span>
            <span className="text-xs text-[var(--color-text-muted)]">JPG or PNG, up to 10MB each</span>
            <input
              id="files"
              type="file"
              accept="image/png,image/jpeg"
              multiple
              className="hidden"
              onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
            />
          </label>
          {files.length > 0 && (
            <ul className="mt-2 flex flex-wrap gap-2 text-xs text-[var(--color-text-muted)]">
              {files.map((f) => (
                <li key={f.name} className="rounded-md border border-[var(--color-border)] px-2 py-1">{f.name}</li>
              ))}
            </ul>
          )}
        </div>

        {error && <p className="text-sm text-[var(--color-status-contradicted)]">{error}</p>}

        <button
          type="submit"
          className="self-start rounded-md bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-accent-hover)]"
        >
          Analyze claim
        </button>
      </form>
    </div>
  );
}
