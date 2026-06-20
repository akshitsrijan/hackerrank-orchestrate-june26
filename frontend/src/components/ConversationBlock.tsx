interface Turn {
  speaker: string;
  text: string;
}

const SPEAKER_PREFIXES = ["Customer", "Support", "Agent"];

function parseConversation(transcript: string): Turn[] {
  return transcript
    .split("|")
    .map((segment) => segment.trim())
    .filter(Boolean)
    .map((segment) => {
      const prefix = SPEAKER_PREFIXES.find((p) => segment.startsWith(`${p}:`));
      if (!prefix) return { speaker: "Note", text: segment };
      return { speaker: prefix, text: segment.slice(prefix.length + 1).trim() };
    });
}

export function ConversationBlock({ transcript }: { transcript: string }) {
  const turns = parseConversation(transcript);
  return (
    <ol className="flex flex-col gap-2.5">
      {turns.map((turn, idx) => (
        <li key={idx} className="flex gap-2 text-sm">
          <span
            className="w-16 shrink-0 text-xs font-semibold uppercase tracking-wide"
            style={{ color: turn.speaker === "Customer" ? "var(--color-accent)" : "var(--color-text-muted)" }}
          >
            {turn.speaker}
          </span>
          <span className="text-[var(--color-text)]">{turn.text}</span>
        </li>
      ))}
    </ol>
  );
}
