import React, { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./terminal.module.css";
import { terminalResume } from "../../data/terminalResume";

// GitHub contribution calendar, rendered in the terminal's phosphor palette.
// Data comes from the public jogruber contributions API (no auth, CORS-open):
// https://github-contributions-api.jogruber.de  -> { contributions: Day[] }.
// The fetch is client-only (this block is never server-rendered), so window /
// Date access here is safe.

interface Day {
  date: string; // YYYY-MM-DD
  count: number;
  level: number; // 0..4
}

type State =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ok"; days: Day[]; total: number };

// Username from the resume link, e.g. https://github.com/vince760 -> vince760.
const GH_USER = terminalResume.links.github.replace(/\/+$/, "").split("/").pop() || "";

const GREEN = "74, 222, 128"; // terminal-green, matched to the Tailwind token.

// Map a 0..4 intensity level to a square style. Level 0 is an empty cell drawn
// like the chips elsewhere (chip fill + hairline border); higher levels ramp
// the green alpha, with a soft phosphor glow at the top level.
const levelStyle = (level: number): React.CSSProperties => {
  if (level <= 0) {
    return { backgroundColor: "#0e131a", boxShadow: "inset 0 0 0 1px #1a222c" };
  }
  const alpha = [0, 0.28, 0.5, 0.72, 1][Math.min(level, 4)];
  return {
    backgroundColor: `rgba(${GREEN}, ${alpha})`,
    ...(level >= 4 ? { boxShadow: `0 0 5px rgba(${GREEN}, 0.55)` } : {})
  };
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DOW = ["", "Mon", "", "Wed", "", "Fri", ""]; // labels on the left rail

const Cell: React.FC<{ day?: Day; delay?: number }> = ({ day, delay }) => {
  if (!day) return <span className="h-[11px] w-[11px]" aria-hidden="true" />;
  const noun = day.count === 1 ? "contribution" : "contributions";
  return (
    <span
      className={`${styles.drop} h-[11px] w-[11px] rounded-[2px]`}
      style={{ ...levelStyle(day.level), animationDelay: `${delay ?? 0}ms` }}
      title={`${day.count} ${noun} on ${day.date}`}
      aria-hidden="true"
    />
  );
};

interface Props {
  run: (cmd: string) => void;
}

const Contributions: React.FC<Props> = ({ run }) => {
  const [state, setState] = useState<State>({ status: "loading" });

  const load = useCallback(() => {
    if (!GH_USER) {
      setState({ status: "error" });
      return;
    }
    setState({ status: "loading" });
    let cancelled = false;
    fetch(`https://github-contributions-api.jogruber.de/v4/${GH_USER}?y=last`)
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json();
      })
      .then((data: { contributions?: Day[] }) => {
        if (cancelled) return;
        const days = Array.isArray(data.contributions) ? data.contributions : [];
        const total = days.reduce((s, d) => s + d.count, 0);
        setState({ status: "ok", days, total });
      })
      .catch(() => !cancelled && setState({ status: "error" }));
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(load, [load]);

  // Arrange the flat day list into week columns (7 rows: Sun..Sat). The first
  // day's weekday offsets the grid so each column lines up to a real week.
  const { weeks, monthLabels, delays } = useMemo(() => {
    if (state.status !== "ok" || !state.days.length) {
      return {
        weeks: [] as Day[][],
        monthLabels: [] as string[],
        delays: new Map<string, number>()
      };
    }
    const offset = new Date(`${state.days[0].date}T00:00:00Z`).getUTCDay();
    const grid: Day[][] = [];
    // Scatter the drop-in: each day gets a random delay so squares land in a
    // random order rather than reading left-to-right.
    const delayMap = new Map<string, number>();
    state.days.forEach((d, i) => {
      const col = Math.floor((i + offset) / 7);
      const row = (i + offset) % 7;
      (grid[col] ||= [])[row] = d;
      delayMap.set(d.date, Math.round(Math.random() * 900));
    });

    // One label per column, shown only when its month differs from the column
    // before it (skips the partial first column to avoid a cramped left edge).
    let prev = -1;
    const labels = grid.map((week, ci) => {
      const first = week.find(Boolean);
      if (!first) return "";
      const m = new Date(`${first.date}T00:00:00Z`).getUTCMonth();
      if (ci === 0) {
        prev = m;
        return "";
      }
      if (m !== prev) {
        prev = m;
        return MONTHS[m];
      }
      return "";
    });
    return { weeks: grid, monthLabels: labels, delays: delayMap };
  }, [state]);

  const githubLink = (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => run("open github")}
      className="term-link"
    >
      @{GH_USER}
    </button>
  );

  return (
    <div className={`${styles.reveal} mb-3`}>
      <div className="mb-1 text-xs uppercase tracking-widest text-terminal-amber"># contributions</div>

      {state.status === "loading" && (
        <>
          <div className="mb-2 text-terminal-dim" aria-live="polite">
            fetching contribution graph for {githubLink} ...
          </div>
          {/* Skeleton grid holds the layout while data loads (no blocking spinner). */}
          <div className="flex gap-[3px] opacity-40" aria-hidden="true">
            {Array.from({ length: 52 }).map((_, c) => (
              <div key={c} className="flex flex-col gap-[3px]">
                {Array.from({ length: 7 }).map((__, r) => (
                  <span
                    key={r}
                    className="h-[11px] w-[11px] rounded-[2px]"
                    style={{ backgroundColor: "#0e131a", boxShadow: "inset 0 0 0 1px #1a222c" }}
                  />
                ))}
              </div>
            ))}
          </div>
        </>
      )}

      {state.status === "error" && (
        <div className="text-terminal-red">
          <div className="mb-2">
            could not reach the contribution graph for {githubLink}.
          </div>
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={load}
            className="term-chip"
          >
            retry ›
          </button>
        </div>
      )}

      {state.status === "ok" && weeks.length === 0 && (
        <div className="text-terminal-dim">no public contributions in the last year. {githubLink}</div>
      )}

      {state.status === "ok" && weeks.length > 0 && (
        <>
          <div className="mb-2.5 text-terminal-dim">
            <span className="text-terminal-fg">{state.total.toLocaleString()}</span> contributions in
            the last year · {githubLink}
          </div>

          <div className="overflow-x-auto pb-1">
            <div
              className="inline-flex flex-col gap-1"
              role="img"
              aria-label={`${state.total} GitHub contributions by ${GH_USER} in the last year`}
            >
              {/* Month labels, aligned to the week columns. */}
              <div className="flex gap-[3px] text-[10px] text-terminal-dim">
                <span className="w-[26px] shrink-0" aria-hidden="true" />
                {monthLabels.map((m, ci) => (
                  <span key={ci} className="w-[11px] shrink-0 whitespace-nowrap">
                    {m}
                  </span>
                ))}
              </div>

              {/* Day-of-week rail + the week columns. */}
              <div className="flex gap-[3px]">
                <div className="flex w-[26px] shrink-0 flex-col gap-[3px] text-[9px] leading-[11px] text-terminal-dim">
                  {DOW.map((d, i) => (
                    <span key={i} className="h-[11px]">
                      {d}
                    </span>
                  ))}
                </div>
                {weeks.map((week, ci) => (
                  <div key={ci} className="flex flex-col gap-[3px]">
                    {Array.from({ length: 7 }).map((_, ri) => {
                      const d = week[ri];
                      return <Cell key={ri} day={d} delay={d ? delays.get(d.date) : 0} />;
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Legend: numeric scale ticks so meaning is not color-only. */}
          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-terminal-dim">
            <span>less</span>
            {[0, 1, 2, 3, 4].map((lvl) => (
              <span
                key={lvl}
                className="h-[11px] w-[11px] rounded-[2px]"
                style={levelStyle(lvl)}
                aria-hidden="true"
              />
            ))}
            <span>more</span>
          </div>
        </>
      )}
    </div>
  );
};

export default Contributions;
