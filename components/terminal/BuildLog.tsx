import React, { useEffect, useState } from "react";
import styles from "./terminal.module.css";

type Who = "human" | "claude" | "codex" | "skill";

interface Agent {
  pid: string;
  name: string;
  task: string;
  who: Who;
  cpu: number;
  mem: number;
}

// The build, as a live process monitor. Edit freely: each agent is a "process"
// with a baseline load; the meters jitter around it to feel alive. cpu/mem are
// flavor, not real telemetry. PID 000 is the human who directed the build.
const AGENTS: Agent[] = [
  { pid: "000", name: "vince", task: "direction + review", who: "human", cpu: 17, mem: 12 },
  {
    pid: "001",
    name: "claude-opus-4.8",
    task: "terminal engine, contact pipeline",
    who: "claude",
    cpu: 67,
    mem: 59
  },
  { pid: "002", name: "codex", task: "scaffold, typed data model", who: "codex", cpu: 43, mem: 38 },
  { pid: "003", name: "frontend-design", task: "visual system (skill)", who: "skill", cpu: 54, mem: 46 }
];

const NAME_COLOR: Record<Who, string> = {
  human: "text-terminal-bright",
  claude: "text-terminal-green",
  codex: "text-terminal-blue",
  skill: "text-terminal-amber"
};

// htop-style: bar color tracks load, not identity, so spikes flash amber/red.
const loadColor = (p: number) =>
  p < 60 ? "text-terminal-green" : p < 85 ? "text-terminal-amber" : "text-terminal-red";

const CELLS = 12;

const Meter: React.FC<{ pct: number }> = ({ pct }) => {
  const filled = Math.max(0, Math.min(CELLS, Math.round((pct / 100) * CELLS)));
  return (
    <span className="whitespace-pre">
      <span className="text-terminal-dim">[</span>
      <span className={loadColor(pct)}>{"|".repeat(filled)}</span>
      <span className="text-terminal-dim/50">{"·".repeat(CELLS - filled)}</span>
      <span className="text-terminal-dim">] </span>
      <span className="text-terminal-fg">{`${Math.round(pct)}`.padStart(3, " ")}%</span>
    </span>
  );
};

const BuildLog: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>(AGENTS);

  // Live meters: random-walk each agent's load within a band around its
  // baseline. Held static under reduced motion. Client-only (this block is
  // never server-rendered), so Math.random / matchMedia are safe here.
  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const walk = (v: number, base: number, band: number, spread: number) => {
      const next = v + (Math.random() * 2 - 1) * spread;
      return Math.max(4, Math.min(99, Math.max(base - band, Math.min(base + band, next))));
    };

    const id = setInterval(() => {
      setAgents((prev) =>
        prev.map((a, i) => ({
          ...a,
          cpu: walk(a.cpu, AGENTS[i].cpu, 16, 11),
          mem: walk(a.mem, AGENTS[i].mem, 9, 5)
        }))
      );
    }, 820);
    return () => clearInterval(id);
  }, []);

  const avg = Math.round(agents.reduce((s, a) => s + a.cpu, 0) / agents.length);

  return (
    <div className="mb-3">
      <div className="mb-1 text-xs uppercase tracking-widest text-terminal-amber"># build</div>
      <div className="mb-2 text-terminal-dim">
        top · {agents.length} agents · {agents.length} running · 0 failed · 0 errors ·{" "}
        <span className="text-terminal-fg">load {avg}%</span>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[680px]">
          <div className="flex items-center gap-3 whitespace-nowrap border-b border-terminal-border pb-1 text-terminal-dim">
            <span className="w-10">PID</span>
            <span className="w-40">AGENT</span>
            <span className="w-40">CPU</span>
            <span className="w-40">MEM</span>
            <span>TASK</span>
          </div>
          {agents.map((a, i) => (
            <div
              key={a.pid}
              className={`${styles.reveal} flex items-center gap-3 whitespace-nowrap py-0.5`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <span className="w-10 text-terminal-dim">{a.pid}</span>
              <span className={`w-40 ${NAME_COLOR[a.who]}`}>{a.name}</span>
              <span className="w-40">
                <Meter pct={a.cpu} />
              </span>
              <span className="w-40">
                <Meter pct={a.mem} />
              </span>
              <span className="text-terminal-dim">{a.task}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12.5px] text-terminal-dim">
        <span>built by</span>
        <span className="text-terminal-bright">vince</span>
        <span>+</span>
        <span className="text-terminal-green">claude (opus 4.8)</span>
        <span className="text-terminal-blue">openai codex</span>
        <span className="text-terminal-amber">claude skills</span>
      </div>
      <div className="mt-1 text-terminal-dim">this resume runs on the same craft it describes.</div>
    </div>
  );
};

export default BuildLog;
