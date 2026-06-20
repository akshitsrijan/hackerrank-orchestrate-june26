import { useState } from "react";
import type { PerImageDetail } from "../types/claim";

function rejectionLabel(detail: PerImageDetail): string | null {
  if (detail.loaded === false) return "Failed to load";
  if (detail.blurry) return "Blurry";
  if (detail.bad_exposure) return "Poor exposure";
  if (detail.too_small) return "Too small";
  if (detail.blank) return "Blank frame";
  return null;
}

export function ImageGallery({ images, baseUrl }: { images: PerImageDetail[]; baseUrl?: string }) {
  const [selected, setSelected] = useState(0);
  if (images.length === 0) {
    return <p className="text-sm text-[var(--color-text-muted)]">No images submitted for this claim.</p>;
  }
  const active = images[selected];
  const src = (path: string) => (baseUrl ? `${baseUrl}/${path}` : undefined);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex aspect-video items-center justify-center overflow-hidden rounded-lg border border-[var(--color-border)] bg-slate-100">
        {active.loaded && src(active.path) ? (
          <img
            src={src(active.path)}
            alt={`Claim evidence ${active.image_id}`}
            className="size-full object-contain"
          />
        ) : (
          <span className="text-sm text-[var(--color-text-muted)]">Preview unavailable ({active.path})</span>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {images.map((img, idx) => {
          const reason = rejectionLabel(img);
          return (
            <button
              key={img.image_id}
              type="button"
              onClick={() => setSelected(idx)}
              className="relative h-16 w-20 overflow-hidden rounded-md border text-left"
              style={{
                borderColor: idx === selected ? "var(--color-accent)" : "var(--color-border)",
                borderWidth: idx === selected ? 2 : 1,
              }}
            >
              <div className="flex size-full items-center justify-center bg-slate-100 text-[10px] text-[var(--color-text-muted)]">
                {img.image_id}
              </div>
              {reason && (
                <span className="absolute inset-x-0 bottom-0 truncate bg-black/60 px-1 py-0.5 text-[10px] text-white">
                  {reason}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
