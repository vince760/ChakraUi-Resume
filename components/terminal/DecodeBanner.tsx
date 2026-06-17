import React, { useEffect, useRef, useState } from "react";

// Glyph pool the banner scrambles through before settling. Kept to terminal /
// hacker punctuation so the "forming" frames stay on-aesthetic.
const GLYPHS = "!<>-_\\/[]{}=+*^?#%&$@01";

interface Props {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
  duration?: number; // total decode time in ms
}

// The ASCII banner "decodes" on mount: every non-whitespace cell cycles through
// random glyphs, then locks into its real character. Cells resolve roughly
// left-to-right with jitter, so it reads as a wave forming rather than all
// landing at once. Whitespace and newlines never scramble, preserving the
// letter silhouette throughout. Under reduced motion it renders final at once.
const DecodeBanner: React.FC<Props> = ({ text, className, style, ariaLabel, duration = 700 }) => {
  // Initial state matches the server render (the final banner) to avoid a
  // hydration mismatch; the scramble begins on the first client frame.
  const [display, setDisplay] = useState(text);
  const raf = useRef<number>();

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" && window.matchMedia
        ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
        : false;
    if (reduced) {
      setDisplay(text);
      return;
    }

    const chars = Array.from(text);
    const n = chars.length || 1;
    // Each cell's lock-in time: a left-to-right ramp (60% of the budget) plus
    // per-cell jitter (the remaining 40%).
    const resolveAt = chars.map((c, i) =>
      c === " " || c === "\n" ? 0 : (i / n) * duration * 0.6 + Math.random() * duration * 0.4
    );

    let start: number | null = null;
    const tick = (now: number) => {
      if (start === null) start = now;
      const elapsed = now - start;
      let done = true;
      const out = chars.map((c, i) => {
        if (c === " " || c === "\n") return c;
        if (elapsed >= resolveAt[i]) return c;
        done = false;
        return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      });
      setDisplay(out.join(""));
      if (done) return;
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [text, duration]);

  return (
    <pre className={className} style={style} aria-label={ariaLabel}>
      {display}
    </pre>
  );
};

export default DecodeBanner;
